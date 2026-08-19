import React from 'react';
import { getStatusBadgeClass } from '../utils/formatters';

export function StatusBadge({ status }) {
  if (!status) return null;
  const badgeClass = getStatusBadgeClass(status);
  return (
    <span className={`badge ${badgeClass}`}>
      <span className="dot" style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'currentColor', display: 'inline-block' }}></span>
      {status}
    </span>
  );
}
