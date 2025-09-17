import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveMap = ({ centers, onCenterSelect }) => {
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [mapView, setMapView] = useState('overview');

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'operational': return 'bg-success';
      case 'ready': return 'bg-primary';
      case 'maintenance': return 'bg-warning';
      case 'full': return 'bg-error';
      case 'closed': return 'bg-secondary';
      default: return 'bg-muted';
    }
  };

  const getCapacityIcon = (occupancyRate) => {
    if (occupancyRate >= 90) return 'AlertTriangle';
    if (occupancyRate >= 70) return 'AlertCircle';
    return 'Home';
  };

  const handleCenterClick = (center) => {
    setSelectedCenter(center);
  };

  const formatCoordinates = (center) => {
    if (!center?.coordinates?.lat || !center?.coordinates?.lng) return 'No coordinates';
    return `${center?.coordinates?.lat?.toFixed(4)}, ${center?.coordinates?.lng?.toFixed(4)}`;
  };

  const calculateDistance = (center1, center2) => {
    // Simple distance calculation for demo purposes
    const lat1 = center1?.coordinates?.lat || 0;
    const lng1 = center1?.coordinates?.lng || 0;
    const lat2 = center2?.coordinates?.lat || 0;
    const lng2 = center2?.coordinates?.lng || 0;
    
    const distance = Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lng2 - lng1, 2)) * 111; // Rough km conversion
    return distance?.toFixed(1);
  };

  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden">
      {/* Map Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Map" size={20} className="text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">Evacuation Centers Map</h3>
              <p className="text-sm text-muted-foreground">
                {centers?.length} centers • Click on markers for details
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={mapView === 'overview' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('overview')}
            >
              <Icon name="Globe" size={14} className="mr-1" />
              Overview
            </Button>
            <Button
              variant={mapView === 'satellite' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('satellite')}
            >
              <Icon name="Satellite" size={14} className="mr-1" />
              Satellite
            </Button>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Map Container (Simulated) */}
        <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
          {/* Background pattern to simulate map */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
              {Array.from({ length: 48 })?.map((_, i) => (
                <div key={i} className="border border-gray-200" />
              ))}
            </div>
          </div>

          {/* Center Markers */}
          {centers?.map((center, index) => {
            const occupancyRate = (center?.currentOccupancy / center?.maxCapacity) * 100;
            const left = 15 + (index % 4) * 20; // Distribute across map
            const top = 20 + Math.floor(index / 4) * 25;

            return (
              <div
                key={center?.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                  selectedCenter?.id === center?.id ? 'z-20' : 'z-10'
                }`}
                style={{ left: `${left}%`, top: `${top}%` }}
                onClick={() => handleCenterClick(center)}
              >
                {/* Marker */}
                <div className={`relative ${selectedCenter?.id === center?.id ? 'scale-125' : ''} transition-transform duration-200`}>
                  <div className={`w-8 h-8 rounded-full ${getStatusColor(center?.status)} border-2 border-white shadow-lg flex items-center justify-center`}>
                    <Icon 
                      name={getCapacityIcon(occupancyRate)} 
                      size={14} 
                      color="white" 
                    />
                  </div>
                  {/* Pulse animation for selected center */}
                  {selectedCenter?.id === center?.id && (
                    <div className={`absolute inset-0 rounded-full ${getStatusColor(center?.status)} animate-ping opacity-75`} />
                  )}
                </div>

                {/* Info popup for selected center */}
                {selectedCenter?.id === center?.id && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white border border-border rounded-lg shadow-lg p-3 z-30">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-foreground text-sm">{center?.name}</h4>
                        <p className="text-xs text-muted-foreground">{center?.barangay}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onCenterSelect(center);
                        }}
                        className="h-6 w-6 p-0"
                      >
                        <Icon name="ExternalLink" size={12} />
                      </Button>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Capacity:</span>
                        <span className="text-foreground font-medium">
                          {center?.currentOccupancy} / {center?.maxCapacity}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(center?.status)} text-white`}>
                          {center?.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Contact:</span>
                        <span className="text-foreground">{center?.contactPerson}</span>
                      </div>
                      {center?.coordinates?.lat && center?.coordinates?.lng && (
                        <div className="pt-1 border-t border-border">
                          <span className="text-muted-foreground">Coordinates: </span>
                          <span className="text-foreground font-mono text-xs">{formatCoordinates(center)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white border border-border rounded-lg p-3 shadow-lg">
            <h4 className="text-sm font-medium text-foreground mb-2">Legend</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-xs text-foreground">Operational</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs text-foreground">Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-warning" />
                <span className="text-xs text-foreground">Maintenance</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-error" />
                <span className="text-xs text-foreground">Full/Closed</span>
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 bg-white"
            >
              <Icon name="Plus" size={14} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 bg-white"
            >
              <Icon name="Minus" size={14} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 bg-white"
            >
              <Icon name="RotateCcw" size={14} />
            </Button>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="p-4 bg-muted/30 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-success">
                {centers?.filter(c => c?.status === 'operational')?.length}
              </div>
              <div className="text-xs text-muted-foreground">Operational</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-primary">
                {centers?.filter(c => c?.status === 'ready')?.length}
              </div>
              <div className="text-xs text-muted-foreground">Ready</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">
                {centers?.reduce((sum, c) => sum + (c?.maxCapacity - c?.currentOccupancy), 0)}
              </div>
              <div className="text-xs text-muted-foreground">Available Capacity</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-warning">
                {centers?.filter(c => (c?.currentOccupancy / c?.maxCapacity) >= 0.8)?.length}
              </div>
              <div className="text-xs text-muted-foreground">Nearly Full</div>
            </div>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {centers?.length === 0 && (
        <div className="h-96 flex items-center justify-center">
          <div className="text-center">
            <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No evacuation centers to display</h3>
            <p className="text-muted-foreground">Add evacuation centers to see them on the map.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;