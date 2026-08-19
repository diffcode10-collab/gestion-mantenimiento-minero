import React, { useState } from 'react';
import { Activity, Clock, TrendingUp, ShieldCheck, Wrench, Info, HelpCircle } from 'lucide-react';
import { Modal } from '../components/Modal';

export function Indicators() {
  const [selectedMetric, setSelectedMetric] = useState(null);

  const metricsInfo = {
    disponibilidad: {
      title: 'Disponibilidad Operativa Flota Minera',
      formula: 'Disponibilidad (%) = [Tiempo Operativo / (Tiempo Operativo + Tiempo Detenido)] × 100',
      description: 'Mide la proporción del tiempo en que los equipos mineros (excavadoras, volquetes, cargadores) estuvieron listos y disponibles para la producción.',
      currentValue: '92.4%',
      target: '> 90.0%',
      recommendations: 'Mantener la estrategia preventivo-proactiva para asegurar que la disponibilidad no baje del 90% en la Unidad Santa Rosa.'
    },
    mtbf: {
      title: 'MTBF — Tiempo Medio Entre Fallas (Mean Time Between Failures)',
      formula: 'MTBF (Horas) = Horas Operativas Totales / Número de Fallas',
      description: 'Representa el tiempo promedio en horas de operación continua que transcurre entre una falla imprevista y la siguiente.',
      currentValue: '186 horas',
      target: '> 180 horas',
      recommendations: 'Incrementar inspecciones de rutina en sistemas hidráulicos de excavadoras para alargar el MTBF.'
    },
    mttr: {
      title: 'MTTR — Tiempo Medio de Reparación (Mean Time To Repair)',
      formula: 'MTTR (Horas) = Σ Horas Totales de Parada por Reparación / Número de Intervenciones Correctivas',
      description: 'Indica la eficacia del equipo técnico para diagnosticar y reparar fallas en campo o taller.',
      currentValue: '6.4 horas',
      target: '< 8.0 horas',
      recommendations: 'Asegurar pre-armado de kits de repuestos de alta rotación para reducir los tiempos muertos de taller.'
    },
    preventivo: {
      title: 'Cumplimiento de Mantenimiento Preventivo',
      formula: 'Cumplimiento (%) = (Preventivos Ejecutados en Fecha / Preventivos Programados) × 100',
      description: 'Porcentaje de servicios de 250h, 500h y 1000h que fueron ejecutados puntualmente según el plan.',
      currentValue: '87.8%',
      target: '> 85.0%',
      recommendations: 'Reforzar la coordinación de paradas con el área de Operaciones Mineras para evitar postergaciones.'
    }
  };

  return (
    <div className="indicators-page">
      <div className="page-header">
        <div className="page-title">
          <h2>Indicadores de Mantenimiento Minero (KPIs)</h2>
          <p>Métricas claves de confiabilidad, disponibilidad y desempeño operativo</p>
        </div>
      </div>

      {/* Grid of Key Indicator Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {/* Disponibilidad */}
        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Disponibilidad</span>
            <div style={{ padding: 8, background: '#ECFDF5', color: '#059669', borderRadius: 8 }}><Activity size={20} /></div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', margin: '0.5rem 0' }}>92.4%</div>
          <p style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>+2.4% por encima de la meta (90%)</p>
          <button
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '1rem', width: '100%' }}
            onClick={() => setSelectedMetric(metricsInfo.disponibilidad)}
          >
            <HelpCircle size={14} /> Ver Explicación & Fórmula
          </button>
        </div>

        {/* MTBF */}
        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>MTBF (Entre Fallas)</span>
            <div style={{ padding: 8, background: '#EFF6FF', color: '#2563EB', borderRadius: 8 }}><Clock size={20} /></div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', margin: '0.5rem 0' }}>186 h</div>
          <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Promedio global flota minera</p>
          <button
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '1rem', width: '100%' }}
            onClick={() => setSelectedMetric(metricsInfo.mtbf)}
          >
            <HelpCircle size={14} /> Ver Explicación & Fórmula
          </button>
        </div>

        {/* MTTR */}
        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>MTTR (Tiempo Reparación)</span>
            <div style={{ padding: 8, background: '#F5F3FF', color: '#7C3AED', borderRadius: 8 }}><TrendingUp size={20} /></div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', margin: '0.5rem 0' }}>6.4 h</div>
          <p style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>Optimizado (-0.8h este mes)</p>
          <button
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '1rem', width: '100%' }}
            onClick={() => setSelectedMetric(metricsInfo.mttr)}
          >
            <HelpCircle size={14} /> Ver Explicación & Fórmula
          </button>
        </div>

        {/* Cumplimiento Preventivo */}
        <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 12, padding: '1.5rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Cumplimiento Preventivo</span>
            <div style={{ padding: 8, background: '#F0FDF4', color: '#166534', borderRadius: 8 }}><ShieldCheck size={20} /></div>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0F172A', margin: '0.5rem 0' }}>87.8%</div>
          <p style={{ fontSize: '0.8rem', color: '#64748B' }}>43 de 49 servicios a tiempo</p>
          <button
            className="btn btn-secondary btn-sm"
            style={{ marginTop: '1rem', width: '100%' }}
            onClick={() => setSelectedMetric(metricsInfo.preventivo)}
          >
            <HelpCircle size={14} /> Ver Explicación & Fórmula
          </button>
        </div>
      </div>

      {/* Metric Info Modal */}
      {selectedMetric && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedMetric(null)}
          title={selectedMetric.title}
          maxWidth={550}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: '#EFF6FF', borderLeft: '4px solid #2563EB', padding: '0.85rem 1rem', borderRadius: 6 }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1E40AF', textTransform: 'uppercase' }}>Fórmula de Cálculo</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0F172A', marginTop: 4 }}>{selectedMetric.formula}</div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>¿Qué significa este indicador?</h4>
              <p style={{ fontSize: '0.85rem', color: '#475569' }}>{selectedMetric.description}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: '#F8FAFC', padding: '1rem', borderRadius: 8, border: '1px solid #E2E8F0' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Valor Actual:</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>{selectedMetric.currentValue}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Meta Deseada:</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>{selectedMetric.target}</div>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>Recomendación Operativa:</h4>
              <p style={{ fontSize: '0.85rem', color: '#475569' }}>{selectedMetric.recommendations}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
