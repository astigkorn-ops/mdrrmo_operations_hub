import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CenterFilters = ({ onFiltersChange, activeFilters, onClearFilters }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...activeFilters,
      [key]: value
    });
  };

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'operational', label: 'Operational' },
    { value: 'ready', label: 'Ready' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'full', label: 'Full Capacity' },
    { value: 'closed', label: 'Closed' }
  ];

  const capacityOptions = [
    { value: 'all', label: 'All Capacity' },
    { value: 'available', label: 'Available (<80%)' },
    { value: 'nearly_full', label: 'Nearly Full (60-90%)' },
    { value: 'full', label: 'Full (>90%)' }
  ];

  const accessibilityOptions = [
    { value: 'all', label: 'All Features' },
    { value: 'wheelchair', label: 'Wheelchair Access' },
    { value: 'medical', label: 'Medical Support' },
    { value: 'ramp', label: 'Ramp Access' }
  ];

  const barangayOptions = [
    { value: 'all', label: 'All Barangays' },
    { value: 'poblacion', label: 'Poblacion' },
    { value: 'san roque', label: 'San Roque' },
    { value: 'santa cruz', label: 'Santa Cruz' },
    { value: 'bagumbayan', label: 'Bagumbayan' },
    { value: 'san jose', label: 'San Jose' },
    { value: 'san antonio', label: 'San Antonio' }
  ];

  const hasActiveFilters = Object.values(activeFilters)?.some(value => value !== 'all' && value !== '');

  return (
    <div className="bg-white border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Filter" size={20} className="mr-2" />
          Filter Evacuation Centers
        </h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={16} className="mr-1" />
            Clear Filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Search Centers
          </label>
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="text"
              placeholder="Name, address, barangay..."
              value={activeFilters?.search || ''}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Status
          </label>
          <Select
            value={activeFilters?.status || 'all'}
            onChange={(value) => handleFilterChange('status', value)}
            options={statusOptions}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Capacity
          </label>
          <Select
            value={activeFilters?.capacity || 'all'}
            onChange={(value) => handleFilterChange('capacity', value)}
            options={capacityOptions}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Accessibility
          </label>
          <Select
            value={activeFilters?.accessibility || 'all'}
            onChange={(value) => handleFilterChange('accessibility', value)}
            options={accessibilityOptions}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Barangay
          </label>
          <Select
            value={activeFilters?.barangay || 'all'}
            onChange={(value) => handleFilterChange('barangay', value)}
            options={barangayOptions}
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters)?.map(([key, value]) => {
              if (value === 'all' || value === '') return null;
              
              const getFilterLabel = (filterKey, filterValue) => {
                switch (filterKey) {
                  case 'search':
                    return `Search: "${filterValue}"`;
                  case 'status':
                    return `Status: ${statusOptions?.find(o => o?.value === filterValue)?.label}`;
                  case 'capacity':
                    return `Capacity: ${capacityOptions?.find(o => o?.value === filterValue)?.label}`;
                  case 'accessibility':
                    return `Accessibility: ${accessibilityOptions?.find(o => o?.value === filterValue)?.label}`;
                  case 'barangay':
                    return `Barangay: ${barangayOptions?.find(o => o?.value === filterValue)?.label}`;
                  default:
                    return `${filterKey}: ${filterValue}`;
                }
              };

              return (
                <span
                  key={key}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                >
                  {getFilterLabel(key, value)}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFilterChange(key, key === 'search' ? '' : 'all')}
                    className="ml-2 h-4 w-4 p-0 hover:bg-primary/20"
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CenterFilters;