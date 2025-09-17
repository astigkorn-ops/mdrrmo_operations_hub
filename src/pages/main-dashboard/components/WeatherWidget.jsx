import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock weather data - in real app, this would come from PAGASA API
  const mockWeatherData = {
    location: 'Pio Duran, Albay',
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 75,
    windSpeed: 12,
    windDirection: 'NE',
    pressure: 1013,
    visibility: 10,
    uvIndex: 6,
    alerts: [
      {
        id: 1,
        type: 'Thunderstorm Warning',
        level: 'Yellow',
        description: 'Possible thunderstorms in the afternoon',
        validUntil: new Date(Date.now() + 6 * 60 * 60 * 1000)
      }
    ],
    forecast: [
      { day: 'Today', high: 32, low: 24, condition: 'Partly Cloudy', icon: 'CloudSun' },
      { day: 'Tomorrow', high: 30, low: 23, condition: 'Scattered Showers', icon: 'CloudRain' },
      { day: 'Thursday', high: 29, low: 22, condition: 'Thunderstorms', icon: 'CloudLightning' }
    ]
  };

  useEffect(() => {
    // Simulate API call
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setWeatherData(mockWeatherData);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'sunny':
        return 'Sun';
      case 'partly cloudy':
        return 'CloudSun';
      case 'cloudy':
        return 'Cloud';
      case 'rainy': case'scattered showers':
        return 'CloudRain';
      case 'thunderstorms':
        return 'CloudLightning';
      default:
        return 'Cloud';
    }
  };

  const getAlertColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'red':
        return 'bg-error text-error-foreground';
      case 'orange':
        return 'bg-warning text-warning-foreground';
      case 'yellow':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center text-muted-foreground">
          <Icon name="CloudOff" size={32} className="mx-auto mb-2" />
          <p>Weather data unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Weather Conditions</h3>
          <p className="text-sm text-muted-foreground">{weatherData?.location}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Last updated</p>
          <p className="text-xs text-muted-foreground">
            {new Date()?.toLocaleTimeString('en-PH', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
      </div>
      {/* Current Weather */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary/10 text-primary rounded-lg">
            <Icon name={getWeatherIcon(weatherData?.condition)} size={32} />
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">{weatherData?.temperature}°C</p>
            <p className="text-sm text-muted-foreground">{weatherData?.condition}</p>
          </div>
        </div>
      </div>
      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Droplets" size={16} className="text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Humidity</p>
            <p className="text-sm font-medium text-foreground">{weatherData?.humidity}%</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Wind" size={16} className="text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Wind</p>
            <p className="text-sm font-medium text-foreground">
              {weatherData?.windSpeed} km/h {weatherData?.windDirection}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Gauge" size={16} className="text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Pressure</p>
            <p className="text-sm font-medium text-foreground">{weatherData?.pressure} hPa</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={16} className="text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Visibility</p>
            <p className="text-sm font-medium text-foreground">{weatherData?.visibility} km</p>
          </div>
        </div>
      </div>
      {/* Weather Alerts */}
      {weatherData?.alerts && weatherData?.alerts?.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Active Alerts</h4>
          <div className="space-y-2">
            {weatherData?.alerts?.map((alert) => (
              <div key={alert?.id} className={`p-3 rounded-lg ${getAlertColor(alert?.level)}`}>
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={16} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert?.type}</p>
                    <p className="text-xs opacity-90">{alert?.description}</p>
                    <p className="text-xs opacity-75 mt-1">
                      Valid until: {alert?.validUntil?.toLocaleString('en-PH')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* 3-Day Forecast */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">3-Day Forecast</h4>
        <div className="space-y-2">
          {weatherData?.forecast?.map((day, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors duration-150">
              <div className="flex items-center space-x-3">
                <Icon name={day?.icon} size={20} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{day?.day}</p>
                  <p className="text-xs text-muted-foreground">{day?.condition}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{day?.high}°</p>
                <p className="text-xs text-muted-foreground">{day?.low}°</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;