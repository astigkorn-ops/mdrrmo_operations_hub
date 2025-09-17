import React, { useState, useEffect, useMemo } from 'react';
import AdminSidebar from '../../components/ui/AdminSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import CenterFilters from './components/CenterFilters';
import CenterTableActions from './components/CenterTableActions';
import CenterDataTable from './components/CenterDataTable';
import CenterFormDialog from './components/CenterFormDialog';
import CenterViewDialog from './components/CenterViewDialog';
import InteractiveMap from './components/InteractiveMap';
import CapacityAnalytics from './components/CapacityAnalytics';
import TablePagination from '../incident-management/components/TablePagination';

const EvacuationCentersManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [centers, setCenters] = useState([]);
  const [selectedCenters, setSelectedCenters] = useState([]);
  const [viewMode, setViewMode] = useState('map');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    capacity: 'all',
    accessibility: 'all',
    barangay: 'all'
  });

  // Dialog states
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);

  // Mock data for evacuation centers
  const mockCenters = [
    {
      id: "EC-001",
      name: "Pio Duran Central School",
      address: "Poblacion, Pio Duran, Albay",
      barangay: "Poblacion",
      coordinates: { lat: 13.7565, lng: 123.1234 },
      maxCapacity: 500,
      currentOccupancy: 125,
      status: "operational",
      accessibilityFeatures: ["wheelchair", "medical"],
      facilities: ["restrooms", "kitchen", "medical_bay", "generator"],
      contactPerson: "Maria Santos",
      contactNumber: "09123456789",
      lastUpdated: "2024-09-17T10:30:00Z",
      evacuees: [
        { family: "Santos Family", members: 5, assigned: "Classroom 1A" },
        { family: "Garcia Family", members: 3, assigned: "Classroom 1B" }
      ],
      resources: {
        water: 80,
        food: 70,
        medicine: 90,
        blankets: 60
      },
      notes: "Primary evacuation center with full facilities. Medical staff on standby."
    },
    {
      id: "EC-002", 
      name: "San Roque Barangay Hall",
      address: "San Roque, Pio Duran, Albay",
      barangay: "San Roque",
      coordinates: { lat: 13.7234, lng: 123.0987 },
      maxCapacity: 150,
      currentOccupancy: 0,
      status: "ready",
      accessibilityFeatures: ["wheelchair"],
      facilities: ["restrooms", "kitchen", "generator"],
      contactPerson: "Pedro Garcia",
      contactNumber: "09234567890",
      lastUpdated: "2024-09-17T09:15:00Z",
      evacuees: [],
      resources: {
        water: 100,
        food: 100,
        medicine: 75,
        blankets: 85
      },
      notes: "Secondary evacuation center. Ready for immediate activation."
    },
    {
      id: "EC-003",
      name: "Santa Cruz Elementary School",
      address: "Santa Cruz, Pio Duran, Albay", 
      barangay: "Santa Cruz",
      coordinates: { lat: 13.7890, lng: 123.2345 },
      maxCapacity: 300,
      currentOccupancy: 85,
      status: "operational",
      accessibilityFeatures: ["wheelchair", "ramp"],
      facilities: ["restrooms", "kitchen", "medical_bay"],
      contactPerson: "Ana Reyes",
      contactNumber: "09345678901",
      lastUpdated: "2024-09-17T11:00:00Z",
      evacuees: [
        { family: "Mendoza Family", members: 4, assigned: "Room 2A" },
        { family: "Cruz Family", members: 6, assigned: "Room 2B" }
      ],
      resources: {
        water: 65,
        food: 55,
        medicine: 70,
        blankets: 40
      },
      notes: "Mountain area evacuation center. Accessible via alternate route only."
    },
    {
      id: "EC-004",
      name: "Bagumbayan Multi-Purpose Hall",
      address: "Bagumbayan, Pio Duran, Albay",
      barangay: "Bagumbayan", 
      coordinates: { lat: 13.7456, lng: 123.1567 },
      maxCapacity: 200,
      currentOccupancy: 45,
      status: "maintenance",
      accessibilityFeatures: [],
      facilities: ["restrooms", "generator"],
      contactPerson: "Carlos Mendoza",
      contactNumber: "09456789012",
      lastUpdated: "2024-09-16T16:30:00Z",
      evacuees: [
        { family: "Rivera Family", members: 7, assigned: "Hall Section A" }
      ],
      resources: {
        water: 30,
        food: 25,
        medicine: 45,
        blankets: 50
      },
      notes: "Under maintenance. Roof repairs needed. Limited capacity until fixed."
    },
    {
      id: "EC-005",
      name: "San Jose Community Center",
      address: "San Jose, Pio Duran, Albay",
      barangay: "San Jose",
      coordinates: { lat: 13.7345, lng: 123.1678 },
      maxCapacity: 180,
      currentOccupancy: 0,
      status: "ready",
      accessibilityFeatures: ["wheelchair", "medical", "ramp"],
      facilities: ["restrooms", "kitchen", "medical_bay", "generator", "wifi"],
      contactPerson: "Juan Dela Cruz",
      contactNumber: "09567890123",
      lastUpdated: "2024-09-17T08:45:00Z",
      evacuees: [],
      resources: {
        water: 95,
        food: 90,
        medicine: 85,
        blankets: 100
      },
      notes: "Newly renovated center with modern facilities and full accessibility features."
    },
    {
      id: "EC-006",
      name: "San Antonio Gymnasium",
      address: "San Antonio, Pio Duran, Albay",
      barangay: "San Antonio",
      coordinates: { lat: 13.7123, lng: 123.1890 },
      maxCapacity: 400,
      currentOccupancy: 220,
      status: "full",
      accessibilityFeatures: ["wheelchair"],
      facilities: ["restrooms", "kitchen", "generator"],
      contactPerson: "Maria Santos",
      contactNumber: "09678901234",
      lastUpdated: "2024-09-17T12:15:00Z",
      evacuees: [
        { family: "Lopez Family", members: 8, assigned: "Section A" },
        { family: "Reyes Family", members: 5, assigned: "Section B" },
        { family: "Torres Family", members: 6, assigned: "Section C" }
      ],
      resources: {
        water: 20,
        food: 15,
        medicine: 30,
        blankets: 25
      },
      notes: "At full capacity. Critical resource shortage. Request immediate resupply."
    }
  ];

  useEffect(() => {
    setCenters(mockCenters);
  }, []);

  // Filter and sort centers
  const processedCenters = useMemo(() => {
    let filtered = centers?.filter(center => {
      // Search filter
      if (filters?.search) {
        const searchTerm = filters?.search?.toLowerCase();
        if (!center?.name?.toLowerCase()?.includes(searchTerm) &&
            !center?.address?.toLowerCase()?.includes(searchTerm) &&
            !center?.barangay?.toLowerCase()?.includes(searchTerm)) {
          return false;
        }
      }

      // Status filter
      if (filters?.status !== 'all' && center?.status !== filters?.status) return false;

      // Capacity filter
      if (filters?.capacity !== 'all') {
        const occupancyRate = (center?.currentOccupancy / center?.maxCapacity) * 100;
        switch (filters?.capacity) {
          case 'available':
            if (occupancyRate >= 80) return false;
            break;
          case 'nearly_full':
            if (occupancyRate < 60 || occupancyRate >= 90) return false;
            break;
          case 'full':
            if (occupancyRate < 90) return false;
            break;
        }
      }

      // Accessibility filter
      if (filters?.accessibility !== 'all' && !center?.accessibilityFeatures?.includes(filters?.accessibility)) return false;

      // Barangay filter
      if (filters?.barangay !== 'all' && center?.barangay?.toLowerCase() !== filters?.barangay) return false;

      return true;
    });

    // Sort centers
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === 'occupancyRate') {
        aValue = (a?.currentOccupancy / a?.maxCapacity) * 100;
        bValue = (b?.currentOccupancy / b?.maxCapacity) * 100;
      }

      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [centers, filters, sortConfig]);

  // Pagination
  const paginatedCenters = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedCenters?.slice(startIndex, startIndex + itemsPerPage);
  }, [processedCenters, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(processedCenters?.length / itemsPerPage);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalCapacity = centers?.reduce((sum, center) => sum + center?.maxCapacity, 0);
    const totalOccupied = centers?.reduce((sum, center) => sum + center?.currentOccupancy, 0);
    const availableCapacity = totalCapacity - totalOccupied;
    const operationalCenters = centers?.filter(c => c?.status === 'operational')?.length;
    
    return {
      totalCenters: centers?.length,
      operationalCenters,
      totalCapacity,
      totalOccupied,
      availableCapacity,
      occupancyRate: totalCapacity > 0 ? (totalOccupied / totalCapacity) * 100 : 0
    };
  }, [centers]);

  // Event handlers
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setSelectedCenters([]);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      status: 'all',
      capacity: 'all',
      accessibility: 'all',
      barangay: 'all'
    };
    setFilters(clearedFilters);
    setCurrentPage(1);
    setSelectedCenters([]);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleCreateNew = () => {
    setSelectedCenter(null);
    setShowCreateDialog(true);
  };

  const handleCenterEdit = (center) => {
    setSelectedCenter(center);
    setShowEditDialog(true);
  };

  const handleCenterView = (center) => {
    setSelectedCenter(center);
    setShowViewDialog(true);
  };

  const handleCenterSave = (centerData) => {
    if (centerData?.id && centers?.find(c => c?.id === centerData?.id)) {
      // Update existing center
      setCenters(prev => prev?.map(c => c?.id === centerData?.id ? centerData : c));
    } else {
      // Create new center
      setCenters(prev => [centerData, ...prev]);
    }
    setSelectedCenters([]);
  };

  const handleStatusUpdate = (centerId, newStatus) => {
    setCenters(prev => prev?.map(center => 
      center?.id === centerId 
        ? { ...center, status: newStatus, lastUpdated: new Date()?.toISOString() }
        : center
    ));
  };

  const handleOccupancyUpdate = (centerId, occupancy) => {
    setCenters(prev => prev?.map(center => 
      center?.id === centerId 
        ? { ...center, currentOccupancy: occupancy, lastUpdated: new Date()?.toISOString() }
        : center
    ));
  };

  const handleBulkStatusUpdate = (centerIds, newStatus) => {
    setCenters(prev => prev?.map(center => 
      centerIds?.includes(center?.id)
        ? { ...center, status: newStatus, lastUpdated: new Date()?.toISOString() }
        : center
    ));
    setSelectedCenters([]);
  };

  const handleExport = (format) => {
    console.log(`Exporting ${processedCenters?.length} evacuation centers as ${format}`);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setCurrentPage(1);
    setSelectedCenters([]);
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/main-dashboard', icon: 'Home' },
    { label: 'Evacuation Centers', path: '/evacuation-centers-management' }
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
                  <Icon name="Home" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Evacuation Centers Management</h1>
                  <p className="text-muted-foreground">
                    Comprehensive oversight and administration of emergency shelter facilities
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Capacity</p>
                  <p className="text-2xl font-bold text-foreground">{stats?.totalCapacity}</p>
                </div>
                <div className="text-center p-4 bg-white border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="text-2xl font-bold text-success">{stats?.availableCapacity}</p>
                </div>
                <div className="text-center p-4 bg-white border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground">Operational</p>
                  <p className="text-2xl font-bold text-primary">{stats?.operationalCenters}</p>
                </div>
                <div className="text-center p-4 bg-white border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                  <p className="text-2xl font-bold text-warning">{stats?.occupancyRate?.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <CenterFilters
            onFiltersChange={handleFiltersChange}
            activeFilters={filters}
            onClearFilters={handleClearFilters}
          />

          {/* Table Actions */}
          <CenterTableActions
            selectedCenters={selectedCenters}
            onCreateNew={handleCreateNew}
            onBulkStatusUpdate={handleBulkStatusUpdate}
            onExport={handleExport}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            totalCount={centers?.length}
            filteredCount={processedCenters?.length}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Map/Data Section */}
            <div className="xl:col-span-2">
              {viewMode === 'map' ? (
                <InteractiveMap 
                  centers={processedCenters}
                  onCenterSelect={handleCenterView}
                />
              ) : (
                <>
                  <CenterDataTable
                    centers={paginatedCenters}
                    selectedCenters={selectedCenters}
                    onSelectionChange={setSelectedCenters}
                    onCenterEdit={handleCenterEdit}
                    onCenterView={handleCenterView}
                    onStatusUpdate={handleStatusUpdate}
                    onOccupancyUpdate={handleOccupancyUpdate}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                  />
                  <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={processedCenters?.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={(newSize) => {
                      setItemsPerPage(newSize);
                      setCurrentPage(1);
                    }}
                  />
                </>
              )}
            </div>

            {/* Analytics Sidebar */}
            <div className="xl:col-span-1">
              <CapacityAnalytics 
                centers={processedCenters}
                stats={stats}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <CenterFormDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onSave={handleCenterSave}
        center={null}
        mode="create"
      />
      <CenterFormDialog
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        center={selectedCenter}
        onSave={handleCenterSave}
        mode="edit"
      />
      <CenterViewDialog
        isOpen={showViewDialog}
        onClose={() => setShowViewDialog(false)}
        center={selectedCenter}
        onEdit={(center) => {
          setShowViewDialog(false);
          handleCenterEdit(center);
        }}
      />
    </div>
  );
};

export default EvacuationCentersManagement;