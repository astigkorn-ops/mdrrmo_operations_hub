import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MetricsCard = ({ title, value, subtitle, icon, trend, trendValue, variant = 'default', onAction, actionLabel }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'error':
        return 'border-error/20 bg-error/5';
      case 'warning':
        return 'border-warning/20 bg-warning/5';
      case 'success':
        return 'border-success/20 bg-success/5';
      default:
        return 'border-border bg-card';
    }
  };

  const getTrendColor = () => {
    if (!trend) return 'text-muted-foreground';
    return trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground';
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus';
  };

  return (
    <div className={`rounded-lg border p-6 ${getVariantStyles()}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            variant === 'error' ? 'bg-error text-error-foreground' :
            variant === 'warning' ? 'bg-warning text-warning-foreground' :
            variant === 'success' ? 'bg-success text-success-foreground' :
            'bg-primary text-primary-foreground'
          }`}>
            <Icon name={icon} size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        
        {onAction && actionLabel && (
          <Button variant="ghost" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
      
      {trend && trendValue && (
        <div className="flex items-center mt-4 pt-4 border-t border-border">
          <Icon name={getTrendIcon()} size={16} className={getTrendColor()} />
          <span className={`text-sm font-medium ml-1 ${getTrendColor()}`}>
            {trendValue}
          </span>
          <span className="text-sm text-muted-foreground ml-2">from last month</span>
        </div>
      )}
    </div>
  );
};

export default MetricsCard;