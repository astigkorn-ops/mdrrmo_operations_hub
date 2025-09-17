import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EventDialog = ({ 
  isOpen, 
  onClose, 
  onSave, 
  event = null, 
  selectedDate = null 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'training',
    date: '',
    time: '',
    duration: '60',
    location: '',
    department: 'mdrrmo',
    participantGroup: 'staff',
    maxParticipants: '',
    resources: '',
    isPublic: false,
    requiresRegistration: true
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      const eventDate = new Date(event.date);
      setFormData({
        title: event?.title || '',
        description: event?.description || '',
        type: event?.type || 'training',
        date: eventDate?.toISOString()?.split('T')?.[0],
        time: eventDate?.toTimeString()?.slice(0, 5),
        duration: event?.duration?.toString() || '60',
        location: event?.location || '',
        department: event?.department || 'mdrrmo',
        participantGroup: event?.participantGroup || 'staff',
        maxParticipants: event?.maxParticipants?.toString() || '',
        resources: event?.resources || '',
        isPublic: event?.isPublic || false,
        requiresRegistration: event?.requiresRegistration !== false
      });
    } else if (selectedDate) {
      const date = new Date(selectedDate);
      setFormData(prev => ({
        ...prev,
        date: date?.toISOString()?.split('T')?.[0],
        time: date?.toTimeString()?.slice(0, 5)
      }));
    }
  }, [event, selectedDate]);

  const eventTypeOptions = [
    { value: 'training', label: 'Training Session' },
    { value: 'drill', label: 'Emergency Drill' },
    { value: 'meeting', label: 'Community Meeting' },
    { value: 'workshop', label: 'Preparedness Workshop' },
    { value: 'assessment', label: 'Risk Assessment' }
  ];

  const departmentOptions = [
    { value: 'mdrrmo', label: 'MDRRMO' },
    { value: 'bfp', label: 'Bureau of Fire Protection' },
    { value: 'pnp', label: 'Philippine National Police' },
    { value: 'health', label: 'Municipal Health Office' },
    { value: 'engineering', label: 'Municipal Engineering' },
    { value: 'social', label: 'Social Welfare Office' }
  ];

  const participantGroupOptions = [
    { value: 'staff', label: 'MDRRMO Staff' },
    { value: 'volunteers', label: 'Volunteers' },
    { value: 'community', label: 'Community Leaders' },
    { value: 'students', label: 'Students' },
    { value: 'businesses', label: 'Business Owners' },
    { value: 'officials', label: 'Government Officials' }
  ];

  const durationOptions = [
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' },
    { value: '180', label: '3 hours' },
    { value: '240', label: '4 hours' },
    { value: '480', label: '8 hours (Full day)' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.title?.trim()) {
      newErrors.title = 'Event title is required';
    }

    if (!formData?.date) {
      newErrors.date = 'Event date is required';
    }

    if (!formData?.time) {
      newErrors.time = 'Event time is required';
    }

    if (!formData?.location?.trim()) {
      newErrors.location = 'Event location is required';
    }

    if (formData?.maxParticipants && isNaN(parseInt(formData?.maxParticipants))) {
      newErrors.maxParticipants = 'Please enter a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const eventDateTime = new Date(`${formData.date}T${formData.time}`);
    
    const eventData = {
      ...formData,
      date: eventDateTime?.toISOString(),
      maxParticipants: formData?.maxParticipants ? parseInt(formData?.maxParticipants) : null,
      duration: parseInt(formData?.duration),
      id: event?.id || Date.now()?.toString()
    };

    onSave(eventData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {event ? 'Edit Event' : 'Create New Event'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Event Title"
                type="text"
                value={formData?.title}
                onChange={(e) => handleInputChange('title', e?.target?.value)}
                error={errors?.title}
                required
                placeholder="Enter event title"
              />
            </div>

            <Select
              label="Event Type"
              options={eventTypeOptions}
              value={formData?.type}
              onChange={(value) => handleInputChange('type', value)}
              required
            />

            <Select
              label="Department"
              options={departmentOptions}
              value={formData?.department}
              onChange={(value) => handleInputChange('department', value)}
              required
            />

            <Input
              label="Date"
              type="date"
              value={formData?.date}
              onChange={(e) => handleInputChange('date', e?.target?.value)}
              error={errors?.date}
              required
            />

            <Input
              label="Time"
              type="time"
              value={formData?.time}
              onChange={(e) => handleInputChange('time', e?.target?.value)}
              error={errors?.time}
              required
            />

            <Select
              label="Duration"
              options={durationOptions}
              value={formData?.duration}
              onChange={(value) => handleInputChange('duration', value)}
              required
            />

            <Input
              label="Location"
              type="text"
              value={formData?.location}
              onChange={(e) => handleInputChange('location', e?.target?.value)}
              error={errors?.location}
              required
              placeholder="Enter event location"
            />

            <Select
              label="Target Participants"
              options={participantGroupOptions}
              value={formData?.participantGroup}
              onChange={(value) => handleInputChange('participantGroup', value)}
              required
            />

            <Input
              label="Max Participants"
              type="number"
              value={formData?.maxParticipants}
              onChange={(e) => handleInputChange('maxParticipants', e?.target?.value)}
              error={errors?.maxParticipants}
              placeholder="Leave empty for unlimited"
            />
          </div>

          <div>
            <Input
              label="Description"
              type="text"
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              placeholder="Enter event description"
            />
          </div>

          <div>
            <Input
              label="Required Resources"
              type="text"
              value={formData?.resources}
              onChange={(e) => handleInputChange('resources', e?.target?.value)}
              placeholder="List required resources (equipment, materials, etc.)"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPublic"
                checked={formData?.isPublic}
                onChange={(e) => handleInputChange('isPublic', e?.target?.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="isPublic" className="text-sm text-foreground">
                Make this event visible to the public
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="requiresRegistration"
                checked={formData?.requiresRegistration}
                onChange={(e) => handleInputChange('requiresRegistration', e?.target?.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="requiresRegistration" className="text-sm text-foreground">
                Require registration for participation
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              {event ? 'Update Event' : 'Create Event'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventDialog;