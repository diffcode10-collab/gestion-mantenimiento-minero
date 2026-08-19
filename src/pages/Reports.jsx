import React from 'react';
import { BarChart3, FileSpreadsheet, FileText, Download } from 'lucide-react';

export function Reports({ addToast }) {
  const reportsList = [
    { title: 'Historial General de Mantenimiento', desc: 'Registro histórico de todas las OTs y mantenimientos por equipo', icon: FileSpreadsheet },
    { title: 'Costos por Equipo & Tipo de Servicio', desc: 'Desglose detallado de gastos en mano de obra y repuestos', icon: BarChart3 },
    { title: 'Reporte de Disponibilidad, MTBF & MTTR', desc: 'Métricas mensuales de confiabilidad de la flota minera', icon: FileText },
    { title: 'Consumo & Salida de Repuestos de Almacén', desc: 'Resumen de piezas utilizadas imputadas a órdenes de trabajo', icon: FileSpreadsheet }
  ];

  const handleExport = (reportTitle, format) => {
    addToast(`Reporte "${reportTitle}" exportado en formato ${format} correctamente`, 'success');
  };

  return (
    <div className="reports-page">
      <div className="page-header">
        <div className="page-title">
          <h2>Centro de Reportes & Exportaciones</h2>
          <p>Informes gerenciales para auditoría e indicadores gerenciales</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {reportsList.map((rep, idx) => {
          const Icon = rep.icon;
          return (
            <div key={idx} style={{ background: 'white', padding: '1.5rem', borderRadius: 12, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ padding: 10, background: '#EFF6FF', color: '#1E40AF', borderRadius: 8 }}>
                  <Icon size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A' }}>{rep.title}</h3>
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1.25rem' }}>{rep.desc}</p>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => handleExport(rep.title, 'Excel')}>
                  <FileSpreadsheet size={14} color="#10B981" /> Exportar Excel
                </button>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => handleExport(rep.title, 'PDF')}>
                  <FileText size={14} color="#EF4444" /> Exportar PDF
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
