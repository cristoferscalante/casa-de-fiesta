export interface QuoteItem {
  concept: string;
  detail: string;
  value: number | null;
}

export interface QuoteRecord {
  slug: string;
  clientName: string;
  clientPhone?: string;
  eventType: string;
  eventDate: string;
  eventTime?: string;
  location?: string;
  theme?: string;
  guests?: string;
  updatedAt: string;
  status: 'Borrador' | 'Enviada' | 'Ajustes' | 'Aprobada';
  summary: string;
  total: number | null;
  includes: string[];
  conditions: string[];
  items: QuoteItem[];
  images?: Array<{
    src: string;
    alt: string;
  }>;
}

export const quotes: QuoteRecord[] = [
  {
    slug: 'andres',
    clientName: 'Andres',
    clientPhone: '3108032361',
    eventType: 'Bouquet',
    eventDate: '2026-06-02',
    eventTime: 'Por confirmar',
    location: 'Pitalito, Huila',
    theme: 'Bouquet',
    guests: 'N/A',
    updatedAt: '2026-06-02T12:00:00-05:00',
    status: 'Enviada',
    summary: 'Propuesta sencilla y directa para decoracion tipo bouquet con estructura, letrero personalizado y montaje visual principal.',
    total: 380100,
    includes: [
      'Diseno principal con arco organico de globos.',
      'Soporte para el montaje de la propuesta.',
      'Letrero personalizado segun la tematica.',
    ],
    conditions: [
      'Se requiere un anticipo del 60% para reservar la fecha y programar la decoracion.',
      'El 40% restante debera cancelarse al momento de la entrega o montaje.',
      'La propuesta puede ajustarse en este mismo enlace si hay cambios.',
    ],
    items: [
      {
        concept: 'Arco organico de globos',
        detail: 'Montaje principal de la decoracion segun la referencia visual compartida.',
        value: 280100,
      },
      {
        concept: 'Soporte',
        detail: 'Base y estructura necesarias para sostener la propuesta.',
        value: 50000,
      },
      {
        concept: 'Letrero personalizado',
        detail: 'Pieza personalizada con nombre o mensaje segun el diseno final.',
        value: 50000,
      },
    ],
    images: [],
  },
];

export const quotesByRecency = [...quotes].sort(
  (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
);

export function getQuoteBySlug(slug: string) {
  return quotes.find((quote) => quote.slug === slug);
}
