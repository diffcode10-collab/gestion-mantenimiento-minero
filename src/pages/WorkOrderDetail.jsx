import React, { useState } from 'react';
import {
  Wrench,
  CheckSquare,
  Package,
  Clock,
  Camera,
  History,
  ArrowLeft,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2
} from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import {
  getWorkOrderById,
  updateWorkOrderStatus,
  updateWorkOrderDetails,
  consumeSparePart,
  getSpareParts,
  getTechnicians
} from '../services/mockService';
import { formatCurrency, formatHours } from '../utils/formatters';
import { calculateOTCost } from '../utils/calculations';

export function WorkOrderDetail({ otId = 'OT-2026-0154', navigateTo, addToast, isMobileMode, setMobileMode }) {
  const [ot, setOt] = useState(getWorkOrderById(otId) || getWorkOrderById('OT-2026-0154'));
  const [activeTab, setActiveTab] = useState('Resumen');

  // Input states for adding labor / spare parts / evidence
  const [newLaborTech, setNewLaborTech] = useState('Juan Pérez');
  const [newLaborHours, setNewLaborHours] = useState('4.0');

  const [selectedPartCode, setSelectedPartCode] = useState('REP-001');
  const [selectedPartQty, setSelectedPartQty] = useState('1');

  const [evidenceTitle, setEvidenceTitle] = useState('');
  const [evidenceTag, setEvidenceTag] = useState('Durante');

  const availableParts = getSpareParts();

  const handleStatusChange = (newStatus) => {
    const updated = updateWorkOrderStatus(ot.id, newStatus);
    setOt({ ...updated });
    addToast(`Estado de ${ot.code} actualizado a: ${newStatus}`, 'success');
  };

  const toggleActivity = (activityId) => {
    const updatedActivities = ot.activities.map(act =>
      act.id === activityId ? { ...act, completed: !act.completed } : act
    );
    const updated = updateWorkOrderDetails(ot.id, { activities: updatedActivities });
    setOt({ ...updated });
  };

  const handleAddLabor = (e) => {
    e.preventDefault();
    const hours = Number(newLaborHours);
    if (isNaN(hours) || hours <= 0) return;

    const newLog = [...(ot.laborLog || []), { technician: newLaborTech, hours, rate: 45.0 }];
    const newCost = calculateOTCost(newLog, ot.sparePartsUsed || []);
    const updated = updateWorkOrderDetails(ot.id, { laborLog: newLog, cost: newCost });
    setOt({ ...updated });
    addToast(`Horas de mano de obra agregadas para ${newLaborTech}`, 'success');
  };

  const handleAddSparePart = (e) => {
    e.preventDefault();
    const qty = Number(selectedPartQty);
    if (isNaN(qty) || qty <= 0) return;

    const part = availableParts.find(p => p.code === selectedPartCode);
    if (!part) return;

    // Deduct stock in inventory
    consumeSparePart(part.code, qty);

    const updatedParts = [...(ot.sparePartsUsed || []), {
      code: part.code,
      name: part.name,
      quantity: qty,
      unitPrice: part.unitPrice
    }];

    const newCost = calculateOTCost(ot.laborLog || [], updatedParts);
    const updated = updateWorkOrderDetails(ot.id, { sparePartsUsed: updatedParts, cost: newCost });
    setOt({ ...updated });
    addToast(`Repuesto ${part.name} registrado y descontado del almacén`, 'success');
  };

  const handleAddEvidence = (e) => {
    e.preventDefault();
    if (!evidenceTitle.trim()) return;

    const newEvidences = [...(ot.evidences || []), {
      id: Date.now(),
      title: evidenceTitle,
      tag: evidenceTag,
      url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80'
    }];

    const updated = updateWorkOrderDetails(ot.id, { evidences: newEvidences });
    setOt({ ...updated });
    setEvidenceTitle('');
    addToast(`Fotografía de evidencia subida correctamente`, 'success');
  };

  // Completed checklist percentage
  const completedActivitiesCount = (ot.activities || []).filter(a => a.completed).length;
  const totalActivitiesCount = (ot.activities || []).length;
  const activityPercent = totalActivitiesCount > 0 ? Math.round((completedActivitiesCount / totalActivitiesCount) * 100) : 100;

  // Render Mobile View (Section 43 Spec)
  if (isMobileMode) {
    return (
      <div style={{ maxWidth: 420, margin: '0 auto', background: '#0F172A', color: 'white', borderRadius: 24, padding: '1.25rem', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', minHeight: 650 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <button className="btn btn-secondary btn-sm" style={{ background: '#1E293B', color: 'white', border: 'none' }} onClick={() => setMobileMode(false)}>
            <ArrowLeft size={14} /> Salir Modo Móvil
          </button>
          <span style={{ fontSize: '0.72rem', background: '#2563EB', padding: '2px 8px', borderRadius: 12, fontWeight: 700 }}>
            Modo Técnico Móvil
          </span>
        </div>

        <div style={{ background: '#1E293B', borderRadius: 16, padding: '1rem', marginBottom: '1rem', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{ot.code}</h3>
              <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>{ot.assetName}</p>
            </div>
            <StatusBadge status={ot.status} />
          </div>

          <div style={{ marginTop: '0.85rem', display: 'flex', gap: 10, fontSize: '0.78rem', color: '#CBD5E1' }}>
            <span>Prioridad: <strong style={{ color: '#F59E0B' }}>{ot.priority}</strong></span>
            <span>Tipo: <strong>{ot.type}</strong></span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ background: '#1E293B', padding: '1rem', borderRadius: 16, marginBottom: '1rem', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 6 }}>
            <span>Checklist & Actividades</span>
            <span style={{ fontWeight: 700, color: '#10B981' }}>{activityPercent}%</span>
          </div>
          <div style={{ width: '100%', height: 8, background: '#334155', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ width: `${activityPercent}%`, height: '100%', background: '#10B981', transition: 'all 0.3s' }} />
          </div>
        </div>

        {/* Rapid Checklist */}
        <div style={{ background: '#1E293B', padding: '1rem', borderRadius: 16, marginBottom: '1rem', border: '1px solid #334155', maxHeight: 220, overflowY: 'auto' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 8, color: '#94A3B8' }}>Tareas de Campo:</h4>
          {(ot.activities || []).map(act => (
            <label key={act.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: '0.83rem', borderBottom: '1px solid #334155', cursor: 'pointer' }}>
              <input type="checkbox" checked={act.completed} onChange={() => toggleActivity(act.id)} style={{ width: 18, height: 18 }} />
              <span style={{ textDecoration: act.completed ? 'line-through' : 'none', color: act.completed ? '#94A3B8' : 'white' }}>
                {act.text}
              </span>
            </label>
          ))}
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ot.status !== 'Completada' ? (
            <button className="btn btn-success" style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', borderRadius: 12 }} onClick={() => handleStatusChange('Completada')}>
              <CheckCircle2 size={18} /> Finalizar & Cerrar OT en Campo
            </button>
          ) : (
            <div style={{ textAlign: 'center', padding: '0.85rem', background: '#065F46', color: '#A7F3D0', borderRadius: 12, fontWeight: 700 }}>
              ✔ OT Completada y Cerrada
            </div>
          )}
        </div>
      </div>
    );
  }

  // Desktop Detailed View
  return (
    <div className="work-order-detail-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('/mantenimiento/ordenes')}>
          <ArrowLeft size={14} /> Volver a Órdenes de Trabajo
        </button>
        <button className="btn btn-secondary btn-sm" style={{ background: '#7C3AED', color: 'white', borderColor: '#7C3AED' }} onClick={() => setMobileMode(true)}>
          <Smartphone size={14} /> Probar Modo Técnico Móvil
        </button>
      </div>

      {/* Header Banner */}
      <div style={{ background: 'white', borderRadius: 12, border: '1px solid #E2E8F0', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A' }}>{ot.code}</h2>
              <StatusBadge status={ot.status} />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: '#EFF6FF', color: '#1E40AF' }}>
                {ot.type}
              </span>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#475569', marginTop: 4 }}>{ot.description}</h3>
            <div style={{ marginTop: 8, fontSize: '0.83rem', color: '#64748B' }}>
              Equipo: <strong style={{ color: '#0F172A' }}>{ot.assetName} ({ot.assetCode})</strong> | Programado: <strong>{ot.scheduledDate}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            {ot.status === 'Pendiente' && (
              <button className="btn btn-primary" onClick={() => handleStatusChange('En ejecución')}>
                <Wrench size={16} /> Iniciar Trabajo
              </button>
            )}
            {ot.status === 'En ejecución' && (
              <button className="btn btn-success" onClick={() => handleStatusChange('Completada')}>
                <CheckCircle2 size={16} /> Completar & Cerrar OT
              </button>
            )}
            {ot.status === 'Completada' && (
              <div style={{ padding: '0.5rem 1rem', background: '#ECFDF5', color: '#065F46', borderRadius: 8, fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={16} /> OT Cerrada & Sincronizada
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, borderBottom: '2px solid #E2E8F0', marginBottom: '1.5rem', overflowX: 'auto' }}>
        {['Resumen', 'Actividades', 'Checklist', 'Repuestos', 'Mano de obra', 'Evidencias'].map(tab => (
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
              cursor: 'pointer'
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab: Resumen */}
      {activeTab === 'Resumen' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
          <div style={{ background: 'white', padding: '1.25rem', borderRadius: 12, border: '1px solid #E2E8F0' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem' }}>Desglose de Costos de la OT</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Mano de obra:</span>
                <strong>{formatCurrency((ot.laborLog || []).reduce((acc, l) => acc + (l.hours * l.rate), 0))}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Repuestos consumidos:</span>
                <strong>{formatCurrency((ot.sparePartsUsed || []).reduce((acc, p) => acc + (p.quantity * p.unitPrice), 0))}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: 8, fontSize: '1rem', color: '#1E40AF' }}>
                <span>Costo Total OT:</span>
                <strong>{formatCurrency(ot.cost)}</strong>
              </div>
            </div>
          </div>

          <div style={{ background: 'white', padding: '1.25rem', borderRadius: 12, border: '1px solid #E2E8F0' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem' }}>Técnicos Asignados</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {(ot.assignedTechnicians || []).map(t => (
                <span key={t} style={{ background: '#F1F5F9', padding: '4px 10px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600 }}>
                  👤 {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Actividades */}
      {activeTab === 'Actividades' && (
        <div style={{ background: 'white', padding: '1.25rem', borderRadius: 12, border: '1px solid #E2E8F0' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Lista de Tareas de Ejecución</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {(ot.activities || []).map(act => (
              <label key={act.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: act.completed ? '#F0FDF4' : '#F8FAFC', borderRadius: 8, border: '1px solid #E2E8F0', cursor: 'pointer' }}>
                <input type="checkbox" checked={act.completed} onChange={() => toggleActivity(act.id)} style={{ width: 18, height: 18 }} />
                <span style={{ textDecoration: act.completed ? 'line-through' : 'none', color: act.completed ? '#166534' : '#0F172A', fontWeight: 500, fontSize: '0.88rem' }}>
                  {act.text}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Repuestos (Section 19 Spec - Live stock updates) */}
      {activeTab === 'Repuestos' && (
        <div style={{ background: 'white', padding: '1.25rem', borderRadius: 12, border: '1px solid #E2E8F0' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Repuestos & Materiales Utilizados</h4>
          <table className="custom-table" style={{ marginBottom: '1.5rem' }}>
            <thead>
              <tr><th>Código</th><th>Repuesto</th><th>Cantidad</th><th>Precio Unitario</th><th>Subtotal</th></tr>
            </thead>
            <tbody>
              {(ot.sparePartsUsed || []).length > 0 ? (
                ot.sparePartsUsed.map((p, idx) => (
                  <tr key={idx}>
                    <td>{p.code}</td>
                    <td>{p.name}</td>
                    <td>{p.quantity}</td>
                    <td>{formatCurrency(p.unitPrice)}</td>
                    <td><strong>{formatCurrency(p.quantity * p.unitPrice)}</strong></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '1.5rem', color: '#64748B' }}>No se han agregado repuestos aún.</td></tr>
              )}
            </tbody>
          </table>

          {/* Form to add spare part & deduct inventory */}
          <form onSubmit={handleAddSparePart} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', background: '#F8FAFC', padding: '1rem', borderRadius: 8, border: '1px solid #E2E8F0' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: 4 }}>Seleccionar Repuesto de Almacén:</label>
              <select className="select-input" style={{ width: '100%' }} value={selectedPartCode} onChange={(e) => setSelectedPartCode(e.target.value)}>
                {availableParts.map(p => (
                  <option key={p.code} value={p.code}>{p.code} — {p.name} (Stock actual: {p.stock})</option>
                ))}
              </select>
            </div>
            <div style={{ width: 100 }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: 4 }}>Cantidad:</label>
              <input type="number" className="search-input" style={{ width: '100%' }} value={selectedPartQty} onChange={(e) => setSelectedPartQty(e.target.value)} min="1" />
            </div>
            <button type="submit" className="btn btn-primary"><Plus size={16} /> Agregar & Descontar Stock</button>
          </form>
        </div>
      )}

      {/* Tab: Mano de obra (Section 18 Spec) */}
      {activeTab === 'Mano de obra' && (
        <div style={{ background: 'white', padding: '1.25rem', borderRadius: 12, border: '1px solid #E2E8F0' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Registro de Horas Hombre (Mano de Obra)</h4>
          <table className="custom-table" style={{ marginBottom: '1.5rem' }}>
            <thead>
              <tr><th>Técnico</th><th>Horas Trabajadas</th><th>Tarifa / Horas</th><th>Costo M.O.</th></tr>
            </thead>
            <tbody>
              {(ot.laborLog || []).map((l, idx) => (
                <tr key={idx}>
                  <td>{l.technician}</td>
                  <td>{l.hours} h</td>
                  <td>S/ {l.rate.toFixed(2)}</td>
                  <td><strong>{formatCurrency(l.hours * l.rate)}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>

          <form onSubmit={handleAddLabor} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', background: '#F8FAFC', padding: '1rem', borderRadius: 8 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: 4 }}>Técnico:</label>
              <select className="select-input" style={{ width: '100%' }} value={newLaborTech} onChange={(e) => setNewLaborTech(e.target.value)}>
                <option value="Juan Pérez">Juan Pérez (Mecánico)</option>
                <option value="Carlos López">Carlos López (Eléctrico)</option>
                <option value="Pedro Gómez">Pedro Gómez (Hidráulico)</option>
              </select>
            </div>
            <div style={{ width: 120 }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: 4 }}>Horas:</label>
              <input type="number" className="search-input" style={{ width: '100%' }} value={newLaborHours} onChange={(e) => setNewLaborHours(e.target.value)} step="0.5" />
            </div>
            <button type="submit" className="btn btn-primary"><Plus size={16} /> Registrar Horas</button>
          </form>
        </div>
      )}

      {/* Tab: Evidencias (Section 20 Spec) */}
      {activeTab === 'Evidencias' && (
        <div style={{ background: 'white', padding: '1.25rem', borderRadius: 12, border: '1px solid #E2E8F0' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Evidencias Fotográficas & Documentales</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {(ot.evidences || []).map(ev => (
              <div key={ev.id} style={{ border: '1px solid #E2E8F0', borderRadius: 8, overflow: 'hidden', background: '#F8FAFC' }}>
                <img src={ev.url} alt={ev.title} style={{ width: '100%', height: 130, objectFit: 'cover' }} />
                <div style={{ padding: '0.65rem' }}>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: '#EFF6FF', color: '#1E40AF' }}>{ev.tag}</span>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0F172A', marginTop: 4 }}>{ev.title}</div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddEvidence} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', background: '#F8FAFC', padding: '1rem', borderRadius: 8 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: 4 }}>Título de Evidencia:</label>
              <input type="text" className="search-input" style={{ width: '100%' }} placeholder="Ej. Foto de manguera reemplazada..." value={evidenceTitle} onChange={(e) => setEvidenceTitle(e.target.value)} />
            </div>
            <div style={{ width: 140 }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: 4 }}>Etiqueta:</label>
              <select className="select-input" style={{ width: '100%' }} value={evidenceTag} onChange={(e) => setEvidenceTag(e.target.value)}>
                <option value="Antes">Antes</option>
                <option value="Durante">Durante</option>
                <option value="Después">Después</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary"><Camera size={16} /> Simular Subir Foto</button>
          </form>
        </div>
      )}
    </div>
  );
}
