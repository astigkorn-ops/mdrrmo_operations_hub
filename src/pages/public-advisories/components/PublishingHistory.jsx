import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PublishingHistory = ({ advisories }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const publishedAdvisories = advisories?.filter(a => a?.status === 'published')?.sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))?.slice(0, isExpanded ? undefined : 5);

  const getTimeAgo = (date) => {
    const now = new Date();
    const advisoryDate = new Date(date);
    const diffInHours = Math.floor((now - advisoryDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks}w ago`;
    
    return advisoryDate?.toLocaleDateString();
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Weather Alert': 'Cloud',
      'Emergency Notice': 'AlertTriangle',
      'Public Safety': 'Shield',
      'Traffic Advisory': 'Car',
      'Health Advisory': 'Heart',
      'Evacuation Order': 'Users'
    };
    return icons?.[category] || 'FileText';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'text-error',
      high: 'text-warning',
      medium: 'text-secondary',
      low: 'text-muted-foreground'
    };
    return colors?.[priority] || 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Publishing History</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {advisories?.filter(a => a?.status === 'published')?.length} published
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4">
        {publishedAdvisories?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No published advisories</h4>
            <p className="text-muted-foreground">
              Published advisories will appear here once you start publishing content.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {publishedAdvisories?.map((advisory) => (
              <div key={advisory?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0`}>
                  <Icon 
                    name={getCategoryIcon(advisory?.category)} 
                    size={16} 
                    className="text-primary" 
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground line-clamp-1">
                        {advisory?.title}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {advisory?.category}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className={`text-xs font-medium ${getPriorityColor(advisory?.priority)}`}>
                          {advisory?.priority?.charAt(0)?.toUpperCase() + advisory?.priority?.slice(1)}
                        </span>
                        {advisory?.isEmergency && (
                          <>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs font-medium text-error">Emergency</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right flex-shrink-0 ml-4">
                      <div className="text-xs text-muted-foreground">
                        {getTimeAgo(advisory?.updatedAt || advisory?.createdAt)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        by {advisory?.author}
                      </div>
                    </div>
                  </div>
                  
                  {advisory?.excerpt && (
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {advisory?.excerpt}
                    </p>
                  )}
                </div>
              </div>
            ))}
            
            {!isExpanded && advisories?.filter(a => a?.status === 'published')?.length > 5 && (
              <div className="text-center pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(true)}
                >
                  Show {advisories?.filter(a => a?.status === 'published')?.length - 5} more
                  <Icon name="ChevronDown" size={16} className="ml-1" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublishingHistory;