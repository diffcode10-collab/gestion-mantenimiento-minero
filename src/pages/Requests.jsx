import React, { useState } from 'react';
import { ClipboardList, Plus, ArrowRight, CheckCircle2, Wrench } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { getRequests, addRequest, convertRequestToOT, getAssets } from '../services/mockService';

export function Requests({ navigateTo, addToast }) {
  const [requests, setRequests] = useState(getRequests());
  const [showNewModal, setShowNewModal] = useState(false);
  const [formData, setFormData] = useState({
    assetId: 'EQ-001',
    reportedBy: 'Operador Raúl Vargas',
    issueType: 'Hidráulico',
    priority: 'Alta',
    description: ''
  });

  const assets = getAssets();

  const handleConvert = (reqId) => {
    const ot = convertRequestToOT(reqId);
    if (ot) {
      setRequests(getRequests());
      addToast(`Solicitud convertida exitosamente en ${ot.code}`, 'success');
    }
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formData.description.trim()) {
      addToast('Ingresa una descripción del problema', 'warning');
      return;
    }

    const selectedAsset = assets.find(a => a.id === formData.assetId) || assets[0];
    const newReq = addRequest({
      ...formData,
      assetCode: selectedAsset.code,
      assetName: selectedAsset.name
    });

    setRequests(getRequests());
    setShowNewModal(false);
    setFormData({ assetId: 'EQ-001', reportedBy: 'Operador Minero', issueType: 'Mecánico', priority: 'Alta', description: '' });
    addToast(`Solicitud ${newReq.code} registrada con éxito`, 'success');
  };

  const columns = [
    { header: 'ID Solicitud', key: 'code', width: '130px', render: (row) => <span style={{ fontWeight: 700, color: '#1E40AF' }}>{row.code}</span> },
    { header: 'Fecha', key: 'date', width: '140px' },
    { header: 'Equipo', key: 'assetName', render: (row) => <div><div style={{ fontWeight: 600 }}>{row.assetName}</div><div style={{ fontSize: '0.72rem', color: '#64748B' }}>{row.assetCode}</div></div> },
    { header: 'Reportado por', key: 'reportedBy' },
    { header: 'Problema / Falla', key: 'description' },
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
    { header: 'Estado', key: 'status', render: (row) => <StatusBadge status={row.status} /> },
    {
      header: 'Acciones',
      key: 'actions',
      render: (row) => (
        row.status !== 'Convertida en OT' ? (
          <button className="btn btn-primary btn-sm" onClick={() => handleConvert(row.id)}>
            <Wrench size={14} /> Convertir a OT
          </button>
        ) : (
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
            {row.convertedOtId || 'OT Generada'}
          </span>
        )
      )
    }
  ];

  return (
    <div className="requests-page">
      <div className="page-header">
        <div className="page-title">
          <h2>Solicitudes de Mantenimiento</h2>
          <p>Reportes de fallas y requerimientos ingresados por operadores en campo</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={() => setShowNewModal(true)}>
            <Plus size={16} /> + Nueva Solicitud
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={requests}
        searchPlaceholder="Buscar por equipo, ID o descripción..."
        statusOptions={['Nueva', 'En evaluación', 'Aprobada', 'Convertida en OT']}
      />

      {/* Modal Nueva Solicitud */}
      <Modal
        isOpen={showNewModal}
        onClose={() => setShowNewModal(false)}
        title="Crear Nueva Solicitud de Mantenimiento"
      >
        <form onSubmit={handleCreateSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Seleccionar Equipo:</label>
              <select
                className="select-input"
                style={{ width: '100%' }}
                value={formData.assetId}
                onChange={(e) => setFormData({ ...formData, assetId: e.target.value })}
              >
                {assets.map(a => (
                  <option key={a.id} value={a.id}>{a.code} — {a.name} ({a.location})</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Tipo de Falla:</label>
                <select
                  className="select-input"
                  style={{ width: '100%' }}
                  value={formData.issueType}
                  onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                >
                  <option value="Hidráulico">Hidráulico</option>
                  <option value="Motor / Calentamiento">Motor / Calentamiento</option>
                  <option value="Eléctrico">Eléctrico</option>
                  <option value="Mecánico">Mecánico</option>
                  <option value="Frenos">Frenos</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Prioridad:</label>
                <select
                  className="select-input"
                  style={{ width: '100%' }}
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                  <option value="Crítica">Crítica</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Reportante:</label>
              <input
                type="text"
                className="search-input"
                style={{ width: '100%' }}
                value={formData.reportedBy}
                onChange={(e) => setFormData({ ...formData, reportedBy: e.target.value })}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Descripción Detallada del Problema:</label>
              <textarea
                className="search-input"
                style={{ width: '100%', height: 80, fontFamily: 'inherit' }}
                placeholder="Describa el comportamiento anómalo del equipo..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowNewModal(false)}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Registrar Solicitud</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
