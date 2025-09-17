import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarHeader = ({ 
  currentDate, 
  viewMode, 
  onViewModeChange, 
  onNavigate, 
  onAddEvent 
}) => {
  const formatHeaderDate = () => {
    const options = { 
      year: 'numeric', 
      month: 'long',
      ...(viewMode === 'day' && { day: 'numeric' })
    };
    return currentDate?.toLocaleDateString('en-US', options);
  };

  const viewModes = [
    { key: 'month', label: 'Month', icon: 'Calendar' },
    { key: 'week', label: 'Week', icon: 'CalendarDays' },
    { key: 'day', label: 'Day', icon: 'Clock' }
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('prev')}
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('today')}
          >
            Today
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('next')}
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
        
        <h2 className="text-xl font-semibold text-foreground">
          {formatHeaderDate()}
        </h2>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex items-center bg-muted rounded-lg p-1">
          {viewModes?.map((mode) => (
            <Button
              key={mode?.key}
              variant={viewMode === mode?.key ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange(mode?.key)}
              className="px-3"
            >
              <Icon name={mode?.icon} size={16} className="mr-1" />
              {mode?.label}
            </Button>
          ))}
        </div>

        <Button
          variant="default"
          onClick={onAddEvent}
          iconName="Plus"
          iconPosition="left"
        >
          Add Event
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;