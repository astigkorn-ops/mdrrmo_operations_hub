import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulletinFormDialog = ({ isOpen, onClose, onSave, bulletin, mode = 'create' }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'general',
    severity: 'medium',
    content: '',
    weatherData: {
      windSpeed: '',
      direction: '',
      rainfall: '',
      pressure: ''
    },
    affectedAreas: [],
    recommendations: [''],
    distributionChannels: [],
    scheduledDate: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (bulletin && mode === 'edit') {
      setFormData({
        ...bulletin,
        scheduledDate: bulletin?.scheduledDate ? bulletin?.scheduledDate?.substring(0, 16) : '',
        recommendations: bulletin?.recommendations?.length > 0 ? bulletin?.recommendations : ['']
      });
    } else {
      setFormData({
        title: '',
        type: 'general',
        severity: 'medium',
        content: '',
        weatherData: {
          windSpeed: '',
          direction: '',
          rainfall: '',
          pressure: ''
        },
        affectedAreas: [],
        recommendations: [''],
        distributionChannels: [],
        scheduledDate: '',
        notes: ''
      });
    }
    setErrors({});
  }, [bulletin, mode, isOpen]);

  const typeOptions = [
    { value: 'typhoon', label: 'Typhoon' },
    { value: 'rainfall', label: 'Heavy Rainfall' },
    { value: 'thunderstorm', label: 'Thunderstorm' },
    { value: 'wind', label: 'Strong Winds' },
    { value: 'heat', label: 'Heat Index' },
    { value: 'flood', label: 'Flooding' },
    { value: 'general', label: 'General Advisory' }
  ];

  const severityOptions = [
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
    { value: 'info', label: 'Information Only' }
  ];

  const areaOptions = [
    { value: 'All Barangays', label: 'All Barangays' },
    { value: 'Poblacion', label: 'Poblacion' },
    { value: 'San Roque', label: 'San Roque' },
    { value: 'Santa Cruz', label: 'Santa Cruz' },
    { value: 'Bagumbayan', label: 'Bagumbayan' },
    { value: 'San Jose', label: 'San Jose' },
    { value: 'San Antonio', label: 'San Antonio' },
    { value: 'Coastal Barangays', label: 'Coastal Barangays' }
  ];

  const channelOptions = [
    { value: 'website', label: 'Municipal Website' },
    { value: 'sms', label: 'SMS Alert System' },
    { value: 'radio', label: 'Radio Broadcast' },
    { value: 'social_media', label: 'Social Media' },
    { value: 'emergency_alert', label: 'Emergency Alert System' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData?.content?.trim()) {
      newErrors.content = 'Content is required';
    }
    if (formData?.content?.trim()?.length < 50) {
      newErrors.content = 'Content must be at least 50 characters';
    }
    if (formData?.affectedAreas?.length === 0) {
      newErrors.affectedAreas = 'At least one affected area must be selected';
    }
    if (formData?.recommendations?.filter(r => r?.trim())?.length === 0) {
      newErrors.recommendations = 'At least one recommendation is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      const bulletinData = {
        ...formData,
        id: mode === 'edit' ? bulletin?.id : `WB-${new Date()?.getFullYear()}-${String(Date.now())?.slice(-3)}`,
        author: mode === 'edit' ? bulletin?.author : 'Current User',
        createdDate: mode === 'edit' ? bulletin?.createdDate : new Date()?.toISOString(),
        status: mode === 'edit' ? bulletin?.status : 'draft',
        publishedDate: mode === 'edit' ? bulletin?.publishedDate : null,
        scheduledDate: formData?.scheduledDate ? new Date(formData?.scheduledDate)?.toISOString() : null,
        recommendations: formData?.recommendations?.filter(r => r?.trim()),
        views: mode === 'edit' ? bulletin?.views : 0,
        shares: mode === 'edit' ? bulletin?.shares : 0,
        smsDelivered: mode === 'edit' ? bulletin?.smsDelivered : 0
      };

      onSave(bulletinData);
      onClose();
    }
  };

  const handleInputChange = (field, value) => {
    if (field?.startsWith('weatherData.')) {
      const weatherField = field?.split('.')?.[1];
      setFormData(prev => ({
        ...prev,
        weatherData: {
          ...prev?.weatherData,
          [weatherField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAreaChange = (area, checked) => {
    setFormData(prev => ({
      ...prev,
      affectedAreas: checked 
        ? [...prev?.affectedAreas, area]
        : prev?.affectedAreas?.filter(item => item !== area)
    }));
  };

  const handleChannelChange = (channel, checked) => {
    setFormData(prev => ({
      ...prev,
      distributionChannels: checked 
        ? [...prev?.distributionChannels, channel]
        : prev?.distributionChannels?.filter(item => item !== channel)
    }));
  };

  const handleRecommendationChange = (index, value) => {
    const newRecommendations = [...formData?.recommendations];
    newRecommendations[index] = value;
    setFormData(prev => ({
      ...prev,
      recommendations: newRecommendations
    }));
  };

  const addRecommendation = () => {
    setFormData(prev => ({
      ...prev,
      recommendations: [...prev?.recommendations, '']
    }));
  };

  const removeRecommendation = (index) => {
    setFormData(prev => ({
      ...prev,
      recommendations: prev?.recommendations?.filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground flex items-center">
            <Icon name="CloudRain" size={24} className="mr-2" />
            {mode === 'edit' ? 'Edit Weather Bulletin' : 'Create Weather Bulletin'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Bulletin Title *
                </label>
                <Input
                  value={formData?.title}
                  onChange={(e) => handleInputChange('title', e?.target?.value)}
                  placeholder="Enter weather bulletin title"
                  error={errors?.title}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Weather Type *
                </label>
                <Select
                  value={formData?.type}
                  onChange={(value) => handleInputChange('type', value)}
                  options={typeOptions}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Severity Level *
                </label>
                <Select
                  value={formData?.severity}
                  onChange={(value) => handleInputChange('severity', value)}
                  options={severityOptions}
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Bulletin Content * (minimum 50 characters)
                </label>
                <textarea
                  value={formData?.content}
                  onChange={(e) => handleInputChange('content', e?.target?.value)}
                  placeholder="Enter detailed weather bulletin content..."
                  rows={6}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors?.content ? 'border-error' : 'border-border'
                  }`}
                />
                <div className="flex justify-between mt-1">
                  {errors?.content && <p className="text-sm text-error">{errors?.content}</p>}
                  <p className="text-xs text-muted-foreground">
                    {formData?.content?.length} characters
                  </p>
                </div>
              </div>
            </div>

            {/* Weather Data */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">Weather Data</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Wind Speed
                  </label>
                  <Input
                    value={formData?.weatherData?.windSpeed}
                    onChange={(e) => handleInputChange('weatherData.windSpeed', e?.target?.value)}
                    placeholder="e.g., 120 kph"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Wind Direction
                  </label>
                  <Input
                    value={formData?.weatherData?.direction}
                    onChange={(e) => handleInputChange('weatherData.direction', e?.target?.value)}
                    placeholder="e.g., West-Northwest"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Rainfall
                  </label>
                  <Input
                    value={formData?.weatherData?.rainfall}
                    onChange={(e) => handleInputChange('weatherData.rainfall', e?.target?.value)}
                    placeholder="e.g., Heavy to Intense"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Pressure
                  </label>
                  <Input
                    value={formData?.weatherData?.pressure}
                    onChange={(e) => handleInputChange('weatherData.pressure', e?.target?.value)}
                    placeholder="e.g., 960 hPa"
                  />
                </div>
              </div>
            </div>

            {/* Affected Areas */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Affected Areas * (select at least one)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {areaOptions?.map((area) => (
                  <div key={area?.value} className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData?.affectedAreas?.includes(area?.value)}
                      onChange={(e) => handleAreaChange(area?.value, e?.target?.checked)}
                    />
                    <label className="text-sm text-foreground">{area?.label}</label>
                  </div>
                ))}
              </div>
              {errors?.affectedAreas && (
                <p className="text-sm text-error mt-1">{errors?.affectedAreas}</p>
              )}
            </div>

            {/* Recommendations */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">
                Safety Recommendations *
              </label>
              <div className="space-y-2">
                {formData?.recommendations?.map((recommendation, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={recommendation}
                      onChange={(e) => handleRecommendationChange(index, e?.target?.value)}
                      placeholder="Enter safety recommendation"
                      className="flex-1"
                    />
                    {formData?.recommendations?.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRecommendation(index)}
                        className="h-8 w-8 p-0"
                      >
                        <Icon name="X" size={14} />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addRecommendation}
                  className="flex items-center space-x-1"
                >
                  <Icon name="Plus" size={14} />
                  <span>Add Recommendation</span>
                </Button>
              </div>
              {errors?.recommendations && (
                <p className="text-sm text-error mt-1">{errors?.recommendations}</p>
              )}
            </div>

            {/* Distribution & Scheduling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Distribution Channels
                </label>
                <div className="space-y-2">
                  {channelOptions?.map((channel) => (
                    <div key={channel?.value} className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData?.distributionChannels?.includes(channel?.value)}
                        onChange={(e) => handleChannelChange(channel?.value, e?.target?.checked)}
                      />
                      <label className="text-sm text-foreground">{channel?.label}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Schedule Publication (optional)
                </label>
                <Input
                  type="datetime-local"
                  value={formData?.scheduledDate}
                  onChange={(e) => handleInputChange('scheduledDate', e?.target?.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Leave empty to save as draft
                </p>

                <div className="mt-4">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Additional Notes
                  </label>
                  <textarea
                    value={formData?.notes}
                    onChange={(e) => handleInputChange('notes', e?.target?.value)}
                    placeholder="Any additional notes or special instructions"
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={(e) => {
                e?.preventDefault();
                if (validateForm()) {
                  const bulletinData = {
                    ...formData,
                    id: mode === 'edit' ? bulletin?.id : `WB-${new Date()?.getFullYear()}-${String(Date.now())?.slice(-3)}`,
                    author: mode === 'edit' ? bulletin?.author : 'Current User',
                    createdDate: mode === 'edit' ? bulletin?.createdDate : new Date()?.toISOString(),
                    status: 'draft',
                    publishedDate: null,
                    scheduledDate: formData?.scheduledDate ? new Date(formData?.scheduledDate)?.toISOString() : null,
                    recommendations: formData?.recommendations?.filter(r => r?.trim()),
                    views: mode === 'edit' ? bulletin?.views : 0,
                    shares: mode === 'edit' ? bulletin?.shares : 0,
                    smsDelivered: mode === 'edit' ? bulletin?.smsDelivered : 0
                  };
                  onSave(bulletinData);
                  onClose();
                }
              }}
            >
              <Icon name="Save" size={16} className="mr-2" />
              Save Draft
            </Button>
            <Button type="submit">
              <Icon name="Send" size={16} className="mr-2" />
              {formData?.scheduledDate ? 'Schedule Bulletin' : mode === 'edit' ? 'Update Bulletin' : 'Create Bulletin'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BulletinFormDialog;