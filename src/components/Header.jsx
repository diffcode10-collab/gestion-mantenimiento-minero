import React, { useState } from 'react';
import { Search, Bell, User, Check, AlertCircle, Wrench, AlertTriangle, PackageX } from 'lucide-react';
import { getAssets, getWorkOrders, getRequests, getSpareParts } from '../services/mockService';

export function Header({ navigateTo }) {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const assets = getAssets();
  const ots = getWorkOrders();
  const requests = getRequests();
  const parts = getSpareParts();

  // Instant global search results
  const searchResults = searchQuery.trim() === '' ? [] : [
    ...assets.filter(a => a.code.toLowerCase().includes(searchQuery.toLowerCase()) || a.name.toLowerCase().includes(searchQuery.toLowerCase())).map(a => ({ type: 'Equipo', id: a.id, title: `${a.code} — ${a.name}`, subtitle: a.status, path: `/activos/${a.id}` })),
    ...ots.filter(o => o.code.toLowerCase().includes(searchQuery.toLowerCase()) || o.description.toLowerCase().includes(searchQuery.toLowerCase())).map(o => ({ type: 'OT', id: o.id, title: `${o.code} — ${o.assetName}`, subtitle: o.status, path: `/mantenimiento/ordenes` })),
    ...requests.filter(r => r.code.toLowerCase().includes(searchQuery.toLowerCase()) || r.description.toLowerCase().includes(searchQuery.toLowerCase())).map(r => ({ type: 'Solicitud', id: r.id, title: `${r.code} — ${r.assetName}`, subtitle: r.status, path: `/mantenimiento/solicitudes` })),
    ...parts.filter(p => p.code.toLowerCase().includes(searchQuery.toLowerCase()) || p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(p => ({ type: 'Repuesto', id: p.id, title: `${p.code} — ${p.name}`, subtitle: `Stock: ${p.stock}`, path: `/inventario/repuestos` }))
  ].slice(0, 8);

  const notifications = [
    { id: 1, title: '3 mantenimientos preventivos vencidos', time: 'Hace 10 min', type: 'error', icon: AlertTriangle },
    { id: 2, title: '2 Órdenes de trabajo atrasadas', time: 'Hace 30 min', type: 'warning', icon: Wrench },
    { id: 3, title: 'Repuesto REP-002 bajo stock mínimo', time: 'Hace 1 hora', type: 'warning', icon: PackageX },
    { id: 4, title: 'Equipo EQ-004 Scania P410 Detenido', time: 'Hace 2 horas', type: 'error', icon: AlertCircle }
  ];

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-search">
          <Search className="header-search-icon" />
          <input
            type="text"
            placeholder="Buscar equipo, OT, solicitud, repuesto..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchModal(true);
            }}
            onFocus={() => setShowSearchModal(true)}
          />

          {/* Quick Search Dropdown Modal */}
          {showSearchModal && searchQuery.trim().length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: 6,
              background: 'white',
              borderRadius: 8,
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
              border: '1px solid #E2E8F0',
              zIndex: 100,
              maxHeight: 320,
              overflowY: 'auto'
            }}>
              <div style={{ padding: '8px 12px', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', borderBottom: '1px solid #F1F5F9', textTransform: 'uppercase' }}>
                Resultados de búsqueda ({searchResults.length})
              </div>
              {searchResults.length > 0 ? (
                searchResults.map(res => (
                  <div
                    key={res.type + res.id}
                    style={{ padding: '10px 12px', borderBottom: '1px solid #F8FAFC', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    onClick={() => {
                      navigateTo(res.path);
                      setShowSearchModal(false);
                      setSearchQuery('');
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0F172A' }}>{res.title}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{res.subtitle}</div>
                    </div>
                    <span className="badge badge-programado" style={{ fontSize: '0.65rem' }}>{res.type}</span>
                  </div>
                ))
              ) : (
                <div style={{ padding: '16px', textTransform: 'none', textAlign: 'center', color: '#94A3B8', fontSize: '0.85rem' }}>
                  No se encontraron coincidencias.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="header-right">
        {/* Notification Bell Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            className="header-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Centro de notificaciones"
          >
            <Bell size={20} />
            <span className="notification-dot">4</span>
          </button>

          {showNotifications && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '100%',
              marginTop: 10,
              width: 340,
              background: 'white',
              borderRadius: 12,
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
              border: '1px solid #E2E8F0',
              zIndex: 100,
              overflow: 'hidden'
            }}>
              <div style={{ padding: '12px 16px', background: '#0F172A', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Centro de Alertas</span>
                <span style={{ fontSize: '0.72rem', background: '#EF4444', padding: '2px 8px', borderRadius: 12, fontWeight: 700 }}>4 Pendientes</span>
              </div>
              <div style={{ maxHeight: 280, overflowY: 'auto' }}>
                {notifications.map(n => {
                  const Icon = n.icon;
                  return (
                    <div key={n.id} style={{ padding: '12px 16px', borderBottom: '1px solid #F1F5F9', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ padding: 6, borderRadius: 6, background: n.type === 'error' ? '#FEF2F2' : '#FFFBEB', color: n.type === 'error' ? '#EF4444' : '#F59E0B' }}>
                        <Icon size={16} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0F172A' }}>{n.title}</div>
                        <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: 2 }}>{n.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ padding: '10px', textTransform: 'none', textAlign: 'center', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
                <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={() => setShowNotifications(false)}>
                  Marcar todas como leídas
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Badge (Section 44 Spec) */}
        <div className="user-profile">
          <div className="user-avatar">JM</div>
          <div className="user-info">
            <h4>Jefe de Mantenimiento</h4>
            <p>Admin. Mantenimiento</p>
          </div>
        </div>
      </div>
    </header>
  );
}
