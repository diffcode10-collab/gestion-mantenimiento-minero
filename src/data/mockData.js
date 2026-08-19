// Mock dataset for Mining Maintenance Demo — Unidad Minera Santa Rosa

export const INITIAL_ASSETS = [
  {
    id: 'EQ-001',
    code: 'EQ-001',
    name: 'Excavadora CAT 320',
    type: 'Excavadora',
    brand: 'Caterpillar',
    model: '320 DL',
    serial: 'CAT00320DPKL982',
    year: 2022,
    ownership: 'Propio',
    contractor: null,
    location: 'Tajo Abierto — Nivel 4',
    horometer: 8542,
    nextServiceHorometer: 8750,
    status: 'Operativo',
    responsible: 'Ing. Carlos Mendoza',
    photo: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    totalFailures: 4,
    availability: 94.2,
    totalCost: 28450,
    lastMaintenance: '2026-08-01'
  },
  {
    id: 'EQ-002',
    code: 'EQ-002',
    name: 'Excavadora Komatsu PC210',
    type: 'Excavadora',
    brand: 'Komatsu',
    model: 'PC210LC-11',
    serial: 'KM210LC-99412',
    year: 2021,
    ownership: 'Tercero',
    contractor: {
      company: 'Servicios Mineros ABC SAC',
      contractNumber: 'CTR-2026-014',
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      contact: 'Ing. Roberto Silva (+51 987 654 321)'
    },
    location: 'Tajo Abierto — Nivel 2',
    horometer: 5821,
    nextServiceHorometer: 6000,
    status: 'En Mantenimiento',
    responsible: 'Mec. Juan Pérez',
    photo: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80',
    totalFailures: 6,
    availability: 88.5,
    totalCost: 41200,
    lastMaintenance: '2026-08-10'
  },
  {
    id: 'EQ-003',
    code: 'EQ-003',
    name: 'Volvo FMX 440 (Volquete 15m3)',
    type: 'Volquete',
    brand: 'Volvo',
    model: 'FMX 440 6x4',
    serial: 'YV1XZ40C0GA81920',
    year: 2023,
    ownership: 'Propio',
    contractor: null,
    location: 'Ruta Transporte Mineral',
    horometer: 12420,
    nextServiceHorometer: 12500,
    status: 'Operativo',
    responsible: 'Jorge Rivas',
    photo: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
    totalFailures: 2,
    availability: 96.1,
    totalCost: 18900,
    lastMaintenance: '2026-07-25'
  },
  {
    id: 'EQ-004',
    code: 'EQ-004',
    name: 'Scania P410 (Volquete 15m3)',
    type: 'Volquete',
    brand: 'Scania',
    model: 'P410 CB6x4',
    serial: 'YS2P6X4000549102',
    year: 2020,
    ownership: 'Tercero',
    contractor: {
      company: 'Transminera Perú EIRL',
      contractNumber: 'CTR-2025-088',
      startDate: '2025-06-01',
      endDate: '2026-11-30',
      contact: 'Lic. Manuel Torres (+51 912 345 678)'
    },
    location: 'Planta de Chancado',
    horometer: 9845,
    nextServiceHorometer: 9900,
    status: 'Detenido',
    responsible: 'Ing. Carlos Mendoza',
    photo: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=80',
    totalFailures: 9,
    availability: 81.0,
    totalCost: 62000,
    lastMaintenance: '2026-08-15'
  },
  {
    id: 'EQ-005',
    code: 'EQ-005',
    name: 'Caterpillar 950M Cargador Frontal',
    type: 'Cargador',
    brand: 'Caterpillar',
    model: '950M',
    serial: 'CAT00950MKZ7710',
    year: 2022,
    ownership: 'Propio',
    contractor: null,
    location: 'Acopio de Mineral - Stockpile 1',
    horometer: 7210,
    nextServiceHorometer: 7500,
    status: 'Operativo',
    responsible: 'Luis Alva',
    photo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    totalFailures: 3,
    availability: 93.8,
    totalCost: 22100,
    lastMaintenance: '2026-08-05'
  },
  {
    id: 'EQ-006',
    code: 'EQ-006',
    name: 'Sandvik DD321 Perforadora Jumbo',
    type: 'Perforadora',
    brand: 'Sandvik',
    model: 'DD321-40',
    serial: 'SNK-DD321-2021-09',
    year: 2021,
    ownership: 'Propio',
    contractor: null,
    location: 'Mina Subterránea - Galerías 3',
    horometer: 4120,
    nextServiceHorometer: 4250,
    status: 'Operativo',
    responsible: 'Ing. Fernando Castro',
    photo: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?auto=format&fit=crop&w=800&q=80',
    totalFailures: 5,
    availability: 91.2,
    totalCost: 54100,
    lastMaintenance: '2026-07-28'
  },
  {
    id: 'EQ-007',
    code: 'EQ-007',
    name: 'CAT 140K Motoniveladora',
    type: 'Motoniveladora',
    brand: 'Caterpillar',
    model: '140K',
    serial: 'CAT140K791823',
    year: 2020,
    ownership: 'Propio',
    contractor: null,
    location: 'Mantenimiento de Vías - Acceso Principal',
    horometer: 11050,
    nextServiceHorometer: 11250,
    status: 'Operativo',
    responsible: 'Marcos Benítez',
    photo: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    totalFailures: 3,
    availability: 95.0,
    totalCost: 19800,
    lastMaintenance: '2026-08-08'
  },
  {
    id: 'EQ-008',
    code: 'EQ-008',
    name: 'Komatsu D155AX Tractor de Oruga',
    type: 'Tractor',
    brand: 'Komatsu',
    model: 'D155AX-8',
    serial: 'KMTD155AX80194',
    year: 2021,
    ownership: 'Tercero',
    contractor: {
      company: 'Servicios Mineros ABC SAC',
      contractNumber: 'CTR-2026-014',
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      contact: 'Ing. Roberto Silva (+51 987 654 321)'
    },
    location: 'Tajo Abierto - Botadero Norte',
    horometer: 8900,
    nextServiceHorometer: 9000,
    status: 'Operativo',
    responsible: 'Ing. Carlos Mendoza',
    photo: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    totalFailures: 4,
    availability: 92.0,
    totalCost: 31000,
    lastMaintenance: '2026-08-03'
  }
];

