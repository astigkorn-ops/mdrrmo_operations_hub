import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdvisoryDataTable = ({ advisories, onEdit, onDelete, onPublish, onUnpublish }) => {
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedAdvisories, setSelectedAdvisories] = useState([]);

  const categories = [
    'Weather Alert',
    'Emergency Notice',
    'Public Safety',
    'Traffic Advisory',
    'Health Advisory',
    'Evacuation Order'
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedAdvisories(advisories?.map(advisory => advisory?.id));
    } else {
      setSelectedAdvisories([]);
    }
  };

  const handleSelectAdvisory = (advisoryId, checked) => {
    if (checked) {
      setSelectedAdvisories([...selectedAdvisories, advisoryId]);
    } else {
      setSelectedAdvisories(selectedAdvisories?.filter(id => id !== advisoryId));
    }
  };

  const filteredAndSortedAdvisories = useMemo(() => {
    let filtered = advisories;

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered?.filter(advisory => advisory?.status === filterStatus);
    }

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered?.filter(advisory => advisory?.category === filterCategory);
    }

    // Sort
    filtered?.sort((a, b) => {
      let aValue = a?.[sortField];
      let bValue = b?.[sortField];

      if (sortField === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [advisories, sortField, sortDirection, filterStatus, filterCategory]);

  const getPriorityBadge = (priority) => {
    const variants = {
      critical: 'bg-error text-error-foreground',
      high: 'bg-warning text-warning-foreground',
      medium: 'bg-secondary text-secondary-foreground',
      low: 'bg-muted text-muted-foreground'
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${variants?.[priority]}`}>
        {priority?.charAt(0)?.toUpperCase() + priority?.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const variants = {
      published: 'bg-success text-success-foreground',
      draft: 'bg-muted text-muted-foreground',
      scheduled: 'bg-accent text-accent-foreground'
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${variants?.[status]}`}>
        {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      {/* Table Header with Filters */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Categories</option>
              {categories?.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {selectedAdvisories?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedAdvisories?.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  selectedAdvisories?.forEach(id => {
                    const advisory = advisories?.find(a => a?.id === id);
                    if (advisory && advisory?.status === 'draft') {
                      onPublish(id);
                    }
                  });
                  setSelectedAdvisories([]);
                }}
              >
                Bulk Publish
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedAdvisories?.length === advisories?.length && advisories?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Title</span>
                  <Icon 
                    name={sortField === 'title' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Status</span>
                  <Icon 
                    name={sortField === 'status' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <button
                  onClick={() => handleSort('priority')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Priority</span>
                  <Icon 
                    name={sortField === 'priority' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <button
                  onClick={() => handleSort('author')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Author</span>
                  <Icon 
                    name={sortField === 'author' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <button
                  onClick={() => handleSort('createdAt')}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Created</span>
                  <Icon 
                    name={sortField === 'createdAt' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {filteredAndSortedAdvisories?.map((advisory) => (
              <tr key={advisory?.id} className="hover:bg-muted/30">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedAdvisories?.includes(advisory?.id)}
                    onChange={(e) => handleSelectAdvisory(advisory?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-start space-x-3">
                    {advisory?.isEmergency && (
                      <Icon name="AlertTriangle" size={16} className="text-error mt-1 flex-shrink-0" />
                    )}
                    <div>
                      <div className="text-sm font-medium text-foreground line-clamp-2">
                        {advisory?.title}
                      </div>
                      {advisory?.excerpt && (
                        <div className="text-sm text-muted-foreground mt-1 line-clamp-1">
                          {advisory?.excerpt}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(advisory?.status)}
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-foreground">{advisory?.category}</span>
                </td>
                <td className="px-6 py-4">
                  {getPriorityBadge(advisory?.priority)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">
                        {advisory?.author?.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-foreground">{advisory?.author}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-foreground">
                    {new Date(advisory.createdAt)?.toLocaleDateString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(advisory.createdAt)?.toLocaleTimeString()}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(advisory)}
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    
                    {advisory?.status === 'published' ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onUnpublish(advisory?.id)}
                      >
                        <Icon name="EyeOff" size={16} />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onPublish(advisory?.id)}
                      >
                        <Icon name="Eye" size={16} />
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(advisory?.id)}
                      className="text-error hover:text-error"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredAndSortedAdvisories?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No advisories found</h3>
          <p className="text-muted-foreground">
            {filterStatus !== 'all' || filterCategory !== 'all' ?'Try adjusting your filters to see more results.' :'Create your first advisory to get started.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default AdvisoryDataTable;