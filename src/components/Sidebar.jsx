import React from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Wrench,
  CalendarDays,
  Truck,
  Package,
  Users,
  BarChart3,
  TrendingUp,
  Cpu,
  ShieldCheck,
  ChevronDown,
  Activity
} from 'lucide-react';

export function Sidebar({ activePath, navigateTo }) {
  const isGroupActive = (paths) => paths.includes(activePath);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo-icon">
          <Activity size={22} />
        </div>
        <div className="sidebar-title-group">
          <h1>Mantenimiento Minero</h1>
          <p>Unidad Santa Rosa</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {/* Core Nav */}
        <div className="nav-group">
          <div
            className={`nav-item ${activePath === '/dashboard' ? 'active' : ''}`}
            onClick={() => navigateTo('/dashboard')}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </div>
        </div>

        {/* Mantenimiento */}
        <div className="nav-group">
          <div className="nav-section-label">Mantenimiento</div>
          <div
            className={`nav-item ${activePath === '/mantenimiento/solicitudes' ? 'active' : ''}`}
            onClick={() => navigateTo('/mantenimiento/solicitudes')}
          >
            <ClipboardList size={18} />
            <span>Solicitudes</span>
          </div>
          <div
            className={`nav-item ${activePath === '/mantenimiento/ordenes' ? 'active' : ''}`}
            onClick={() => navigateTo('/mantenimiento/ordenes')}
          >
            <Wrench size={18} />
            <span>Órdenes de Trabajo</span>
          </div>
          <div
            className={`nav-item ${activePath === '/mantenimiento/preventivo' ? 'active' : ''}`}
            onClick={() => navigateTo('/mantenimiento/preventivo')}
          >
            <ShieldCheck size={18} />
            <span>Plan Preventivo</span>
          </div>
          <div
            className={`nav-item ${activePath === '/mantenimiento/calendario' ? 'active' : ''}`}
            onClick={() => navigateTo('/mantenimiento/calendario')}
          >
            <CalendarDays size={18} />
            <span>Calendario</span>
          </div>
        </div>

        {/* Activos */}
        <div className="nav-group">
          <div className="nav-section-label">Activos & Equipos</div>
          <div
            className={`nav-item ${activePath.startsWith('/activos') ? 'active' : ''}`}
            onClick={() => navigateTo('/activos')}
          >
            <Truck size={18} />
            <span>Equipos (Flota)</span>
          </div>
        </div>

        {/* Inventario */}
        <div className="nav-group">
          <div className="nav-section-label">Almacén</div>
          <div
            className={`nav-item ${activePath === '/inventario/repuestos' ? 'active' : ''}`}
            onClick={() => navigateTo('/inventario/repuestos')}
          >
            <Package size={18} />
            <span>Repuestos</span>
          </div>
        </div>

        {/* Personal */}
        <div className="nav-group">
          <div className="nav-section-label">Recursos</div>
          <div
            className={`nav-item ${activePath === '/personal' ? 'active' : ''}`}
            onClick={() => navigateTo('/personal')}
          >
            <Users size={18} />
            <span>Personal Técnico</span>
          </div>
        </div>

        {/* Analytics & ERP */}
        <div className="nav-group">
          <div className="nav-section-label">Analítica & ERP</div>
          <div
            className={`nav-item ${activePath === '/reportes' ? 'active' : ''}`}
            onClick={() => navigateTo('/reportes')}
          >
            <BarChart3 size={18} />
            <span>Reportes</span>
          </div>
          <div
            className={`nav-item ${activePath === '/indicadores' ? 'active' : ''}`}
            onClick={() => navigateTo('/indicadores')}
          >
            <TrendingUp size={18} />
            <span>Indicadores (KPIs)</span>
          </div>
          <div
            className={`nav-item ${activePath === '/integraciones/sap' ? 'active' : ''}`}
            onClick={() => navigateTo('/integraciones/sap')}
          >
            <Cpu size={18} />
            <span>Integración SAP ERP</span>
          </div>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#94A3B8' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10B981' }}></div>
          <span>Demo Frontend v1.0</span>
        </div>
        <div style={{ marginTop: 4, fontSize: '0.68rem', color: '#64748B' }}>Modo Sin Backend</div>
      </div>
    </aside>
  );
}
