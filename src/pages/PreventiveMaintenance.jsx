import React, { useState } from 'react';
import { ShieldCheck, Calendar, Clock, Eye, AlertTriangle } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';

export function PreventiveMaintenance({ navigateTo }) {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const preventivePlans = [
    { id: 'MP-001', code: 'MP-001', assetCode: 'EQ-001', assetName: 'Excavadora CAT 320', service: 'Servicio Preventivo 250 h', frequency: '250 h', currentHorometer: '8,542 h', nextHorometer: '8,750 h', status: 'Próximo' },
    { id: 'MP-002', code: 'MP-002', assetCode: 'EQ-003', assetName: 'Volvo FMX 440', service: 'Servicio Preventivo 500 h', frequency: '500 h', currentHorometer: '12,420 h', nextHorometer: '12,500 h', status: 'Programado' },
    { id: 'MP-003', code: 'MP-003', assetCode: 'EQ-002', assetName: 'Excavadora Komatsu PC210', service: 'Servicio Mayor 1,000 h', frequency: '1,000 h', currentHorometer: '5,821 h', nextHorometer: '6,000 h', status: 'Atrasado' },
    { id: 'MP-004', code: 'MP-004', assetCode: 'EQ-005', assetName: 'Caterpillar 950M', service: 'Servicio Rutinario 250 h', frequency: '250 h', currentHorometer: '7,210 h', nextHorometer: '7,500 h', status: 'Programado' },
    { id: 'MP-005', code: 'MP-005', assetCode: 'EQ-006', assetName: 'Sandvik DD321', service: 'Inspección Perforación 500 h', frequency: '500 h', currentHorometer: '4,120 h', nextHorometer: '4,250 h', status: 'Próximo' }
  ];

  const columns = [
    { header: 'Código Plan', key: 'code', render: (r) => <strong style={{ color: '#1E40AF' }}>{r.code}</strong> },
    { header: 'Equipo', key: 'assetName', render: (r) => <div><div style={{ fontWeight: 600 }}>{r.assetName}</div><div style={{ fontSize: '0.72rem', color: '#64748B' }}>{r.assetCode}</div></div> },
    { header: 'Servicio Programado', key: 'service' },
    { header: 'Frecuencia', key: 'frequency' },
    { header: 'Horómetro Actual', key: 'currentHorometer' },
    { header: 'Próximo Servicio', key: 'nextHorometer' },
    { header: 'Estado', key: 'status', render: (r) => <StatusBadge status={r.status} /> },
    {
      header: 'Acciones',
      key: 'actions',
      render: (r) => (
        <button className="btn btn-secondary btn-sm" onClick={() => setSelectedPlan(r)}>
          <Eye size={14} /> Ver Rutina & Checklist
        </button>
      )
    }
  ];

  return (
    <div className="preventive-page">
      <div className="page-header">
        <div className="page-title">
          <h2>Mantenimiento Preventivo Programado</h2>
          <p>Gestión de planes periódicos y rutinas por horómetro (250h, 500h, 1000h)</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={preventivePlans}
        searchPlaceholder="Buscar plan preventivo o equipo..."
        statusOptions={['Próximo', 'Programado', 'Atrasado']}
      />

      {selectedPlan && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedPlan(null)}
          title={`Detalle de Plan — ${selectedPlan.code}`}
          maxWidth={600}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 8, border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0F172A' }}>{selectedPlan.service}</div>
              <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: 2 }}>{selectedPlan.assetName} ({selectedPlan.assetCode})</div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: 8, color: '#0F172A' }}>Checklist Estándar de Inspección:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.83rem' }}>
                <div style={{ padding: '6px 10px', background: '#F1F5F9', borderRadius: 4 }}>⚙️ <strong>Sistema Motor:</strong> Nivel aceite, sustitución filtro, inspección refrigerante.</div>
                <div style={{ padding: '6px 10px', background: '#F1F5F9', borderRadius: 4 }}>💧 <strong>Sistema Hidráulico:</strong> Presión de trabajo 350 bar, fugas en líneas de balancín.</div>
                <div style={{ padding: '6px 10px', background: '#F1F5F9', borderRadius: 4 }}>⚡ <strong>Sistema Eléctrico:</strong> Bornes batería, sensores de temperatura de motor.</div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
