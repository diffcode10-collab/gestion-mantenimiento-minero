import React, { useState } from 'react';
import {
  Truck,
  Clock,
  Wrench,
  FileText,
  DollarSign,
  Layers,
  History,
  ShieldAlert,
  Edit,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { Modal } from '../components/Modal';
import { getAssetById, updateAssetHorometer, getWorkOrders } from '../services/mockService';
import { formatCurrency, formatHours, formatDate } from '../utils/formatters';

export function AssetDetail({ assetId, navigateTo, addToast }) {
  const [activeTab, setActiveTab] = useState('Resumen');
  const [showHorometerModal, setShowHorometerModal] = useState(false);
  const [newHorometerInput, setNewHorometerInput] = useState('');

  const asset = getAssetById(assetId) || getAssetById('EQ-001');
  const allOts = getWorkOrders();
  const assetOts = allOts.filter(o => o.assetId === asset.id || o.assetCode === asset.code);

  const remainingHours = Math.max(0, asset.nextServiceHorometer - asset.horometer);
  const progressPercent = Math.min(100, Math.round((asset.horometer / asset.nextServiceHorometer) * 100));

  const handleUpdateHorometerSubmit = (e) => {
    e.preventDefault();
    const val = Number(newHorometerInput);
    if (isNaN(val) || val <= 0) {
      addToast('Ingresa un valor válido de horómetro', 'warning');
      return;
    }

    updateAssetHorometer(asset.id, val);
    setShowHorometerModal(false);
    addToast(`Horómetro de ${asset.code} actualizado a ${val} h correctamente`, 'success');
  };

  return (
    <div className="asset-detail-page">
      {/* Back button */}
      <div style={{ marginBottom: '1rem' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('/activos')}>
          <ArrowLeft size={14} /> Volver a Lista de Equipos
        </button>
      </div>

      {/* Header Equipment Profile Banner */}
      <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E2E8F0', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ width: 120, height: 120, borderRadius: 12, overflow: 'hidden', background: '#F1F5F9', border: '1px solid #CBD5E1', flexShrink: 0 }}>
            <img src={asset.photo} alt={asset.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>{asset.name}</h2>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E40AF', background: '#EFF6FF', padding: '2px 8px', borderRadius: 6 }}>
                {asset.code}
              </span>
              <StatusBadge status={asset.status} />
              <span className={asset.ownership === 'Propio' ? 'badge badge-propio' : 'badge badge-tercero'}>
                {asset.ownership}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', marginTop: '1rem', fontSize: '0.83rem' }}>
              <div><span style={{ color: '#64748B' }}>Marca/Modelo:</span> <strong>{asset.brand} {asset.model}</strong></div>
              <div><span style={{ color: '#64748B' }}>N° Serie:</span> <strong>{asset.serial}</strong></div>
              <div><span style={{ color: '#64748B' }}>Año:</span> <strong>{asset.year}</strong></div>
              <div><span style={{ color: '#64748B' }}>Ubicación:</span> <strong>{asset.location}</strong></div>
              <div><span style={{ color: '#64748B' }}>Responsable:</span> <strong>{asset.responsible}</strong></div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="btn btn-primary btn-sm" onClick={() => navigateTo('/mantenimiento/solicitudes')}>
              + Crear Solicitud / OT
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => { setNewHorometerInput(asset.horometer); setShowHorometerModal(true); }}>
              <Clock size={14} /> Actualizar Horómetro
            </button>
          </div>
        </div>

        {/* 3rd Party Contractor Card (Section 9 Spec) */}
        {asset.ownership === 'Tercero' && asset.contractor && (
          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #F1F5F9', background: '#F5F3FF', padding: '0.85rem 1rem', borderRadius: 8, border: '1px solid #DDD6FE' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#5B21B6', textTransform: 'uppercase', marginBottom: 4 }}>
              Información de Contratista / Propietario Tercero
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem', fontSize: '0.82rem', color: '#4C1D95' }}>
              <div>Empresa: <strong>{asset.contractor.company}</strong></div>
              <div>Contrato: <strong>{asset.contractor.contractNumber}</strong></div>
              <div>Vigencia: <strong>{asset.contractor.startDate} — {asset.contractor.endDate}</strong></div>
              <div>Contacto: <strong>{asset.contractor.contact}</strong></div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <div style={{ display: 'flex', gap: 4, borderBottom: '2px solid #E2E8F0', marginBottom: '1.5rem', overflowX: 'auto' }}>
        {['Resumen', 'Historial', 'Mantenimiento', 'Órdenes de trabajo', 'Componentes', 'Costos', 'Documentos'].map(tab => (
          <button
            key={tab}
            style={{
              padding: '0.65rem 1.25rem',
              border: 'none',
              background: 'none',
              fontSize: '0.875rem',
              fontWeight: activeTab === tab ? 700 : 500,
              color: activeTab === tab ? '#1E40AF' : '#64748B',
              borderBottom: activeTab === tab ? '3px solid #1E40AF' : '3px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content: Resumen */}
      {activeTab === 'Resumen' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {/* Horómetro Card (Section 11 Spec) */}
          <div style={{ background: 'white', padding: '1.25rem', borderRadius: 12, border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>Control de Horómetro & Próximo Mantenimiento</h3>
              <Clock size={18} color="#2563EB" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', textAlign: 'center', background: '#F8FAFC', padding: '1rem', borderRadius: 8, marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>Actual</span>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A' }}>{formatHours(asset.horometer)}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>Próximo</span>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2563EB' }}>{formatHours(asset.nextServiceHorometer)}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>Faltan</span>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: remainingHours <= 50 ? '#EF4444' : '#10B981' }}>
                  {formatHours(remainingHours)}
                </div>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B', marginBottom: 4 }}>
                <span>Progreso hacia Servicio 250h</span>
                <span>{progressPercent}%</span>
              </div>
              <div style={{ width: '100%', height: 10, background: '#E2E8F0', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ width: `${progressPercent}%`, height: '100%', background: remainingHours <= 50 ? '#EF4444' : '#2563EB', transition: 'all 0.3s' }} />
              </div>
            </div>

            <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={() => { setNewHorometerInput(asset.horometer); setShowHorometerModal(true); }}>
              Simular Actualización de Horómetro
            </button>
          </div>

          {/* Asset Summary KPIs */}
          <div style={{ background: 'white', padding: '1.25rem', borderRadius: 12, border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Resumen Operativo & Costos</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: '#F0FDF4', padding: '1rem', borderRadius: 8, border: '1px solid #BBF7D0' }}>
                <span style={{ fontSize: '0.75rem', color: '#166534' }}>Disponibilidad</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#166534' }}>{asset.availability}%</div>
              </div>
              <div style={{ background: '#EFF6FF', padding: '1rem', borderRadius: 8, border: '1px solid #BFDBFE' }}>
                <span style={{ fontSize: '0.75rem', color: '#1E40AF' }}>Total Fallas Registradas</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1E40AF' }}>{asset.totalFailures}</div>
              </div>
              <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 8, border: '1px solid #E2E8F0', gridColumn: 'span 2' }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Costo Acumulado Mantenimiento</span>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A' }}>{formatCurrency(asset.totalCost)}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Historial */}
      {activeTab === 'Historial' && (
        <div className="card-table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>OT</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Técnico</th>
                <th>Horas</th>
                <th>Costo Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {assetOts.length > 0 ? (
                assetOts.map(ot => (
                  <tr key={ot.id}>
                    <td>{ot.scheduledDate}</td>
                    <td style={{ fontWeight: 700, color: '#1E40AF' }}>{ot.code}</td>
                    <td>{ot.type}</td>
                    <td>{ot.description}</td>
                    <td>{ot.assignedTechnicians.join(', ')}</td>
                    <td>{ot.downtimeHours} h</td>
                    <td style={{ fontWeight: 700 }}>{formatCurrency(ot.cost)}</td>
                    <td><StatusBadge status={ot.status} /></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: '#64748B' }}>
                    No hay intervenciones registradas en el historial de este equipo.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab Content: Componentes */}
      {activeTab === 'Componentes' && (
        <div style={{ background: 'white', borderRadius: 12, padding: '1.25rem', border: '1px solid #E2E8F0' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>Sub-sistemas & Componentes Críticos</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div style={{ border: '1px solid #E2E8F0', borderRadius: 8, padding: '1rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>Motor diésel</h4>
              <p style={{ fontSize: '0.78rem', color: '#64748B' }}>Modelo CAT C7.1 ACERT</p>
              <div style={{ marginTop: 8 }}><StatusBadge status="OPERATIVO" /></div>
            </div>
            <div style={{ border: '1px solid #E2E8F0', borderRadius: 8, padding: '1rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>Sistema Hidráulico</h4>
              <p style={{ fontSize: '0.78rem', color: '#64748B' }}>Bombas de pistón variable 350 bar</p>
              <div style={{ marginTop: 8 }}><StatusBadge status="EN MANTENIMIENTO" /></div>
            </div>
            <div style={{ border: '1px solid #E2E8F0', borderRadius: 8, padding: '1rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A' }}>Sistema Eléctrico</h4>
              <p style={{ fontSize: '0.78rem', color: '#64748B' }}>Alternador 24V 115A</p>
              <div style={{ marginTop: 8 }}><StatusBadge status="OPERATIVO" /></div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content fallback */}
      {['Mantenimiento', 'Órdenes de trabajo', 'Costos', 'Documentos'].includes(activeTab) && (
        <div style={{ background: 'white', padding: '2rem', borderRadius: 12, border: '1px solid #E2E8F0', textAlign: 'center', color: '#64748B' }}>
          Pestaña <strong>{activeTab}</strong> del equipo {asset.code} cargada con datos sincronizados.
        </div>
      )}

      {/* Horómetro Update Simulator Modal (Section 11 Spec) */}
      <Modal
        isOpen={showHorometerModal}
        onClose={() => setShowHorometerModal(false)}
        title={`Actualizar Horómetro — ${asset.code}`}
      >
        <form onSubmit={handleUpdateHorometerSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', marginBottom: 6 }}>
              Nuevo Valor de Horómetro (Horas):
            </label>
            <input
              type="number"
              className="search-input"
              style={{ width: '100%' }}
              value={newHorometerInput}
              onChange={(e) => setNewHorometerInput(e.target.value)}
              placeholder="Ej. 8700"
            />
            <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 4 }}>
              Próximo servicio programado en: <strong>{asset.nextServiceHorometer} h</strong>
            </p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowHorometerModal(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Guardar y Recalcular
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
