import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'incident',
      title: 'New Incident Reported',
      description: 'Flooding reported in Barangay San Isidro - Level 2 Alert',
      timestamp: new Date(Date.now() - 300000),
      icon: 'AlertTriangle',
      variant: 'error',
      actionLabel: 'View Details'
    },
    {
      id: 2,
      type: 'advisory',
      title: 'Weather Advisory Published',
      description: 'Typhoon Signal No. 1 raised over Albay Province',
      timestamp: new Date(Date.now() - 900000),
      icon: 'Megaphone',
      variant: 'warning',
      actionLabel: 'View Advisory'
    },
    {
      id: 3,
      type: 'event',
      title: 'Training Scheduled',
      description: 'Community Emergency Response Training - September 20, 2025',
      timestamp: new Date(Date.now() - 1800000),
      icon: 'Calendar',
      variant: 'success',
      actionLabel: 'View Event'
    },
    {
      id: 4,
      type: 'system',
      title: 'Resource Update',
      description: 'Emergency supplies inventory updated - 95% capacity',
      timestamp: new Date(Date.now() - 3600000),
      icon: 'Package',
      variant: 'default',
      actionLabel: 'View Resources'
    },
    {
      id: 5,
      type: 'incident',
      title: 'Incident Resolved',
      description: 'Road clearing completed on Maharlika Highway',
      timestamp: new Date(Date.now() - 7200000),
      icon: 'CheckCircle',
      variant: 'success',
      actionLabel: 'View Report'
    }
  ];

  const getVariantStyles = (variant) => {
    switch (variant) {
      case 'error':
        return 'text-error bg-error/10';
      case 'warning':
        return 'text-warning bg-warning/10';
      case 'success':
        return 'text-success bg-success/10';
      default:
        return 'text-primary bg-primary/10';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return timestamp?.toLocaleDateString();
    }
  };

  const handleActivityAction = (activity) => {
    switch (activity?.type) {
      case 'incident':
        window.location.href = '/incident-management';
        break;
      case 'advisory':
        window.location.href = '/public-advisories';
        break;
      case 'event':
        window.location.href = '/event-calendar';
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <Button variant="ghost" size="sm">
            <Icon name="MoreHorizontal" size={16} />
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {activities?.map((activity) => (
          <div key={activity?.id} className="p-4 hover:bg-muted/50 transition-colors duration-150">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${getVariantStyles(activity?.variant)}`}>
                <Icon name={activity?.icon} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {activity?.title}
                  </h4>
                  <span className="text-xs text-muted-foreground ml-2">
                    {formatTimestamp(activity?.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {activity?.description}
                </p>
                
                <div className="flex items-center justify-between mt-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    activity?.variant === 'error' ? 'bg-error/10 text-error' :
                    activity?.variant === 'warning' ? 'bg-warning/10 text-warning' :
                    activity?.variant === 'success'? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
                  }`}>
                    {activity?.type?.charAt(0)?.toUpperCase() + activity?.type?.slice(1)}
                  </span>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleActivityAction(activity)}
                  >
                    {activity?.actionLabel}
                    <Icon name="ArrowRight" size={14} className="ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="ghost" fullWidth>
          View All Activities
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ActivityFeed;