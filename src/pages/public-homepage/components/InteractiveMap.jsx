import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveMap = () => {
  const [activeLayers, setActiveLayers] = useState(['incidents']);
  const [mapCenter] = useState({ lat: 13.6929, lng: 123.4794 }); // Pio Duran coordinates

  const mapLayers = [
    {
      id: 'incidents',
      label: 'Live Incidents',
      icon: 'AlertTriangle',
      color: 'text-error',
      count: 3
    },
    {
      id: 'evacuation',
      label: 'Evacuation Centers',
      icon: 'Shield',
      color: 'text-success',
      count: 12
    },
    {
      id: 'hazards',
      label: 'Hazard Maps',
      icon: 'MapPin',
      color: 'text-warning',
      count: 8
    },
    {
      id: 'weather',
      label: 'Weather Stations',
      icon: 'Cloud',
      color: 'text-primary',
      count: 5
    }
  ];

  const toggleLayer = (layerId) => {
    setActiveLayers(prev => 
      prev?.includes(layerId) 
        ? prev?.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
      {/* Map Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Operations Map</h3>
            <p className="text-sm text-muted-foreground">Pio Duran, Albay - Real-time Data</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Reset View
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Maximize2" size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative">
        {/* Google Maps Iframe */}
        <div className="h-96 lg:h-[500px] bg-muted">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Pio Duran Operations Map"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=14&output=embed`}
            className="border-0"
          />
        </div>

        {/* Layer Controls */}
        <div className="absolute top-4 right-4 bg-white rounded-lg border border-border shadow-lg p-3 space-y-2 max-w-xs">
          <div className="text-sm font-medium text-foreground mb-2">Map Layers</div>
          {mapLayers?.map((layer) => (
            <div key={layer?.id} className="flex items-center justify-between">
              <button
                onClick={() => toggleLayer(layer?.id)}
                className={`flex items-center space-x-2 text-sm transition-colors duration-150 ${
                  activeLayers?.includes(layer?.id)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className={`w-3 h-3 rounded border-2 flex items-center justify-center ${
                  activeLayers?.includes(layer?.id)
                    ? 'bg-primary border-primary' :'border-muted-foreground'
                }`}>
                  {activeLayers?.includes(layer?.id) && (
                    <Icon name="Check" size={8} color="white" />
                  )}
                </div>
                <Icon name={layer?.icon} size={14} className={layer?.color} />
                <span>{layer?.label}</span>
              </button>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                {layer?.count}
              </span>
            </div>
          ))}
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg border border-border shadow-lg p-3">
          <div className="text-xs font-medium text-foreground mb-2">Legend</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-xs text-muted-foreground">Active Incidents</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-xs text-muted-foreground">Safe Zones</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-xs text-muted-foreground">Risk Areas</span>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Icon name="MapPin" size={16} className="mr-2" />
            Find Evacuation Center
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="AlertTriangle" size={16} className="mr-2" />
            Report Incident
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Navigation" size={16} className="mr-2" />
            Get Directions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;