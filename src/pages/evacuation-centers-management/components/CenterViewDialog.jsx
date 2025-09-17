import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CenterViewDialog = ({ isOpen, onClose, center, onEdit }) => {
  if (!isOpen || !center) return null;

  const occupancyRate = (center?.currentOccupancy / center?.maxCapacity) * 100;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'operational': return 'bg-success text-success-foreground';
      case 'ready': return 'bg-primary text-primary-foreground';
      case 'maintenance': return 'bg-warning text-warning-foreground';
      case 'full': return 'bg-error text-error-foreground';
      case 'closed': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getResourceColor = (level) => {
    if (level >= 80) return 'text-success';
    if (level >= 50) return 'text-warning';
    return 'text-error';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const accessibilityIconMap = {
    wheelchair: 'Accessibility',
    medical: 'Cross',
    ramp: 'TrendingUp',
    elevator: 'ArrowUp'
  };

  const facilityIconMap = {
    restrooms: 'Users',
    kitchen: 'Utensils',
    medical_bay: 'Cross',
    generator: 'Zap',
    wifi: 'Wifi',
    parking: 'Car'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Home" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{center?.name}</h2>
              <p className="text-sm text-muted-foreground">{center?.address}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(center)}
            >
              <Icon name="Edit" size={16} className="mr-1" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status & Capacity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Status</h4>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(center?.status)}`}>
                    {center?.status}
                  </span>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Last Updated</h4>
                  <p className="text-sm text-foreground">{formatDate(center?.lastUpdated)}</p>
                </div>
              </div>

              {/* Capacity Information */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Capacity Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Current Occupancy</span>
                    <span className="text-lg font-semibold text-foreground">
                      {center?.currentOccupancy} / {center?.maxCapacity}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${
                        occupancyRate >= 90 ? 'bg-error' :
                        occupancyRate >= 70 ? 'bg-warning' :
                        occupancyRate >= 50 ? 'bg-accent' : 'bg-success'
                      }`}
                      style={{ width: `${Math.min(occupancyRate, 100)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Occupancy Rate</span>
                    <span className={`font-medium ${
                      occupancyRate >= 90 ? 'text-error' :
                      occupancyRate >= 70 ? 'text-warning' :
                      occupancyRate >= 50 ? 'text-accent' : 'text-success'
                    }`}>
                      {occupancyRate?.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Available Space</span>
                    <span className="text-success font-medium">
                      {center?.maxCapacity - center?.currentOccupancy} persons
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="User" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{center?.contactPerson}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{center?.contactNumber}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{center?.barangay}</span>
                  </div>
                  {center?.coordinates?.lat && center?.coordinates?.lng && (
                    <div className="flex items-center space-x-2">
                      <Icon name="Navigation" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {center?.coordinates?.lat?.toFixed(6)}, {center?.coordinates?.lng?.toFixed(6)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Current Evacuees */}
              {center?.evacuees?.length > 0 && (
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Current Evacuees</h4>
                  <div className="space-y-2">
                    {center?.evacuees?.map((evacuee, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                        <div>
                          <span className="text-sm font-medium text-foreground">{evacuee?.family}</span>
                          <span className="text-sm text-muted-foreground ml-2">({evacuee?.members} members)</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{evacuee?.assigned}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* Resource Levels */}
              {center?.resources && (
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Resource Levels</h4>
                  <div className="space-y-3">
                    {Object.entries(center?.resources)?.map(([resource, level]) => (
                      <div key={resource} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-foreground capitalize">{resource}</span>
                          <span className={`text-sm font-medium ${getResourceColor(level)}`}>
                            {level}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              level >= 80 ? 'bg-success' :
                              level >= 50 ? 'bg-warning' : 'bg-error'
                            }`}
                            style={{ width: `${level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Accessibility Features */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Accessibility Features</h4>
                <div className="space-y-2">
                  {center?.accessibilityFeatures?.length > 0 ? (
                    center?.accessibilityFeatures?.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Icon 
                          name={accessibilityIconMap?.[feature] || 'Check'} 
                          size={14} 
                          className="text-success" 
                        />
                        <span className="text-sm text-foreground capitalize">{feature?.replace('_', ' ')}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No accessibility features</span>
                  )}
                </div>
              </div>

              {/* Available Facilities */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Available Facilities</h4>
                <div className="grid grid-cols-2 gap-2">
                  {center?.facilities?.length > 0 ? (
                    center?.facilities?.map((facility) => (
                      <div key={facility} className="flex items-center space-x-2">
                        <Icon 
                          name={facilityIconMap?.[facility] || 'Check'} 
                          size={14} 
                          className="text-primary" 
                        />
                        <span className="text-xs text-foreground capitalize">{facility?.replace('_', ' ')}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground col-span-2">No facilities listed</span>
                  )}
                </div>
              </div>

              {/* Notes */}
              {center?.notes && (
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Notes</h4>
                  <p className="text-sm text-foreground">{center?.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterViewDialog;