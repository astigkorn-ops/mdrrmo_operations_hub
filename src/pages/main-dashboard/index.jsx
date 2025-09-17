import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/ui/AdminSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import { ProtectedRoute } from '../../components/ui/AuthenticationWrapper';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import dashboard components
import MetricsCard from './components/MetricsCard';
import ActivityFeed from './components/ActivityFeed';
import DashboardCharts from './components/DashboardCharts';
import QuickActions from './components/QuickActions';
import WeatherWidget from './components/WeatherWidget';

const MainDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/main-dashboard', icon: 'Home' }
  ];

  // Mock dashboard metrics data
  const metricsData = [
    {
      title: 'Active Incidents',
      value: '7',
      subtitle: '3 critical, 4 moderate',
      icon: 'AlertTriangle',
      variant: 'error',
      trend: 'up',
      trendValue: '+2',
      actionLabel: 'View All',
      onAction: () => window.location.href = '/incident-management'
    },
    {
      title: 'Latest Advisory',
      value: 'Signal No. 1',
      subtitle: 'Typhoon warning active',
      icon: 'Megaphone',
      variant: 'warning',
      trend: 'stable',
      trendValue: 'No change',
      actionLabel: 'View Details',
      onAction: () => window.location.href = '/public-advisories'
    },
    {
      title: 'Upcoming Events',
      value: '5',
      subtitle: 'Next: Community Drill',
      icon: 'Calendar',
      variant: 'success',
      trend: 'up',
      trendValue: '+1',
      actionLabel: 'View Calendar',
      onAction: () => window.location.href = '/event-calendar'
    },
    {
      title: 'Response Time',
      value: '35 min',
      subtitle: 'Average this month',
      icon: 'Clock',
      variant: 'default',
      trend: 'down',
      trendValue: '-5 min',
      actionLabel: 'View Reports',
      onAction: () => {}
    }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Simulate data refresh
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to refresh data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Auto-refresh data every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ProtectedRoute requiredPermissions={['dashboard']}>
      <div className="min-h-screen bg-background">
        <AdminSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggleCollapse={handleSidebarToggle}
        />
        
        <main className={`transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}>
          {/* Header */}
          <header className="bg-white border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <BreadcrumbNavigation items={breadcrumbItems} />
                <div className="mt-2">
                  <h1 className="text-2xl font-bold text-foreground">Operations Dashboard</h1>
                  <p className="text-sm text-muted-foreground">
                    Real-time overview of MDRRMO operations and emergency management
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Last updated</p>
                  <p className="text-sm font-medium text-foreground">
                    {lastUpdated?.toLocaleTimeString('en-PH', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  loading={refreshing}
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Refresh
                </Button>
                
                <Button
                  variant="default"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => window.location.href = '/incident-management'}
                >
                  New Incident
                </Button>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-6 space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {metricsData?.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric?.title}
                  value={metric?.value}
                  subtitle={metric?.subtitle}
                  icon={metric?.icon}
                  variant={metric?.variant}
                  trend={metric?.trend}
                  trendValue={metric?.trendValue}
                  actionLabel={metric?.actionLabel}
                  onAction={metric?.onAction}
                />
              ))}
            </div>

            {/* Charts Section */}
            <DashboardCharts />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Activity Feed - Takes 2 columns */}
              <div className="xl:col-span-2">
                <ActivityFeed />
              </div>
              
              {/* Side Panel - Takes 1 column */}
              <div className="space-y-6">
                <WeatherWidget />
                <QuickActions />
              </div>
            </div>

            {/* Emergency Status Banner */}
            <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Icon name="Shield" size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">MDRRMO Operations Status</h3>
                    <p className="text-sm opacity-90">
                      All systems operational • Emergency hotlines active • Response teams on standby
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-center">
                    <p className="text-xs opacity-75">Emergency Hotline</p>
                    <p className="text-lg font-bold">911</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 border-white/30"
                  >
                    <Icon name="Phone" size={16} className="mr-2" />
                    Call Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default MainDashboard;