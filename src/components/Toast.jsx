import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export function ToastContainer({ toasts, removeToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className="toast" style={{ borderLeftColor: toast.type === 'error' ? '#EF4444' : toast.type === 'warning' ? '#F59E0B' : '#10B981' }}>
          {toast.type === 'error' ? <AlertTriangle size={18} color="#EF4444" /> : toast.type === 'warning' ? <AlertTriangle size={18} color="#F59E0B" /> : <CheckCircle2 size={18} color="#10B981" />}
          <div style={{ flex: 1 }}>{toast.message}</div>
          <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }} onClick={() => removeToast(toast.id)}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
