import React from 'react';
import Icon from '../../../components/AppIcon';

const AdvisoryStats = ({ advisories }) => {
  const stats = {
    total: advisories?.length,
    published: advisories?.filter(a => a?.status === 'published')?.length,
    draft: advisories?.filter(a => a?.status === 'draft')?.length,
    scheduled: advisories?.filter(a => a?.status === 'scheduled')?.length,
    emergency: advisories?.filter(a => a?.isEmergency)?.length,
    thisMonth: advisories?.filter(a => {
      const advisoryDate = new Date(a.createdAt);
      const now = new Date();
      return advisoryDate?.getMonth() === now?.getMonth() && 
             advisoryDate?.getFullYear() === now?.getFullYear();
    })?.length
  };

  const statCards = [
    {
      title: 'Total Advisories',
      value: stats?.total,
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Published',
      value: stats?.published,
      icon: 'Eye',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Draft',
      value: stats?.draft,
      icon: 'Edit',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted'
    },
    {
      title: 'Scheduled',
      value: stats?.scheduled,
      icon: 'Clock',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Emergency Alerts',
      value: stats?.emergency,
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      title: 'This Month',
      value: stats?.thisMonth,
      icon: 'Calendar',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat?.title}
              </p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {stat?.value}
              </p>
            </div>
            <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdvisoryStats;