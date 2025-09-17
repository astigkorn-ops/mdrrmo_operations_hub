import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulletinViewDialog = ({ isOpen, onClose, bulletin, onEdit }) => {
  if (!isOpen || !bulletin) return null;

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'typhoon': return 'CloudRain';
      case 'rainfall': return 'CloudDrizzle';
      case 'thunderstorm': return 'Zap';
      case 'wind': return 'Wind';
      case 'heat': return 'Sun';
      case 'flood': return 'Waves';
      case 'general': return 'Info';
      default: return 'Cloud';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'bg-error text-error-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-accent text-accent-foreground';
      case 'low': return 'bg-success text-success-foreground';
      case 'info': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'draft': return 'bg-muted text-muted-foreground';
      case 'scheduled': return 'bg-primary text-primary-foreground';
      case 'published': return 'bg-success text-success-foreground';
      case 'expired': return 'bg-warning text-warning-foreground';
      case 'archived': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString)?.toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const channelIconMap = {
    website: 'Globe',
    sms: 'MessageSquare',
    radio: 'Radio',
    social_media: 'Share2',
    emergency_alert: 'AlertTriangle'
  };

  const channelLabelMap = {
    website: 'Municipal Website',
    sms: 'SMS Alert System',
    radio: 'Radio Broadcast',
    social_media: 'Social Media',
    emergency_alert: 'Emergency Alert System'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name={getTypeIcon(bulletin?.type)} size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{bulletin?.title}</h2>
              <div className="flex items-center space-x-3 mt-1">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(bulletin?.severity)}`}>
                  {bulletin?.severity}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bulletin?.status)}`}>
                  {bulletin?.status}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(bulletin)}
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
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bulletin Content */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Bulletin Content</h4>
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground whitespace-pre-wrap">{bulletin?.content}</p>
                </div>
              </div>

              {/* Weather Data */}
              {bulletin?.weatherData && Object.values(bulletin?.weatherData)?.some(value => value) && (
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Weather Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {bulletin?.weatherData?.windSpeed && (
                      <div className="flex items-center space-x-2">
                        <Icon name="Wind" size={16} className="text-muted-foreground" />
                        <div>
                          <span className="text-xs text-muted-foreground">Wind Speed</span>
                          <p className="text-sm font-medium text-foreground">{bulletin?.weatherData?.windSpeed}</p>
                        </div>
                      </div>
                    )}
                    {bulletin?.weatherData?.direction && (
                      <div className="flex items-center space-x-2">
                        <Icon name="Navigation" size={16} className="text-muted-foreground" />
                        <div>
                          <span className="text-xs text-muted-foreground">Direction</span>
                          <p className="text-sm font-medium text-foreground">{bulletin?.weatherData?.direction}</p>
                        </div>
                      </div>
                    )}
                    {bulletin?.weatherData?.rainfall && (
                      <div className="flex items-center space-x-2">
                        <Icon name="CloudDrizzle" size={16} className="text-muted-foreground" />
                        <div>
                          <span className="text-xs text-muted-foreground">Rainfall</span>
                          <p className="text-sm font-medium text-foreground">{bulletin?.weatherData?.rainfall}</p>
                        </div>
                      </div>
                    )}
                    {bulletin?.weatherData?.pressure && (
                      <div className="flex items-center space-x-2">
                        <Icon name="Gauge" size={16} className="text-muted-foreground" />
                        <div>
                          <span className="text-xs text-muted-foreground">Pressure</span>
                          <p className="text-sm font-medium text-foreground">{bulletin?.weatherData?.pressure}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Affected Areas */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Affected Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {bulletin?.affectedAreas?.map((area) => (
                    <span
                      key={area}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                    >
                      <Icon name="MapPin" size={12} className="mr-1" />
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Safety Recommendations */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Safety Recommendations</h4>
                <ul className="space-y-2">
                  {bulletin?.recommendations?.map((recommendation, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Additional Notes */}
              {bulletin?.notes && (
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Additional Notes</h4>
                  <p className="text-sm text-foreground">{bulletin?.notes}</p>
                </div>
              )}
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              {/* Publication Info */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Publication Information</h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-muted-foreground">Author</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary-foreground">
                          {bulletin?.author?.charAt(0)?.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-foreground">{bulletin?.author}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Created</span>
                    <p className="text-sm text-foreground mt-1">{formatDate(bulletin?.createdDate)}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Published</span>
                    <p className="text-sm text-foreground mt-1">{formatDate(bulletin?.publishedDate)}</p>
                  </div>
                  {bulletin?.scheduledDate && (
                    <div>
                      <span className="text-xs text-muted-foreground">Scheduled</span>
                      <p className="text-sm text-foreground mt-1">{formatDate(bulletin?.scheduledDate)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Distribution Channels */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Distribution Channels</h4>
                <div className="space-y-2">
                  {bulletin?.distributionChannels?.length > 0 ? (
                    bulletin?.distributionChannels?.map((channel) => (
                      <div key={channel} className="flex items-center space-x-2">
                        <Icon 
                          name={channelIconMap?.[channel] || 'Check'} 
                          size={14} 
                          className="text-primary" 
                        />
                        <span className="text-sm text-foreground">
                          {channelLabelMap?.[channel] || channel}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No distribution channels selected</span>
                  )}
                </div>
              </div>

              {/* Performance Metrics */}
              {bulletin?.status === 'published' && (
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="Eye" size={14} className="text-muted-foreground" />
                        <span className="text-sm text-foreground">Views</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {bulletin?.views?.toLocaleString() || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="Share2" size={14} className="text-muted-foreground" />
                        <span className="text-sm text-foreground">Shares</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {bulletin?.shares?.toLocaleString() || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="MessageSquare" size={14} className="text-muted-foreground" />
                        <span className="text-sm text-foreground">SMS Delivered</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {bulletin?.smsDelivered?.toLocaleString() || 0}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => onEdit(bulletin)}
                  >
                    <Icon name="Edit" size={14} className="mr-2" />
                    Edit Bulletin
                  </Button>
                  {bulletin?.status === 'draft' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Icon name="Send" size={14} className="mr-2" />
                      Publish Now
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Icon name="Download" size={14} className="mr-2" />
                    Export PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Icon name="Share2" size={14} className="mr-2" />
                    Share Bulletin
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Icon name="Copy" size={14} className="mr-2" />
                    Duplicate
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

export default BulletinViewDialog;