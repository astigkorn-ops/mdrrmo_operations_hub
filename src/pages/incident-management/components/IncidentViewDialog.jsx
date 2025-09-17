import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IncidentViewDialog = ({ isOpen, onClose, incident, onEdit }) => {
  if (!isOpen || !incident) return null;

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'bg-error text-error-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-accent text-accent-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'reported': return 'bg-muted text-muted-foreground';
      case 'investigating': return 'bg-accent text-accent-foreground';
      case 'responding': return 'bg-warning text-warning-foreground';
      case 'resolved': return 'bg-success text-success-foreground';
      case 'closed': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
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

  const formatCurrency = (amount) => {
    if (!amount) return 'Not specified';
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    })?.format(amount);
  };

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'flood': return 'Waves';
      case 'typhoon': return 'CloudRain';
      case 'earthquake': return 'Zap';
      case 'landslide': return 'Mountain';
      case 'fire': return 'Flame';
      case 'accident': return 'Car';
      case 'medical': return 'Heart';
      default: return 'AlertTriangle';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name={getTypeIcon(incident?.type)} size={24} color="white" />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h2 className="text-xl font-bold text-foreground">
                  Incident #{incident?.id}
                </h2>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(incident?.status)}`}>
                  {incident?.status}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(incident?.severity)}`}>
                  {incident?.severity}
                </span>
              </div>
              <p className="text-sm text-muted-foreground capitalize">
                {incident?.type} • {incident?.location}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(incident)}
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

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                  <Icon name="FileText" size={18} className="mr-2" />
                  Description
                </h3>
                <p className="text-foreground leading-relaxed">{incident?.description}</p>
              </div>

              {/* Location & Coordinates */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                  <Icon name="MapPin" size={18} className="mr-2" />
                  Location Details
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="text-foreground font-medium">{incident?.location}</span>
                  </div>
                  {incident?.coordinates && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Coordinates:</span>
                      <span className="text-foreground font-mono text-sm">{incident?.coordinates}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Impact Assessment */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                  <Icon name="BarChart3" size={18} className="mr-2" />
                  Impact Assessment
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3 border border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Affected Persons</span>
                      <span className="text-2xl font-bold text-foreground">
                        {incident?.affectedPersons || '0'}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Estimated Damage</span>
                      <span className="text-lg font-bold text-foreground">
                        {formatCurrency(incident?.estimatedDamage)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              {incident?.notes && (
                <div className="bg-muted/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                    <Icon name="StickyNote" size={18} className="mr-2" />
                    Additional Notes
                  </h3>
                  <p className="text-foreground leading-relaxed">{incident?.notes}</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Timeline */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                  <Icon name="Clock" size={18} className="mr-2" />
                  Timeline
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Reported</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(incident?.reportedDate)}
                      </p>
                    </div>
                  </div>
                  {incident?.updatedDate && incident?.updatedDate !== incident?.reportedDate && (
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Last Updated</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(incident?.updatedDate)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Assignment */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                  <Icon name="User" size={18} className="mr-2" />
                  Assignment
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">
                      {incident?.assignedTo?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{incident?.assignedTo}</p>
                    <p className="text-xs text-muted-foreground">Assigned Personnel</p>
                  </div>
                </div>
              </div>

              {/* Reporter Information */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                  <Icon name="Phone" size={18} className="mr-2" />
                  Reporter
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{incident?.reporterName}</p>
                    <p className="text-xs text-muted-foreground">Name</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{incident?.reporterContact}</p>
                    <p className="text-xs text-muted-foreground">Contact</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                  <Icon name="Zap" size={18} className="mr-2" />
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    className="justify-start"
                  >
                    <Icon name="MessageSquare" size={14} className="mr-2" />
                    Add Comment
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    className="justify-start"
                  >
                    <Icon name="Paperclip" size={14} className="mr-2" />
                    Attach File
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    className="justify-start"
                  >
                    <Icon name="Share" size={14} className="mr-2" />
                    Share Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentViewDialog;