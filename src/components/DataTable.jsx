import React, { useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

export function DataTable({
  columns,
  data,
  searchPlaceholder = 'Buscar...',
  statusOptions = [],
  onSearchChange,
  onStatusFilterChange,
  actions
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setCurrentPage(1);
    if (onSearchChange) onSearchChange(val);
  };

  const handleStatusChange = (e) => {
    const val = e.target.value;
    setSelectedStatus(val);
    setCurrentPage(1);
    if (onStatusFilterChange) onStatusFilterChange(val);
  };

  const filteredData = data.filter(item => {
    const matchesSearch = searchTerm === '' || Object.values(item).some(val =>
      val && String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesStatus = selectedStatus === '' || item.status === selectedStatus || item.ownership === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="card-table-container">
      <div className="table-filter-bar">
        <div className="filter-group">
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              className="search-input"
              style={{ paddingLeft: 34 }}
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {statusOptions.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Filter size={16} style={{ color: '#64748B' }} />
              <select className="select-input" value={selectedStatus} onChange={handleStatusChange}>
                <option value="">Todos los estados</option>
                {statusOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {actions && <div style={{ display: 'flex', gap: 8 }}>{actions}</div>}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="custom-table">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key || col.header} style={{ width: col.width }}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => (
                <tr key={row.id || idx}>
                  {columns.map(col => (
                    <td key={col.key || col.header}>
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center', padding: '2.5rem', color: '#64748B' }}>
                  No se encontraron registros que coincidan con los filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div style={{ padding: '0.85rem 1.25rem', borderTop: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: '#64748B', backgroundColor: '#FAFAFA' }}>
        <div>
          Mostrando <strong>{filteredData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</strong> a <strong>{Math.min(currentPage * pageSize, filteredData.length)}</strong> de <strong>{filteredData.length}</strong> registros
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            className="btn btn-secondary btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            <ChevronLeft size={14} /> Anterior
          </button>
          <span style={{ fontWeight: 600, color: '#0F172A', padding: '0 4px' }}>
            {currentPage} / {totalPages}
          </span>
          <button
            className="btn btn-secondary btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          >
            Siguiente <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
