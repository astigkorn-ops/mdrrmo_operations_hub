import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingEventsList = ({ events, onEventClick, onManageParticipants }) => {
  const getEventTypeColor = (type) => {
    const colors = {
      training: 'text-blue-600 bg-blue-50 border-blue-200',
      drill: 'text-red-600 bg-red-50 border-red-200',
      meeting: 'text-green-600 bg-green-50 border-green-200',
      workshop: 'text-purple-600 bg-purple-50 border-purple-200',
      assessment: 'text-orange-600 bg-orange-50 border-orange-200'
    };
    return colors?.[type] || 'text-gray-600 bg-gray-50 border-gray-200';
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

  const formatEventDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow?.setDate(tomorrow?.getDate() + 1);

    if (date?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (date?.toDateString() === tomorrow?.toDateString()) {
      return 'Tomorrow';
    } else {
      return date?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date?.getFullYear() !== today?.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const formatEventTime = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  const getParticipantStatus = (event) => {
    const registered = event?.registeredParticipants || 0;
    const max = event?.maxParticipants;
    
    if (!max) return `${registered} registered`;
    
    const percentage = (registered / max) * 100;
    let status = 'Available';
    let statusColor = 'text-green-600';
    
    if (percentage >= 100) {
      status = 'Full';
      statusColor = 'text-red-600';
    } else if (percentage >= 80) {
      status = 'Almost Full';
      statusColor = 'text-orange-600';
    }
    
    return { registered, max, status, statusColor };
  };

  if (!events || events?.length === 0) {
    return (
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Events</h3>
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No upcoming events scheduled</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Upcoming Events</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {events?.length} event{events?.length !== 1 ? 's' : ''} in the next 7 days
        </p>
      </div>
      <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
        {events?.map((event) => {
          const participantInfo = getParticipantStatus(event);
          
          return (
            <div key={event?.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getEventTypeColor(event?.type)}`}>
                      <Icon name={getEventTypeIcon(event?.type)} size={12} className="mr-1" />
                      {event?.type?.charAt(0)?.toUpperCase() + event?.type?.slice(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {event?.department?.toUpperCase()}
                    </span>
                  </div>

                  <h4 
                    className="font-medium text-foreground mb-1 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => onEventClick(event)}
                  >
                    {event?.title}
                  </h4>

                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={14} />
                        <span>{formatEventDate(event?.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{formatEventTime(event?.date)}</span>
                      </div>
                    </div>

                    {event?.location && (
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={14} />
                        <span className="truncate">{event?.location}</span>
                      </div>
                    )}

                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={14} />
                      <span>
                        {typeof participantInfo === 'string' 
                          ? participantInfo 
                          : `${participantInfo?.registered}/${participantInfo?.max} registered`
                        }
                      </span>
                      {typeof participantInfo === 'object' && (
                        <span className={`font-medium ${participantInfo?.statusColor}`}>
                          • {participantInfo?.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEventClick(event)}
                  >
                    <Icon name="Edit" size={14} className="mr-1" />
                    Edit
                  </Button>
                  
                  {event?.requiresRegistration && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onManageParticipants(event)}
                    >
                      <Icon name="Users" size={14} className="mr-1" />
                      Manage
                    </Button>
                  )}
                </div>
              </div>
              {event?.description && (
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {event?.description}
                </p>
              )}
              {event?.resources && (
                <div className="mt-2 flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Package" size={12} />
                  <span>Resources: {event?.resources}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingEventsList;