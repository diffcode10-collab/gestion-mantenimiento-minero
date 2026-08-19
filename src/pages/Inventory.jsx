import React, { useState } from 'react';
import { Package, AlertTriangle, Plus, RefreshCw } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { getSpareParts, consumeSparePart } from '../services/mockService';
import { formatCurrency } from '../utils/formatters';

export function Inventory({ addToast }) {
  const [parts, setParts] = useState(getSpareParts());
  const [selectedPart, setSelectedPart] = useState(null);
  const [consumeQty, setConsumeQty] = useState('1');

  const handleConsumeSubmit = (e) => {
    e.preventDefault();
    if (!selectedPart) return;
    const qty = Number(consumeQty);
    if (isNaN(qty) || qty <= 0) return;

    consumeSparePart(selectedPart.code, qty);
    setParts(getSpareParts());
    setSelectedPart(null);
    addToast(`Consumo de ${qty} unidad(es) de ${selectedPart.name} registrado en almacén`, 'success');
  };

  const columns = [
    { header: 'Código', key: 'code', render: (r) => <strong style={{ color: '#1E40AF' }}>{r.code}</strong> },
    {
      header: 'Repuesto / Componente',
      key: 'name',
      render: (r) => (
        <div>
          <div style={{ fontWeight: 600 }}>{r.name}</div>
          <div style={{ fontSize: '0.72rem', color: '#64748B' }}>SAP ID: <strong>{r.sapId || 'MAT-000100'}</strong></div>
        </div>
      )
    },
    { header: 'Categoría', key: 'category' },
    {
      header: 'Stock Actual',
      key: 'stock',
      render: (r) => (
        <div>
          <strong style={{ fontSize: '0.95rem', color: r.stock <= r.minStock ? '#DC2626' : '#0F172A' }}>
            {r.stock} {r.unit}
          </strong>
          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Mín: {r.minStock} {r.unit}</div>
        </div>
      )
    },
    { header: 'Ubicación', key: 'location' },
    { header: 'Precio Unitario', key: 'unitPrice', render: (r) => formatCurrency(r.unitPrice) },
    { header: 'Estado Stock', key: 'status', render: (r) => <StatusBadge status={r.status} /> },
    {
      header: 'Acciones',
      key: 'actions',
      render: (r) => (
        <button className="btn btn-secondary btn-sm" onClick={() => setSelectedPart(r)}>
          <RefreshCw size={14} /> Simular Consumo
        </button>
      )
    }
  ];

  return (
    <div className="inventory-page">
      <div className="page-header">
        <div className="page-title">
          <h2>Inventario de Repuestos Mineros</h2>
          <p>Control de componentes, filtros, lubricantes y consumibles de almacén</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={parts}
        searchPlaceholder="Buscar repuesto por código, nombre o SAP ID..."
        statusOptions={['Disponible', 'Stock bajo', 'Sin stock', 'Filtros', 'Lubricantes']}
      />

      {/* Stock Consume Modal */}
      {selectedPart && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedPart(null)}
          title={`Simular Consumo de Repuesto — ${selectedPart.code}`}
        >
          <form onSubmit={handleConsumeSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: 6, marginBottom: '1rem', border: '1px solid #E2E8F0' }}>
                <div style={{ fontWeight: 700, color: '#0F172A' }}>{selectedPart.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Stock Actual: <strong>{selectedPart.stock} {selectedPart.unit}</strong> | Ubicación: {selectedPart.location}</div>
              </div>

              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Cantidad a retirar de almacén:</label>
              <input
                type="number"
                className="search-input"
                style={{ width: '100%' }}
                value={consumeQty}
                onChange={(e) => setConsumeQty(e.target.value)}
                min="1"
                max={selectedPart.stock}
              />
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setSelectedPart(null)}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Registrar Salida de Almacén</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
