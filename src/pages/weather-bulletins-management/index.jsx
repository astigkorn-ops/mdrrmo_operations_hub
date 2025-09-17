import React, { useState, useEffect, useMemo } from 'react';
import AdminSidebar from '../../components/ui/AdminSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import BulletinFilters from './components/BulletinFilters';
import BulletinTableActions from './components/BulletinTableActions';
import BulletinDataTable from './components/BulletinDataTable';
import BulletinFormDialog from './components/BulletinFormDialog';
import BulletinViewDialog from './components/BulletinViewDialog';
import WeatherDataPanel from './components/WeatherDataPanel';
import PublishingStats from './components/PublishingStats';
import TablePagination from '../incident-management/components/TablePagination';

const WeatherBulletinsManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [bulletins, setBulletins] = useState([]);
  const [selectedBulletins, setSelectedBulletins] = useState([]);
  const [viewMode, setViewMode] = useState('active');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [sortConfig, setSortConfig] = useState({ key: 'createdDate', direction: 'desc' });
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    severity: 'all',
    status: 'all',
    dateFrom: '',
    dateTo: ''
  });

  // Dialog states
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedBulletin, setSelectedBulletin] = useState(null);

  // Mock data for weather bulletins
  const mockBulletins = [
    {
      id: "WB-2024-001",
      title: "Typhoon Mawar Weather Advisory #5",
      type: "typhoon",
      severity: "critical",
      status: "published",
      createdDate: "2024-09-17T06:00:00Z",
      publishedDate: "2024-09-17T06:15:00Z",
      scheduledDate: null,
      author: "MDRRMO Weather Team",
      content: "Typhoon MAWAR (International name) maintains its strength as it approaches the Bicol Region. As of 5:00 AM today, the center of Typhoon MAWAR was located 180 km east of Legazpi City, Albay with maximum sustained winds of 120 kph near the center and gustiness of up to 150 kph. It is moving west-northwest at 15 kph.",
      weatherData: {
        windSpeed: "120 kph",
        direction: "West-Northwest",
        rainfall: "Heavy to Intense",
        pressure: "960 hPa"
      },
      affectedAreas: ["Pio Duran", "Legazpi", "Tabaco", "Ligao"],
      recommendations: [
        "Suspend all outdoor activities",
        "Evacuate from low-lying and coastal areas",
        "Secure loose objects and materials",
        "Monitor official weather updates"
      ],
      distributionChannels: ["website", "sms", "radio", "social_media"],
      views: 2456,
      shares: 89,
      smsDelivered: 3420,
      notes: "Highest severity alert. Immediate action required."
    },
    {
      id: "WB-2024-002",
      title: "Heavy Rainfall Advisory - September 17",
      type: "rainfall",
      severity: "high",
      status: "published",
      createdDate: "2024-09-17T08:30:00Z",
      publishedDate: "2024-09-17T09:00:00Z",
      scheduledDate: null,
      author: "Ana Reyes",
      content: "The Southwest Monsoon enhanced by Typhoon MAWAR will bring moderate to heavy rains over Albay including Pio Duran Municipality. Rainfall amounts of 50-100mm are expected within 24 hours which may trigger flash floods and landslides in susceptible areas.",
      weatherData: {
        windSpeed: "30-50 kph",
        direction: "Southwest",
        rainfall: "50-100mm/24hrs",
        pressure: "1008 hPa"
      },
      affectedAreas: ["All Barangays"],
      recommendations: [
        "Avoid unnecessary travel",
        "Stay away from riverbanks and low-lying areas",
        "Report any unusual rise in water levels",
        "Keep emergency supplies ready"
      ],
      distributionChannels: ["website", "sms", "social_media"],
      views: 1234,
      shares: 45,
      smsDelivered: 2100,
      notes: "Issued due to enhanced monsoon conditions."
    },
    {
      id: "WB-2024-003",
      title: "Thunderstorm Warning - Afternoon Update",
      type: "thunderstorm",
      severity: "medium",
      status: "published",
      createdDate: "2024-09-17T12:00:00Z",
      publishedDate: "2024-09-17T12:30:00Z",
      scheduledDate: null,
      author: "Pedro Garcia",
      content: "Localized thunderstorms are developing over the eastern portions of Pio Duran. These thunderstorms may bring sudden heavy downpours, lightning, and strong winds lasting 1-3 hours. Conditions are expected to improve by late afternoon.",
      weatherData: {
        windSpeed: "40-60 kph",
        direction: "Variable",
        rainfall: "Light to Moderate",
        pressure: "1010 hPa"
      },
      affectedAreas: ["San Roque", "Santa Cruz", "San Antonio"],
      recommendations: [
        "Stay indoors during thunderstorms",
        "Unplug electrical appliances",
        "Avoid open areas and tall objects",
        "Wait for storms to pass before traveling"
      ],
      distributionChannels: ["website", "radio"],
      views: 567,
      shares: 12,
      smsDelivered: 0,
      notes: "Localized weather event. Limited distribution."
    },
    {
      id: "WB-2024-004",
      title: "Heat Index Advisory",
      type: "heat",
      severity: "low",
      status: "scheduled",
      createdDate: "2024-09-16T16:00:00Z",
      publishedDate: null,
      scheduledDate: "2024-09-18T06:00:00Z",
      author: "Maria Santos",
      content: "Hot and humid weather conditions are expected tomorrow with heat index values reaching 35-37°C (95-99°F). The general public is advised to take precautionary measures to prevent heat-related illnesses.",
      weatherData: {
        windSpeed: "10-20 kph",
        direction: "Southeast",
        rainfall: "None expected",
        pressure: "1012 hPa"
      },
      affectedAreas: ["All Barangays"],
      recommendations: [
        "Stay hydrated and drink plenty of water",
        "Avoid prolonged exposure to sunlight",
        "Wear light-colored and loose-fitting clothes",
        "Schedule outdoor activities during cooler hours"
      ],
      distributionChannels: ["website", "sms"],
      views: 0,
      shares: 0,
      smsDelivered: 0,
      notes: "Scheduled for early morning release tomorrow."
    },
    {
      id: "WB-2024-005",
      title: "Gale Warning for Coastal Areas",
      type: "wind",
      severity: "high",
      status: "draft",
      createdDate: "2024-09-17T10:30:00Z",
      publishedDate: null,
      scheduledDate: null,
      author: "Juan Dela Cruz",
      content: "Strong to gale force winds associated with Typhoon MAWAR will affect coastal and seaboard areas of Pio Duran. Sea conditions will be rough to very rough with wave heights of 2.5 to 4.0 meters.",
      weatherData: {
        windSpeed: "60-90 kph",
        direction: "Northeast",
        rainfall: "Light to Moderate",
        pressure: "995 hPa"
      },
      affectedAreas: ["Coastal Barangays"],
      recommendations: [
        "Suspend all marine activities",
        "Secure boats and fishing equipment",
        "Stay away from coastal areas",
        "Monitor weather updates regularly"
      ],
      distributionChannels: [],
      views: 0,
      shares: 0,
      smsDelivered: 0,
      notes: "Draft version. Pending review before publication."
    },
    {
      id: "WB-2024-006",
      title: "Flood Advisory for Low-lying Areas",
      type: "flood",
      severity: "medium",
      status: "expired",
      createdDate: "2024-09-16T14:00:00Z",
      publishedDate: "2024-09-16T14:30:00Z",
      scheduledDate: null,
      author: "Carlos Mendoza",
      content: "Continuous rainfall over the past 6 hours has caused water levels to rise in rivers and creeks. Residents in low-lying and flood-prone areas are advised to be on alert for possible flooding.",
      weatherData: {
        windSpeed: "20-30 kph",
        direction: "Southwest",
        rainfall: "Moderate to Heavy",
        pressure: "1006 hPa"
      },
      affectedAreas: ["Poblacion", "Bagumbayan"],
      recommendations: [
        "Monitor water levels closely",
        "Prepare to evacuate if necessary",
        "Move valuables to higher ground",
        "Follow evacuation orders from authorities"
      ],
      distributionChannels: ["website", "sms", "radio"],
      views: 890,
      shares: 23,
      smsDelivered: 1560,
      notes: "Advisory has expired. Flood conditions have subsided."
    }
  ];

  useEffect(() => {
    setBulletins(mockBulletins);
  }, []);

  // Filter and sort bulletins
  const processedBulletins = useMemo(() => {
    let filtered = bulletins?.filter(bulletin => {
      // View mode filter
      if (viewMode === 'active' && ['expired', 'archived']?.includes(bulletin?.status)) return false;
      if (viewMode === 'archived' && !['expired', 'archived']?.includes(bulletin?.status)) return false;

      // Search filter
      if (filters?.search) {
        const searchTerm = filters?.search?.toLowerCase();
        if (!bulletin?.title?.toLowerCase()?.includes(searchTerm) &&
            !bulletin?.content?.toLowerCase()?.includes(searchTerm) &&
            !bulletin?.author?.toLowerCase()?.includes(searchTerm)) {
          return false;
        }
      }

      // Type filter
      if (filters?.type !== 'all' && bulletin?.type !== filters?.type) return false;

      // Severity filter
      if (filters?.severity !== 'all' && bulletin?.severity !== filters?.severity) return false;

      // Status filter
      if (filters?.status !== 'all' && bulletin?.status !== filters?.status) return false;

      // Date filters
      if (filters?.dateFrom) {
        const bulletinDate = new Date(bulletin?.createdDate);
        const fromDate = new Date(filters?.dateFrom);
        if (bulletinDate < fromDate) return false;
      }

      if (filters?.dateTo) {
        const bulletinDate = new Date(bulletin?.createdDate);
        const toDate = new Date(filters?.dateTo);
        toDate?.setHours(23, 59, 59, 999);
        if (bulletinDate > toDate) return false;
      }

      return true;
    });

    // Sort bulletins
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (sortConfig?.key?.includes('Date')) {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [bulletins, filters, sortConfig, viewMode]);

  // Pagination
  const paginatedBulletins = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedBulletins?.slice(startIndex, startIndex + itemsPerPage);
  }, [processedBulletins, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(processedBulletins?.length / itemsPerPage);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalBulletins = bulletins?.length;
    const publishedBulletins = bulletins?.filter(b => b?.status === 'published')?.length;
    const scheduledBulletins = bulletins?.filter(b => b?.status === 'scheduled')?.length;
    const draftBulletins = bulletins?.filter(b => b?.status === 'draft')?.length;
    const totalViews = bulletins?.reduce((sum, b) => sum + (b?.views || 0), 0);
    const totalSMS = bulletins?.reduce((sum, b) => sum + (b?.smsDelivered || 0), 0);

    return {
      totalBulletins,
      publishedBulletins,
      scheduledBulletins,
      draftBulletins,
      totalViews,
      totalSMS
    };
  }, [bulletins]);

  // Event handlers
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setSelectedBulletins([]);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      type: 'all',
      severity: 'all',
      status: 'all',
      dateFrom: '',
      dateTo: ''
    };
    setFilters(clearedFilters);
    setCurrentPage(1);
    setSelectedBulletins([]);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleCreateNew = () => {
    setSelectedBulletin(null);
    setShowCreateDialog(true);
  };

  const handleBulletinEdit = (bulletin) => {
    setSelectedBulletin(bulletin);
    setShowEditDialog(true);
  };

  const handleBulletinView = (bulletin) => {
    setSelectedBulletin(bulletin);
    setShowViewDialog(true);
  };

  const handleBulletinSave = (bulletinData) => {
    if (bulletinData?.id && bulletins?.find(b => b?.id === bulletinData?.id)) {
      // Update existing bulletin
      setBulletins(prev => prev?.map(b => b?.id === bulletinData?.id ? bulletinData : b));
    } else {
      // Create new bulletin
      setBulletins(prev => [bulletinData, ...prev]);
    }
    setSelectedBulletins([]);
  };

  const handleStatusUpdate = (bulletinId, newStatus) => {
    setBulletins(prev => prev?.map(bulletin => 
      bulletin?.id === bulletinId 
        ? { 
            ...bulletin, 
            status: newStatus, 
            publishedDate: newStatus === 'published' ? new Date()?.toISOString() : bulletin?.publishedDate
          }
        : bulletin
    ));
  };

  const handleBulkStatusUpdate = (bulletinIds, newStatus) => {
    setBulletins(prev => prev?.map(bulletin => 
      bulletinIds?.includes(bulletin?.id)
        ? { 
            ...bulletin, 
            status: newStatus,
            publishedDate: newStatus === 'published' ? new Date()?.toISOString() : bulletin?.publishedDate
          }
        : bulletin
    ));
    setSelectedBulletins([]);
  };

  const handleEmergencyBroadcast = () => {
    // Emergency broadcast logic would go here
    console.log('Emergency broadcast initiated');
  };

  const handleExport = (format) => {
    console.log(`Exporting ${processedBulletins?.length} weather bulletins as ${format}`);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setCurrentPage(1);
    setSelectedBulletins([]);
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/main-dashboard', icon: 'Home' },
    { label: 'Weather Bulletins', path: '/weather-bulletins-management' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <BreadcrumbNavigation items={breadcrumbItems} className="mb-4" />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="CloudRain" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Weather Bulletins Management</h1>
                  <p className="text-muted-foreground">
                    Comprehensive creation, scheduling, and distribution of weather advisories
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground">Published</p>
                  <p className="text-2xl font-bold text-success">{stats?.publishedBulletins}</p>
                </div>
                <div className="text-center p-4 bg-white border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground">Scheduled</p>
                  <p className="text-2xl font-bold text-primary">{stats?.scheduledBulletins}</p>
                </div>
                <div className="text-center p-4 bg-white border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold text-foreground">{stats?.totalViews?.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-white border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground">SMS Sent</p>
                  <p className="text-2xl font-bold text-accent">{stats?.totalSMS?.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <BulletinFilters
            onFiltersChange={handleFiltersChange}
            activeFilters={filters}
            onClearFilters={handleClearFilters}
          />

          {/* Table Actions */}
          <BulletinTableActions
            selectedBulletins={selectedBulletins}
            onCreateNew={handleCreateNew}
            onBulkStatusUpdate={handleBulkStatusUpdate}
            onEmergencyBroadcast={handleEmergencyBroadcast}
            onExport={handleExport}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            totalCount={bulletins?.length}
            filteredCount={processedBulletins?.length}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Bulletins Table */}
            <div className="xl:col-span-2">
              <BulletinDataTable
                bulletins={paginatedBulletins}
                selectedBulletins={selectedBulletins}
                onSelectionChange={setSelectedBulletins}
                onBulletinEdit={handleBulletinEdit}
                onBulletinView={handleBulletinView}
                onStatusUpdate={handleStatusUpdate}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={processedBulletins?.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(newSize) => {
                  setItemsPerPage(newSize);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              <WeatherDataPanel />
              <PublishingStats bulletins={bulletins} stats={stats} />
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <BulletinFormDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        bulletin={null}
        onSave={handleBulletinSave}
        mode="create"
      />
      <BulletinFormDialog
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        bulletin={selectedBulletin}
        onSave={handleBulletinSave}
        mode="edit"
      />
      <BulletinViewDialog
        isOpen={showViewDialog}
        onClose={() => setShowViewDialog(false)}
        bulletin={selectedBulletin}
        onEdit={(bulletin) => {
          setShowViewDialog(false);
          handleBulletinEdit(bulletin);
        }}
      />
    </div>
  );
};

export default WeatherBulletinsManagement;