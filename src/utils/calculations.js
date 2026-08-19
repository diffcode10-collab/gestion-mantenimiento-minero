// Calculations utility according to Section 41 of specification

export function calculateOTCost(laborItems = [], sparePartItems = [], externalServiceCost = 0) {
  const laborTotal = laborItems.reduce((acc, item) => acc + (Number(item.hours || 0) * Number(item.rate || 45)), 0);
  const partsTotal = sparePartItems.reduce((acc, item) => acc + (Number(item.quantity || 0) * Number(item.unitPrice || 0)), 0);
  return laborTotal + partsTotal + Number(externalServiceCost || 0);
}

export function calculateTotalManHours(laborItems = []) {
  return laborItems.reduce((acc, item) => acc + Number(item.hours || 0), 0);
}

export function calculateMTTR(workOrders = []) {
  const closedCorrectiveOTs = workOrders.filter(ot => ot.type === 'Correctivo' && ot.status === 'Completada');
  if (closedCorrectiveOTs.length === 0) return 6.4;
  const totalRepairHours = closedCorrectiveOTs.reduce((acc, ot) => acc + Number(ot.downtimeHours || ot.laborHours || 0), 0);
  return (totalRepairHours / closedCorrectiveOTs.length).toFixed(1);
}

export function calculateMTBF(totalOperatingHours = 8920, failureCount = 48) {
  if (failureCount === 0) return 0;
  return Math.round(totalOperatingHours / failureCount);
}

export function calculateAvailability(operatingHours = 8920, downtimeHours = 735) {
  const totalTime = operatingHours + downtimeHours;
  if (totalTime === 0) return 0;
  return ((operatingHours / totalTime) * 100).toFixed(1);
}

export function calculatePreventiveCompliance(completedOnTime = 43, totalScheduled = 49) {
  if (totalScheduled === 0) return 0;
  return ((completedOnTime / totalScheduled) * 100).toFixed(1);
}
