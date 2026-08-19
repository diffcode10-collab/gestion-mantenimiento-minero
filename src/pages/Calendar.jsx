import React, { useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Wrench } from 'lucide-react';
import { getWorkOrders } from '../services/mockService';

export function Calendar({ navigateTo, setSelectedOtId }) {
  const [currentMonth] = useState('Agosto 2026');
  const ots = getWorkOrders();

  // Simple August 2026 calendar days grid (1 to 31)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="calendar-page">
      <div className="page-header">
        <div className="page-title">
          <h2>Calendario de Mantenimiento</h2>
          <p>Programación mensual de intervenciones preventivas y correctivas</p>
        </div>
        <div className="page-actions">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'white', padding: '6px 12px', borderRadius: 8, border: '1px solid #E2E8F0' }}>
            <button style={{ border: 'none', background: 'none', cursor: 'pointer' }}><ChevronLeft size={16} /></button>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A' }}>{currentMonth}</span>
            <button style={{ border: 'none', background: 'none', cursor: 'pointer' }}><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.25rem', background: 'white', padding: '0.85rem 1.25rem', borderRadius: 8, border: '1px solid #E2E8F0', fontSize: '0.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#2563EB' }} /> Preventivo
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} /> Correctivo
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} /> Emergencia
        </div>
      </div>

      {/* Month Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => (
          <div key={d} style={{ textAlign: 'center', fontWeight: 700, fontSize: '0.75rem', color: '#64748B', padding: '6px 0', textTransform: 'uppercase' }}>
            {d}
          </div>
        ))}

        {days.map(day => {
          const dayOts = ots.filter(o => o.scheduledDate && Number(o.scheduledDate.split('-')[2]) === day);
          return (
            <div
              key={day}
              style={{
                background: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: 8,
                minHeight: 90,
                padding: 6,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: day === 19 ? '#2563EB' : '#0F172A' }}>
                {day} {day === 19 && '(Hoy)'}
              </span>

              <div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto' }}>
                {dayOts.map(o => (
                  <div
                    key={o.id}
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      padding: '2px 6px',
                      borderRadius: 4,
                      cursor: 'pointer',
                      background: o.type === 'Preventivo' ? '#EFF6FF' : o.type === 'Correctivo' ? '#FFFBEB' : '#FEF2F2',
                      color: o.type === 'Preventivo' ? '#1E40AF' : o.type === 'Correctivo' ? '#92400E' : '#991B1B',
                      borderLeft: `3px solid ${o.type === 'Preventivo' ? '#2563EB' : o.type === 'Correctivo' ? '#F59E0B' : '#EF4444'}`
                    }}
                    onClick={() => { setSelectedOtId(o.id); navigateTo('/mantenimiento/ordenes/detalle'); }}
                  >
                    {o.code} — {o.assetCode}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
