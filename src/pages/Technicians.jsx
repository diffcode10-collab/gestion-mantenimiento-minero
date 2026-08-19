import React from 'react';
import { Users, Wrench, Clock, CheckCircle } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { getTechnicians } from '../services/mockService';

export function Technicians() {
  const technicians = getTechnicians();

  const columns = [
    {
      header: 'Técnico / Especialista',
      key: 'name',
      render: (r) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1E40AF', color: 'white', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
            {r.photo || r.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: '#0F172A' }}>{r.name}</div>
            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{r.role}</div>
          </div>
        </div>
      )
    },
    { header: 'Especialidad', key: 'specialty' },
    { header: 'OTs Asignadas', key: 'assignedOTs', render: (r) => <strong>{r.assignedOTs} OTs</strong> },
    { header: 'Horas Trabajadas (Mes)', key: 'hoursMonth', render: (r) => `${r.hoursMonth} h` },
    { header: 'Estado', key: 'status', render: (r) => <StatusBadge status={r.status} /> }
  ];

  return (
    <div className="technicians-page">
      <div className="page-header">
        <div className="page-title">
          <h2>Personal Técnico & Cuadrillas de Mantenimiento</h2>
          <p>Mecánicos, electricistas y supervisores asignados a la Unidad Minera Santa Rosa</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={technicians}
        searchPlaceholder="Buscar por técnico o especialidad..."
        statusOptions={['En campo', 'Disponible']}
      />
    </div>
  );
}
