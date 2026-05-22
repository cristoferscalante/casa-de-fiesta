// Script to update catalog.ts with secondary images
// Primary: WebP optimized (AI-generated images)
// Secondary: Original PNG images

const imageMapping: Record<string, string> = {
  // Escobas
  'ESC-001': 'escoba-dr-cerda-suave.png',
  'ESC-002': 'escoba-zulia-cerda-suabe.png',
  'ESC-003': 'escoba-dura-cerda-zulia.png',
  'ESC-004': 'escoba-neon-cerda-suave.png',
  'ESC-005': 'escoba-tr-tipo-cerda-dura.png',
  'ESC-006': 'escoba-tr-tipo-cerda-suave.png',
  'ESC-007': 'escoba-wm-cerda-suave.png',
  
  // Cepillos
  'CEP-001': 'cepillo-brillo-tipo-cerda-suave-multiusos.png',
  'CEP-002': 'cepillo-plancha-tipo-cerda-dura.png',
  'CEP-003': 'cepillo-telarañero.png',
  'CEP-004': 'churrasco-para-baño.png',
  'CEP-005': 'rastrillo.png',
  'CEP-006': 'recogedor-plus-banda.png',
  'CEP-007': 'recogedor-smart.png',
  
  // Traperos
  'TRP-001': 'trapero-micro-fibra.png',
  'TRP-002': 'trapero-tipo-copa.png',
  
  // Jabones
  'JAB-001': 'detergente-liquido-4000ml-2000ml-1000ml.png',
  'JAB-002': 'jabon-crema-lavaloza-1000g.png',
  'JAB-003': 'jabon-dado-taza-250grs.png',
  'JAB-004': 'jabon-liquido-poara-manos.png',
  'JAB-005': 'limpiadores-cocina.png',
  'JAB-006': 'limpiadores-multiusos.png',
  'JAB-007': 'limpia-vidrios.png',
  
  // Esponjas
  'ESP-001': 'esponja-doble-uso-x24-unidades.png',
  'ESP-002': 'esponja-multiusos-x12-paquetes-detres-unidades.png',
  'ESP-003': '', // No secondary image available
  'ESP-004': 'esponjas-power-x2unid.png',
  'ESP-005': 'esponjilla-brilla-ollas.png',
  'ESP-006': 'esponjilla-de-brillo-x12unidades.png',
  'ESP-007': 'esponjilla-earth-x12unidades.png',
  'ESP-008': 'esponjilla-malla-sencilla-x12pares.png',
  'ESP-009': 'esponjilla-marca-james-x12unidades.png',
  'ESP-010': 'esponjilla-multiusos-x12unidades.png',
  'ESP-011': 'esponjilla-powerd.png',
  'ESP-012': 'sabra-super-abrasiva-7x10cm-10x14cm-ideales-parrillas-pesado.png',
  
  // Varios
  'VAR-001': 'chupa-sanitario-plastico-economica.png',
  'VAR-002': 'guantes-desechables-x100unidades-restaurantes.png',
  'VAR-003': 'guantes-domesticos.png',
  'VAR-004': 'rollo-cinta-trasnparente-delgada-12mmX12eterna.png',
  'VAR-005': 'rollo-cinta-x12unidades.png',
  'VAR-006': 'condones-20sets-x3pcs.png',
};

console.log('Image Mapping:');
console.log(JSON.stringify(imageMapping, null, 2));

export { imageMapping };
