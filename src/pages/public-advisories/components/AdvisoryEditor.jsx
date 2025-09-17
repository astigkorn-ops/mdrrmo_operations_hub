import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AdvisoryEditor = ({ advisory, onSave, onCancel, isOpen }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'medium',
    content: '',
    excerpt: '',
    isEmergency: false,
    publishAt: '',
    tags: []
  });
  const [activeTab, setActiveTab] = useState('edit');
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    'Weather Alert',
    'Emergency Notice',
    'Public Safety',
    'Traffic Advisory',
    'Health Advisory',
    'Evacuation Order'
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-muted-foreground' },
    { value: 'medium', label: 'Medium', color: 'text-secondary' },
    { value: 'high', label: 'High', color: 'text-warning' },
    { value: 'critical', label: 'Critical', color: 'text-error' }
  ];

  const templates = [
    {
      id: 'weather',
      name: 'Weather Advisory',
      content: `**WEATHER ADVISORY**\n\nDate: [DATE]\nTime: [TIME]\n\n**Current Weather Conditions:**\n- Temperature: [TEMP]°C\n- Wind Speed: [WIND] km/h\n- Visibility: [VISIBILITY]\n\n**Advisory:**\n[ADVISORY_CONTENT]\n\n**Recommendations:**\n- [RECOMMENDATION_1]\n- [RECOMMENDATION_2]\n- [RECOMMENDATION_3]\n\n**Contact Information:**\nMDRRMO Hotline: (02) 8888-0000\nEmergency: 911`
    },
    {
      id: 'emergency',
      name: 'Emergency Notice',
      content: `**EMERGENCY NOTICE**\n\n**ALERT LEVEL:** [LEVEL]\n**EFFECTIVE:** [DATE_TIME]\n\n**SITUATION:**\n[SITUATION_DESCRIPTION]\n\n**IMMEDIATE ACTIONS REQUIRED:**\n1. [ACTION_1]\n2. [ACTION_2]\n3. [ACTION_3]\n\n**EVACUATION INFORMATION:**\n- Evacuation Centers: [CENTERS]\n- Transportation: [TRANSPORT_INFO]\n- Assembly Points: [ASSEMBLY_POINTS]\n\n**EMERGENCY CONTACTS:**\n- MDRRMO: (02) 8888-0000\n- Emergency Services: 911\n- Local Police: [POLICE_NUMBER]`
    },
    {
      id: 'traffic',
      name: 'Traffic Advisory',
      content: `**TRAFFIC ADVISORY**\n\nDate: [DATE]\nTime: [TIME]\n\n**AFFECTED AREAS:**\n[AFFECTED_ROADS]\n\n**REASON:**\n[REASON_FOR_CLOSURE]\n\n**ALTERNATIVE ROUTES:**\n- Route 1: [ALTERNATIVE_1]\n- Route 2: [ALTERNATIVE_2]\n\n**DURATION:**\nExpected to last until [END_TIME]\n\n**MOTORIST ADVISORY:**\n- Plan alternative routes\n- Allow extra travel time\n- Follow traffic enforcers' instructions\n\nFor updates: MDRRMO (02) 8888-0000`
    }
  ];

  useEffect(() => {
    if (advisory) {
      setFormData({
        title: advisory?.title || '',
        category: advisory?.category || '',
        priority: advisory?.priority || 'medium',
        content: advisory?.content || '',
        excerpt: advisory?.excerpt || '',
        isEmergency: advisory?.isEmergency || false,
        publishAt: advisory?.publishAt || '',
        tags: advisory?.tags || []
      });
    } else {
      setFormData({
        title: '',
        category: '',
        priority: 'medium',
        content: '',
        excerpt: '',
        isEmergency: false,
        publishAt: '',
        tags: []
      });
    }
    setErrors({});
  }, [advisory, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const applyTemplate = (template) => {
    setFormData(prev => ({
      ...prev,
      content: template?.content,
      category: template?.id === 'weather' ? 'Weather Alert' : 
                template?.id === 'emergency' ? 'Emergency Notice' : 'Traffic Advisory'
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.title?.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData?.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData?.content?.trim()) {
      newErrors.content = 'Content is required';
    }

    if (formData?.content?.trim()?.length < 50) {
      newErrors.content = 'Content must be at least 50 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async (status = 'draft') => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      const advisoryData = {
        ...formData,
        status,
        id: advisory?.id || Date.now()?.toString(),
        author: 'Admin User',
        createdAt: advisory?.createdAt || new Date()?.toISOString(),
        updatedAt: new Date()?.toISOString()
      };

      await onSave(advisoryData);
    } catch (error) {
      console.error('Error saving advisory:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const formatContent = (content) => {
    return content?.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')?.replace(/\n/g, '<br>')?.replace(/- (.*?)(<br>|$)/g, '• $1$2');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-foreground">
              {advisory ? 'Edit Advisory' : 'Create New Advisory'}
            </h2>
            {formData?.isEmergency && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error text-error-foreground">
                <Icon name="AlertTriangle" size={12} className="mr-1" />
                Emergency
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex bg-muted rounded-lg p-1">
              <button
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  activeTab === 'edit' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  activeTab === 'preview' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Preview
              </button>
            </div>
            
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {activeTab === 'edit' ? (
            <>
              {/* Left Panel - Form */}
              <div className="w-1/3 border-r border-border p-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-4">Basic Information</h3>
                    <div className="space-y-4">
                      <Input
                        label="Title"
                        value={formData?.title}
                        onChange={(e) => handleInputChange('title', e?.target?.value)}
                        error={errors?.title}
                        placeholder="Enter advisory title"
                        required
                      />

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Category *
                        </label>
                        <select
                          value={formData?.category}
                          onChange={(e) => handleInputChange('category', e?.target?.value)}
                          className={`w-full px-3 py-2 border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                            errors?.category ? 'border-error' : 'border-border'
                          }`}
                        >
                          <option value="">Select category</option>
                          {categories?.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                        {errors?.category && (
                          <p className="text-sm text-error mt-1">{errors?.category}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Priority
                        </label>
                        <select
                          value={formData?.priority}
                          onChange={(e) => handleInputChange('priority', e?.target?.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          {priorities?.map(priority => (
                            <option key={priority?.value} value={priority?.value}>
                              {priority?.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <Input
                        label="Excerpt"
                        value={formData?.excerpt}
                        onChange={(e) => handleInputChange('excerpt', e?.target?.value)}
                        placeholder="Brief summary (optional)"
                        description="Short description for preview"
                      />
                    </div>
                  </div>

                  {/* Publishing Options */}
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-4">Publishing Options</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="isEmergency"
                          checked={formData?.isEmergency}
                          onChange={(e) => handleInputChange('isEmergency', e?.target?.checked)}
                          className="rounded border-border"
                        />
                        <label htmlFor="isEmergency" className="text-sm text-foreground">
                          Mark as Emergency Alert
                        </label>
                      </div>

                      <Input
                        label="Schedule Publication"
                        type="datetime-local"
                        value={formData?.publishAt}
                        onChange={(e) => handleInputChange('publishAt', e?.target?.value)}
                        description="Leave empty to publish immediately"
                      />
                    </div>
                  </div>

                  {/* Templates */}
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-4">Templates</h3>
                    <div className="space-y-2">
                      {templates?.map(template => (
                        <Button
                          key={template?.id}
                          variant="outline"
                          size="sm"
                          fullWidth
                          onClick={() => applyTemplate(template)}
                          className="justify-start"
                        >
                          <Icon name="FileText" size={14} className="mr-2" />
                          {template?.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel - Editor */}
              <div className="flex-1 p-6">
                <div className="h-full flex flex-col">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Content *
                  </label>
                  <textarea
                    value={formData?.content}
                    onChange={(e) => handleInputChange('content', e?.target?.value)}
                    placeholder="Write your advisory content here..."
                    className={`flex-1 w-full px-3 py-2 border rounded-lg bg-input text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring ${
                      errors?.content ? 'border-error' : 'border-border'
                    }`}
                  />
                  {errors?.content && (
                    <p className="text-sm text-error mt-1">{errors?.content}</p>
                  )}
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span>Use **bold** for emphasis, - for bullet points</span>
                    <span>{formData?.content?.length} characters</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Preview Panel */
            (<div className="flex-1 p-6 overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                <div className="bg-card border border-border rounded-lg p-8">
                  {/* Preview Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm text-muted-foreground">
                          {formData?.category}
                        </span>
                        {formData?.isEmergency && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error text-error-foreground">
                            <Icon name="AlertTriangle" size={12} className="mr-1" />
                            Emergency
                          </span>
                        )}
                      </div>
                      <h1 className="text-2xl font-bold text-foreground mb-2">
                        {formData?.title || 'Advisory Title'}
                      </h1>
                      {formData?.excerpt && (
                        <p className="text-muted-foreground">{formData?.excerpt}</p>
                      )}
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>Published by MDRRMO</div>
                      <div>{new Date()?.toLocaleDateString()}</div>
                    </div>
                  </div>

                  {/* Preview Content */}
                  <div className="prose prose-blue max-w-none">
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: formatContent(formData?.content || 'Content will appear here...') 
                      }}
                      className="text-foreground leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>)
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {advisory ? 'Last saved: ' + new Date(advisory.updatedAt || advisory.createdAt)?.toLocaleString() : 'Not saved yet'}
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleSave('draft')}
              loading={isSaving}
            >
              Save Draft
            </Button>
            <Button
              variant="default"
              onClick={() => handleSave('published')}
              loading={isSaving}
            >
              Publish Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisoryEditor;