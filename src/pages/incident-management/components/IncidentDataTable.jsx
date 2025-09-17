import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const IncidentDataTable = ({ 
  incidents, 
  selectedIncidents, 
  onSelectionChange, 
  onIncidentEdit, 
  onIncidentView, 
  onStatusUpdate,
  sortConfig,
  onSort
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'bg-error text-error-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-accent text-accent-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'reported': return 'bg-muted text-muted-foreground';
      case 'investigating': return 'bg-accent text-accent-foreground';
      case 'responding': return 'bg-warning text-warning-foreground';
      case 'resolved': return 'bg-success text-success-foreground';
      case 'closed': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(incidents?.map(incident => incident?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectIncident = (incidentId, checked) => {
    if (checked) {
      onSelectionChange([...selectedIncidents, incidentId]);
    } else {
      onSelectionChange(selectedIncidents?.filter(id => id !== incidentId));
    }
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const columns = [
    { key: 'select', label: '', sortable: false, width: 'w-12' },
    { key: 'id', label: 'ID', sortable: true, width: 'w-20' },
    { key: 'type', label: 'Type', sortable: true, width: 'w-32' },
    { key: 'description', label: 'Description', sortable: false, width: 'flex-1' },
    { key: 'location', label: 'Location', sortable: true, width: 'w-40' },
    { key: 'severity', label: 'Severity', sortable: true, width: 'w-24' },
    { key: 'status', label: 'Status', sortable: true, width: 'w-32' },
    { key: 'reportedDate', label: 'Reported', sortable: true, width: 'w-40' },
    { key: 'assignedTo', label: 'Assigned To', sortable: true, width: 'w-40' },
    { key: 'actions', label: 'Actions', sortable: false, width: 'w-32' }
  ];

  const isAllSelected = incidents?.length > 0 && selectedIncidents?.length === incidents?.length;
  const isPartiallySelected = selectedIncidents?.length > 0 && selectedIncidents?.length < incidents?.length;

  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              {columns?.map((column) => (
                <th key={column?.key} className={`${column?.width} px-4 py-3 text-left`}>
                  {column?.key === 'select' ? (
                    <Checkbox
                      checked={isAllSelected}
                      indeterminate={isPartiallySelected}
                      onChange={(e) => handleSelectAll(e?.target?.checked)}
                    />
                  ) : column?.sortable ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSort(column?.key)}
                      className="h-auto p-0 font-semibold text-foreground hover:text-primary"
                    >
                      {column?.label}
                      <Icon 
                        name={getSortIcon(column?.key)} 
                        size={14} 
                        className="ml-1" 
                      />
                    </Button>
                  ) : (
                    <span className="text-sm font-semibold text-foreground">{column?.label}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {incidents?.map((incident) => (
              <tr
                key={incident?.id}
                className={`border-b border-border hover:bg-muted/30 transition-colors duration-150 ${
                  selectedIncidents?.includes(incident?.id) ? 'bg-primary/5' : ''
                }`}
                onMouseEnter={() => setHoveredRow(incident?.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedIncidents?.includes(incident?.id)}
                    onChange={(e) => handleSelectIncident(incident?.id, e?.target?.checked)}
                  />
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-mono text-primary">#{incident?.id}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Icon name={incident?.typeIcon} size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground capitalize">
                      {incident?.type}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-foreground line-clamp-2">{incident?.description}</p>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{incident?.location}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident?.severity)}`}>
                    {incident?.severity}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident?.status)}`}>
                    {incident?.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(incident?.reportedDate)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">
                        {incident?.assignedTo?.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-foreground">{incident?.assignedTo}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onIncidentView(incident)}
                      className="h-8 w-8 p-0"
                      title="View Details"
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onIncidentEdit(incident)}
                      className="h-8 w-8 p-0"
                      title="Edit Incident"
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onStatusUpdate(incident?.id, 'resolved')}
                      className="h-8 w-8 p-0"
                      title="Quick Resolve"
                    >
                      <Icon name="CheckCircle" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-4 p-4">
        {incidents?.map((incident) => (
          <div
            key={incident?.id}
            className={`border border-border rounded-lg p-4 ${
              selectedIncidents?.includes(incident?.id) ? 'border-primary bg-primary/5' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedIncidents?.includes(incident?.id)}
                  onChange={(e) => handleSelectIncident(incident?.id, e?.target?.checked)}
                />
                <div>
                  <span className="text-sm font-mono text-primary">#{incident?.id}</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <Icon name={incident?.typeIcon} size={14} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground capitalize">
                      {incident?.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onIncidentView(incident)}
                  className="h-8 w-8 p-0"
                >
                  <Icon name="Eye" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onIncidentEdit(incident)}
                  className="h-8 w-8 p-0"
                >
                  <Icon name="Edit" size={14} />
                </Button>
              </div>
            </div>

            <p className="text-sm text-foreground mb-3 line-clamp-2">{incident?.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <span className="text-xs text-muted-foreground">Location</span>
                <div className="flex items-center space-x-1 mt-1">
                  <Icon name="MapPin" size={12} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{incident?.location}</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Assigned To</span>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary-foreground">
                      {incident?.assignedTo?.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm text-foreground">{incident?.assignedTo}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(incident?.severity)}`}>
                  {incident?.severity}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident?.status)}`}>
                  {incident?.status}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDate(incident?.reportedDate)}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {incidents?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileX" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No incidents found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or create a new incident.</p>
        </div>
      )}
    </div>
  );
};

export default IncidentDataTable;