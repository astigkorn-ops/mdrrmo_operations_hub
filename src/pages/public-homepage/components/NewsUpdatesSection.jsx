import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NewsUpdatesSection = () => {
  const [activeTab, setActiveTab] = useState('news');

  const newsUpdates = [
    {
      id: 1,
      type: "News",
      title: "MDRRMO Conducts Community Earthquake Drill",
      excerpt: "Over 500 residents participated in the quarterly earthquake preparedness drill conducted across 15 barangays in Pio Duran.",
      publishedAt: "2025-09-17T10:30:00",
      author: "MDRRMO Public Information Office",
      image: "https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Community Preparedness"
    },
    {
      id: 2,
      type: "Announcement",
      title: "New Early Warning System Installation Complete",
      excerpt: "State-of-the-art sirens and public address systems now operational in flood-prone areas to enhance emergency communication.",
      publishedAt: "2025-09-16T14:15:00",
      author: "MDRRMO Technical Team",
      image: "https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Infrastructure"
    },
    {
      id: 3,
      type: "Advisory",
      title: "Monsoon Season Preparedness Guidelines Released",
      excerpt: "Comprehensive guide for residents on preparing for the upcoming monsoon season, including evacuation procedures and emergency kits.",
      publishedAt: "2025-09-15T09:00:00",
      author: "MDRRMO Operations",
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400",
      category: "Weather Preparedness"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "First Aid Training Workshop",
      date: "2025-09-25",
      time: "09:00 AM - 04:00 PM",
      location: "Pio Duran Municipal Hall",
      type: "Training",
      capacity: "50 participants",
      status: "Open for Registration"
    },
    {
      id: 2,
      title: "Barangay Emergency Response Team Meeting",
      date: "2025-09-28",
      time: "02:00 PM - 05:00 PM",
      location: "MDRRMO Conference Room",
      type: "Meeting",
      capacity: "30 participants",
      status: "Invitation Only"
    },
    {
      id: 3,
      title: "Community Fire Safety Seminar",
      date: "2025-10-02",
      time: "10:00 AM - 12:00 PM",
      location: "Barangay Poblacion Covered Court",
      type: "Seminar",
      capacity: "100 participants",
      status: "Open for Registration"
    }
  ];

  const tabs = [
    { id: 'news', label: 'Latest News', icon: 'Newspaper', count: newsUpdates?.length },
    { id: 'events', label: 'Upcoming Events', icon: 'Calendar', count: upcomingEvents?.length }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString('en-PH', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getEventStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open for registration': return 'bg-success text-success-foreground';
      case 'invitation only': return 'bg-warning text-warning-foreground';
      case 'full': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Stay Informed</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get the latest updates on emergency preparedness, community events, and important announcements from MDRRMO
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-muted rounded-lg p-1 flex space-x-1">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab?.id
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                  {tab?.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* News Updates Tab */}
        {activeTab === 'news' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {newsUpdates?.map((news) => (
              <article key={news?.id} className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={news?.image}
                    alt={news?.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {news?.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(news?.publishedAt)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {news?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                    {news?.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      By {news?.author}
                    </span>
                    <Button variant="ghost" size="sm">
                      <span className="text-xs">Read More</span>
                      <Icon name="ArrowRight" size={12} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Upcoming Events Tab */}
        {activeTab === 'events' && (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {upcomingEvents?.map((event) => (
              <div key={event?.id} className="bg-white border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Calendar" size={20} className="text-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        {event?.type}
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getEventStatusColor(event?.status)}`}>
                    {event?.status}
                  </span>
                </div>

                <h3 className="font-semibold text-foreground mb-3">{event?.title}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" size={14} />
                    <span>{formatDate(event?.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Clock" size={14} />
                    <span>{event?.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="MapPin" size={14} />
                    <span>{event?.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Users" size={14} />
                    <span>{event?.capacity}</span>
                  </div>
                </div>

                <Button variant="outline" fullWidth size="sm">
                  <Icon name="Info" size={14} className="mr-2" />
                  View Details
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            <Icon name="ArrowRight" size={16} className="mr-2" />
            View All {activeTab === 'news' ? 'News & Updates' : 'Events'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsUpdatesSection;