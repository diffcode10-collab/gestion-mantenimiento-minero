import React, { useState } from 'react';
import { Wrench, Eye, Smartphone, Plus } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { getWorkOrders } from '../services/mockService';
import { formatCurrency } from '../utils/formatters';

export function WorkOrders({ navigateTo, setSelectedOtId, setMobileMode }) {
  const ots = getWorkOrders();

  const columns = [
    {
      header: 'Código OT',
      key: 'code',
      width: '120px',
      render: (row) => (
        <span
          style={{ fontWeight: 700, color: '#1E40AF', cursor: 'pointer' }}
          onClick={() => { setSelectedOtId(row.id); navigateTo('/mantenimiento/ordenes/detalle'); }}
        >
          {row.code}
        </span>
      )
    },
    {
      header: 'Equipo',
      key: 'assetName',
      render: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.assetName}</div>
          <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{row.assetCode}</div>
        </div>
      )
    },
    { header: 'Tipo', key: 'type' },
    {
      header: 'Prioridad',
      key: 'priority',
      render: (row) => (
        <span style={{
          padding: '2px 8px',
          borderRadius: 4,
          fontSize: '0.73rem',
          fontWeight: 700,
          background: row.priority === 'Crítica' ? '#FEF2F2' : row.priority === 'Alta' ? '#FFFBEB' : '#F1F5F9',
          color: row.priority === 'Crítica' ? '#991B1B' : row.priority === 'Alta' ? '#92400E' : '#475569'
        }}>
          {row.priority}
        </span>
      )
    },
    { header: 'Técnicos', key: 'assignedTechnicians', render: (row) => row.assignedTechnicians ? row.assignedTechnicians.join(', ') : 'Sin asignar' },
    { header: 'Fecha', key: 'scheduledDate' },
    { header: 'Estado', key: 'status', render: (row) => <StatusBadge status={row.status} /> },
    { header: 'Costo', key: 'cost', render: (row) => <strong>{formatCurrency(row.cost)}</strong> },
    {
      header: 'Acciones',
      key: 'actions',
      render: (row) => (
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => { setSelectedOtId(row.id); navigateTo('/mantenimiento/ordenes/detalle'); }}
          >
            <Eye size={14} /> Detalle
          </button>
          <button
            className="btn btn-primary btn-sm"
            style={{ background: '#7C3AED', borderColor: '#7C3AED' }}
            onClick={() => { setSelectedOtId(row.id); setMobileMode(true); navigateTo('/mantenimiento/ordenes/detalle'); }}
            title="Ver en Modo Técnico Móvil"
          >
            <Smartphone size={14} /> Móvil
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="work-orders-page">
      <div className="page-header">
        <div className="page-title">
          <h2>Órdenes de Trabajo (OT)</h2>
          <p>Programación, asignación y seguimiento de la ejecución de mantenimiento minero</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={() => { setSelectedOtId('OT-2026-0154'); navigateTo('/mantenimiento/ordenes/detalle'); }}>
            + Crear Nueva OT
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={ots}
        searchPlaceholder="Buscar por código OT, equipo o técnico..."
        statusOptions={['Pendiente', 'Programada', 'En ejecución', 'Completada', 'Preventivo', 'Correctivo']}
      />
    </div>
  );
}
