import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IncidentTableActions = ({ 
  selectedIncidents, 
  onCreateNew, 
  onBulkStatusUpdate, 
  onExport,
  viewMode,
  onViewModeChange,
  totalCount,
  filteredCount
}) => {
  const [showBulkActions, setShowBulkActions] = useState(false);

  const bulkStatusOptions = [
    { value: 'investigating', label: 'Mark as Investigating', icon: 'Search' },
    { value: 'responding', label: 'Mark as Responding', icon: 'Truck' },
    { value: 'resolved', label: 'Mark as Resolved', icon: 'CheckCircle' },
    { value: 'closed', label: 'Mark as Closed', icon: 'Archive' }
  ];

  const exportOptions = [
    { value: 'csv', label: 'Export as CSV', icon: 'FileText' },
    { value: 'pdf', label: 'Export as PDF', icon: 'FileDown' },
    { value: 'excel', label: 'Export as Excel', icon: 'Table' }
  ];

  const handleBulkAction = (action) => {
    onBulkStatusUpdate(selectedIncidents, action);
    setShowBulkActions(false);
  };

  const handleExport = (format) => {
    onExport(format);
  };

  return (
    <div className="bg-white border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Results Count */}
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredCount}</span> of{' '}
            <span className="font-medium text-foreground">{totalCount}</span> incidents
          </div>
          
          {selectedIncidents?.length > 0 && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-primary/10 rounded-full">
              <Icon name="CheckSquare" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">
                {selectedIncidents?.length} selected
              </span>
            </div>
          )}
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'active' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('active')}
              className="px-3"
            >
              <Icon name="Activity" size={16} className="mr-1" />
              Active
            </Button>
            <Button
              variant={viewMode === 'archived' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('archived')}
              className="px-3"
            >
              <Icon name="Archive" size={16} className="mr-1" />
              Archived
            </Button>
          </div>

          {/* Bulk Actions */}
          {selectedIncidents?.length > 0 && (
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBulkActions(!showBulkActions)}
              >
                <Icon name="Settings" size={16} className="mr-1" />
                Bulk Actions
                <Icon name="ChevronDown" size={14} className="ml-1" />
              </Button>

              {showBulkActions && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-border rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
                      Status Updates
                    </div>
                    {bulkStatusOptions?.map((option) => (
                      <button
                        key={option?.value}
                        onClick={() => handleBulkAction(option?.value)}
                        className="w-full flex items-center px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150"
                      >
                        <Icon name={option?.icon} size={16} className="mr-2 text-muted-foreground" />
                        {option?.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Export Actions */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('export-menu')?.classList?.toggle('hidden')}
            >
              <Icon name="Download" size={16} className="mr-1" />
              Export
              <Icon name="ChevronDown" size={14} className="ml-1" />
            </Button>

            <div id="export-menu" className="hidden absolute right-0 top-full mt-1 w-48 bg-white border border-border rounded-lg shadow-lg z-50">
              <div className="py-2">
                {exportOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => handleExport(option?.value)}
                    className="w-full flex items-center px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors duration-150"
                  >
                    <Icon name={option?.icon} size={16} className="mr-2 text-muted-foreground" />
                    {option?.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Create New Incident */}
          <Button
            variant="default"
            size="sm"
            onClick={onCreateNew}
            className="bg-primary hover:bg-primary/90"
          >
            <Icon name="Plus" size={16} className="mr-1" />
            New Incident
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IncidentTableActions;