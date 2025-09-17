import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ParticipantManagementDialog = ({ 
  isOpen, 
  onClose, 
  event, 
  onUpdateParticipants 
}) => {
  const [participants, setParticipants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newParticipant, setNewParticipant] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    role: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (event && isOpen) {
      // Mock participant data
      const mockParticipants = [
        {
          id: '1',
          name: 'Maria Santos',
          email: 'maria.santos@mdrrmo.gov.ph',
          phone: '+63 917 123 4567',
          organization: 'MDRRMO',
          role: 'Emergency Response Officer',
          status: 'confirmed',
          registeredAt: '2025-01-15T10:30:00Z'
        },
        {
          id: '2',
          name: 'Juan Dela Cruz',
          email: 'juan.delacruz@bfp.gov.ph',
          phone: '+63 918 234 5678',
          organization: 'Bureau of Fire Protection',
          role: 'Fire Officer',
          status: 'pending',
          registeredAt: '2025-01-16T14:20:00Z'
        },
        {
          id: '3',
          name: 'Ana Rodriguez',
          email: 'ana.rodriguez@volunteer.org',
          phone: '+63 919 345 6789',
          organization: 'Community Volunteers',
          role: 'Volunteer Coordinator',
          status: 'confirmed',
          registeredAt: '2025-01-17T09:15:00Z'
        },
        {
          id: '4',
          name: 'Carlos Mendoza',
          email: 'carlos.mendoza@pnp.gov.ph',
          phone: '+63 920 456 7890',
          organization: 'Philippine National Police',
          role: 'Police Officer',
          status: 'cancelled',
          registeredAt: '2025-01-14T16:45:00Z'
        }
      ];
      setParticipants(mockParticipants);
    }
  }, [event, isOpen]);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'pending', label: 'Pending' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors?.[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusIcon = (status) => {
    const icons = {
      confirmed: 'CheckCircle',
      pending: 'Clock',
      cancelled: 'XCircle'
    };
    return icons?.[status] || 'Circle';
  };

  const filteredParticipants = participants?.filter(participant => {
    const matchesSearch = participant?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         participant?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         participant?.organization?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || participant?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (participantId, newStatus) => {
    setParticipants(prev => 
      prev?.map(p => p?.id === participantId ? { ...p, status: newStatus } : p)
    );
  };

  const handleAddParticipant = (e) => {
    e?.preventDefault();
    
    if (!newParticipant?.name || !newParticipant?.email) {
      return;
    }

    const participant = {
      id: Date.now()?.toString(),
      ...newParticipant,
      status: 'confirmed',
      registeredAt: new Date()?.toISOString()
    };

    setParticipants(prev => [...prev, participant]);
    setNewParticipant({
      name: '',
      email: '',
      phone: '',
      organization: '',
      role: ''
    });
    setShowAddForm(false);
  };

  const handleRemoveParticipant = (participantId) => {
    setParticipants(prev => prev?.filter(p => p?.id !== participantId));
  };

  const getParticipantStats = () => {
    const confirmed = participants?.filter(p => p?.status === 'confirmed')?.length;
    const pending = participants?.filter(p => p?.status === 'pending')?.length;
    const cancelled = participants?.filter(p => p?.status === 'cancelled')?.length;
    return { confirmed, pending, cancelled, total: participants?.length };
  };

  if (!isOpen || !event) return null;

  const stats = getParticipantStats();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Manage Participants
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {event?.title} • {new Date(event.date)?.toLocaleDateString()}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Stats */}
        <div className="p-6 border-b border-border bg-muted/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{stats?.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats?.confirmed}</div>
              <div className="text-sm text-muted-foreground">Confirmed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats?.pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats?.cancelled}</div>
              <div className="text-sm text-muted-foreground">Cancelled</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <Input
                type="search"
                placeholder="Search participants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="md:w-80"
              />
              
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={setStatusFilter}
                className="md:w-48"
              />
            </div>

            <Button
              variant="default"
              onClick={() => setShowAddForm(true)}
              iconName="Plus"
              iconPosition="left"
            >
              Add Participant
            </Button>
          </div>
        </div>

        {/* Add Participant Form */}
        {showAddForm && (
          <div className="p-6 border-b border-border bg-muted/30">
            <form onSubmit={handleAddParticipant} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  value={newParticipant?.name}
                  onChange={(e) => setNewParticipant(prev => ({ ...prev, name: e?.target?.value }))}
                  required
                  placeholder="Enter participant name"
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  value={newParticipant?.email}
                  onChange={(e) => setNewParticipant(prev => ({ ...prev, email: e?.target?.value }))}
                  required
                  placeholder="Enter email address"
                />
                
                <Input
                  label="Phone Number"
                  type="tel"
                  value={newParticipant?.phone}
                  onChange={(e) => setNewParticipant(prev => ({ ...prev, phone: e?.target?.value }))}
                  placeholder="Enter phone number"
                />
                
                <Input
                  label="Organization"
                  type="text"
                  value={newParticipant?.organization}
                  onChange={(e) => setNewParticipant(prev => ({ ...prev, organization: e?.target?.value }))}
                  placeholder="Enter organization"
                />
                
                <Input
                  label="Role/Position"
                  type="text"
                  value={newParticipant?.role}
                  onChange={(e) => setNewParticipant(prev => ({ ...prev, role: e?.target?.value }))}
                  placeholder="Enter role or position"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="default">
                  Add Participant
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Participants List */}
        <div className="flex-1 overflow-y-auto max-h-[400px]">
          {filteredParticipants?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' ?'No participants match your filters' :'No participants registered yet'
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredParticipants?.map((participant) => (
                <div key={participant?.id} className="p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-foreground">{participant?.name}</h4>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(participant?.status)}`}>
                          <Icon name={getStatusIcon(participant?.status)} size={12} className="mr-1" />
                          {participant?.status?.charAt(0)?.toUpperCase() + participant?.status?.slice(1)}
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Icon name="Mail" size={14} />
                            <span>{participant?.email}</span>
                          </div>
                          {participant?.phone && (
                            <div className="flex items-center space-x-1">
                              <Icon name="Phone" size={14} />
                              <span>{participant?.phone}</span>
                            </div>
                          )}
                        </div>
                        
                        {participant?.organization && (
                          <div className="flex items-center space-x-1">
                            <Icon name="Building" size={14} />
                            <span>{participant?.organization}</span>
                            {participant?.role && <span> • {participant?.role}</span>}
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-1">
                          <Icon name="Calendar" size={14} />
                          <span>
                            Registered {new Date(participant.registeredAt)?.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      {participant?.status === 'pending' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(participant?.id, 'confirmed')}
                          >
                            <Icon name="Check" size={14} className="mr-1" />
                            Confirm
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(participant?.id, 'cancelled')}
                          >
                            <Icon name="X" size={14} className="mr-1" />
                            Cancel
                          </Button>
                        </>
                      )}
                      
                      {participant?.status === 'confirmed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(participant?.id, 'cancelled')}
                        >
                          <Icon name="X" size={14} className="mr-1" />
                          Cancel
                        </Button>
                      )}
                      
                      {participant?.status === 'cancelled' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(participant?.id, 'confirmed')}
                        >
                          <Icon name="RotateCcw" size={14} className="mr-1" />
                          Restore
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveParticipant(participant?.id)}
                      >
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-border">
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              variant="default"
              onClick={() => {
                onUpdateParticipants(event?.id, participants);
                onClose();
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantManagementDialog;