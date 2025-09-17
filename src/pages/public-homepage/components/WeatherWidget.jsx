import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeatherWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock weather data
  const weatherData = {
    location: "Pio Duran, Albay",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 75,
    windSpeed: 12,
    windDirection: "NE",
    pressure: 1013,
    uvIndex: 6,
    visibility: 10,
    feelsLike: 32,
    icon: "CloudSun"
  };

  const pagasaAlerts = [
    {
      id: 1,
      type: "Weather Advisory",
      level: "Yellow",
      title: "Thunderstorm Warning",
      description: "Moderate to heavy thunderstorms expected within 2-6 hours",
      issuedAt: "2025-09-17T15:30:00",
      validUntil: "2025-09-17T21:30:00"
    }
  ];

  const forecast = [
    { day: "Today", high: 30, low: 24, condition: "Partly Cloudy", icon: "CloudSun" },
    { day: "Tomorrow", high: 29, low: 23, condition: "Scattered Showers", icon: "CloudRain" },
    { day: "Thursday", high: 27, low: 22, condition: "Heavy Rain", icon: "CloudRain" },
    { day: "Friday", high: 28, low: 23, condition: "Partly Cloudy", icon: "CloudSun" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-PH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const getAlertColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'red': return 'bg-error text-error-foreground';
      case 'orange': return 'bg-warning text-warning-foreground';
      case 'yellow': return 'bg-accent text-accent-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
      {/* Weather Header */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Live Weather</h3>
            <p className="text-sm text-muted-foreground">{weatherData?.location}</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">{formatTime(currentTime)}</div>
            <div className="text-xs text-muted-foreground">PST</div>
          </div>
        </div>
      </div>
      {/* Current Weather */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name={weatherData?.icon} size={32} className="text-primary" />
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">{weatherData?.temperature}°C</div>
              <div className="text-sm text-muted-foreground">{weatherData?.condition}</div>
              <div className="text-xs text-muted-foreground">Feels like {weatherData?.feelsLike}°C</div>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Icon name="RefreshCw" size={16} />
          </Button>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <Icon name="Droplets" size={16} className="text-primary mx-auto mb-1" />
            <div className="text-sm font-medium text-foreground">{weatherData?.humidity}%</div>
            <div className="text-xs text-muted-foreground">Humidity</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <Icon name="Wind" size={16} className="text-primary mx-auto mb-1" />
            <div className="text-sm font-medium text-foreground">{weatherData?.windSpeed} km/h</div>
            <div className="text-xs text-muted-foreground">{weatherData?.windDirection}</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <Icon name="Gauge" size={16} className="text-primary mx-auto mb-1" />
            <div className="text-sm font-medium text-foreground">{weatherData?.pressure}</div>
            <div className="text-xs text-muted-foreground">hPa</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <Icon name="Sun" size={16} className="text-primary mx-auto mb-1" />
            <div className="text-sm font-medium text-foreground">UV {weatherData?.uvIndex}</div>
            <div className="text-xs text-muted-foreground">Moderate</div>
          </div>
        </div>

        {/* PAGASA Alerts */}
        {pagasaAlerts?.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-medium text-foreground mb-2 flex items-center">
              <Icon name="AlertTriangle" size={16} className="mr-2 text-warning" />
              PAGASA Alerts
            </div>
            {pagasaAlerts?.map((alert) => (
              <div key={alert?.id} className={`rounded-lg p-3 mb-2 ${getAlertColor(alert?.level)}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{alert?.title}</span>
                  <span className="text-xs opacity-90">{alert?.level} Warning</span>
                </div>
                <p className="text-xs opacity-90 mb-2">{alert?.description}</p>
                <div className="text-xs opacity-75">
                  Valid until: {new Date(alert.validUntil)?.toLocaleString('en-PH')}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 4-Day Forecast */}
        <div>
          <div className="text-sm font-medium text-foreground mb-2">4-Day Forecast</div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {forecast?.map((day, index) => (
              <div key={index} className="bg-muted/30 rounded-lg p-3 text-center">
                <div className="text-xs font-medium text-foreground mb-1">{day?.day}</div>
                <Icon name={day?.icon} size={20} className="text-primary mx-auto mb-1" />
                <div className="text-sm font-medium text-foreground">{day?.high}°</div>
                <div className="text-xs text-muted-foreground">{day?.low}°</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Weather Footer */}
      <div className="px-4 py-3 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Data from PAGASA</span>
          <span>Updated: {currentTime?.toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;