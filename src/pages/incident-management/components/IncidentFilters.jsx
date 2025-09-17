import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const IncidentFilters = ({ onFiltersChange, activeFilters, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(activeFilters);

  const incidentTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'flood', label: 'Flood' },
    { value: 'typhoon', label: 'Typhoon' },
    { value: 'earthquake', label: 'Earthquake' },
    { value: 'landslide', label: 'Landslide' },
    { value: 'fire', label: 'Fire' },
    { value: 'accident', label: 'Vehicle Accident' },
    { value: 'medical', label: 'Medical Emergency' },
    { value: 'other', label: 'Other' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'reported', label: 'Reported' },
    { value: 'investigating', label: 'Investigating' },
    { value: 'responding', label: 'Responding' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severity' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'poblacion', label: 'Poblacion' },
    { value: 'bagumbayan', label: 'Bagumbayan' },
    { value: 'san-roque', label: 'San Roque' },
    { value: 'san-antonio', label: 'San Antonio' },
    { value: 'san-jose', label: 'San Jose' },
    { value: 'santa-cruz', label: 'Santa Cruz' },
    { value: 'other', label: 'Other Areas' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      search: '',
      type: 'all',
      status: 'all',
      severity: 'all',
      location: 'all',
      dateFrom: '',
      dateTo: ''
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters?.search) count++;
    if (localFilters?.type !== 'all') count++;
    if (localFilters?.status !== 'all') count++;
    if (localFilters?.severity !== 'all') count++;
    if (localFilters?.location !== 'all') count++;
    if (localFilters?.dateFrom) count++;
    if (localFilters?.dateTo) count++;
    return count;
  };

  return (
    <div className="bg-white border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full bg-primary text-primary-foreground">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={16} className="mr-1" />
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="mr-1" 
            />
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>
      {/* Quick Search */}
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search incidents by ID, description, or location..."
          value={localFilters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="max-w-md"
        />
      </div>
      {/* Advanced Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
          <Select
            label="Incident Type"
            options={incidentTypeOptions}
            value={localFilters?.type}
            onChange={(value) => handleFilterChange('type', value)}
          />

          <Select
            label="Status"
            options={statusOptions}
            value={localFilters?.status}
            onChange={(value) => handleFilterChange('status', value)}
          />

          <Select
            label="Severity"
            options={severityOptions}
            value={localFilters?.severity}
            onChange={(value) => handleFilterChange('severity', value)}
          />

          <Select
            label="Location"
            options={locationOptions}
            value={localFilters?.location}
            onChange={(value) => handleFilterChange('location', value)}
          />

          <Input
            type="date"
            label="Date From"
            value={localFilters?.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
          />

          <Input
            type="date"
            label="Date To"
            value={localFilters?.dateTo}
            onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
          />
        </div>
      )}
    </div>
  );
};

export default IncidentFilters;