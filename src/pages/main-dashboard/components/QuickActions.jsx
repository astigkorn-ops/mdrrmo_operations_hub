import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const [showCreateIncident, setShowCreateIncident] = useState(false);
  const [showPublishAdvisory, setShowPublishAdvisory] = useState(false);
  const [showScheduleEvent, setShowScheduleEvent] = useState(false);

  const quickActions = [
    {
      id: 'create-incident',
      title: 'Create New Incident',
      description: 'Report and track a new emergency incident',
      icon: 'AlertTriangle',
      variant: 'error',
      action: () => window.location.href = '/incident-management'
    },
    {
      id: 'publish-advisory',
      title: 'Publish Advisory',
      description: 'Create and publish public safety advisory',
      icon: 'Megaphone',
      variant: 'warning',
      action: () => window.location.href = '/public-advisories'
    },
    {
      id: 'schedule-event',
      title: 'Schedule Event',
      description: 'Add training or community event to calendar',
      icon: 'Calendar',
      variant: 'success',
      action: () => window.location.href = '/event-calendar'
    },
    {
      id: 'emergency-broadcast',
      title: 'Emergency Broadcast',
      description: 'Send immediate alert to all channels',
      icon: 'Radio',
      variant: 'error',
      action: () => setShowCreateIncident(true)
    }
  ];

  const recentShortcuts = [
    {
      id: 'incident-reports',
      title: 'Incident Reports',
      icon: 'FileText',
      count: 12,
      action: () => window.location.href = '/incident-management'
    },
    {
      id: 'active-advisories',
      title: 'Active Advisories',
      icon: 'Bell',
      count: 3,
      action: () => window.location.href = '/public-advisories'
    },
    {
      id: 'upcoming-events',
      title: 'Upcoming Events',
      icon: 'Clock',
      count: 5,
      action: () => window.location.href = '/event-calendar'
    },
    {
      id: 'resource-status',
      title: 'Resource Status',
      icon: 'Package',
      count: 8,
      action: () => {}
    }
  ];

  const getVariantStyles = (variant) => {
    switch (variant) {
      case 'error':
        return 'border-error/20 bg-error/5 hover:bg-error/10';
      case 'warning':
        return 'border-warning/20 bg-warning/5 hover:bg-warning/10';
      case 'success':
        return 'border-success/20 bg-success/5 hover:bg-success/10';
      default:
        return 'border-border bg-card hover:bg-muted/50';
    }
  };

  const getIconStyles = (variant) => {
    switch (variant) {
      case 'error':
        return 'bg-error text-error-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'success':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">Frequently used operations</p>
          </div>
          <Icon name="Zap" size={20} className="text-muted-foreground" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className={`p-4 rounded-lg border text-left transition-all duration-200 ${getVariantStyles(action?.variant)}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${getIconStyles(action?.variant)}`}>
                  <Icon name={action?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    {action?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {action?.description}
                  </p>
                </div>
                <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Recent Shortcuts */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Shortcuts</h3>
            <p className="text-sm text-muted-foreground">Quick access to common tasks</p>
          </div>
          <Button variant="ghost" size="sm">
            <Icon name="MoreHorizontal" size={16} />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {recentShortcuts?.map((shortcut) => (
            <button
              key={shortcut?.id}
              onClick={shortcut?.action}
              className="p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors duration-200 text-center"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                  <Icon name={shortcut?.icon} size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">
                    {shortcut?.title}
                  </h4>
                  <div className="flex items-center justify-center mt-1">
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full bg-primary text-primary-foreground">
                      {shortcut?.count}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;