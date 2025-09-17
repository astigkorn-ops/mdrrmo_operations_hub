import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BulletinFilters = ({ onFiltersChange, activeFilters, onClearFilters }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...activeFilters,
      [key]: value
    });
  };

  const typeOptions = [
    { value: 'all', label: 'All Weather Types' },
    { value: 'typhoon', label: 'Typhoon' },
    { value: 'rainfall', label: 'Heavy Rainfall' },
    { value: 'thunderstorm', label: 'Thunderstorm' },
    { value: 'wind', label: 'Strong Winds' },
    { value: 'heat', label: 'Heat Index' },
    { value: 'flood', label: 'Flooding' },
    { value: 'general', label: 'General Advisory' }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severity Levels' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
    { value: 'info', label: 'Information Only' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'draft', label: 'Draft' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'published', label: 'Published' },
    { value: 'expired', label: 'Expired' },
    { value: 'archived', label: 'Archived' }
  ];

  const hasActiveFilters = Object.values(activeFilters)?.some(value => value !== 'all' && value !== '');

  return (
    <div className="bg-white border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Filter" size={20} className="mr-2" />
          Filter Weather Bulletins
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="lg:col-span-2">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Search Bulletins
          </label>
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="text"
              placeholder="Title, content, author..."
              value={activeFilters?.search || ''}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Weather Type
          </label>
          <Select
            value={activeFilters?.type || 'all'}
            onChange={(value) => handleFilterChange('type', value)}
            options={typeOptions}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Severity
          </label>
          <Select
            value={activeFilters?.severity || 'all'}
            onChange={(value) => handleFilterChange('severity', value)}
            options={severityOptions}
          />
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Date From
          </label>
          <Input
            type="date"
            value={activeFilters?.dateFrom || ''}
            onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Date To
          </label>
          <Input
            type="date"
            value={activeFilters?.dateTo || ''}
            onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
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
                  case 'type':
                    return `Type: ${typeOptions?.find(o => o?.value === filterValue)?.label}`;
                  case 'severity':
                    return `Severity: ${severityOptions?.find(o => o?.value === filterValue)?.label}`;
                  case 'status':
                    return `Status: ${statusOptions?.find(o => o?.value === filterValue)?.label}`;
                  case 'dateFrom':
                    return `From: ${new Date(filterValue)?.toLocaleDateString()}`;
                  case 'dateTo':
                    return `To: ${new Date(filterValue)?.toLocaleDateString()}`;
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

export default BulletinFilters;