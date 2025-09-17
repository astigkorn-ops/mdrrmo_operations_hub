import React, { useState, useEffect, useMemo } from 'react';
import AdminSidebar from '../../components/ui/AdminSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import IncidentFilters from './components/IncidentFilters';
import IncidentTableActions from './components/IncidentTableActions';
import IncidentDataTable from './components/IncidentDataTable';
import IncidentFormDialog from './components/IncidentFormDialog';
import IncidentViewDialog from './components/IncidentViewDialog';
import TablePagination from './components/TablePagination';

const IncidentManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [selectedIncidents, setSelectedIncidents] = useState([]);
  const [viewMode, setViewMode] = useState('active');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [sortConfig, setSortConfig] = useState({ key: 'reportedDate', direction: 'desc' });
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    status: 'all',
    severity: 'all',
    location: 'all',
    dateFrom: '',
    dateTo: ''
  });

  // Dialog states
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);

  // Mock data
  const mockIncidents = [
    {
      id: "INC-2024-001",
      type: "flood",
      typeIcon: "Waves",
      description: "Heavy flooding reported in Poblacion area due to continuous rainfall. Water level reached 2 feet in residential areas affecting multiple households.",
      location: "Poblacion",
      severity: "high",
      status: "responding",
      reportedDate: "2024-09-17T08:30:00Z",
      updatedDate: "2024-09-17T10:15:00Z",
      assignedTo: "Juan Dela Cruz",
      reporterName: "Maria Santos",
      reporterContact: "09123456789",
      coordinates: "13.7565° N, 123.1234° E",
      affectedPersons: "45",
      estimatedDamage: "250000",
      notes: "Emergency evacuation initiated. Red Cross on standby. Need additional pumping equipment."
    },
    {
      id: "INC-2024-002",
      type: "typhoon",
      typeIcon: "CloudRain",
      description: "Typhoon Mawar approaching with sustained winds of 120 kph. Expected landfall within 12 hours.",
      location: "San Roque",
      severity: "critical",
      status: "investigating",
      reportedDate: "2024-09-17T06:00:00Z",
      updatedDate: "2024-09-17T09:30:00Z",
      assignedTo: "Pedro Garcia",
      reporterName: "PAGASA Weather Station",
      reporterContact: "weather@pagasa.gov.ph",
      coordinates: "13.7234° N, 123.0987° E",
      affectedPersons: "1200",
      estimatedDamage: "5000000",
      notes: "Pre-emptive evacuation recommended. All evacuation centers prepared. Coast Guard alerted."
    },
    {
      id: "INC-2024-003",
      type: "fire",
      typeIcon: "Flame",
      description: "Structure fire at residential compound. Fire department responded immediately. No casualties reported.",
      location: "Bagumbayan",
      severity: "medium",
      status: "resolved",
      reportedDate: "2024-09-16T14:20:00Z",
      updatedDate: "2024-09-16T16:45:00Z",
      assignedTo: "Ana Reyes",
      reporterName: "Carlos Mendoza",
      reporterContact: "09876543210",
      coordinates: "13.7456° N, 123.1567° E",
      affectedPersons: "8",
      estimatedDamage: "150000",
      notes: "Fire contained within 2 hours. Investigation ongoing. Temporary shelter provided to affected families."
    },
    {
      id: "INC-2024-004",
      type: "earthquake",
      typeIcon: "Zap",
      description: "Magnitude 4.2 earthquake felt across the municipality. Minor structural damage reported in older buildings.",
      location: "San Antonio",
      severity: "low",
      status: "closed",
      reportedDate: "2024-09-15T11:15:00Z",
      updatedDate: "2024-09-15T18:30:00Z",
      assignedTo: "Maria Santos",
      reporterName: "PHIVOLCS",
      reporterContact: "info@phivolcs.gov.ph",
      coordinates: "13.7123° N, 123.1890° E",
      affectedPersons: "0",
      estimatedDamage: "25000",
      notes: "Building inspections completed. No major structural damage. Advisory issued to check for cracks."
    },
    {
      id: "INC-2024-005",
      type: "landslide",
      typeIcon: "Mountain",
      description: "Small landslide blocked access road to Barangay Santa Cruz. No injuries reported but road impassable.",
      location: "Santa Cruz",
      severity: "medium",
      status: "responding",
      reportedDate: "2024-09-17T05:45:00Z",
      updatedDate: "2024-09-17T07:20:00Z",
      assignedTo: "Carlos Mendoza",
      reporterName: "Barangay Captain",
      reporterContact: "09234567890",
      coordinates: "13.7890° N, 123.2345° E",
      affectedPersons: "150",
      estimatedDamage: "300000",
      notes: "DPWH equipment deployed for clearing operations. Alternative route established for emergency access."
    },
    {
      id: "INC-2024-006",
      type: "accident",
      typeIcon: "Car",
      description: "Multi-vehicle collision on national highway. Two vehicles involved, minor injuries reported.",
      location: "San Jose",
      severity: "low",
      status: "resolved",
      reportedDate: "2024-09-16T16:30:00Z",
      updatedDate: "2024-09-16T18:00:00Z",
      assignedTo: "Juan Dela Cruz",
      reporterName: "Traffic Enforcer",
      reporterContact: "09345678901",
      coordinates: "13.7345° N, 123.1678° E",
      affectedPersons: "4",
      estimatedDamage: "75000",
      notes: "Ambulance dispatched. Traffic rerouted. Insurance claims being processed."
    },
    {
      id: "INC-2024-007",
      type: "medical",
      typeIcon: "Heart",
      description: "Mass food poisoning incident at community event. Multiple patients with similar symptoms.",
      location: "Poblacion",
      severity: "high",
      status: "investigating",
      reportedDate: "2024-09-17T12:00:00Z",
      updatedDate: "2024-09-17T14:30:00Z",
      assignedTo: "Ana Reyes",
      reporterName: "Rural Health Unit",
      reporterContact: "rhu@pioduran.gov.ph",
      coordinates: "13.7567° N, 123.1234° E",
      affectedPersons: "23",
      estimatedDamage: "50000",
      notes: "DOH notified. Food samples collected for testing. Additional medical personnel deployed."
    },
    {
      id: "INC-2024-008",
      type: "other",
      typeIcon: "AlertTriangle",
      description: "Power outage affecting entire municipality due to transformer failure at main substation.",
      location: "Other Areas",
      severity: "medium",
      status: "responding",
      reportedDate: "2024-09-17T09:15:00Z",
      updatedDate: "2024-09-17T11:45:00Z",
      assignedTo: "Pedro Garcia",
      reporterName: "ALBECO",
      reporterContact: "operations@albeco.com",
      coordinates: "13.7456° N, 123.1456° E",
      affectedPersons: "8500",
      estimatedDamage: "500000",
      notes: "Repair crew dispatched. Generator sets deployed to critical facilities. ETA for restoration: 6 hours."
    }
  ];

  useEffect(() => {
    setIncidents(mockIncidents);
  }, []);

  // Filter and sort incidents
  const processedIncidents = useMemo(() => {
    let filtered = incidents?.filter(incident => {
      // View mode filter
      if (viewMode === 'active' && ['closed', 'resolved']?.includes(incident?.status)) return false;
      if (viewMode === 'archived' && !['closed', 'resolved']?.includes(incident?.status)) return false;

      // Search filter
      if (filters?.search) {
        const searchTerm = filters?.search?.toLowerCase();
        if (!incident?.id?.toLowerCase()?.includes(searchTerm) &&
            !incident?.description?.toLowerCase()?.includes(searchTerm) &&
            !incident?.location?.toLowerCase()?.includes(searchTerm)) {
          return false;
        }
      }

      // Type filter
      if (filters?.type !== 'all' && incident?.type !== filters?.type) return false;

      // Status filter
      if (filters?.status !== 'all' && incident?.status !== filters?.status) return false;

      // Severity filter
      if (filters?.severity !== 'all' && incident?.severity !== filters?.severity) return false;

      // Location filter
      if (filters?.location !== 'all' && incident?.location?.toLowerCase() !== filters?.location) return false;

      // Date filters
      if (filters?.dateFrom) {
        const incidentDate = new Date(incident.reportedDate);
        const fromDate = new Date(filters.dateFrom);
        if (incidentDate < fromDate) return false;
      }

      if (filters?.dateTo) {
        const incidentDate = new Date(incident.reportedDate);
        const toDate = new Date(filters.dateTo);
        toDate?.setHours(23, 59, 59, 999);
        if (incidentDate > toDate) return false;
      }

      return true;
    });

    // Sort incidents
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === 'reportedDate' || sortConfig?.key === 'updatedDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [incidents, filters, sortConfig, viewMode]);

  // Pagination
  const paginatedIncidents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedIncidents?.slice(startIndex, startIndex + itemsPerPage);
  }, [processedIncidents, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(processedIncidents?.length / itemsPerPage);

  // Event handlers
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setSelectedIncidents([]);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      type: 'all',
      status: 'all',
      severity: 'all',
      location: 'all',
      dateFrom: '',
      dateTo: ''
    };
    setFilters(clearedFilters);
    setCurrentPage(1);
    setSelectedIncidents([]);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleCreateNew = () => {
    setSelectedIncident(null);
    setShowCreateDialog(true);
  };

  const handleIncidentEdit = (incident) => {
    setSelectedIncident(incident);
    setShowEditDialog(true);
  };

  const handleIncidentView = (incident) => {
    setSelectedIncident(incident);
    setShowViewDialog(true);
  };

  const handleIncidentSave = (incidentData) => {
    if (incidentData?.id && incidents?.find(i => i?.id === incidentData?.id)) {
      // Update existing incident
      setIncidents(prev => prev?.map(i => i?.id === incidentData?.id ? incidentData : i));
    } else {
      // Create new incident
      setIncidents(prev => [incidentData, ...prev]);
    }
    setSelectedIncidents([]);
  };

  const handleStatusUpdate = (incidentId, newStatus) => {
    setIncidents(prev => prev?.map(incident => 
      incident?.id === incidentId 
        ? { ...incident, status: newStatus, updatedDate: new Date()?.toISOString() }
        : incident
    ));
  };

  const handleBulkStatusUpdate = (incidentIds, newStatus) => {
    setIncidents(prev => prev?.map(incident => 
      incidentIds?.includes(incident?.id)
        ? { ...incident, status: newStatus, updatedDate: new Date()?.toISOString() }
        : incident
    ));
    setSelectedIncidents([]);
  };

  const handleExport = (format) => {
    console.log(`Exporting ${processedIncidents?.length} incidents as ${format}`);
    // Export logic would go here
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setCurrentPage(1);
    setSelectedIncidents([]);
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/main-dashboard', icon: 'Home' },
    { label: 'Incident Management', path: '/incident-management' }
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
                  <Icon name="AlertTriangle" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Incident Management</h1>
                  <p className="text-muted-foreground">
                    Comprehensive incident tracking and response coordination
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Incidents</p>
                  <p className="text-2xl font-bold text-foreground">{incidents?.length}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-warning">
                    {incidents?.filter(i => !['closed', 'resolved']?.includes(i?.status))?.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <IncidentFilters
            onFiltersChange={handleFiltersChange}
            activeFilters={filters}
            onClearFilters={handleClearFilters}
          />

          {/* Table Actions */}
          <IncidentTableActions
            selectedIncidents={selectedIncidents}
            onCreateNew={handleCreateNew}
            onBulkStatusUpdate={handleBulkStatusUpdate}
            onExport={handleExport}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            totalCount={incidents?.length}
            filteredCount={processedIncidents?.length}
          />

          {/* Data Table */}
          <IncidentDataTable
            incidents={paginatedIncidents}
            selectedIncidents={selectedIncidents}
            onSelectionChange={setSelectedIncidents}
            onIncidentEdit={handleIncidentEdit}
            onIncidentView={handleIncidentView}
            onStatusUpdate={handleStatusUpdate}
            sortConfig={sortConfig}
            onSort={handleSort}
          />

          {/* Pagination */}
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={processedIncidents?.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(newSize) => {
              setItemsPerPage(newSize);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
      {/* Dialogs */}
      <IncidentFormDialog
        isOpen={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onSave={handleIncidentSave}
        mode="create"
      />
      <IncidentFormDialog
        isOpen={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        incident={selectedIncident}
        onSave={handleIncidentSave}
        mode="edit"
      />
      <IncidentViewDialog
        isOpen={showViewDialog}
        onClose={() => setShowViewDialog(false)}
        incident={selectedIncident}
        onEdit={(incident) => {
          setShowViewDialog(false);
          handleIncidentEdit(incident);
        }}
      />
    </div>
  );
};

export default IncidentManagement;