import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CriticalInfoCards = () => {
  const emergencyAlerts = [
    {
      id: 1,
      type: "Emergency Alert",
      level: "High",
      title: "Flash Flood Warning",
      description: "Heavy rainfall may cause flash floods in low-lying areas. Residents are advised to stay alert and avoid crossing flooded roads.",
      location: "Barangay Poblacion, Pio Duran",
      issuedAt: "2025-09-17T16:45:00",
      status: "Active"
    },
    {
      id: 2,
      type: "Public Advisory",
      level: "Medium",
      title: "Road Closure Notice",
      description: "Maharlika Highway (Km 485-487) temporarily closed due to landslide clearing operations. Use alternate routes.",
      location: "Maharlika Highway",
      issuedAt: "2025-09-17T14:30:00",
      status: "Active"
    }
  ];

  const emergencyHotlines = [
    {
      category: "Emergency Services",
      contacts: [
        { name: "Emergency Hotline", number: "911", available: "24/7" },
        { name: "MDRRMO Operations", number: "(052) 888-0000", available: "24/7" },
        { name: "Fire Department", number: "(052) 481-1234", available: "24/7" },
        { name: "Police Station", number: "(052) 481-5678", available: "24/7" }
      ]
    },
    {
      category: "Medical Services",
      contacts: [
        { name: "Pio Duran Hospital", number: "(052) 481-9999", available: "24/7" },
        { name: "Red Cross Albay", number: "(052) 482-1111", available: "24/7" },
        { name: "Ambulance Service", number: "(052) 481-2222", available: "24/7" }
      ]
    }
  ];

  const quickActions = [
    {
      title: "Find Evacuation Centers",
      description: "Locate nearest evacuation centers and check availability",
      icon: "Shield",
      color: "text-success",
      bgColor: "bg-success/10",
      action: () => window.location.href = '/resources/centers'
    },
    {
      title: "Report Incident",
      description: "Report emergencies, hazards, or incidents to authorities",
      icon: "AlertTriangle",
      color: "text-error",
      bgColor: "bg-error/10",
      action: () => window.location.href = '/contact/report'
    },
    {
      title: "Emergency Preparedness",
      description: "Access guides, checklists, and preparedness resources",
      icon: "BookOpen",
      color: "text-primary",
      bgColor: "bg-primary/10",
      action: () => window.location.href = '/preparedness'
    },
    {
      title: "Weather Updates",
      description: "Get latest weather bulletins and forecasts",
      icon: "Cloud",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      action: () => window.location.href = '/public-advisories/weather'
    }
  ];

  const getAlertLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'high': return 'border-error bg-error/5';
      case 'medium': return 'border-warning bg-warning/5';
      case 'low': return 'border-primary bg-primary/5';
      default: return 'border-border bg-muted/5';
    }
  };

  const getAlertLevelBadge = (level) => {
    switch (level?.toLowerCase()) {
      case 'high': return 'bg-error text-error-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Emergency Alerts Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground flex items-center">
            <Icon name="AlertTriangle" size={24} className="mr-3 text-error" />
            Emergency Alerts
          </h2>
          <Button variant="outline" size="sm">
            <Icon name="Bell" size={16} className="mr-2" />
            Subscribe to Alerts
          </Button>
        </div>

        <div className="grid gap-4">
          {emergencyAlerts?.map((alert) => (
            <div key={alert?.id} className={`border rounded-lg p-4 ${getAlertLevelColor(alert?.level)}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                    <Icon name="AlertTriangle" size={20} className="text-error" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{alert?.title}</h3>
                    <p className="text-sm text-muted-foreground">{alert?.location}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAlertLevelBadge(alert?.level)}`}>
                  {alert?.level} Priority
                </span>
              </div>
              
              <p className="text-sm text-foreground mb-3">{alert?.description}</p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Issued: {new Date(alert.issuedAt)?.toLocaleString('en-PH')}</span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-success rounded-full mr-1"></div>
                  {alert?.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Emergency Hotlines Section */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center">
          <Icon name="Phone" size={24} className="mr-3 text-primary" />
          Emergency Hotlines
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {emergencyHotlines?.map((category, index) => (
            <div key={index} className="bg-white border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-3">{category?.category}</h3>
              <div className="space-y-2">
                {category?.contacts?.map((contact, contactIndex) => (
                  <div key={contactIndex} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                    <div>
                      <div className="text-sm font-medium text-foreground">{contact?.name}</div>
                      <div className="text-xs text-muted-foreground">{contact?.available}</div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Icon name="Phone" size={14} className="mr-1" />
                      {contact?.number}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions Section */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center">
          <Icon name="Zap" size={24} className="mr-3 text-accent" />
          Quick Actions
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions?.map((action, index) => (
            <button
              key={index}
              onClick={action?.action}
              className="bg-white border border-border rounded-lg p-4 text-left hover:shadow-md transition-all duration-200 hover:border-primary/50"
            >
              <div className={`w-12 h-12 rounded-lg ${action?.bgColor} flex items-center justify-center mb-3`}>
                <Icon name={action?.icon} size={24} className={action?.color} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{action?.title}</h3>
              <p className="text-sm text-muted-foreground">{action?.description}</p>
              <div className="mt-3 flex items-center text-primary text-sm font-medium">
                <span>Access Now</span>
                <Icon name="ArrowRight" size={16} className="ml-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CriticalInfoCards;