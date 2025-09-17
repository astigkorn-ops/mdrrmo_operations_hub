import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const IncidentFormDialog = ({ 
  isOpen, 
  onClose, 
  incident = null, 
  onSave, 
  mode = 'create' 
}) => {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
    severity: '',
    status: 'reported',
    assignedTo: '',
    reporterName: '',
    reporterContact: '',
    coordinates: '',
    affectedPersons: '',
    estimatedDamage: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const incidentTypeOptions = [
    { value: 'flood', label: 'Flood' },
    { value: 'typhoon', label: 'Typhoon' },
    { value: 'earthquake', label: 'Earthquake' },
    { value: 'landslide', label: 'Landslide' },
    { value: 'fire', label: 'Fire' },
    { value: 'accident', label: 'Vehicle Accident' },
    { value: 'medical', label: 'Medical Emergency' },
    { value: 'other', label: 'Other' }
  ];

  const severityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  const statusOptions = [
    { value: 'reported', label: 'Reported' },
    { value: 'investigating', label: 'Investigating' },
    { value: 'responding', label: 'Responding' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const personnelOptions = [
    { value: 'juan-dela-cruz', label: 'Juan Dela Cruz' },
    { value: 'maria-santos', label: 'Maria Santos' },
    { value: 'pedro-garcia', label: 'Pedro Garcia' },
    { value: 'ana-reyes', label: 'Ana Reyes' },
    { value: 'carlos-mendoza', label: 'Carlos Mendoza' }
  ];

  const locationOptions = [
    { value: 'poblacion', label: 'Poblacion' },
    { value: 'bagumbayan', label: 'Bagumbayan' },
    { value: 'san-roque', label: 'San Roque' },
    { value: 'san-antonio', label: 'San Antonio' },
    { value: 'san-jose', label: 'San Jose' },
    { value: 'santa-cruz', label: 'Santa Cruz' },
    { value: 'other', label: 'Other Location' }
  ];

  useEffect(() => {
    if (incident && mode === 'edit') {
      setFormData({
        type: incident?.type || '',
        description: incident?.description || '',
        location: incident?.location || '',
        severity: incident?.severity || '',
        status: incident?.status || 'reported',
        assignedTo: incident?.assignedTo || '',
        reporterName: incident?.reporterName || '',
        reporterContact: incident?.reporterContact || '',
        coordinates: incident?.coordinates || '',
        affectedPersons: incident?.affectedPersons || '',
        estimatedDamage: incident?.estimatedDamage || '',
        notes: incident?.notes || ''
      });
    } else {
      setFormData({
        type: '',
        description: '',
        location: '',
        severity: '',
        status: 'reported',
        assignedTo: '',
        reporterName: '',
        reporterContact: '',
        coordinates: '',
        affectedPersons: '',
        estimatedDamage: '',
        notes: ''
      });
    }
    setErrors({});
  }, [incident, mode, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.type) newErrors.type = 'Incident type is required';
    if (!formData?.description) newErrors.description = 'Description is required';
    if (!formData?.location) newErrors.location = 'Location is required';
    if (!formData?.severity) newErrors.severity = 'Severity level is required';
    if (!formData?.assignedTo) newErrors.assignedTo = 'Assigned personnel is required';
    if (!formData?.reporterName) newErrors.reporterName = 'Reporter name is required';
    if (!formData?.reporterContact) newErrors.reporterContact = 'Reporter contact is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const incidentData = {
        ...formData,
        id: incident?.id || `INC-${Date.now()}`,
        reportedDate: incident?.reportedDate || new Date()?.toISOString(),
        updatedDate: new Date()?.toISOString()
      };

      await onSave(incidentData);
      onClose();
    } catch (error) {
      console.error('Error saving incident:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {mode === 'create' ? 'Create New Incident' : 'Edit Incident'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {mode === 'create' ?'Report and track a new incident' 
                  : `Editing incident #${incident?.id}`
                }
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Form Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Incident Type"
                  required
                  options={incidentTypeOptions}
                  value={formData?.type}
                  onChange={(value) => handleInputChange('type', value)}
                  error={errors?.type}
                />

                <Select
                  label="Severity Level"
                  required
                  options={severityOptions}
                  value={formData?.severity}
                  onChange={(value) => handleInputChange('severity', value)}
                  error={errors?.severity}
                />

                <Select
                  label="Location"
                  required
                  options={locationOptions}
                  value={formData?.location}
                  onChange={(value) => handleInputChange('location', value)}
                  error={errors?.location}
                />

                <Select
                  label="Status"
                  options={statusOptions}
                  value={formData?.status}
                  onChange={(value) => handleInputChange('status', value)}
                />
              </div>

              <div className="space-y-4">
                <Input
                  label="Description"
                  type="text"
                  required
                  placeholder="Provide detailed description of the incident..."
                  value={formData?.description}
                  onChange={(e) => handleInputChange('description', e?.target?.value)}
                  error={errors?.description}
                />

                <Input
                  label="Coordinates (Optional)"
                  type="text"
                  placeholder="e.g., 13.7565° N, 123.1234° E"
                  value={formData?.coordinates}
                  onChange={(e) => handleInputChange('coordinates', e?.target?.value)}
                />
              </div>
            </div>

            {/* Reporter Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                Reporter Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Reporter Name"
                  type="text"
                  required
                  placeholder="Full name of the person reporting"
                  value={formData?.reporterName}
                  onChange={(e) => handleInputChange('reporterName', e?.target?.value)}
                  error={errors?.reporterName}
                />

                <Input
                  label="Contact Information"
                  type="text"
                  required
                  placeholder="Phone number or email"
                  value={formData?.reporterContact}
                  onChange={(e) => handleInputChange('reporterContact', e?.target?.value)}
                  error={errors?.reporterContact}
                />
              </div>
            </div>

            {/* Assignment & Impact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                Assignment & Impact Assessment
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Assigned Personnel"
                  required
                  options={personnelOptions}
                  value={formData?.assignedTo}
                  onChange={(value) => handleInputChange('assignedTo', value)}
                  error={errors?.assignedTo}
                />

                <Input
                  label="Affected Persons"
                  type="number"
                  placeholder="Number of people affected"
                  value={formData?.affectedPersons}
                  onChange={(e) => handleInputChange('affectedPersons', e?.target?.value)}
                />

                <Input
                  label="Estimated Damage (PHP)"
                  type="number"
                  placeholder="Estimated damage in Philippine Peso"
                  value={formData?.estimatedDamage}
                  onChange={(e) => handleInputChange('estimatedDamage', e?.target?.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Additional Notes
                </label>
                <textarea
                  className="w-full min-h-[100px] px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                  placeholder="Any additional information, observations, or special instructions..."
                  value={formData?.notes}
                  onChange={(e) => handleInputChange('notes', e?.target?.value)}
                />
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/30">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {mode === 'create' ? 'Create Incident' : 'Update Incident'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IncidentFormDialog;