// Generate total 48 assets mock dynamically to fill out grid
for (let i = 9; i <= 48; i++) {
  const types = ['Excavadora', 'Volquete', 'Cargador', 'Perforadora', 'Motoniveladora', 'Tractor', 'Compresor'];
  const brands = ['Caterpillar', 'Komatsu', 'Volvo', 'Scania', 'Sandvik', 'Atlas Copco'];
  const selectedType = types[i % types.length];
  const selectedBrand = brands[i % brands.length];
  const isTercero = i % 3 === 0;
  const statusList = ['Operativo', 'Operativo', 'Operativo', 'En Mantenimiento', 'Detenido'];
  const currentStatus = statusList[i % statusList.length];
  const horometer = 3000 + (i * 240);

  INITIAL_ASSETS.push({
    id: `EQ-${String(i).padStart(3, '0')}`,
    code: `EQ-${String(i).padStart(3, '0')}`,
    name: `${selectedType} ${selectedBrand} ${100 + i}`,
    type: selectedType,
    brand: selectedBrand,
    model: `Series-${i}`,
    serial: `${selectedBrand.substring(0,3).toUpperCase()}${i * 99812}`,
    year: 2020 + (i % 4),
    ownership: isTercero ? 'Tercero' : 'Propio',
    contractor: isTercero ? {
      company: i % 2 === 0 ? 'Servicios Mineros ABC SAC' : 'Transminera Perú EIRL',
      contractNumber: `CTR-2026-0${10 + (i % 8)}`,
      startDate: '2026-01-01',
      endDate: '2026-12-31',
      contact: 'Coordinador Contratista (+51 988 112 233)'
    } : null,
    location: i % 2 === 0 ? 'Tajo Abierto — Zona Este' : 'Planta Beneficio',
    horometer: horometer,
    nextServiceHorometer: horometer + (250 - (horometer % 250)),
    status: currentStatus,
    responsible: 'Ing. Mantenimiento Santa Rosa',
    photo: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    totalFailures: (i % 5) + 1,
    availability: Number((89 + (i % 10)).toFixed(1)),
    totalCost: 15000 + (i * 1200),
    lastMaintenance: '2026-08-12'
  });
}

export const INITIAL_REQUESTS = [
  {
    id: 'SOL-2026-0082',
    code: 'SOL-2026-0082',
    date: '2026-08-18 14:30',
    assetId: 'EQ-001',
    assetCode: 'EQ-001',
    assetName: 'Excavadora CAT 320',
    reportedBy: 'Operador Raúl Vargas (Cuadrilla A)',
    issueType: 'Hidráulico',
    description: 'Pérdida brusca de presión en brazo hidráulico principal con goteo constante de aceite por manguera de alta presión.',
    priority: 'Alta',
    status: 'Nueva',
    responsible: 'Ing. Carlos Mendoza',
    photo: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'SOL-2026-0081',
    code: 'SOL-2026-0081',
    date: '2026-08-18 11:15',
    assetId: 'EQ-004',
    assetCode: 'EQ-004',
    assetName: 'Scania P410 (Volquete)',
    reportedBy: 'Operador Mario Paredes',
    issueType: 'Motor / Calentamiento',
    description: 'Temperatura de refrigerante supera los 105°C al subir la rampa con carga completa. Alerta sonora activa.',
    priority: 'Crítica',
    status: 'En evaluación',
    responsible: 'Mec. Juan Pérez',
    photo: null
  },
  {
    id: 'SOL-2026-0080',
    code: 'SOL-2026-0080',
    date: '2026-08-17 09:00',
    assetId: 'EQ-002',
    assetCode: 'EQ-002',
    assetName: 'Excavadora Komatsu PC210',
    reportedBy: 'Supervisor R. Silva',
    issueType: 'Eléctrico',
    description: 'Fallo en encendido de panel display principal y sensores de nivel hidráulico.',
    priority: 'Media',
    status: 'Convertida en OT',
    convertedOtId: 'OT-2026-0153',
    responsible: 'Tec. Carlos López',
    photo: null
  }
];

// Add 37 more requests to total 40
for (let i = 79; i >= 43; i--) {
  INITIAL_REQUESTS.push({
    id: `SOL-2026-00${i}`,
    code: `SOL-2026-00${i}`,
    date: `2026-08-${15 - (i % 10)} 08:${(i * 3) % 60}`,
    assetId: `EQ-00${(i % 8) + 1}`,
    assetCode: `EQ-00${(i % 8) + 1}`,
    assetName: `Equipo Minero EQ-00${(i % 8) + 1}`,
    reportedBy: `Operador Minero ${i}`,
    issueType: i % 2 === 0 ? 'Mecánico' : 'Mantenimiento preventivo rutinario',
    description: `Revisión periódica y ruido inusual detectado durante la guardia de noche en estación ${i}.`,
    priority: i % 3 === 0 ? 'Alta' : 'Media',
    status: i % 4 === 0 ? 'Aprobada' : 'Convertida en OT',
    responsible: 'Ing. Carlos Mendoza',
    photo: null
  });
}

export const INITIAL_WORK_ORDERS = [
  {
    id: 'OT-2026-0154',
    code: 'OT-2026-0154',
    assetId: 'EQ-001',
    assetCode: 'EQ-001',
    assetName: 'Excavadora CAT 320',
    type: 'Correctivo',
    priority: 'Alta',
    status: 'En ejecución',
    scheduledDate: '2026-08-19',
    assignedTechnicians: ['Juan Pérez', 'Carlos López'],
    description: 'Cambio urgente de manguera hidráulica de alta presión y purga de aire en sistema hidráulico principal.',
    activities: [
      { id: 1, text: 'Diagnóstico e inspección de fugas en líneas de brazo', completed: true },
      { id: 2, text: 'Desmontaje de manguera hidráulica dañada', completed: true },
      { id: 3, text: 'Instalación de nueva manguera hidráulica CAT HD-3/4"', completed: false },
      { id: 4, text: 'Relleno de líquido hidráulico y pruebas de presión a 350 bar', completed: false },
      { id: 5, text: 'Inspección final de limpieza y liberación de equipo', completed: false }
    ],
    checklist: [
      { category: 'Motor', item: 'Nivel de aceite de motor', result: 'OK' },
      { category: 'Motor', item: 'Filtro de aceite y sellos', result: 'OK' },
      { category: 'Motor', item: 'Estado de refrigerante', result: 'OK' },
      { category: 'Sistema hidráulico', item: 'Nivel de aceite hidráulico', result: 'OBSERVACIÓN' },
      { category: 'Sistema hidráulico', item: 'Estado de mangueras y conectores', result: 'NO CONFORME' },
      { category: 'Sistema eléctrico', item: 'Batería y bornes', result: 'OK' },
      { category: 'Sistema eléctrico', item: 'Luces de trabajo y circulina', result: 'OK' }
    ],
    sparePartsUsed: [
      { code: 'REP-002', name: 'Manguera hidráulica CAT 3/4" High Pressure', quantity: 1, unitPrice: 850 },
      { code: 'REP-001', name: 'Filtro hidráulico de retornos CAT', quantity: 1, unitPrice: 320 }
    ],
    laborLog: [
      { technician: 'Juan Pérez', hours: 4.0, rate: 47.5 },
      { technician: 'Carlos López', hours: 3.5, rate: 45.0 }
    ],
    evidences: [
      { id: 1, title: 'Antes de la reparación', tag: 'Antes', url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80' }
    ],
    downtimeHours: 4.5,
    cost: 1597.50
  },
  {
    id: 'OT-2026-0153',
    code: 'OT-2026-0153',
    assetId: 'EQ-002',
    assetCode: 'EQ-002',
    assetName: 'Excavadora Komatsu PC210',
    type: 'Preventivo',
    priority: 'Media',
    status: 'Programada',
    scheduledDate: '2026-08-20',
    assignedTechnicians: ['Pedro Gómez'],
    description: 'Mantenimiento Preventivo de 250 Horas (Cambio de filtros de motor, aceite 15W40 y lubricación de pasadores).',
    activities: [
      { id: 1, text: 'Cambio de aceite de motor 15W40', completed: false },
      { id: 2, text: 'Reemplazo de filtro de aire y combustible', completed: false },
      { id: 3, text: 'Engrase general de pasadores y balancín', completed: false }
    ],
    checklist: [],
    sparePartsUsed: [],
    laborLog: [],
    evidences: [],
    downtimeHours: 0,
    cost: 850.00
  }
];

// Add more mock OTs to total 80
for (let i = 152; i >= 73; i--) {
  const types = ['Preventivo', 'Correctivo', 'Inspección', 'Emergencia'];
  const statuses = ['Completada', 'Completada', 'Completada', 'Pendiente', 'En ejecución'];
  const selectedType = types[i % types.length];
  const selectedStatus = statuses[i % statuses.length];

  INITIAL_WORK_ORDERS.push({
    id: `OT-2026-0${i}`,
    code: `OT-2026-0${i}`,
    assetId: `EQ-00${(i % 8) + 1}`,
    assetCode: `EQ-00${(i % 8) + 1}`,
    assetName: `Equipo Minero EQ-00${(i % 8) + 1}`,
    type: selectedType,
    priority: i % 4 === 0 ? 'Alta' : 'Media',
    status: selectedStatus,
    scheduledDate: `2026-08-${10 - (i % 10)}`,
    assignedTechnicians: ['Juan Pérez', 'Pedro Gómez'],
    description: `Servicio de ${selectedType.toLowerCase()} programado para mantenimiento en planta.`,
    activities: [
      { id: 1, text: 'Inspección previa de seguridad', completed: true },
      { id: 2, text: 'Ejecución de mantenimiento técnico', completed: selectedStatus === 'Completada' }
    ],
    checklist: [],
    sparePartsUsed: [
      { code: 'REP-005', name: 'Aceite de Motor 15W40 (Galón)', quantity: 4, unitPrice: 85 }
    ],
    laborLog: [
      { technician: 'Juan Pérez', hours: 3.0, rate: 45.0 }
    ],
    evidences: [],
    downtimeHours: 3.0,
    cost: 475.00 + (i * 12)
  });
}

export const INITIAL_SPARE_PARTS = [
  { id: 'REP-001', code: 'REP-001', name: 'Filtro de aceite CAT 320', category: 'Filtros', stock: 8, minStock: 5, unit: 'UND', location: 'Almacén A - Estante 3', unitPrice: 320, status: 'Disponible', sapId: 'MAT-000145' },
  { id: 'REP-002', code: 'REP-002', name: 'Manguera hidráulica High-Pressure 3/4"', category: 'Mangueras y Conectores', stock: 3, minStock: 4, unit: 'UND', location: 'Almacén B - Racks', unitPrice: 850, status: 'Stock bajo', sapId: 'MAT-000188' },
  { id: 'REP-003', code: 'REP-003', name: 'Filtro de combustible Komatsu PC210', category: 'Filtros', stock: 15, minStock: 6, unit: 'UND', location: 'Almacén A - Estante 2', unitPrice: 190, status: 'Disponible', sapId: 'MAT-000210' },
  { id: 'REP-004', code: 'REP-004', name: 'Pastillas de freno Volvo FMX', category: 'Frenos', stock: 0, minStock: 2, unit: 'JGO', location: 'Almacén A - Estante 5', unitPrice: 620, status: 'Sin stock', sapId: 'MAT-000304' },
  { id: 'REP-005', code: 'REP-005', name: 'Aceite de Motor 15W40 Multigrado', category: 'Lubricantes', stock: 45, minStock: 10, unit: 'GAL', location: 'Almacén Químicos - Tanque 1', unitPrice: 85, status: 'Disponible', sapId: 'MAT-000412' }
];

// Add up to 120 spare parts dynamically
for (let i = 6; i <= 120; i++) {
  const categories = ['Filtros', 'Lubricantes', 'Rodajes', 'Sellos / O-Rings', 'Dientes de Cucharón', 'Frenos', 'Sistema Eléctrico'];
  const cat = categories[i % categories.length];
  const stockVal = (i * 3) % 20;
  const minStockVal = 5;
  let st = 'Disponible';
  if (stockVal === 0) st = 'Sin stock';
  else if (stockVal < minStockVal) st = 'Stock bajo';

  INITIAL_SPARE_PARTS.push({
    id: `REP-${String(i).padStart(3, '0')}`,
    code: `REP-${String(i).padStart(3, '0')}`,
    name: `Repuesto ${cat} Spec-${i}`,
    category: cat,
    stock: stockVal,
    minStock: minStockVal,
    unit: i % 4 === 0 ? 'JGO' : 'UND',
    location: `Almacén A - Fila ${i % 8}`,
    unitPrice: 50 + (i * 15),
    status: st,
    sapId: `MAT-000${200 + i}`
  });
}

export const INITIAL_TECHNICIANS = [
  { id: 1, name: 'Juan Pérez', role: 'Mecánico Sénior', specialty: 'Equipos pesados / Hidráulica', status: 'En campo', assignedOTs: 2, hoursMonth: 168.0, photo: 'JP' },
  { id: 2, name: 'Carlos López', role: 'Técnico Eléctrico', specialty: 'Sistemas mecánicos y tableros PLC', status: 'Disponible', assignedOTs: 1, hoursMonth: 154.5, photo: 'CL' },
  { id: 3, name: 'Pedro Gómez', role: 'Mecánico Especialista', specialty: 'Transmisiones y Orugas', status: 'En campo', assignedOTs: 3, hoursMonth: 172.0, photo: 'PG' },
  { id: 4, name: 'Miguel Ramírez', role: 'Supervisor de Mantenimiento', specialty: 'Gestión de Flota y Diagnóstico', status: 'Disponible', assignedOTs: 0, hoursMonth: 160.0, photo: 'MR' }
];

export const INITIAL_SAP_LOGS = [
  { id: 1, date: '2026-08-19 10:42', process: 'Sincronización de Activos', records: 48, status: 'Exitoso', details: 'Sincronización de maestros de equipos con SAP PM completada.' },
  { id: 2, date: '2026-08-19 10:41', process: 'Maestro de Materiales', records: 126, status: 'Exitoso', details: 'Actualización de stocks y precios de repuestos desde SAP MM.' },
  { id: 3, date: '2026-08-19 10:40', process: 'Centros de Costo', records: 8, status: 'Exitoso', details: 'Importación de estructuras de costos CO desde SAP ERP.' },
  { id: 4, date: '2026-08-18 18:20', process: 'Consumo de Materiales', records: 85, status: 'Exitoso', details: 'Imputación de costos de OTs a centros de costo SAP.' }
];
