// Storage and mock service for state persistence in localStorage

import {
  INITIAL_ASSETS,
  INITIAL_REQUESTS,
  INITIAL_WORK_ORDERS,
  INITIAL_SPARE_PARTS,
  INITIAL_TECHNICIANS,
  INITIAL_SAP_LOGS
} from '../data/mockData';

const KEYS = {
  ASSETS: 'mining_demo_assets_v1',
  REQUESTS: 'mining_demo_requests_v1',
  WORK_ORDERS: 'mining_demo_work_orders_v1',
  SPARE_PARTS: 'mining_demo_spare_parts_v1',
  TECHNICIANS: 'mining_demo_technicians_v1',
  SAP_LOGS: 'mining_demo_sap_logs_v1',
  NOTIFICATIONS: 'mining_demo_notifications_v1'
};

function getItem(key, defaultValue) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (e) {
    console.error('Error reading localStorage', e);
    return defaultValue;
  }
}

function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error writing localStorage', e);
  }
}

// Initializer
export function initStorage() {
  if (!localStorage.getItem(KEYS.ASSETS)) {
    setItem(KEYS.ASSETS, INITIAL_ASSETS);
  }
  if (!localStorage.getItem(KEYS.REQUESTS)) {
    setItem(KEYS.REQUESTS, INITIAL_REQUESTS);
  }
  if (!localStorage.getItem(KEYS.WORK_ORDERS)) {
    setItem(KEYS.WORK_ORDERS, INITIAL_WORK_ORDERS);
  }
  if (!localStorage.getItem(KEYS.SPARE_PARTS)) {
    setItem(KEYS.SPARE_PARTS, INITIAL_SPARE_PARTS);
  }
  if (!localStorage.getItem(KEYS.TECHNICIANS)) {
    setItem(KEYS.TECHNICIANS, INITIAL_TECHNICIANS);
  }
  if (!localStorage.getItem(KEYS.SAP_LOGS)) {
    setItem(KEYS.SAP_LOGS, INITIAL_SAP_LOGS);
  }
}

export function resetStorage() {
  localStorage.clear();
  initStorage();
}

// Assets API
export function getAssets() {
  return getItem(KEYS.ASSETS, INITIAL_ASSETS);
}

export function getAssetById(id) {
  const assets = getAssets();
  return assets.find(a => a.id === id || a.code === id);
}

export function updateAssetHorometer(id, newHorometer) {
  const assets = getAssets();
  const index = assets.findIndex(a => a.id === id || a.code === id);
  if (index !== -1) {
    const asset = assets[index];
    asset.horometer = Number(newHorometer);
    // If close to next service, adjust warning status if not stopped
    const remaining = asset.nextServiceHorometer - asset.horometer;
    if (remaining <= 50 && asset.status === 'Operativo') {
      asset.status = 'En Mantenimiento';
    }
    assets[index] = asset;
    setItem(KEYS.ASSETS, assets);
    return asset;
  }
  return null;
}

// Requests API
export function getRequests() {
  return getItem(KEYS.REQUESTS, INITIAL_REQUESTS);
}

export function addRequest(newReq) {
  const requests = getRequests();
  const id = `SOL-2026-${String(requests.length + 83).padStart(4, '0')}`;
  const reqObj = {
    id,
    code: id,
    date: new Date().toISOString().replace('T', ' ').substring(0, 16),
    status: 'Nueva',
    priority: 'Alta',
    ...newReq
  };
  requests.unshift(reqObj);
  setItem(KEYS.REQUESTS, requests);
  return reqObj;
}

export function convertRequestToOT(requestId) {
  const requests = getRequests();
  const reqIndex = requests.findIndex(r => r.id === requestId);
  if (reqIndex === -1) return null;

  const req = requests[reqIndex];
  const workOrders = getWorkOrders();
  const otCode = `OT-2026-0${workOrders.length + 155}`;

  const newOT = {
    id: otCode,
    code: otCode,
    assetId: req.assetId,
    assetCode: req.assetCode,
    assetName: req.assetName,
    type: 'Correctivo',
    priority: req.priority || 'Alta',
    status: 'Pendiente',
    scheduledDate: new Date().toISOString().substring(0, 10),
    assignedTechnicians: [req.responsible || 'Juan Pérez'],
    description: req.description,
    activities: [
      { id: 1, text: 'Diagnóstico en campo del reporte', completed: false },
      { id: 2, text: 'Reparación y cambio de componentes', completed: false },
      { id: 3, text: 'Pruebas operativas', completed: false }
    ],
    checklist: [
      { category: 'Inspección General', item: 'Fugas de fluidos', result: 'OBSERVACIÓN' },
      { category: 'Inspección General', item: 'Presión de trabajo', result: 'NO CONFORME' }
    ],
    sparePartsUsed: [],
    laborLog: [],
    evidences: [],
    downtimeHours: 0,
    cost: 0
  };

  workOrders.unshift(newOT);
  setItem(KEYS.WORK_ORDERS, workOrders);

  req.status = 'Convertida en OT';
  req.convertedOtId = otCode;
  requests[reqIndex] = req;
  setItem(KEYS.REQUESTS, requests);

  return newOT;
}

