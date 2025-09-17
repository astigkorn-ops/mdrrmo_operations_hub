import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const BulletinDataTable = ({
  bulletins,
  selectedBulletins,
  onSelectionChange,
  onBulletinEdit,
  onBulletinView,
  onStatusUpdate,
  sortConfig,
  onSort
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

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
    if (!dateString) return '-';
    return new Date(dateString)?.toLocaleDateString('en-PH', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content, maxLength = 100) => {
    if (!content) return '';
    return content?.length > maxLength ? `${content?.substring(0, maxLength)}...` : content;
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(bulletins?.map(bulletin => bulletin?.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectBulletin = (bulletinId, checked) => {
    if (checked) {
      onSelectionChange([...selectedBulletins, bulletinId]);
    } else {
      onSelectionChange(selectedBulletins?.filter(id => id !== bulletinId));
    }
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const columns = [
    { key: 'select', label: '', sortable: false, width: 'w-12' },
    { key: 'title', label: 'Title & Content', sortable: true, width: 'flex-1' },
    { key: 'type', label: 'Type', sortable: true, width: 'w-32' },
    { key: 'severity', label: 'Severity', sortable: true, width: 'w-24' },
    { key: 'status', label: 'Status', sortable: true, width: 'w-28' },
    { key: 'author', label: 'Author', sortable: true, width: 'w-32' },
    { key: 'createdDate', label: 'Created', sortable: true, width: 'w-32' },
    { key: 'publishedDate', label: 'Published', sortable: true, width: 'w-32' },
    { key: 'actions', label: 'Actions', sortable: false, width: 'w-32' }
  ];

  const isAllSelected = bulletins?.length > 0 && selectedBulletins?.length === bulletins?.length;
  const isPartiallySelected = selectedBulletins?.length > 0 && selectedBulletins?.length < bulletins?.length;

  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              {columns?.map((column) => (
                <th key={column?.key} className={`${column?.width} px-4 py-3 text-left`}>
                  {column?.key === 'select' ? (
                    <Checkbox
                      checked={isAllSelected}
                      indeterminate={isPartiallySelected}
                      onChange={(e) => handleSelectAll(e?.target?.checked)}
                    />
                  ) : column?.sortable ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSort(column?.key)}
                      className="h-auto p-0 font-semibold text-foreground hover:text-primary"
                    >
                      {column?.label}
                      <Icon 
                        name={getSortIcon(column?.key)} 
                        size={14} 
                        className="ml-1" 
                      />
                    </Button>
                  ) : (
                    <span className="text-sm font-semibold text-foreground">{column?.label}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bulletins?.map((bulletin) => (
              <tr
                key={bulletin?.id}
                className={`border-b border-border hover:bg-muted/30 transition-colors duration-150 ${
                  selectedBulletins?.includes(bulletin?.id) ? 'bg-primary/5' : ''
                }`}
                onMouseEnter={() => setHoveredRow(bulletin?.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedBulletins?.includes(bulletin?.id)}
                    onChange={(e) => handleSelectBulletin(bulletin?.id, e?.target?.checked)}
                  />
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-foreground text-sm line-clamp-1">{bulletin?.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {truncateContent(bulletin?.content)}
                    </p>
                    {bulletin?.views > 0 && (
                      <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Icon name="Eye" size={12} className="mr-1" />
                          {bulletin?.views?.toLocaleString()} views
                        </span>
                        {bulletin?.smsDelivered > 0 && (
                          <span className="flex items-center">
                            <Icon name="MessageSquare" size={12} className="mr-1" />
                            {bulletin?.smsDelivered?.toLocaleString()} SMS
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Icon name={getTypeIcon(bulletin?.type)} size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground capitalize">{bulletin?.type}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(bulletin?.severity)}`}>
                    {bulletin?.severity}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bulletin?.status)}`}>
                    {bulletin?.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">
                        {bulletin?.author?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-foreground">{bulletin?.author?.split(' ')?.[0]}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(bulletin?.createdDate)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(bulletin?.publishedDate)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onBulletinView(bulletin)}
                      className="h-8 w-8 p-0"
                      title="View Details"
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onBulletinEdit(bulletin)}
                      className="h-8 w-8 p-0"
                      title="Edit Bulletin"
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    {bulletin?.status === 'draft' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onStatusUpdate(bulletin?.id, 'published')}
                        className="h-8 w-8 p-0"
                        title="Publish Now"
                      >
                        <Icon name="Send" size={14} />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden space-y-4 p-4">
        {bulletins?.map((bulletin) => (
          <div
            key={bulletin?.id}
            className={`border border-border rounded-lg p-4 ${
              selectedBulletins?.includes(bulletin?.id) ? 'border-primary bg-primary/5' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedBulletins?.includes(bulletin?.id)}
                  onChange={(e) => handleSelectBulletin(bulletin?.id, e?.target?.checked)}
                />
                <div className="flex items-center space-x-2">
                  <Icon name={getTypeIcon(bulletin?.type)} size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground capitalize">{bulletin?.type}</span>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onBulletinView(bulletin)}
                  className="h-8 w-8 p-0"
                >
                  <Icon name="Eye" size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onBulletinEdit(bulletin)}
                  className="h-8 w-8 p-0"
                >
                  <Icon name="Edit" size={14} />
                </Button>
              </div>
            </div>

            <h4 className="font-medium text-foreground mb-2 line-clamp-2">{bulletin?.title}</h4>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
              {bulletin?.content}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <span className="text-xs text-muted-foreground">Author</span>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary-foreground">
                      {bulletin?.author?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-foreground">{bulletin?.author?.split(' ')?.[0]}</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Created</span>
                <p className="text-sm text-foreground mt-1">{formatDate(bulletin?.createdDate)}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(bulletin?.severity)}`}>
                  {bulletin?.severity}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(bulletin?.status)}`}>
                  {bulletin?.status}
                </span>
              </div>
              {bulletin?.views > 0 && (
                <div className="text-xs text-muted-foreground">
                  {bulletin?.views?.toLocaleString()} views
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {bulletins?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No weather bulletins found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or create a new weather bulletin.</p>
        </div>
      )}
    </div>
  );
};

export default BulletinDataTable;