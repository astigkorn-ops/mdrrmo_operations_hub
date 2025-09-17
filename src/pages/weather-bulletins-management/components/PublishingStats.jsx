import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PublishingStats = ({ bulletins, stats }) => {
  const getRecentActivity = () => {
    if (!bulletins || bulletins?.length === 0) return [];
    
    return bulletins
      ?.sort((a, b) => new Date(b?.createdDate) - new Date(a?.createdDate))
      ?.slice(0, 5)
      ?.map(bulletin => ({
        id: bulletin?.id,
        action: bulletin?.status === 'published' ? 'published' : bulletin?.status === 'scheduled' ? 'scheduled' : 'created',
        title: bulletin?.title,
        time: bulletin?.status === 'published' && bulletin?.publishedDate 
          ? bulletin?.publishedDate 
          : bulletin?.createdDate,
        type: bulletin?.type,
        severity: bulletin?.severity
      }));
  };

  const getTypeDistribution = () => {
    if (!bulletins || bulletins?.length === 0) return [];

    const typeCount = bulletins?.reduce((acc, bulletin) => {
      acc[bulletin?.type] = (acc?.[bulletin?.type] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(typeCount)
      ?.map(([type, count]) => ({
        type,
        count,
        percentage: ((count / bulletins?.length) * 100)?.toFixed(1)
      }))
      ?.sort((a, b) => b?.count - a?.count);
  };

  const getChannelPerformance = () => {
    const channelStats = {
      website: { bulletins: 0, views: 0 },
      sms: { bulletins: 0, delivered: 0 },
      radio: { bulletins: 0, broadcasts: 0 },
      social_media: { bulletins: 0, shares: 0 }
    };

    bulletins?.forEach(bulletin => {
      bulletin?.distributionChannels?.forEach(channel => {
        if (channelStats?.[channel]) {
          channelStats[channel].bulletins++;
          if (channel === 'website') channelStats[channel].views += bulletin?.views || 0;
          if (channel === 'sms') channelStats[channel].delivered += bulletin?.smsDelivered || 0;
          if (channel === 'social_media') channelStats[channel].shares += bulletin?.shares || 0;
        }
      });
    });

    return Object.entries(channelStats)?.map(([channel, data]) => ({
      channel,
      ...data
    }));
  };

  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-PH', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'published': return 'Send';
      case 'scheduled': return 'Clock';
      case 'created': return 'Edit';
      default: return 'FileText';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'published': return 'text-success';
      case 'scheduled': return 'text-primary';
      case 'created': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'typhoon': return 'CloudRain';
      case 'rainfall': return 'CloudDrizzle';
      case 'thunderstorm': return 'Zap';
      case 'wind': return 'Wind';
      case 'heat': return 'Sun';
      case 'flood': return 'Waves';
      default: return 'Cloud';
    }
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'website': return 'Globe';
      case 'sms': return 'MessageSquare';
      case 'radio': return 'Radio';
      case 'social_media': return 'Share2';
      default: return 'Send';
    }
  };

  const recentActivity = getRecentActivity();
  const typeDistribution = getTypeDistribution();
  const channelPerformance = getChannelPerformance();

  return (
    <div className="space-y-6">
      {/* Publishing Overview */}
      <div className="bg-white border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2" />
          Publishing Overview
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-success">{stats?.publishedBulletins}</div>
            <div className="text-xs text-muted-foreground">Published</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-primary">{stats?.scheduledBulletins}</div>
            <div className="text-xs text-muted-foreground">Scheduled</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-muted-foreground">{stats?.draftBulletins}</div>
            <div className="text-xs text-muted-foreground">Drafts</div>
          </div>
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-foreground">{stats?.totalBulletins}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Views</span>
            <span className="font-medium text-foreground">{stats?.totalViews?.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">SMS Messages Sent</span>
            <span className="font-medium text-foreground">{stats?.totalSMS?.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Activity" size={20} className="mr-2" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {recentActivity?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3">
              <div className={`mt-1 ${getActionColor(activity?.action)}`}>
                <Icon name={getActionIcon(activity?.action)} size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name={getTypeIcon(activity?.type)} size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground capitalize">{activity?.action}</span>
                </div>
                <p className="text-sm font-medium text-foreground line-clamp-2">{activity?.title}</p>
                <span className="text-xs text-muted-foreground">{formatTime(activity?.time)}</span>
              </div>
            </div>
          ))}
          {recentActivity?.length === 0 && (
            <div className="text-center py-4">
              <Icon name="FileText" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No recent activity</p>
            </div>
          )}
        </div>
      </div>

      {/* Bulletin Types */}
      <div className="bg-white border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="PieChart" size={20} className="mr-2" />
          Bulletin Types
        </h3>
        <div className="space-y-3">
          {typeDistribution?.map((item) => (
            <div key={item?.type} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name={getTypeIcon(item?.type)} size={14} className="text-muted-foreground" />
                  <span className="text-foreground capitalize">{item?.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground">{item?.count}</span>
                  <span className="text-xs text-muted-foreground">({item?.percentage}%)</span>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${item?.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Distribution Channels */}
      <div className="bg-white border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Send" size={20} className="mr-2" />
          Channel Performance
        </h3>
        <div className="space-y-3">
          {channelPerformance?.map((channel) => (
            <div key={channel?.channel} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
              <div className="flex items-center space-x-2">
                <Icon name={getChannelIcon(channel?.channel)} size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground capitalize">
                  {channel?.channel?.replace('_', ' ')}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">{channel?.bulletins}</div>
                <div className="text-xs text-muted-foreground">bulletins</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Zap" size={20} className="mr-2" />
          Publishing Tools
        </h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <Icon name="Calendar" size={14} className="mr-2" />
            Schedule Bulletin
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <Icon name="Copy" size={14} className="mr-2" />
            Duplicate Last Bulletin
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <Icon name="Download" size={14} className="mr-2" />
            Export Analytics
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            <Icon name="Settings" size={14} className="mr-2" />
            Distribution Settings
          </Button>
        </div>
      </div>

      {/* Auto-publish Settings */}
      <div className="bg-white border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Bot" size={20} className="mr-2" />
          Auto-publish Rules
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-foreground">Critical Alerts</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-success">Enabled</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-foreground">PAGASA Sync</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-success">Active</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-foreground">SMS Auto-send</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-warning">Pending Setup</span>
            </div>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-3"
        >
          <Icon name="Settings" size={14} className="mr-2" />
          Configure Rules
        </Button>
      </div>
    </div>
  );
};

export default PublishingStats;