// Work Orders API
export function getWorkOrders() {
  return getItem(KEYS.WORK_ORDERS, INITIAL_WORK_ORDERS);
}

export function getWorkOrderById(id) {
  const ots = getWorkOrders();
  return ots.find(o => o.id === id || o.code === id);
}

export function updateWorkOrderStatus(otId, newStatus) {
  const ots = getWorkOrders();
  const index = ots.findIndex(o => o.id === otId || o.code === otId);
  if (index !== -1) {
    ots[index].status = newStatus;
    setItem(KEYS.WORK_ORDERS, ots);

    // If OT is closed, update asset status & cost history
    if (newStatus === 'Completada' || newStatus === 'CERRADA') {
      const asset = getAssetById(ots[index].assetId);
      if (asset) {
        asset.status = 'Operativo';
        asset.totalCost = (asset.totalCost || 0) + (ots[index].cost || 0);
        asset.lastMaintenance = new Date().toISOString().substring(0, 10);
        const assets = getAssets();
        const aIndex = assets.findIndex(a => a.id === asset.id);
        if (aIndex !== -1) {
          assets[aIndex] = asset;
          setItem(KEYS.ASSETS, assets);
        }
      }
    }
    return ots[index];
  }
  return null;
}

export function updateWorkOrderDetails(otId, details) {
  const ots = getWorkOrders();
  const index = ots.findIndex(o => o.id === otId || o.code === otId);
  if (index !== -1) {
    ots[index] = { ...ots[index], ...details };
    setItem(KEYS.WORK_ORDERS, ots);
    return ots[index];
  }
  return null;
}

// Inventory API
export function getSpareParts() {
  return getItem(KEYS.SPARE_PARTS, INITIAL_SPARE_PARTS);
}

export function consumeSparePart(partCode, quantityToConsume) {
  const parts = getSpareParts();
  const index = parts.findIndex(p => p.code === partCode || p.id === partCode);
  if (index !== -1) {
    parts[index].stock = Math.max(0, parts[index].stock - Number(quantityToConsume));
    if (parts[index].stock === 0) parts[index].status = 'Sin stock';
    else if (parts[index].stock < parts[index].minStock) parts[index].status = 'Stock bajo';
    setItem(KEYS.SPARE_PARTS, parts);
    return parts[index];
  }
  return null;
}

// Technicians API
export function getTechnicians() {
  return getItem(KEYS.TECHNICIANS, INITIAL_TECHNICIANS);
}

// SAP Simulation API
export function getSAPLogs() {
  return getItem(KEYS.SAP_LOGS, INITIAL_SAP_LOGS);
}

export function runSAPSyncSimulation() {
  const logs = getSAPLogs();
  const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
  
  const newEntries = [
    { id: logs.length + 1, date: nowStr, process: 'Sincronización de Activos (Equipos)', records: 48, status: 'Exitoso', details: '48 equipos actualizados en SAP PM' },
    { id: logs.length + 2, date: nowStr, process: 'Materiales e Inventario', records: 126, status: 'Exitoso', details: '126 repuestos sincronizados con SAP MM' },
    { id: logs.length + 3, date: nowStr, process: 'Centros de Costo (CO)', records: 8, status: 'Exitoso', details: '8 centros de costo liquidados' }
  ];

  const updatedLogs = [...newEntries, ...logs];
  setItem(KEYS.SAP_LOGS, updatedLogs);
  return {
    syncTime: nowStr,
    assetsCount: 48,
    materialsCount: 126,
    costCentersCount: 8,
    errorsCount: 0,
    logs: updatedLogs
  };
}
