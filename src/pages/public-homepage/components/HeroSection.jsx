import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const currentDate = new Date()?.toLocaleDateString('en-PH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const keyStats = [
    {
      label: "Active Incidents",
      value: "3",
      icon: "AlertTriangle",
      color: "text-error",
      bgColor: "bg-error/10"
    },
    {
      label: "Evacuation Centers",
      value: "12",
      icon: "Shield",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      label: "Weather Alerts",
      value: "1",
      icon: "Cloud",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      label: "Response Teams",
      value: "8",
      icon: "Users",
      color: "text-primary",
      bgColor: "bg-primary/10"
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-b border-border">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-12 lg:py-16">
        {/* Main Hero Content */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Icon name="Shield" size={32} color="white" />
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            MDRRMO Operations Hub
          </h1>
          
          <p className="text-xl text-muted-foreground mb-2 max-w-3xl mx-auto">
            Municipal Disaster Risk Reduction and Management Office
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your trusted source for emergency information, disaster preparedness, and community safety resources in Pio Duran, Albay
          </p>

          <div className="text-sm text-muted-foreground mb-8">
            <Icon name="Calendar" size={16} className="inline mr-2" />
            {currentDate}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" className="min-w-48">
              <Icon name="AlertTriangle" size={20} className="mr-2" />
              Report Emergency
            </Button>
            <Button variant="outline" size="lg" className="min-w-48">
              <Icon name="MapPin" size={20} className="mr-2" />
              Find Evacuation Center
            </Button>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {keyStats?.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm border border-border rounded-lg p-4 lg:p-6 text-center hover:shadow-md transition-all duration-200">
              <div className={`w-12 h-12 lg:w-16 lg:h-16 ${stat?.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <Icon name={stat?.icon} size={24} className={stat?.color} />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{stat?.value}</div>
              <div className="text-sm lg:text-base text-muted-foreground">{stat?.label}</div>
            </div>
          ))}
        </div>

        {/* Emergency Banner */}
        <div className="mt-8 bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-center justify-center space-x-4 text-center">
            <Icon name="Phone" size={20} className="text-error" />
            <div>
              <span className="text-sm font-medium text-error">24/7 Emergency Hotline: </span>
              <span className="text-lg font-bold text-error">911</span>
              <span className="text-sm text-muted-foreground ml-4">MDRRMO: (052) 888-0000</span>
            </div>
          </div>
        </div>

        {/* Current Status Indicator */}
        <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span className="text-muted-foreground">Operations Center: Online</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span className="text-muted-foreground">Emergency Services: Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full animate-pulse"></div>
            <span className="text-muted-foreground">Weather Monitoring: Alert</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;