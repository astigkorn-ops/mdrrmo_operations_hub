import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const CalendarFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters 
}) => {
  const eventTypeOptions = [
    { value: 'all', label: 'All Event Types' },
    { value: 'training', label: 'Training Sessions' },
    { value: 'drill', label: 'Emergency Drills' },
    { value: 'meeting', label: 'Community Meetings' },
    { value: 'workshop', label: 'Preparedness Workshops' },
    { value: 'assessment', label: 'Risk Assessments' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'mdrrmo', label: 'MDRRMO' },
    { value: 'bfp', label: 'Bureau of Fire Protection' },
    { value: 'pnp', label: 'Philippine National Police' },
    { value: 'health', label: 'Municipal Health Office' },
    { value: 'engineering', label: 'Municipal Engineering' },
    { value: 'social', label: 'Social Welfare Office' }
  ];

  const participantGroupOptions = [
    { value: 'all', label: 'All Participants' },
    { value: 'staff', label: 'MDRRMO Staff' },
    { value: 'volunteers', label: 'Volunteers' },
    { value: 'community', label: 'Community Leaders' },
    { value: 'students', label: 'Students' },
    { value: 'businesses', label: 'Business Owners' },
    { value: 'officials', label: 'Government Officials' }
  ];

  const hasActiveFilters = filters?.eventType !== 'all' || 
                          filters?.department !== 'all' || 
                          filters?.participantGroup !== 'all';

  return (
    <div className="bg-white border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-end gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
          <Select
            label="Event Type"
            options={eventTypeOptions}
            value={filters?.eventType}
            onChange={(value) => onFilterChange('eventType', value)}
            className="w-full"
          />

          <Select
            label="Department"
            options={departmentOptions}
            value={filters?.department}
            onChange={(value) => onFilterChange('department', value)}
            className="w-full"
          />

          <Select
            label="Participant Group"
            options={participantGroupOptions}
            value={filters?.participantGroup}
            onChange={(value) => onFilterChange('participantGroup', value)}
            className="w-full"
          />
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            className="lg:mb-0"
          >
            Clear Filters
          </Button>
        )}
      </div>
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters?.eventType !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {eventTypeOptions?.find(opt => opt?.value === filters?.eventType)?.label}
            </span>
          )}
          {filters?.department !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full">
              {departmentOptions?.find(opt => opt?.value === filters?.department)?.label}
            </span>
          )}
          {filters?.participantGroup !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
              {participantGroupOptions?.find(opt => opt?.value === filters?.participantGroup)?.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarFilters;