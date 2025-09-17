import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const CenterFormDialog = ({ isOpen, onClose, onSave, center, mode = 'create' }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    barangay: '',
    coordinates: { lat: '', lng: '' },
    maxCapacity: '',
    contactPerson: '',
    contactNumber: '',
    status: 'ready',
    accessibilityFeatures: [],
    facilities: [],
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (center && mode === 'edit') {
      setFormData({
        ...center,
        coordinates: {
          lat: center?.coordinates?.lat?.toString() || '',
          lng: center?.coordinates?.lng?.toString() || ''
        },
        maxCapacity: center?.maxCapacity?.toString() || ''
      });
    } else {
      setFormData({
        name: '',
        address: '',
        barangay: '',
        coordinates: { lat: '', lng: '' },
        maxCapacity: '',
        contactPerson: '',
        contactNumber: '',
        status: 'ready',
        accessibilityFeatures: [],
        facilities: [],
        notes: ''
      });
    }
    setErrors({});
  }, [center, mode, isOpen]);

  const barangayOptions = [
    { value: 'Poblacion', label: 'Poblacion' },
    { value: 'San Roque', label: 'San Roque' },
    { value: 'Santa Cruz', label: 'Santa Cruz' },
    { value: 'Bagumbayan', label: 'Bagumbayan' },
    { value: 'San Jose', label: 'San Jose' },
    { value: 'San Antonio', label: 'San Antonio' }
  ];

  const statusOptions = [
    { value: 'ready', label: 'Ready' },
    { value: 'operational', label: 'Operational' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'closed', label: 'Closed' }
  ];

  const accessibilityOptions = [
    { value: 'wheelchair', label: 'Wheelchair Access' },
    { value: 'medical', label: 'Medical Support' },
    { value: 'ramp', label: 'Ramp Access' },
    { value: 'elevator', label: 'Elevator' }
  ];

  const facilityOptions = [
    { value: 'restrooms', label: 'Restrooms' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'medical_bay', label: 'Medical Bay' },
    { value: 'generator', label: 'Generator' },
    { value: 'wifi', label: 'Wi-Fi' },
    { value: 'parking', label: 'Parking' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Center name is required';
    }
    if (!formData?.address?.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData?.barangay) {
      newErrors.barangay = 'Barangay is required';
    }
    if (!formData?.maxCapacity || parseInt(formData?.maxCapacity) <= 0) {
      newErrors.maxCapacity = 'Valid capacity is required';
    }
    if (!formData?.contactPerson?.trim()) {
      newErrors.contactPerson = 'Contact person is required';
    }
    if (!formData?.contactNumber?.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    }
    if (formData?.coordinates?.lat && (isNaN(formData?.coordinates?.lat) || Math.abs(formData?.coordinates?.lat) > 90)) {
      newErrors.coordinates = 'Valid latitude is required (-90 to 90)';
    }
    if (formData?.coordinates?.lng && (isNaN(formData?.coordinates?.lng) || Math.abs(formData?.coordinates?.lng) > 180)) {
      newErrors.coordinates = 'Valid longitude is required (-180 to 180)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      const centerData = {
        ...formData,
        id: mode === 'edit' ? center?.id : `EC-${Date.now()?.toString()?.slice(-3)}`,
        maxCapacity: parseInt(formData?.maxCapacity),
        coordinates: {
          lat: parseFloat(formData?.coordinates?.lat) || 0,
          lng: parseFloat(formData?.coordinates?.lng) || 0
        },
        currentOccupancy: mode === 'edit' ? center?.currentOccupancy : 0,
        lastUpdated: new Date()?.toISOString(),
        evacuees: mode === 'edit' ? center?.evacuees : [],
        resources: mode === 'edit' ? center?.resources : {
          water: 100,
          food: 100,
          medicine: 100,
          blankets: 100
        }
      };

      onSave(centerData);
      onClose();
    }
  };

  const handleInputChange = (field, value) => {
    if (field?.includes('coordinates.')) {
      const coordField = field?.split('.')?.[1];
      setFormData(prev => ({
        ...prev,
        coordinates: {
          ...prev?.coordinates,
          [coordField]: value
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

  const handleCheckboxChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev?.[field], value]
        : prev?.[field]?.filter(item => item !== value)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground flex items-center">
            <Icon name="Home" size={24} className="mr-2" />
            {mode === 'edit' ? 'Edit Evacuation Center' : 'Add New Evacuation Center'}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Center Name *
                </label>
                <Input
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  placeholder="Enter evacuation center name"
                  error={errors?.name}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Full Address *
                </label>
                <Input
                  value={formData?.address}
                  onChange={(e) => handleInputChange('address', e?.target?.value)}
                  placeholder="Enter complete address"
                  error={errors?.address}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Barangay *
                </label>
                <Select
                  value={formData?.barangay}
                  onChange={(value) => handleInputChange('barangay', value)}
                  options={barangayOptions}
                  placeholder="Select barangay"
                  error={errors?.barangay}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Maximum Capacity *
                </label>
                <Input
                  type="number"
                  value={formData?.maxCapacity}
                  onChange={(e) => handleInputChange('maxCapacity', e?.target?.value)}
                  placeholder="Enter maximum capacity"
                  min="1"
                  error={errors?.maxCapacity}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Status
                </label>
                <Select
                  value={formData?.status}
                  onChange={(value) => handleInputChange('status', value)}
                  options={statusOptions}
                />
              </div>
            </div>

            {/* Contact & Location */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Contact & Location</h3>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Contact Person *
                </label>
                <Input
                  value={formData?.contactPerson}
                  onChange={(e) => handleInputChange('contactPerson', e?.target?.value)}
                  placeholder="Enter contact person name"
                  error={errors?.contactPerson}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Contact Number *
                </label>
                <Input
                  value={formData?.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e?.target?.value)}
                  placeholder="Enter contact number"
                  error={errors?.contactNumber}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Latitude
                  </label>
                  <Input
                    type="number"
                    step="any"
                    value={formData?.coordinates?.lat}
                    onChange={(e) => handleInputChange('coordinates.lat', e?.target?.value)}
                    placeholder="e.g., 13.7565"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Longitude
                  </label>
                  <Input
                    type="number"
                    step="any"
                    value={formData?.coordinates?.lng}
                    onChange={(e) => handleInputChange('coordinates.lng', e?.target?.value)}
                    placeholder="e.g., 123.1234"
                  />
                </div>
              </div>
              {errors?.coordinates && (
                <p className="text-sm text-error">{errors?.coordinates}</p>
              )}

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Notes
                </label>
                <textarea
                  value={formData?.notes}
                  onChange={(e) => handleInputChange('notes', e?.target?.value)}
                  placeholder="Additional notes about the evacuation center"
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Features & Facilities */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg font-medium text-foreground">Features & Facilities</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Accessibility Features
                  </label>
                  <div className="space-y-2">
                    {accessibilityOptions?.map((option) => (
                      <div key={option?.value} className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData?.accessibilityFeatures?.includes(option?.value)}
                          onChange={(e) => handleCheckboxChange('accessibilityFeatures', option?.value, e?.target?.checked)}
                        />
                        <label className="text-sm text-foreground">{option?.label}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Available Facilities
                  </label>
                  <div className="space-y-2">
                    {facilityOptions?.map((option) => (
                      <div key={option?.value} className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData?.facilities?.includes(option?.value)}
                          onChange={(e) => handleCheckboxChange('facilities', option?.value, e?.target?.checked)}
                        />
                        <label className="text-sm text-foreground">{option?.label}</label>
                      </div>
                    ))}
                  </div>
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
            <Button type="submit">
              <Icon name="Save" size={16} className="mr-2" />
              {mode === 'edit' ? 'Update Center' : 'Create Center'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CenterFormDialog;