import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulletinTableActions = ({
  selectedBulletins,
  onCreateNew,
  onBulkStatusUpdate,
  onEmergencyBroadcast,
  onExport,
  viewMode,
  onViewModeChange,
  totalCount,
  filteredCount
}) => {
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);

  const bulkStatusOptions = [
    { value: 'published', label: 'Publish Selected', icon: 'Send' },
    { value: 'scheduled', label: 'Schedule Selected', icon: 'Clock' },
    { value: 'draft', label: 'Move to Draft', icon: 'Edit' },
    { value: 'archived', label: 'Archive Selected', icon: 'Archive' }
  ];

  const exportOptions = [
    { value: 'pdf', label: 'Export as PDF', icon: 'FileText' },
    { value: 'csv', label: 'Export as CSV', icon: 'FileSpreadsheet' },
    { value: 'word', label: 'Export as Word', icon: 'FileText' }
  ];

  const handleBulkStatusUpdate = (status) => {
    onBulkStatusUpdate(selectedBulletins, status);
    setShowBulkActions(false);
  };

  const handleEmergencyBroadcast = () => {
    onEmergencyBroadcast();
    setShowEmergencyDialog(false);
  };

  return (
    <div className="bg-white border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Selected Count & Bulk Actions */}
        <div className="flex items-center space-x-4">
          {selectedBulletins?.length > 0 ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-foreground">
                {selectedBulletins?.length} selected
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
                      <h4 className="text-sm font-medium text-foreground mb-2">Bulk Operations</h4>
                      {bulkStatusOptions?.map((option) => (
                        <Button
                          key={option?.value}
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBulkStatusUpdate(option?.value)}
                          className="w-full justify-start text-left mb-1"
                        >
                          <Icon name={option?.icon} size={14} className="mr-2" />
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
              Showing {filteredCount} of {totalCount} weather bulletins
            </div>
          )}
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'active' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('active')}
              className="flex items-center space-x-2 px-3"
            >
              <Icon name="Eye" size={16} />
              <span className="hidden sm:inline">Active</span>
            </Button>
            <Button
              variant={viewMode === 'archived' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('archived')}
              className="flex items-center space-x-2 px-3"
            >
              <Icon name="Archive" size={16} />
              <span className="hidden sm:inline">Archived</span>
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

          {/* Emergency Broadcast */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEmergencyDialog(true)}
              className="flex items-center space-x-2 border-error text-error hover:bg-error hover:text-error-foreground"
            >
              <Icon name="AlertTriangle" size={16} />
              <span className="hidden sm:inline">Emergency Broadcast</span>
            </Button>

            {showEmergencyDialog && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-border rounded-lg shadow-lg z-50">
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="AlertTriangle" size={20} className="text-error" />
                    <h4 className="text-lg font-medium text-foreground">Emergency Broadcast</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    This will immediately send an emergency weather alert to all registered contacts via SMS, radio, and social media.
                  </p>
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowEmergencyDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleEmergencyBroadcast}
                      className="bg-error hover:bg-error/90 text-error-foreground"
                    >
                      <Icon name="Send" size={14} className="mr-1" />
                      Send Alert
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Create New Button */}
          <Button
            onClick={onCreateNew}
            size="sm"
            className="flex items-center space-x-2"
          >
            <Icon name="Plus" size={16} />
            <span className="hidden sm:inline">Create Bulletin</span>
          </Button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedBulletins?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Bulk actions for {selectedBulletins?.length} bulletin{selectedBulletins?.length !== 1 ? 's' : ''}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkStatusUpdate('published')}
                className="text-success border-success hover:bg-success hover:text-success-foreground"
              >
                <Icon name="Send" size={16} className="mr-1" />
                Publish All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkStatusUpdate('scheduled')}
                className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Icon name="Clock" size={16} className="mr-1" />
                Schedule All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkStatusUpdate('archived')}
                className="text-muted-foreground border-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Icon name="Archive" size={16} className="mr-1" />
                Archive All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulletinTableActions;