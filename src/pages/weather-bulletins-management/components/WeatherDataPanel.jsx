import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeatherDataPanel = () => {
  // Mock current weather data
  const currentWeather = {
    temperature: '28°C',
    humidity: '85%',
    windSpeed: '45 kph',
    windDirection: 'Southwest',
    pressure: '1008 hPa',
    visibility: '8 km',
    lastUpdated: '2024-09-17T14:30:00Z'
  };

  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Wind Speed Alert',
      message: 'Sustained winds exceeding 40 kph detected',
      time: '14:25',
      icon: 'Wind'
    },
    {
      id: 2,
      type: 'info',
      title: 'Pressure Drop',
      message: 'Atmospheric pressure falling rapidly',
      time: '14:10',
      icon: 'TrendingDown'
    },
    {
      id: 3,
      type: 'warning',
      title: 'High Humidity',
      message: 'Humidity levels above 80% may indicate storm activity',
      time: '13:45',
      icon: 'Droplets'
    }
  ];

  const forecast = [
    { time: '15:00', temp: '29°C', condition: 'thunderstorm', icon: 'Zap' },
    { time: '18:00', temp: '27°C', condition: 'heavy rain', icon: 'CloudRain' },
    { time: '21:00', temp: '25°C', condition: 'rain', icon: 'CloudDrizzle' },
    { time: '00:00', temp: '24°C', condition: 'cloudy', icon: 'Cloud' }
  ];

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString('en-PH', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Current Weather */}
      <div className="bg-white border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Thermometer" size={20} className="mr-2" />
            Live Weather Data
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="RefreshCw" size={16} />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-foreground">{currentWeather?.temperature}</div>
            <div className="text-xs text-muted-foreground">Temperature</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-primary">{currentWeather?.humidity}</div>
            <div className="text-xs text-muted-foreground">Humidity</div>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Wind" size={14} className="text-muted-foreground" />
              <span className="text-foreground">Wind</span>
            </div>
            <span className="text-foreground">{currentWeather?.windSpeed} {currentWeather?.windDirection}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Gauge" size={14} className="text-muted-foreground" />
              <span className="text-foreground">Pressure</span>
            </div>
            <span className="text-foreground">{currentWeather?.pressure}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Eye" size={14} className="text-muted-foreground" />
              <span className="text-foreground">Visibility</span>
            </div>
            <span className="text-foreground">{currentWeather?.visibility}</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border">
          <div className="text-xs text-muted-foreground">
            Last updated: {formatTime(currentWeather?.lastUpdated)}
          </div>
        </div>
      </div>

      {/* Weather Alerts */}
      <div className="bg-white border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="AlertTriangle" size={20} className="mr-2" />
          Weather Alerts
        </h3>
        <div className="space-y-3">
          {alerts?.map((alert) => (
            <div key={alert?.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
              <Icon 
                name={alert?.icon} 
                size={16} 
                className={`mt-0.5 ${getAlertColor(alert?.type)}`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground truncate">{alert?.title}</h4>
                  <span className="text-xs text-muted-foreground">{alert?.time}</span>
                </div>
                <p className="text-xs text-muted-foreground">{alert?.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="bg-white border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Clock" size={20} className="mr-2" />
          Hourly Forecast
        </h3>
        <div className="space-y-3">
          {forecast?.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
              <span className="text-sm font-medium text-foreground">{item?.time}</span>
              <div className="flex items-center space-x-2">
                <Icon name={item?.icon} size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground capitalize">{item?.condition}</span>
              </div>
              <span className="text-sm font-medium text-foreground">{item?.temp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PAGASA Integration */}
      <div className="bg-white border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Satellite" size={20} className="mr-2" />
          PAGASA Integration
        </h3>
        <div className="space-y-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <Icon name="Download" size={14} className="mr-2" />
            Sync Latest Data
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <Icon name="MapPin" size={14} className="mr-2" />
            View Regional Radar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <Icon name="TrendingUp" size={14} className="mr-2" />
            Forecast Models
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <Icon name="Bell" size={14} className="mr-2" />
            Official Warnings
          </Button>
        </div>

        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">PAGASA Status</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-success">Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Template Actions */}
      <div className="bg-white border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Zap" size={20} className="mr-2" />
          Quick Templates
        </h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <Icon name="CloudRain" size={14} className="mr-2" />
            Typhoon Advisory
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <Icon name="Zap" size={14} className="mr-2" />
            Thunderstorm Warning
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <Icon name="Waves" size={14} className="mr-2" />
            Flood Advisory
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <Icon name="Sun" size={14} className="mr-2" />
            Heat Index Alert
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WeatherDataPanel;