import React from 'react';
import { Truck, Eye, Edit3, Plus, Wrench, Shield, AlertCircle } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { getAssets } from '../services/mockService';
import { formatHours, formatCurrency } from '../utils/formatters';

export function Assets({ navigateTo }) {
  const assets = getAssets();

  const columns = [
    {
      header: 'Código',
      key: 'code',
      width: '100px',
      render: (row) => (
        <span
          style={{ fontWeight: 700, color: '#1E40AF', cursor: 'pointer' }}
          onClick={() => navigateTo(`/activos/${row.id}`)}
        >
          {row.code}
        </span>
      )
    },
    {
      header: 'Equipo',
      key: 'name',
      render: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 6, overflow: 'hidden', background: '#F1F5F9', flexShrink: 0 }}>
            <img src={row.photo} alt={row.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div
              style={{ fontWeight: 600, color: '#0F172A', cursor: 'pointer' }}
              onClick={() => navigateTo(`/activos/${row.id}`)}
            >
              {row.name}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{row.brand} {row.model}</div>
          </div>
        </div>
      )
    },
    { header: 'Tipo', key: 'type' },
    {
      header: 'Propiedad',
      key: 'ownership',
      render: (row) => (
        <span className={row.ownership === 'Propio' ? 'badge badge-propio' : 'badge badge-tercero'}>
          {row.ownership}
        </span>
      )
    },
    { header: 'Ubicación', key: 'location' },
    {
      header: 'Horómetro',
      key: 'horometer',
      render: (row) => (
        <div>
          <div style={{ fontWeight: 700, color: '#0F172A' }}>{formatHours(row.horometer)}</div>
          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Próx: {formatHours(row.nextServiceHorometer)}</div>
        </div>
      )
    },
    {
      header: 'Estado',
      key: 'status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Acciones',
      key: 'actions',
      render: (row) => (
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo(`/activos/${row.id}`)}
            title="Ver Ficha Detallada"
          >
            <Eye size={14} /> Ver Ficha
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="assets-page">
      <div className="page-header">
        <div className="page-title">
          <h2>Gestión de Activos y Flota Minera</h2>
          <p>Control de equipos propios y de terceros de la Unidad Minera Santa Rosa</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={() => alert('Función de registro de nuevo equipo')}>
            <Plus size={16} /> + Registrar Nuevo Equipo
          </button>
        </div>
      </div>

      {/* Main Assets Table */}
      <DataTable
        columns={columns}
        data={assets}
        searchPlaceholder="Buscar por código, equipo, tipo, marca..."
        statusOptions={['Operativo', 'En Mantenimiento', 'Detenido', 'Propio', 'Tercero']}
      />
    </div>
  );
}
