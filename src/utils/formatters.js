// Formatters for mining maintenance data

export function formatCurrency(amount) {
  if (amount === undefined || amount === null) return 'S/ 0.00';
  return `S/ ${Number(amount).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatHours(hours) {
  if (hours === undefined || hours === null) return '0 h';
  return `${Number(hours).toLocaleString('es-PE')} h`;
}

export function formatDate(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function formatDateTime(dateTimeString) {
  if (!dateTimeString) return '-';
  const date = new Date(dateTimeString);
  if (isNaN(date.getTime())) return dateTimeString;
  return `${date.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}`;
}

export function getStatusBadgeClass(status) {
  switch (status?.toUpperCase()) {
    case 'OPERATIVO':
    case 'EXCELENTE':
    case 'EXITOSO':
    case 'DISPONIBLE':
      return 'badge-operativo';
    case 'EN MANTENIMIENTO':
    case 'OBSERVACIÓN':
    case 'ADVERTENCIA':
    case 'EN EJECUCIÓN':
    case 'EN EVALUACIÓN':
      return 'badge-mantenimiento';
    case 'DETENIDO':
    case 'NO CONFORME':
    case 'ERROR':
    case 'SIN STOCK':
    case 'RECHAZADA':
      return 'badge-detenido';
    case 'PROGRAMADO':
    case 'PAGO':
    case 'APROBADA':
    case 'PRÓXIMO':
    case 'NUEVA':
      return 'badge-programado';
    case 'ATRASADO':
      return 'badge-atrasado';
    case 'COMPLETADO':
    case 'CERRADA':
    case 'CONVERTIDA EN OT':
      return 'badge-completado';
    default:
      return 'badge-programado';
  }
}
