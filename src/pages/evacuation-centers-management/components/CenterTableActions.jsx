import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const CenterTableActions = ({
  selectedCenters,
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
    { value: 'operational', label: 'Set as Operational' },
    { value: 'ready', label: 'Set as Ready' },
    { value: 'maintenance', label: 'Set as Maintenance' },
    { value: 'closed', label: 'Set as Closed' }
  ];

  const exportOptions = [
    { value: 'csv', label: 'Export as CSV', icon: 'FileSpreadsheet' },
    { value: 'pdf', label: 'Export as PDF', icon: 'FileText' },
    { value: 'excel', label: 'Export as Excel', icon: 'FileSpreadsheet' }
  ];

  const handleBulkStatusUpdate = (status) => {
    onBulkStatusUpdate(selectedCenters, status);
    setShowBulkActions(false);
  };

  return (
    <div className="bg-white border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Selected Count & Bulk Actions */}
        <div className="flex items-center space-x-4">
          {selectedCenters?.length > 0 ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-foreground">
                {selectedCenters?.length} selected
              </span>
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowBulkActions(!showBulkActions)}
                  className="flex items-center space-x-2"
                >
                  <Icon name="Settings" size={16} />
                  <span>Bulk Actions</span>
                  <Icon name={showBulkActions ? 'ChevronUp' : 'ChevronDown'} size={16} />
                </Button>
                
                {showBulkActions && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg z-50">
                    <div className="p-2">
                      <h4 className="text-sm font-medium text-foreground mb-2">Update Status</h4>
                      {bulkStatusOptions?.map((option) => (
                        <Button
                          key={option?.value}
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBulkStatusUpdate(option?.value)}
                          className="w-full justify-start text-left mb-1"
                        >
                          {option?.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkStatusUpdate([], '')}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Showing {filteredCount} of {totalCount} evacuation centers
            </div>
          )}
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'map' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('map')}
              className="flex items-center space-x-2 px-3"
            >
              <Icon name="Map" size={16} />
              <span className="hidden sm:inline">Map View</span>
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('table')}
              className="flex items-center space-x-2 px-3"
            >
              <Icon name="Table" size={16} />
              <span className="hidden sm:inline">Table View</span>
            </Button>
          </div>

          {/* Export Dropdown */}
          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Icon name="Download" size={16} />
              <span className="hidden sm:inline">Export</span>
              <Icon name="ChevronDown" size={16} />
            </Button>
            
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                {exportOptions?.map((option) => (
                  <Button
                    key={option?.value}
                    variant="ghost"
                    size="sm"
                    onClick={() => onExport(option?.value)}
                    className="w-full justify-start text-left mb-1"
                  >
                    <Icon name={option?.icon} size={16} className="mr-2" />
                    {option?.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Create New Button */}
          <Button
            onClick={onCreateNew}
            size="sm"
            className="flex items-center space-x-2"
          >
            <Icon name="Plus" size={16} />
            <span className="hidden sm:inline">Add Center</span>
          </Button>

          {/* Emergency Actions */}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 border-warning text-warning hover:bg-warning hover:text-warning-foreground"
          >
            <Icon name="AlertTriangle" size={16} />
            <span className="hidden sm:inline">Emergency</span>
          </Button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedCenters?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Bulk actions for {selectedCenters?.length} evacuation center{selectedCenters?.length !== 1 ? 's' : ''}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkStatusUpdate('ready')}
                className="text-success border-success hover:bg-success hover:text-success-foreground"
              >
                <Icon name="CheckCircle" size={16} className="mr-1" />
                Activate All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkStatusUpdate('maintenance')}
                className="text-warning border-warning hover:bg-warning hover:text-warning-foreground"
              >
                <Icon name="AlertCircle" size={16} className="mr-1" />
                Maintenance
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CenterTableActions;