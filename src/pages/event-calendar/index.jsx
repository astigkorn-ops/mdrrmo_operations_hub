import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/ui/AdminSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import CalendarHeader from './components/CalendarHeader';
import CalendarFilters from './components/CalendarFilters';
import CalendarGrid from './components/CalendarGrid';
import EventDialog from './components/EventDialog';
import UpcomingEventsList from './components/UpcomingEventsList';
import ParticipantManagementDialog from './components/ParticipantManagementDialog';

const EventCalendar = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showParticipantDialog, setShowParticipantDialog] = useState(false);
  const [filters, setFilters] = useState({
    eventType: 'all',
    department: 'all',
    participantGroup: 'all'
  });

  // Mock events data
  useEffect(() => {
    const mockEvents = [
      {
        id: '1',
        title: 'Emergency Response Training',
        description: 'Comprehensive training on emergency response protocols and procedures for all MDRRMO staff members.',
        type: 'training',
        date: new Date(2025, 0, 20, 9, 0)?.toISOString(),
        duration: 240,
        location: 'MDRRMO Training Center',
        department: 'mdrrmo',
        participantGroup: 'staff',
        maxParticipants: 30,
        registeredParticipants: 25,
        resources: 'Training materials, projector, first aid kits',
        isPublic: false,
        requiresRegistration: true
      },
      {
        id: '2',
        title: 'Community Fire Drill',
        description: 'Monthly fire drill exercise for Barangay San Roque residents to practice evacuation procedures.',
        type: 'drill',
        date: new Date(2025, 0, 22, 14, 0)?.toISOString(),
        duration: 120,
        location: 'Barangay San Roque Plaza',
        department: 'bfp',
        participantGroup: 'community',
        maxParticipants: 200,
        registeredParticipants: 150,
        resources: 'Fire trucks, megaphones, safety cones',
        isPublic: true,
        requiresRegistration: false
      },
      {
        id: '3',
        title: 'Disaster Preparedness Workshop',
        description: 'Educational workshop on family emergency planning and disaster preparedness for local families.',
        type: 'workshop',
        date: new Date(2025, 0, 25, 10, 0)?.toISOString(),
        duration: 180,
        location: 'Municipal Hall Conference Room',
        department: 'mdrrmo',
        participantGroup: 'community',
        maxParticipants: 50,
        registeredParticipants: 35,
        resources: 'Handouts, emergency kit samples, presentation materials',
        isPublic: true,
        requiresRegistration: true
      },
      {
        id: '4',
        title: 'Inter-Agency Coordination Meeting',
        description: 'Monthly coordination meeting between MDRRMO, BFP, PNP, and other emergency response agencies.',
        type: 'meeting',
        date: new Date(2025, 0, 28, 13, 0)?.toISOString(),
        duration: 120,
        location: 'MDRRMO Conference Room',
        department: 'mdrrmo',
        participantGroup: 'officials',
        maxParticipants: 20,
        registeredParticipants: 18,
        resources: 'Meeting materials, refreshments',
        isPublic: false,
        requiresRegistration: true
      },
      {
        id: '5',
        title: 'Flood Risk Assessment',
        description: 'Technical assessment of flood-prone areas in the municipality with mapping and documentation.',
        type: 'assessment',
        date: new Date(2025, 0, 30, 8, 0)?.toISOString(),
        duration: 480,
        location: 'Various flood-prone barangays',
        department: 'engineering',
        participantGroup: 'staff',
        maxParticipants: 15,
        registeredParticipants: 12,
        resources: 'Survey equipment, vehicles, documentation materials',
        isPublic: false,
        requiresRegistration: true
      },
      {
        id: '6',
        title: 'Volunteer Orientation Program',
        description: 'Orientation program for new disaster response volunteers covering basic emergency response skills.',
        type: 'training',
        date: new Date(2025, 1, 2, 9, 0)?.toISOString(),
        duration: 300,
        location: 'Community Center',
        department: 'mdrrmo',
        participantGroup: 'volunteers',
        maxParticipants: 40,
        registeredParticipants: 32,
        resources: 'Training manuals, certificates, refreshments',
        isPublic: true,
        requiresRegistration: true
      }
    ];

    setEvents(mockEvents);
  }, []);

  // Filter events based on current filters
  useEffect(() => {
    let filtered = events;

    if (filters?.eventType !== 'all') {
      filtered = filtered?.filter(event => event?.type === filters?.eventType);
    }

    if (filters?.department !== 'all') {
      filtered = filtered?.filter(event => event?.department === filters?.department);
    }

    if (filters?.participantGroup !== 'all') {
      filtered = filtered?.filter(event => event?.participantGroup === filters?.participantGroup);
    }

    setFilteredEvents(filtered);
  }, [events, filters]);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/main-dashboard', icon: 'Home' },
    { label: 'Event Calendar', path: '/event-calendar' }
  ];

  const handleNavigate = (direction) => {
    const newDate = new Date(currentDate);
    
    if (direction === 'prev') {
      if (viewMode === 'month') {
        newDate?.setMonth(newDate?.getMonth() - 1);
      } else if (viewMode === 'week') {
        newDate?.setDate(newDate?.getDate() - 7);
      } else if (viewMode === 'day') {
        newDate?.setDate(newDate?.getDate() - 1);
      }
    } else if (direction === 'next') {
      if (viewMode === 'month') {
        newDate?.setMonth(newDate?.getMonth() + 1);
      } else if (viewMode === 'week') {
        newDate?.setDate(newDate?.getDate() + 7);
      } else if (viewMode === 'day') {
        newDate?.setDate(newDate?.getDate() + 1);
      }
    } else if (direction === 'today') {
      newDate?.setTime(new Date()?.getTime());
    }
    
    setCurrentDate(newDate);
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setSelectedDate(null);
    setShowEventDialog(true);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setShowEventDialog(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setSelectedDate(null);
    setShowEventDialog(true);
  };

  const handleSaveEvent = (eventData) => {
    if (selectedEvent) {
      // Update existing event
      setEvents(prev => prev?.map(event => 
        event?.id === selectedEvent?.id ? eventData : event
      ));
    } else {
      // Add new event
      setEvents(prev => [...prev, eventData]);
    }
    
    setShowEventDialog(false);
    setSelectedEvent(null);
    setSelectedDate(null);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      eventType: 'all',
      department: 'all',
      participantGroup: 'all'
    });
  };

  const handleManageParticipants = (event) => {
    setSelectedEvent(event);
    setShowParticipantDialog(true);
  };

  const handleUpdateParticipants = (eventId, participants) => {
    setEvents(prev => prev?.map(event => 
      event?.id === eventId 
        ? { ...event, registeredParticipants: participants?.filter(p => p?.status === 'confirmed')?.length }
        : event
    ));
  };

  // Get upcoming events (next 7 days)
  const getUpcomingEvents = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek?.setDate(today?.getDate() + 7);
    
    return filteredEvents?.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= nextWeek;
      })?.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <main className={`transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <div className="p-6">
          <div className="mb-6">
            <BreadcrumbNavigation items={breadcrumbItems} />
            <h1 className="text-2xl font-bold text-foreground mt-2">Event Calendar</h1>
            <p className="text-muted-foreground">
              Schedule and manage training sessions, drills, and emergency preparedness events
            </p>
          </div>

          <CalendarFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3">
              <CalendarHeader
                currentDate={currentDate}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onNavigate={handleNavigate}
                onAddEvent={handleAddEvent}
              />

              <CalendarGrid
                currentDate={currentDate}
                viewMode={viewMode}
                events={filteredEvents}
                onDateClick={handleDateClick}
                onEventClick={handleEventClick}
              />
            </div>

            <div className="xl:col-span-1">
              <UpcomingEventsList
                events={getUpcomingEvents()}
                onEventClick={handleEventClick}
                onManageParticipants={handleManageParticipants}
              />
            </div>
          </div>
        </div>
      </main>

      <EventDialog
        isOpen={showEventDialog}
        onClose={() => {
          setShowEventDialog(false);
          setSelectedEvent(null);
          setSelectedDate(null);
        }}
        onSave={handleSaveEvent}
        event={selectedEvent}
        selectedDate={selectedDate}
      />

      <ParticipantManagementDialog
        isOpen={showParticipantDialog}
        onClose={() => {
          setShowParticipantDialog(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
        onUpdateParticipants={handleUpdateParticipants}
      />
    </div>
  );
};

export default EventCalendar;