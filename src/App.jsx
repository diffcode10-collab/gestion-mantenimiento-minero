import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ToastContainer } from './components/Toast';
import { initStorage } from './services/mockService';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Assets } from './pages/Assets';
import { AssetDetail } from './pages/AssetDetail';
import { Requests } from './pages/Requests';
import { WorkOrders } from './pages/WorkOrders';
import { WorkOrderDetail } from './pages/WorkOrderDetail';
import { PreventiveMaintenance } from './pages/PreventiveMaintenance';
import { Calendar } from './pages/Calendar';
import { Inventory } from './pages/Inventory';
import { Technicians } from './pages/Technicians';
import { Reports } from './pages/Reports';
import { Indicators } from './pages/Indicators';
import { SAPIntegration } from './pages/SAPIntegration';

export function App() {
  const [activePath, setActivePath] = useState('/dashboard');
  const [selectedAssetId, setSelectedAssetId] = useState('EQ-001');
  const [selectedOtId, setSelectedOtId] = useState('OT-2026-0154');
  const [isMobileMode, setIsMobileMode] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    initStorage();
  }, []);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigateTo = (path) => {
    if (path.startsWith('/activos/') && path !== '/activos') {
      const parts = path.split('/');
      setSelectedAssetId(parts[parts.length - 1]);
    }
    setActivePath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    if (activePath.startsWith('/activos/')) {
      const assetId = activePath.replace('/activos/', '');
      return <AssetDetail assetId={assetId || selectedAssetId} navigateTo={navigateTo} addToast={addToast} />;
    }

    switch (activePath) {
      case '/dashboard':
        return <Dashboard navigateTo={navigateTo} addToast={addToast} />;
      case '/activos':
        return <Assets navigateTo={navigateTo} />;
      case '/mantenimiento/solicitudes':
        return <Requests navigateTo={navigateTo} addToast={addToast} />;
      case '/mantenimiento/ordenes':
        return <WorkOrders navigateTo={navigateTo} setSelectedOtId={setSelectedOtId} setMobileMode={setIsMobileMode} />;
      case '/mantenimiento/ordenes/detalle':
        return <WorkOrderDetail otId={selectedOtId} navigateTo={navigateTo} addToast={addToast} isMobileMode={isMobileMode} setMobileMode={setIsMobileMode} />;
      case '/mantenimiento/preventivo':
        return <PreventiveMaintenance navigateTo={navigateTo} />;
      case '/mantenimiento/calendario':
        return <Calendar navigateTo={navigateTo} setSelectedOtId={setSelectedOtId} />;
      case '/inventario/repuestos':
        return <Inventory addToast={addToast} />;
      case '/personal':
        return <Technicians />;
      case '/reportes':
        return <Reports addToast={addToast} />;
      case '/indicadores':
        return <Indicators />;
      case '/integraciones/sap':
        return <SAPIntegration addToast={addToast} />;
      default:
        return <Dashboard navigateTo={navigateTo} addToast={addToast} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar activePath={activePath} navigateTo={navigateTo} />
      <div className="main-wrapper">
        <Header navigateTo={navigateTo} />
        <main className="content-body">
          {renderCurrentPage()}
        </main>
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default App;
