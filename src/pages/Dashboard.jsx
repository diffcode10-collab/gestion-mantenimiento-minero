import React, { useState } from 'react';
import {
  Truck,
  Wrench,
  Activity,
  CheckCircle2,
  Clock,
  DollarSign,
  AlertTriangle,
  Filter,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { KPICard } from '../components/KPICard';
import { StatusBadge } from '../components/StatusBadge';
import { getAssets, getWorkOrders } from '../services/mockService';
import { formatCurrency } from '../utils/formatters';

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export function Dashboard({ navigateTo, addToast }) {
  const [periodFilter, setPeriodFilter] = useState('Mes Actual');
  const [areaFilter, setAreaFilter] = useState('Todas');
  const [ownershipFilter, setOwnershipFilter] = useState('Todos');

  const assets = getAssets();
  const ots = getWorkOrders();

  // Filtered Assets
  const filteredAssets = assets.filter(a => {
    if (ownershipFilter !== 'Todos' && a.ownership !== ownershipFilter) return false;
    if (areaFilter !== 'Todas' && !a.location.toLowerCase().includes(areaFilter.toLowerCase())) return false;
    return true;
  });

  const totalAssetsCount = filteredAssets.length;
  const operativosCount = filteredAssets.filter(a => a.status === 'Operativo').length;
  const mantenimientoCount = filteredAssets.filter(a => a.status === 'En Mantenimiento').length;
  const detenidosCount = filteredAssets.filter(a => a.status === 'Detenido').length;

  // Chart 1: Preventivo vs Correctivo
  const typeChartData = {
    labels: ['Mantenimiento Preventivo (68%)', 'Mantenimiento Correctivo (32%)'],
    datasets: [{
      data: [68, 32],
      backgroundColor: ['#2563EB', '#F59E0B'],
      borderWidth: 0
    }]
  };

  // Chart 2: Costos por Mes
  const costsChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
    datasets: [{
      label: 'Costo acumulado (S/)',
      data: [72000, 68500, 81000, 79400, 91200, 84300, 89000, 86450],
      borderColor: '#1E40AF',
      backgroundColor: 'rgba(30, 64, 175, 0.1)',
      fill: true,
      tension: 0.3
    }]
  };

  // Chart 3: Horas de parada por equipo (Top 5)
  const downtimeChartData = {
    labels: ['Scania P410 (EQ-004)', 'Komatsu PC210 (EQ-002)', 'CAT 320 (EQ-001)', 'Volvo FMX (EQ-003)', 'Sandvik DD321'],
    datasets: [{
      label: 'Horas de Parada en el Mes',
      data: [42.5, 28.0, 18.5, 12.0, 9.5],
      backgroundColor: '#EF4444',
      borderRadius: 4
    }]
  };

  // Chart 4: OT por estado
  const otStatusChartData = {
    labels: ['Completadas (42)', 'Pendientes (12)', 'En ejecución (8)', 'Atrasadas (3)'],
    datasets: [{
      data: [42, 12, 8, 3],
      backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'],
      borderWidth: 0
    }]
  };

  return (
    <div className="dashboard-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title">
          <h2>Dashboard de Mantenimiento</h2>
          <p>Unidad Minera Santa Rosa — Estado operativo en tiempo real</p>
        </div>

        {/* Global Dashboard Filters */}
        <div className="page-actions" style={{ flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'white', padding: '6px 12px', borderRadius: 8, border: '1px solid #E2E8F0' }}>
            <Filter size={16} color="#64748B" />
            <select
              style={{ border: 'none', background: 'none', fontSize: '0.85rem', outline: 'none', fontWeight: 600, color: '#0F172A' }}
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
            >
              <option value="Mes Actual">Agosto 2026</option>
              <option value="Trimestre">Q3 2026</option>
              <option value="Año">Año 2026</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'white', padding: '6px 12px', borderRadius: 8, border: '1px solid #E2E8F0' }}>
            <select
              style={{ border: 'none', background: 'none', fontSize: '0.85rem', outline: 'none', fontWeight: 600, color: '#0F172A' }}
              value={ownershipFilter}
              onChange={(e) => setOwnershipFilter(e.target.value)}
            >
              <option value="Todos">Todos los Equipos</option>
              <option value="Propio">Equipos Propios</option>
              <option value="Tercero">Equipos Terceros</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid-kpis">
        <KPICard
          title="Equipos en Flota"
          value={totalAssetsCount}
          icon={Truck}
          subtext={`${operativosCount} Operativos | ${mantenimientoCount} Mant. | ${detenidosCount} Detenidos`}
          isPositive={operativosCount > 35}
        />
        <KPICard
          title="Órdenes de Trabajo"
          value="65 total"
          icon={Wrench}
          subtext="12 Pendientes | 8 En ejec. | 3 Atrasadas"
          isNegative={true}
        />
        <KPICard
          title="Disponibilidad Operativa"
          value="92.4%"
          icon={Activity}
          subtext="Meta: >90% (+1.8% vs mes anterior)"
          isPositive={true}
        />
        <KPICard
          title="Cumplimiento Preventivo"
          value="87.8%"
          icon={CheckCircle2}
          subtext="43 de 49 rutinas completadas"
          isPositive={true}
        />
        <KPICard
          title="MTBF (Tiempo Medio Entre Fallas)"
          value="186 h"
          icon={Clock}
          subtext="Promedio global flota minera"
        />
        <KPICard
          title="MTTR (Tiempo Medio de Reparación)"
          value="6.4 h"
          icon={TrendingUp}
          subtext="Optimizado (-0.8h este mes)"
          isPositive={true}
        />
        <KPICard
          title="Costo Mantenimiento Mes"
          value={formatCurrency(86450)}
          icon={DollarSign}
          subtext="S/ 42,100 mano obra | S/ 44,350 repuestos"
        />
      </div>

      {/* Operational Alerts Panel */}
      <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#92400E', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
          <AlertTriangle size={18} color="#F59E0B" />
          <span>Alertas Operativas Críticas — Acción Requerida</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', fontSize: '0.82rem', color: '#78350F' }}>
          <div style={{ background: 'white', padding: '0.6rem 0.85rem', borderRadius: 6, border: '1px solid #FCD34D', cursor: 'pointer' }} onClick={() => navigateTo('/mantenimiento/preventivo')}>
            <strong>3 mantenimientos preventivos vencidos</strong> (EQ-002, EQ-014, EQ-022)
          </div>
          <div style={{ background: 'white', padding: '0.6rem 0.85rem', borderRadius: 6, border: '1px solid #FCD34D', cursor: 'pointer' }} onClick={() => navigateTo('/activos')}>
            <strong>5 equipos con próxima intervención</strong> (&lt; 50h horómetro restante)
          </div>
          <div style={{ background: 'white', padding: '0.6rem 0.85rem', borderRadius: 6, border: '1px solid #FCD34D', cursor: 'pointer' }} onClick={() => navigateTo('/inventario/repuestos')}>
            <strong>2 repuestos bajo stock mínimo</strong> (Mangueras hidráulicas & filtros)
          </div>
          <div style={{ background: 'white', padding: '0.6rem 0.85rem', borderRadius: 6, border: '1px solid #FCD34D', cursor: 'pointer' }} onClick={() => navigateTo('/activos/EQ-004')}>
            <strong>1 equipo detenido &gt; 24 horas</strong> (Scania P410 EQ-004)
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {/* Chart 1: Preventivo vs Correctivo */}
        <div style={{ background: 'white', padding: '1.25rem', borderRadius: 12, border: '1px solid #E2E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Mantenimiento Preventivo vs Correctivo</h3>
          <div style={{ height: 220, display: 'flex', justifyContent: 'center' }}>
            <Doughnut data={typeChartData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
          </div>
        </div>

        {/* Chart 2: Costos por Mes */}
        <div style={{ background: 'white', padding: '1.25rem', borderRadius: 12, border: '1px solid #E2E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Evolución de Costos de Mantenimiento (S/)</h3>
          <div style={{ height: 220 }}>
            <Line data={costsChartData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </div>

        {/* Chart 3: Horas de Parada */}
        <div style={{ background: 'white', padding: '1.25rem', borderRadius: 12, border: '1px solid #E2E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Horas de Parada por Equipo (Mayor Impacto)</h3>
          <div style={{ height: 220 }}>
            <Bar data={downtimeChartData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </div>

        {/* Chart 4: OT por Estado */}
        <div style={{ background: 'white', padding: '1.25rem', borderRadius: 12, border: '1px solid #E2E8F0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Distribución de Órdenes de Trabajo por Estado</h3>
          <div style={{ height: 220, display: 'flex', justifyContent: 'center' }}>
            <Doughnut data={otStatusChartData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
          </div>
        </div>
      </div>
    </div>
  );
}
