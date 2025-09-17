import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/ui/AdminSidebar';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AdvisoryDataTable from './components/AdvisoryDataTable';
import AdvisoryEditor from './components/AdvisoryEditor';
import AdvisoryStats from './components/AdvisoryStats';
import PublishingHistory from './components/PublishingHistory';

const PublicAdvisories = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [advisories, setAdvisories] = useState([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedAdvisory, setSelectedAdvisory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for advisories
  const mockAdvisories = [
    {
      id: '1',
      title: 'Typhoon Signal No. 2 Raised Over Pio Duran',
      category: 'Weather Alert',
      priority: 'critical',
      status: 'published',
      content: `**WEATHER ADVISORY - TYPHOON SIGNAL NO. 2**\n\nDate: September 17, 2025\nTime: 5:00 PM PST\n\n**Current Weather Conditions:**\n- Wind Speed: 85-120 km/h\n- Direction: Northeast\n- Visibility: 2-5 kilometers\n\n**Advisory:**\nTyphoon "MARIA" continues to intensify as it approaches the Bicol Region. Signal No. 2 is now raised over Pio Duran and surrounding municipalities.\n\n**Immediate Actions Required:**\n- Secure loose objects and outdoor furniture\n- Check emergency supplies and flashlights\n- Monitor official weather updates\n- Avoid unnecessary travel\n\n**Emergency Contacts:**\nMDRRMO Hotline: (02) 8888-0000\nEmergency: 911`,
      excerpt: 'Typhoon Signal No. 2 is now in effect for Pio Duran. Residents are advised to take immediate precautionary measures.',
      author: 'Weather Officer',
      isEmergency: true,
      createdAt: '2025-09-17T09:00:00Z',
      updatedAt: '2025-09-17T09:15:00Z',
      tags: ['typhoon', 'weather', 'emergency']
    },
    {
      id: '2',
      title: 'Road Closure: Maharlika Highway Due to Landslide',
      category: 'Traffic Advisory',
      priority: 'high',
      status: 'published',
      content: `**TRAFFIC ADVISORY - ROAD CLOSURE**\n\nDate: September 17, 2025\nTime: 2:30 PM\n\n**AFFECTED AREAS:**\nMaharlika Highway (Km 485-487) - Both directions\n\n**REASON:**\nLandslide caused by continuous heavy rainfall has blocked the highway. DPWH crews are on-site for clearing operations.\n\n**ALTERNATIVE ROUTES:**\n- Route 1: Via Barangay San Roque - Barangay Poblacion\n- Route 2: Via Provincial Road through Barangay Salvacion\n\n**DURATION:**\nExpected to last until 8:00 PM today\n\n**MOTORIST ADVISORY:**\n- Plan alternative routes\n- Allow extra 30-45 minutes travel time\n- Follow traffic enforcers' instructions\n- Drive carefully on wet roads\n\nFor updates: MDRRMO (02) 8888-0000`,excerpt: 'Maharlika Highway temporarily closed due to landslide. Alternative routes available.',author: 'Traffic Coordinator',isEmergency: false,createdAt: '2025-09-17T06:30:00Z',updatedAt: '2025-09-17T06:30:00Z',
      tags: ['traffic', 'road closure', 'landslide']
    },
    {
      id: '3',title: 'Health Advisory: Dengue Prevention Measures',category: 'Health Advisory',priority: 'medium',status: 'published',
      content: `**HEALTH ADVISORY - DENGUE PREVENTION**\n\nDate: September 16, 2025\n\n**SITUATION:**\nThe Municipal Health Office reports increased dengue cases in several barangays. As of September 15, we have recorded 23 confirmed cases this month.\n\n**PREVENTION MEASURES:**\n- Remove stagnant water from containers\n- Clean water storage tanks weekly\n- Use mosquito nets and repellents\n- Maintain clean surroundings\n\n**SYMPTOMS TO WATCH FOR:**\n- High fever (40°C/104°F)\n- Severe headache\n- Pain behind the eyes\n- Muscle and joint pains\n- Skin rash\n\n**IMMEDIATE ACTION:**\nSeek medical attention immediately if symptoms appear. Do not self-medicate.\n\n**FREE CONSULTATION:**\nAvailable at Pio Duran Rural Health Unit\nMonday-Friday: 8:00 AM - 5:00 PM\n\nContact: (054) 123-4567`,
      excerpt: 'Increased dengue cases reported. Community urged to implement prevention measures.',author: 'Health Officer',isEmergency: false,createdAt: '2025-09-16T08:00:00Z',updatedAt: '2025-09-16T08:00:00Z',
      tags: ['health', 'dengue', 'prevention']
    },
    {
      id: '4',title: 'Emergency Evacuation Drill - September 20, 2025',category: 'Emergency Notice',priority: 'medium',status: 'scheduled',
      content: `**EMERGENCY EVACUATION DRILL ANNOUNCEMENT**\n\nDate: September 20, 2025\nTime: 9:00 AM - 12:00 PM\n\n**PARTICIPATING AREAS:**\n- Barangay Poblacion\n- Barangay San Roque\n- Barangay Salvacion\n\n**DRILL OBJECTIVES:**\n- Test evacuation procedures\n- Familiarize residents with evacuation routes\n- Assess response time and coordination\n- Identify areas for improvement\n\n**WHAT TO EXPECT:**\n- Siren will sound at 9:00 AM sharp\n- Barangay officials will guide residents\n- Assembly at designated evacuation centers\n- Brief orientation and feedback session\n\n**EVACUATION CENTERS:**\n- Pio Duran Central School\n- Barangay San Roque Covered Court\n- Municipal Gymnasium\n\n**PARTICIPATION:**\nAll residents are encouraged to participate. This drill is crucial for disaster preparedness.\n\nFor inquiries: MDRRMO (02) 8888-0000`,
      excerpt: 'Community-wide evacuation drill scheduled for September 20. All residents encouraged to participate.',author: 'Emergency Coordinator',isEmergency: false,createdAt: '2025-09-15T10:00:00Z',updatedAt: '2025-09-15T10:00:00Z',publishAt: '2025-09-18T08:00:00Z',
      tags: ['drill', 'evacuation', 'preparedness']
    },
    {
      id: '5',title: 'Water Service Interruption Notice',category: 'Public Safety',priority: 'low',status: 'draft',content: `**WATER SERVICE INTERRUPTION NOTICE**\n\nDate: September 18, 2025\nTime: 6:00 AM - 4:00 PM\n\n**AFFECTED AREAS:**\n- Barangay Poblacion (Zones 1-3)\n- Barangay San Antonio\n\n**REASON:**\nScheduled maintenance and repair of main water pipeline to improve service reliability.\n\n**PREPARATION ADVICE:**\n- Store adequate water supply\n- Schedule water-dependent activities accordingly\n- Report any issues after service restoration\n\n**ALTERNATIVE WATER SOURCES:**\n- Municipal water tank (Barangay Hall)\n- Artesian wells (designated areas)\n\n**SERVICE RESTORATION:**\nExpected by 4:00 PM. Some areas may experience low pressure initially.\n\nFor concerns: Municipal Water District (054) 987-6543`,excerpt: 'Scheduled water service interruption for pipeline maintenance.',author: 'Public Works Officer',isEmergency: false,createdAt: '2025-09-15T14:00:00Z',updatedAt: '2025-09-15T14:00:00Z',
      tags: ['water', 'maintenance', 'service']
    }
  ];

  useEffect(() => {
    // Simulate loading data
    const loadAdvisories = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAdvisories(mockAdvisories);
      setIsLoading(false);
    };

    loadAdvisories();
  }, []);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/main-dashboard', icon: 'Home' },
    { label: 'Public Advisories', path: '/public-advisories' }
  ];

  const handleCreateAdvisory = () => {
    setSelectedAdvisory(null);
    setIsEditorOpen(true);
  };

  const handleEditAdvisory = (advisory) => {
    setSelectedAdvisory(advisory);
    setIsEditorOpen(true);
  };

  const handleSaveAdvisory = async (advisoryData) => {
    if (selectedAdvisory) {
      // Update existing advisory
      setAdvisories(prev => prev?.map(a => 
        a?.id === selectedAdvisory?.id ? advisoryData : a
      ));
    } else {
      // Create new advisory
      setAdvisories(prev => [advisoryData, ...prev]);
    }
    
    setIsEditorOpen(false);
    setSelectedAdvisory(null);
  };

  const handleDeleteAdvisory = (advisoryId) => {
    if (window.confirm('Are you sure you want to delete this advisory?')) {
      setAdvisories(prev => prev?.filter(a => a?.id !== advisoryId));
    }
  };

  const handlePublishAdvisory = (advisoryId) => {
    setAdvisories(prev => prev?.map(a => 
      a?.id === advisoryId ? { ...a, status: 'published', updatedAt: new Date()?.toISOString() } : a
    ));
  };

  const handleUnpublishAdvisory = (advisoryId) => {
    setAdvisories(prev => prev?.map(a => 
      a?.id === advisoryId ? { ...a, status: 'draft', updatedAt: new Date()?.toISOString() } : a
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex">
        <AdminSidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        />
        <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading advisories...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      
      <div className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <BreadcrumbNavigation items={breadcrumbItems} className="mb-4" />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Public Advisories</h1>
                <p className="text-muted-foreground mt-1">
                  Manage emergency communications and public announcements
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/public-homepage'}
                >
                  <Icon name="Eye" size={16} className="mr-2" />
                  View Public Site
                </Button>
                
                <Button
                  variant="default"
                  onClick={handleCreateAdvisory}
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Create New Advisory
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <AdvisoryStats advisories={advisories} />

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Data Table */}
            <div className="xl:col-span-3">
              <AdvisoryDataTable
                advisories={advisories}
                onEdit={handleEditAdvisory}
                onDelete={handleDeleteAdvisory}
                onPublish={handlePublishAdvisory}
                onUnpublish={handleUnpublishAdvisory}
              />
            </div>

            {/* Publishing History */}
            <div className="xl:col-span-1">
              <PublishingHistory advisories={advisories} />
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Editor */}
      <AdvisoryEditor
        advisory={selectedAdvisory}
        isOpen={isEditorOpen}
        onSave={handleSaveAdvisory}
        onCancel={() => {
          setIsEditorOpen(false);
          setSelectedAdvisory(null);
        }}
      />
    </div>
  );
};

export default PublicAdvisories;