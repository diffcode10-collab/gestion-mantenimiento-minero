import React from 'react';

export function KPICard({ title, value, icon: Icon, subtext, isPositive, isNegative }) {
  return (
    <div className="kpi-card">
      <div>
        <div className="kpi-card-header">
          <span className="kpi-title">{title}</span>
          {Icon && (
            <div className="kpi-icon">
              <Icon size={20} />
            </div>
          )}
        </div>
        <div className="kpi-value">{value}</div>
      </div>
      {subtext && (
        <div className={`kpi-subtext ${isPositive ? 'positive' : isNegative ? 'negative' : ''}`}>
          {subtext}
        </div>
      )}
    </div>
  );
}
