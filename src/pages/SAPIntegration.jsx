import React, { useState } from 'react';
import { Cpu, RefreshCw, CheckCircle2, Server, Database, ArrowRight, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { getSAPLogs, runSAPSyncSimulation } from '../services/mockService';
import { formatDateTime } from '../utils/formatters';

export function SAPIntegration({ addToast }) {
  const [sapLogs, setSapLogs] = useState(getSAPLogs());
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStepText, setSyncStepText] = useState('');
  const [lastSyncResult, setLastSyncResult] = useState({
    time: '19/08/2026 10:42',
    assets: 48,
    materials: 126,
    costCenters: 8,
    errors: 0
  });

  const handleSimulateSync = () => {
    setIsSyncing(true);
    setSyncStepText('Conectando con servidor SAP S/4HANA...');

    setTimeout(() => {
      setSyncStepText('Validando tokens de autenticación API REST...');
    }, 800);

    setTimeout(() => {
      setSyncStepText('Sincronizando maestro de activos (SAP PM)...');
    }, 1600);

    setTimeout(() => {
      setSyncStepText('Sincronizando inventarios y movimientos de almacén (SAP MM)...');
    }, 2400);

    setTimeout(() => {
      setSyncStepText('Imputando costos a centros de costo (SAP CO)...');
    }, 3200);

    setTimeout(() => {
      const res = runSAPSyncSimulation();
      setSapLogs(res.logs);
      setLastSyncResult({
        time: res.syncTime,
        assets: res.assetsCount,
        materials: res.materialsCount,
        costCenters: res.costCentersCount,
        errors: res.errorsCount
      });
      setIsSyncing(false);
      addToast('Sincronización simulada con SAP ERP completada exitosamente', 'success');
    }, 4000);
  };

  return (
    <div className="sap-integration-page">
      <div className="page-header">
        <div className="page-title">
          <h2>Integración Simulado con SAP ERP / S/4HANA</h2>
          <p>Demostración de sincronización bidireccional entre la plataforma y SAP</p>
        </div>
        <div className="page-actions">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', borderRadius: 20, fontSize: '0.82rem', fontWeight: 700 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }}></span>
            Simulación Activa
          </span>
        </div>
      </div>

      {/* Architecture Visual Diagram (Section 29 Spec) */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: 12, border: '1px solid #E2E8F0', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>
          Arquitectura de Integración (Visión de Negocio)
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', background: '#F8FAFC', padding: '1.25rem', borderRadius: 8, border: '1px solid #E2E8F0' }}>
          <div style={{ textAlign: 'center', background: 'white', padding: '1rem', borderRadius: 8, border: '1px solid #CBD5E1', flex: 1, minWidth: 160 }}>
            <div style={{ fontWeight: 800, color: '#1E40AF', fontSize: '0.9rem' }}>Plataforma Minera</div>
            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Gestión Operativa</div>
          </div>

          <ArrowRight size={20} color="#94A3B8" />

          <div style={{ textAlign: 'center', background: 'white', padding: '1rem', borderRadius: 8, border: '1px solid #CBD5E1', flex: 1, minWidth: 160 }}>
            <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.9rem' }}>API REST</div>
            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Endpoints OData</div>
          </div>

          <ArrowRight size={20} color="#94A3B8" />

          <div style={{ textAlign: 'center', background: 'white', padding: '1rem', borderRadius: 8, border: '1px solid #CBD5E1', flex: 1, minWidth: 160 }}>
            <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.9rem' }}>Middleware</div>
            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>SAP BTP / PI / PO</div>
          </div>

          <ArrowRight size={20} color="#94A3B8" />

          <div style={{ textAlign: 'center', background: '#EFF6FF', padding: '1rem', borderRadius: 8, border: '1px solid #BFDBFE', flex: 1, minWidth: 160 }}>
            <div style={{ fontWeight: 800, color: '#1E40AF', fontSize: '0.9rem' }}>SAP S/4HANA</div>
            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>ERP Central</div>
          </div>
        </div>
      </div>

      {/* Sync Simulator Card (Section 30 Spec) */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: 12, border: '1px solid #E2E8F0', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>Simulador de Sincronización SAP</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B' }}>Inicie la simulación para actualizar maestros de activos, inventarios y costos con SAP</p>
          </div>

          <button
            className="btn btn-primary"
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
            disabled={isSyncing}
            onClick={handleSimulateSync}
          >
            <RefreshCw size={18} className={isSyncing ? 'spin' : ''} />
            {isSyncing ? 'Sincronizando...' : 'Simular Sincronización con SAP'}
          </button>
        </div>

        {/* Sync Progress Status */}
        {isSyncing && (
          <div style={{ marginTop: '1.25rem', background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '1rem', borderRadius: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#1E40AF', fontWeight: 700, fontSize: '0.9rem' }}>
              <RefreshCw size={18} className="spin" />
              <span>{syncStepText}</span>
            </div>
          </div>
        )}

        {/* Sync Results Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '1.25rem' }}>
          <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 8, border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Activos Sincronizados</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>{lastSyncResult.assets}</div>
          </div>
          <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 8, border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Materiales (SAP MM)</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>{lastSyncResult.materials}</div>
          </div>
          <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 8, border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Centros de Costo (CO)</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>{lastSyncResult.costCenters}</div>
          </div>
          <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 8, border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Errores de Proceso</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10B981' }}>{lastSyncResult.errors}</div>
          </div>
        </div>
      </div>

      {/* Sync Audit Log Table (Section 31 Spec) */}
      <div className="card-table-container">
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #E2E8F0', fontWeight: 700, fontSize: '0.95rem' }}>
          Log de Auditoría de Sincronizaciones SAP
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>Proceso / Interfaz</th>
              <th>Registros</th>
              <th>Estado</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {sapLogs.map(log => (
              <tr key={log.id}>
                <td>{log.date}</td>
                <td style={{ fontWeight: 600 }}>{log.process}</td>
                <td>{log.records}</td>
                <td>
                  <span className="badge badge-operativo">{log.status}</span>
                </td>
                <td style={{ fontSize: '0.8rem', color: '#64748B' }}>{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
