import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CapacityAnalytics = ({ centers, stats }) => {
  const getResourceStatus = () => {
    if (!centers || centers?.length === 0) return [];
    
    const resourceTotals = centers?.reduce((totals, center) => {
      if (center?.resources) {
        Object.entries(center?.resources)?.forEach(([resource, level]) => {
          if (!totals?.[resource]) {
            totals[resource] = { total: 0, count: 0, low: 0, critical: 0 };
          }
          totals[resource].total += level;
          totals[resource].count += 1;
          if (level < 30) totals[resource].critical += 1;
          else if (level < 50) totals[resource].low += 1;
        });
      }
      return totals;
    }, {});

    return Object.entries(resourceTotals)?.map(([resource, data]) => ({
      name: resource,
      average: (data?.total / data?.count)?.toFixed(1),
      low: data?.low,
      critical: data?.critical,
      icon: getResourceIcon(resource)
    }));
  };

  const getResourceIcon = (resource) => {
    switch (resource?.toLowerCase()) {
      case 'water': return 'Droplets';
      case 'food': return 'Utensils';
      case 'medicine': return 'Cross';
      case 'blankets': return 'Home';
      default: return 'Package';
    }
  };

  const getOccupancyDistribution = () => {
    if (!centers || centers?.length === 0) return [];

    const distribution = {
      available: 0,     // < 50%
      moderate: 0,      // 50-79%
      nearFull: 0,      // 80-94%
      full: 0          // >= 95%
    };

    centers?.forEach(center => {
      const rate = (center?.currentOccupancy / center?.maxCapacity) * 100;
      if (rate < 50) distribution.available++;
      else if (rate < 80) distribution.moderate++;
      else if (rate < 95) distribution.nearFull++;
      else distribution.full++;
    });

    return [
      { label: 'Available', count: distribution?.available, color: 'bg-success', percentage: (distribution?.available / centers?.length * 100)?.toFixed(1) },
      { label: 'Moderate', count: distribution?.moderate, color: 'bg-primary', percentage: (distribution?.moderate / centers?.length * 100)?.toFixed(1) },
      { label: 'Near Full', count: distribution?.nearFull, color: 'bg-warning', percentage: (distribution?.nearFull / centers?.length * 100)?.toFixed(1) },
      { label: 'Full', count: distribution?.full, color: 'bg-error', percentage: (distribution?.full / centers?.length * 100)?.toFixed(1) }
    ];
  };

  const getBarangayStats = () => {
    if (!centers || centers?.length === 0) return [];

    const barangayData = centers?.reduce((acc, center) => {
      const barangay = center?.barangay;
      if (!acc?.[barangay]) {
        acc[barangay] = {
          centers: 0,
          totalCapacity: 0,
          currentOccupancy: 0,
          operational: 0
        };
      }
      acc[barangay].centers++;
      acc[barangay].totalCapacity += center?.maxCapacity;
      acc[barangay].currentOccupancy += center?.currentOccupancy;
      if (center?.status === 'operational') acc[barangay].operational++;
      return acc;
    }, {});

    return Object.entries(barangayData)?.map(([barangay, data]) => ({
      name: barangay,
      ...data,
      occupancyRate: ((data?.currentOccupancy / data?.totalCapacity) * 100)?.toFixed(1)
    }))?.sort((a, b) => b?.totalCapacity - a?.totalCapacity);
  };

  const resourceStatus = getResourceStatus();
  const occupancyDistribution = getOccupancyDistribution();
  const barangayStats = getBarangayStats();

  return (
    <div className="space-y-6">
      {/* Key Statistics */}
      <div className="bg-white border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2" />
          Capacity Overview
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-foreground">{stats?.totalCapacity}</div>
              <div className="text-xs text-muted-foreground">Total Capacity</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{stats?.totalOccupied}</div>
              <div className="text-xs text-muted-foreground">Current Occupied</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall Occupancy</span>
              <span className="font-medium text-foreground">{stats?.occupancyRate?.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  stats?.occupancyRate >= 80 ? 'bg-error' :
                  stats?.occupancyRate >= 60 ? 'bg-warning' : 'bg-success'
                }`}
                style={{ width: `${Math.min(stats?.occupancyRate, 100)}%` }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Available Space</span>
              <span className="font-medium text-success">{stats?.availableCapacity} persons</span>
            </div>
          </div>
        </div>
      </div>

      {/* Occupancy Distribution */}
      <div className="bg-white border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="PieChart" size={20} className="mr-2" />
          Occupancy Distribution
        </h3>
        <div className="space-y-3">
          {occupancyDistribution?.map((item) => (
            <div key={item?.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">{item?.label}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">{item?.count}</span>
                  <span className="text-xs text-muted-foreground">({item?.percentage}%)</span>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${item?.color}`}
                  style={{ width: `${item?.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Status */}
      <div className="bg-white border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Package" size={20} className="mr-2" />
          Resource Status
        </h3>
        <div className="space-y-3">
          {resourceStatus?.map((resource) => (
            <div key={resource?.name} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
              <div className="flex items-center space-x-3">
                <Icon name={resource?.icon} size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground capitalize">{resource?.name}</span>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${
                  resource?.average >= 70 ? 'text-success' :
                  resource?.average >= 50 ? 'text-warning' : 'text-error'
                }`}>
                  {resource?.average}%
                </div>
                {(resource?.low > 0 || resource?.critical > 0) && (
                  <div className="text-xs text-muted-foreground">
                    {resource?.critical > 0 && <span className="text-error">{resource?.critical} critical</span>}
                    {resource?.low > 0 && resource?.critical > 0 && ', '}
                    {resource?.low > 0 && <span className="text-warning">{resource?.low} low</span>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Barangay Breakdown */}
      <div className="bg-white border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="MapPin" size={20} className="mr-2" />
          Barangay Overview
        </h3>
        <div className="space-y-3">
          {barangayStats?.slice(0, 6)?.map((barangay) => (
            <div key={barangay?.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-foreground">{barangay?.name}</span>
                  <div className="text-xs text-muted-foreground">
                    {barangay?.operational}/{barangay?.centers} operational
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    {barangay?.currentOccupancy}/{barangay?.totalCapacity}
                  </div>
                  <div className="text-xs text-muted-foreground">{barangay?.occupancyRate}%</div>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-1">
                <div
                  className={`h-1 rounded-full ${
                    barangay?.occupancyRate >= 80 ? 'bg-error' :
                    barangay?.occupancyRate >= 60 ? 'bg-warning' : 'bg-success'
                  }`}
                  style={{ width: `${Math.min(barangay?.occupancyRate, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Zap" size={20} className="mr-2" />
          Quick Actions
        </h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <Icon name="RefreshCw" size={14} className="mr-2" />
            Update Resource Levels
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <Icon name="Download" size={14} className="mr-2" />
            Export Capacity Report
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <Icon name="AlertTriangle" size={14} className="mr-2" />
            Send Capacity Alert
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <Icon name="Navigation" size={14} className="mr-2" />
            Plan Evacuation Routes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CapacityAnalytics;