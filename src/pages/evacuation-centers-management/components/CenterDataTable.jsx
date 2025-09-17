import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const CenterDataTable = ({
  centers,
  selectedCenters,
  onSelectionChange,
  onCenterEdit,
  onCenterView,
  onStatusUpdate,
  onOccupancyUpdate,
  sortConfig,
  onSort
}) => {
  const [editingOccupancy, setEditingOccupancy] = useState(null);
  const [occupancyValue, setOccupancyValue] = useState('');

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'operational': return 'bg-success text-success-foreground';
      case 'ready': return 'bg-primary text-primary-foreground';
      case 'maintenance': return 'bg-warning text-warning-foreground';
      case 'full': return 'bg-error text-error-foreground';
      case 'closed': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCapacityColor = (occupancyRate) => {
    if (occupancyRate >= 90) return 'text-error';
    if (occupancyRate >= 70) return 'text-warning';
    if (occupancyRate >= 50) return 'text-accent';
    return 'text-success';
  };

  const getAccessibilityIcons = (features) => {
    const iconMap = {
      wheelchair: 'Accessibility',
      medical: 'Cross',
      ramp: 'TrendingUp'
    };
    return features?.map(feature => iconMap?.[feature] || 'Check')?.slice(0, 3);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-PH', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(centers?.map(center => center?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectCenter = (centerId, checked) => {
    if (checked) {
      onSelectionChange([...selectedCenters, centerId]);
    } else {
      onSelectionChange(selectedCenters?.filter(id => id !== centerId));
    }
  };

  const handleOccupancyEdit = (center) => {
    setEditingOccupancy(center?.id);
    setOccupancyValue(center?.currentOccupancy?.toString());
  };

  const handleOccupancySave = (centerId) => {
    const newOccupancy = parseInt(occupancyValue, 10);
    if (!isNaN(newOccupancy) && newOccupancy >= 0) {
      onOccupancyUpdate(centerId, newOccupancy);
    }
    setEditingOccupancy(null);
    setOccupancyValue('');
  };

  const handleOccupancyCancel = () => {
    setEditingOccupancy(null);
    setOccupancyValue('');
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const columns = [
    { key: 'select', label: '', sortable: false, width: 'w-12' },
    { key: 'name', label: 'Center Name', sortable: true, width: 'flex-1' },
    { key: 'barangay', label: 'Barangay', sortable: true, width: 'w-32' },
    { key: 'occupancyRate', label: 'Capacity', sortable: true, width: 'w-40' },
    { key: 'status', label: 'Status', sortable: true, width: 'w-32' },
    { key: 'accessibilityFeatures', label: 'Features', sortable: false, width: 'w-24' },
    { key: 'contactPerson', label: 'Contact', sortable: true, width: 'w-40' },
    { key: 'lastUpdated', label: 'Updated', sortable: true, width: 'w-32' },
    { key: 'actions', label: 'Actions', sortable: false, width: 'w-40' }
  ];

  const isAllSelected = centers?.length > 0 && selectedCenters?.length === centers?.length;
  const isPartiallySelected = selectedCenters?.length > 0 && selectedCenters?.length < centers?.length;

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
            {centers?.map((center) => {
              const occupancyRate = (center?.currentOccupancy / center?.maxCapacity) * 100;
              return (
                <tr
                  key={center?.id}
                  className={`border-b border-border hover:bg-muted/30 transition-colors duration-150 ${
                    selectedCenters?.includes(center?.id) ? 'bg-primary/5' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={selectedCenters?.includes(center?.id)}
                      onChange={(e) => handleSelectCenter(center?.id, e?.target?.checked)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-foreground">{center?.name}</p>
                      <p className="text-sm text-muted-foreground">{center?.address}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={14} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{center?.barangay}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        {editingOccupancy === center?.id ? (
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              value={occupancyValue}
                              onChange={(e) => setOccupancyValue(e?.target?.value)}
                              className="w-16 h-8 text-xs"
                              min="0"
                              max={center?.maxCapacity}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOccupancySave(center?.id)}
                              className="h-6 w-6 p-0"
                            >
                              <Icon name="Check" size={12} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleOccupancyCancel}
                              className="h-6 w-6 p-0"
                            >
                              <Icon name="X" size={12} />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOccupancyEdit(center)}
                            className="h-auto p-0 text-left"
                          >
                            <span className={`text-sm font-medium ${getCapacityColor(occupancyRate)}`}>
                              {center?.currentOccupancy} / {center?.maxCapacity}
                            </span>
                          </Button>
                        )}
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            occupancyRate >= 90 ? 'bg-error' :
                            occupancyRate >= 70 ? 'bg-warning' :
                            occupancyRate >= 50 ? 'bg-accent' : 'bg-success'
                          }`}
                          style={{ width: `${Math.min(occupancyRate, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {occupancyRate?.toFixed(1)}% occupied
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(center?.status)}`}>
                      {center?.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-1">
                      {getAccessibilityIcons(center?.accessibilityFeatures)?.map((iconName, index) => (
                        <Icon
                          key={index}
                          name={iconName}
                          size={14}
                          className="text-muted-foreground"
                          title={center?.accessibilityFeatures?.[index]}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{center?.contactPerson}</p>
                      <p className="text-xs text-muted-foreground">{center?.contactNumber}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(center?.lastUpdated)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onCenterView(center)}
                        className="h-8 w-8 p-0"
                        title="View Details"
                      >
                        <Icon name="Eye" size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onCenterEdit(center)}
                        className="h-8 w-8 p-0"
                        title="Edit Center"
                      >
                        <Icon name="Edit" size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onStatusUpdate(center?.id, center?.status === 'operational' ? 'ready' : 'operational')}
                        className="h-8 w-8 p-0"
                        title="Toggle Status"
                      >
                        <Icon name="ToggleLeft" size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-4 p-4">
        {centers?.map((center) => {
          const occupancyRate = (center?.currentOccupancy / center?.maxCapacity) * 100;
          return (
            <div
              key={center?.id}
              className={`border border-border rounded-lg p-4 ${
                selectedCenters?.includes(center?.id) ? 'border-primary bg-primary/5' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={selectedCenters?.includes(center?.id)}
                    onChange={(e) => handleSelectCenter(center?.id, e?.target?.checked)}
                  />
                  <div>
                    <h4 className="font-medium text-foreground">{center?.name}</h4>
                    <p className="text-sm text-muted-foreground">{center?.barangay}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCenterView(center)}
                    className="h-8 w-8 p-0"
                  >
                    <Icon name="Eye" size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCenterEdit(center)}
                    className="h-8 w-8 p-0"
                  >
                    <Icon name="Edit" size={14} />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-xs text-muted-foreground">Capacity</span>
                  <div className="mt-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-medium ${getCapacityColor(occupancyRate)}`}>
                        {center?.currentOccupancy} / {center?.maxCapacity}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {occupancyRate?.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          occupancyRate >= 90 ? 'bg-error' :
                          occupancyRate >= 70 ? 'bg-warning' :
                          occupancyRate >= 50 ? 'bg-accent' : 'bg-success'
                        }`}
                        style={{ width: `${Math.min(occupancyRate, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(center?.status)}`}>
                      {center?.status}
                    </span>
                    <div className="flex space-x-1">
                      {getAccessibilityIcons(center?.accessibilityFeatures)?.map((iconName, index) => (
                        <Icon
                          key={index}
                          name={iconName}
                          size={12}
                          className="text-muted-foreground"
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(center?.lastUpdated)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {centers?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Home" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No evacuation centers found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or add a new evacuation center.</p>
        </div>
      )}
    </div>
  );
};

export default CenterDataTable;