import React from 'react';
import Icon from '../../../components/AppIcon';


const CalendarGrid = ({ 
  currentDate, 
  viewMode, 
  events, 
  onDateClick, 
  onEventClick 
}) => {
  const getEventTypeColor = (type) => {
    const colors = {
      training: 'bg-blue-100 text-blue-800 border-blue-200',
      drill: 'bg-red-100 text-red-800 border-red-200',
      meeting: 'bg-green-100 text-green-800 border-green-200',
      workshop: 'bg-purple-100 text-purple-800 border-purple-200',
      assessment: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors?.[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getEventTypeIcon = (type) => {
    const icons = {
      training: 'GraduationCap',
      drill: 'Siren',
      meeting: 'Users',
      workshop: 'Wrench',
      assessment: 'ClipboardCheck'
    };
    return icons?.[type] || 'Calendar';
  };

  const renderMonthView = () => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(startOfMonth);
    startDate?.setDate(startDate?.getDate() - startOfMonth?.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days?.push(new Date(current));
      current?.setDate(current?.getDate() + 1);
    }

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();

    return (
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 bg-muted">
          {dayNames?.map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground border-r border-border last:border-r-0">
              {day}
            </div>
          ))}
        </div>
        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {days?.map((day, index) => {
            const isCurrentMonth = day?.getMonth() === currentDate?.getMonth();
            const isToday = day?.toDateString() === today?.toDateString();
            const dayEvents = events?.filter(event => 
              new Date(event.date)?.toDateString() === day?.toDateString()
            );

            return (
              <div
                key={index}
                className={`min-h-[120px] p-2 border-r border-b border-border last:border-r-0 cursor-pointer hover:bg-muted/50 transition-colors ${
                  !isCurrentMonth ? 'bg-muted/20 text-muted-foreground' : ''
                } ${isToday ? 'bg-primary/5' : ''}`}
                onClick={() => onDateClick(day)}
              >
                <div className={`text-sm font-medium mb-1 ${
                  isToday ? 'text-primary' : isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {day?.getDate()}
                </div>
                <div className="space-y-1">
                  {dayEvents?.slice(0, 3)?.map((event) => (
                    <div
                      key={event?.id}
                      className={`text-xs px-2 py-1 rounded border cursor-pointer hover:shadow-sm transition-shadow ${getEventTypeColor(event?.type)}`}
                      onClick={(e) => {
                        e?.stopPropagation();
                        onEventClick(event);
                      }}
                    >
                      <div className="flex items-center space-x-1">
                        <Icon name={getEventTypeIcon(event?.type)} size={10} />
                        <span className="truncate">{event?.title}</span>
                      </div>
                    </div>
                  ))}
                  {dayEvents?.length > 3 && (
                    <div className="text-xs text-muted-foreground px-2">
                      +{dayEvents?.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek?.setDate(currentDate?.getDate() - currentDate?.getDay());
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day?.setDate(startOfWeek?.getDate() + i);
      weekDays?.push(day);
    }

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const today = new Date();

    return (
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        {/* Week header */}
        <div className="grid grid-cols-8 bg-muted border-b border-border">
          <div className="p-3 text-sm font-medium text-muted-foreground">Time</div>
          {weekDays?.map((day) => {
            const isToday = day?.toDateString() === today?.toDateString();
            return (
              <div key={day?.toISOString()} className={`p-3 text-center border-l border-border ${
                isToday ? 'bg-primary/5' : ''
              }`}>
                <div className={`text-sm font-medium ${isToday ? 'text-primary' : 'text-foreground'}`}>
                  {day?.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`text-lg font-bold ${isToday ? 'text-primary' : 'text-foreground'}`}>
                  {day?.getDate()}
                </div>
              </div>
            );
          })}
        </div>
        {/* Week grid */}
        <div className="max-h-[600px] overflow-y-auto">
          {hours?.map((hour) => (
            <div key={hour} className="grid grid-cols-8 border-b border-border last:border-b-0">
              <div className="p-2 text-xs text-muted-foreground bg-muted/50 border-r border-border">
                {hour?.toString()?.padStart(2, '0')}:00
              </div>
              {weekDays?.map((day) => {
                const dayEvents = events?.filter(event => {
                  const eventDate = new Date(event.date);
                  const eventHour = eventDate?.getHours();
                  return eventDate?.toDateString() === day?.toDateString() && eventHour === hour;
                });

                return (
                  <div
                    key={`${day?.toISOString()}-${hour}`}
                    className="min-h-[60px] p-1 border-l border-border cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => onDateClick(new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour))}
                  >
                    {dayEvents?.map((event) => (
                      <div
                        key={event?.id}
                        className={`text-xs px-2 py-1 rounded border mb-1 cursor-pointer hover:shadow-sm transition-shadow ${getEventTypeColor(event?.type)}`}
                        onClick={(e) => {
                          e?.stopPropagation();
                          onEventClick(event);
                        }}
                      >
                        <div className="flex items-center space-x-1">
                          <Icon name={getEventTypeIcon(event?.type)} size={10} />
                          <span className="truncate">{event?.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const dayEvents = events?.filter(event => 
      new Date(event.date)?.toDateString() === currentDate?.toDateString()
    );

    return (
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        {/* Day header */}
        <div className="p-4 bg-muted border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">
            {currentDate?.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {dayEvents?.length} event{dayEvents?.length !== 1 ? 's' : ''} scheduled
          </p>
        </div>
        {/* Day timeline */}
        <div className="max-h-[600px] overflow-y-auto">
          {hours?.map((hour) => {
            const hourEvents = dayEvents?.filter(event => 
              new Date(event.date)?.getHours() === hour
            );

            return (
              <div key={hour} className="flex border-b border-border last:border-b-0">
                <div className="w-20 p-3 text-sm text-muted-foreground bg-muted/50 border-r border-border">
                  {hour?.toString()?.padStart(2, '0')}:00
                </div>
                <div 
                  className="flex-1 min-h-[80px] p-3 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => onDateClick(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hour))}
                >
                  <div className="space-y-2">
                    {hourEvents?.map((event) => (
                      <div
                        key={event?.id}
                        className={`p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-shadow ${getEventTypeColor(event?.type)}`}
                        onClick={(e) => {
                          e?.stopPropagation();
                          onEventClick(event);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Icon name={getEventTypeIcon(event?.type)} size={16} />
                            <span className="font-medium">{event?.title}</span>
                          </div>
                          <span className="text-xs">
                            {new Date(event.date)?.toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                        {event?.location && (
                          <div className="flex items-center space-x-1 mt-1">
                            <Icon name="MapPin" size={12} />
                            <span className="text-xs">{event?.location}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (viewMode === 'week') return renderWeekView();
  if (viewMode === 'day') return renderDayView();
  return renderMonthView();
};

export default CalendarGrid;