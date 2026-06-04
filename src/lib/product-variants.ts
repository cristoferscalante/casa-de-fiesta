export interface ProductVariantAttribute {
  name: string;
  value: string;
  hex?: string | null;
}

export interface ProductVariant {
  id: string;
  label: string;
  attributes: ProductVariantAttribute[];
  price: number | null;
  image: string | null;
}

interface ProductVariantGroup {
  name: string;
  isColor: boolean;
  values: Array<{
    value: string;
    hex: string | null;
  }>;
}

const cleanText = (value: unknown) => String(value ?? '').trim();

const normalizeLabel = (value: unknown) =>
  cleanText(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const normalizeHex = (value: unknown) => {
  const text = cleanText(value).replace('#', '');
  return /^[0-9a-fA-F]{6}$/.test(text) ? `#${text.toUpperCase()}` : null;
};

export function isColorAttribute(name: string) {
  return normalizeLabel(name) === 'color';
}

const uniqueValues = (values: Array<{ value: string; hex: string | null }>) => {
  const seen = new Map<string, { value: string; hex: string | null }>();

  values.forEach((entry) => {
    if (!entry.value) return;
    const existing = seen.get(entry.value);
    if (!existing) {
      seen.set(entry.value, entry);
      return;
    }

    if (!existing.hex && entry.hex) {
      seen.set(entry.value, entry);
    }
  });

  return Array.from(seen.values());
};

export function getVariantDisplayLabel(variant: ProductVariant) {
  if (variant.label) return variant.label;

  const attributeLabel = variant.attributes
    .map((attribute) => attribute.value)
    .filter(Boolean)
    .join(' / ');

  return attributeLabel || 'Variante';
}

export function normalizeProductVariants(rawVariants: unknown): ProductVariant[] {
  if (!Array.isArray(rawVariants)) return [];

  return rawVariants
    .map((variant, index) => normalizeVariantRecord(variant, index))
    .filter((variant): variant is ProductVariant => variant !== null);
}

function normalizeVariantRecord(rawVariant: unknown, index: number): ProductVariant | null {
  if (typeof rawVariant === 'string') {
    const value = cleanText(rawVariant);
    if (!value) return null;

    return {
      id: `variant-${index + 1}`,
      label: value,
      attributes: [{ name: 'Opcion', value }],
      price: null,
      image: null,
    };
  }

  if (!rawVariant || typeof rawVariant !== 'object') return null;

  const record = rawVariant as Record<string, unknown>;
  const rawAttributes = Array.isArray(record.attributes) ? record.attributes : [];

  const normalizedAttributes = rawAttributes
    .map((attribute) => {
      if (!attribute || typeof attribute !== 'object') return null;

      const attributeRecord = attribute as Record<string, unknown>;
      const name = cleanText(attributeRecord.name || attributeRecord.label || attributeRecord.type || 'Opcion');
      const value = cleanText(attributeRecord.value || attributeRecord.nameValue || attributeRecord.option || attributeRecord.label);

      if (!name || !value) return null;

      return {
        name,
        value,
        hex: isColorAttribute(name)
          ? normalizeHex(attributeRecord.hex || attributeRecord.colorHex)
          : null,
      };
    })
    .filter((attribute): attribute is ProductVariantAttribute => attribute !== null);

  if (normalizedAttributes.length === 0) {
    const legacyType = cleanText(record.type || 'Opcion');
    const legacyValue = cleanText(record.value || record.name || record.label);

    if (legacyValue) {
      normalizedAttributes.push({
        name: legacyType,
        value: legacyValue,
        hex: isColorAttribute(legacyType) ? normalizeHex(record.hex || record.colorHex) : null,
      });
    }
  }

  if (normalizedAttributes.length === 0) return null;

  const rawPrice = record.price;
  const normalizedPrice =
    typeof rawPrice === 'number'
      ? rawPrice
      : typeof rawPrice === 'string' && rawPrice.trim().length > 0
        ? Number.parseInt(rawPrice, 10)
        : null;

  const label = cleanText(record.label) || normalizedAttributes.map((attribute) => attribute.value).join(' / ');
  const id = cleanText(record.id) || `variant-${index + 1}`;
  const image = cleanText(record.image) || null;

  return {
    id,
    label,
    attributes: normalizedAttributes,
    price: Number.isFinite(normalizedPrice) ? normalizedPrice : null,
    image,
  };
}

export function getVariantGroups(variants: ProductVariant[]): ProductVariantGroup[] {
  const groups = new Map<string, Array<{ value: string; hex: string | null }>>();

  variants.forEach((variant) => {
    variant.attributes.forEach((attribute) => {
      const existing = groups.get(attribute.name) || [];
      groups.set(
        attribute.name,
        uniqueValues([
          ...existing,
          {
            value: attribute.value,
            hex: isColorAttribute(attribute.name) ? normalizeHex(attribute.hex) : null,
          },
        ])
      );
    });
  });

  return Array.from(groups.entries()).map(([name, values]) => ({
    name,
    isColor: isColorAttribute(name),
    values,
  }));
}

export function getVariantDefaultSelection(variants: ProductVariant[]) {
  const firstVariant = variants[0];
  if (!firstVariant) return {} as Record<string, string>;

  return firstVariant.attributes.reduce<Record<string, string>>((selection, attribute) => {
    selection[attribute.name] = attribute.value;
    return selection;
  }, {});
}

export function findVariantBySelection(
  variants: ProductVariant[],
  selection: Record<string, string>
) {
  if (variants.length === 0) return null;

  const selectedEntries = Object.entries(selection).filter(([, value]) => cleanText(value).length > 0);
  if (selectedEntries.length === 0) return variants[0];

  const exactMatch = variants.find((variant) =>
    variant.attributes.every((attribute) => selection[attribute.name] === attribute.value) &&
    selectedEntries.every(([name, value]) => variant.attributes.some((attribute) => attribute.name === name && attribute.value === value))
  );

  if (exactMatch) return exactMatch;

  return (
    variants.find((variant) =>
      selectedEntries.every(([name, value]) => variant.attributes.some((attribute) => attribute.name === name && attribute.value === value))
    ) || null
  );
}
