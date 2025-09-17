import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AdminSidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedGroups, setExpandedGroups] = useState(['main']);

  const navigationGroups = [
    {
      id: 'main',
      label: 'Main',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: 'LayoutDashboard',
          path: '/main-dashboard',
          badge: null
        },
        {
          id: 'incidents',
          label: 'Incident Management',
          icon: 'AlertTriangle',
          path: '/incident-management',
          badge: { count: 3, variant: 'error' }
        },
        {
          id: 'advisories',
          label: 'Public Advisories',
          icon: 'Megaphone',
          path: '/public-advisories',
          badge: { count: 2, variant: 'warning' }
        },
        {
          id: 'calendar',
          label: 'Event Calendar',
          icon: 'Calendar',
          path: '/event-calendar',
          badge: null
        }
      ]
    },
    {
      id: 'management',
      label: 'Management',
      items: [
        {
          id: 'users',
          label: 'User Management',
          icon: 'Users',
          path: '/user-management',
          badge: null
        },
        {
          id: 'resources',
          label: 'Resource Management',
          icon: 'Package',
          path: '/resource-management',
          badge: null
        },
        {
          id: 'reports',
          label: 'Reports & Analytics',
          icon: 'BarChart3',
          path: '/reports',
          badge: null
        }
      ]
    },
    {
      id: 'system',
      label: 'System',
      items: [
        {
          id: 'settings',
          label: 'Settings',
          icon: 'Settings',
          path: '/settings',
          badge: null
        },
        {
          id: 'logs',
          label: 'System Logs',
          icon: 'FileText',
          path: '/logs',
          badge: null
        }
      ]
    }
  ];

  useEffect(() => {
    const currentPath = window.location?.pathname;
    const currentItem = navigationGroups?.flatMap(group => group?.items)?.find(item => item?.path === currentPath);
    
    if (currentItem) {
      setActiveItem(currentItem?.id);
    }
  }, []);

  const handleItemClick = (item) => {
    setActiveItem(item?.id);
    window.location.href = item?.path;
  };

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => 
      prev?.includes(groupId) 
        ? prev?.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleLogout = () => {
    // Handle logout logic here
    window.location.href = '/login';
  };

  return (
    <aside className={`fixed left-0 top-0 h-full bg-white border-r border-border z-999 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={20} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-primary">MDRRMO</span>
                <span className="text-xs text-muted-foreground">Operations Hub</span>
              </div>
            </div>
          )}
          
          {isCollapsed && (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <Icon name="Shield" size={20} color="white" />
            </div>
          )}

          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className={isCollapsed ? 'mx-auto mt-2' : ''}
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-6">
            {navigationGroups?.map((group) => (
              <div key={group?.id}>
                {!isCollapsed && (
                  <div className="px-4 mb-2">
                    <button
                      onClick={() => toggleGroup(group?.id)}
                      className="flex items-center justify-between w-full text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors duration-150"
                    >
                      <span>{group?.label}</span>
                      <Icon 
                        name="ChevronDown" 
                        size={12} 
                        className={`transition-transform duration-200 ${
                          expandedGroups?.includes(group?.id) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                )}

                {(isCollapsed || expandedGroups?.includes(group?.id)) && (
                  <div className="space-y-1 px-2">
                    {group?.items?.map((item) => (
                      <button
                        key={item?.id}
                        onClick={() => handleItemClick(item)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                          activeItem === item?.id
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-foreground hover:bg-muted hover:text-primary'
                        }`}
                        title={isCollapsed ? item?.label : undefined}
                      >
                        <Icon 
                          name={item?.icon} 
                          size={18} 
                          className={activeItem === item?.id ? 'text-primary-foreground' : 'text-muted-foreground'}
                        />
                        
                        {!isCollapsed && (
                          <>
                            <span className="flex-1 text-left">{item?.label}</span>
                            {item?.badge && (
                              <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full ${
                                item?.badge?.variant === 'error' ?'bg-error text-error-foreground'
                                  : item?.badge?.variant === 'warning' ?'bg-warning text-warning-foreground' :'bg-primary text-primary-foreground'
                              }`}>
                                {item?.badge?.count}
                              </span>
                            )}
                          </>
                        )}

                        {isCollapsed && item?.badge && (
                          <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                            item?.badge?.variant === 'error' ?'bg-error text-error-foreground'
                              : item?.badge?.variant === 'warning' ?'bg-warning text-warning-foreground' :'bg-primary text-primary-foreground'
                          }`}>
                            {item?.badge?.count}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* User Profile & Logout */}
        <div className="border-t border-border p-4">
          {!isCollapsed ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 rounded-lg bg-muted/50">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    Admin User
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    admin@mdrrmo.gov.ph
                  </p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                fullWidth
                onClick={handleLogout}
                className="justify-start text-muted-foreground hover:text-error hover:bg-error/10"
              >
                <Icon name="LogOut" size={16} className="mr-3" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mx-auto">
                <Icon name="User" size={16} color="white" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="w-full text-muted-foreground hover:text-error hover:bg-error/10"
                title="Logout"
              >
                <Icon name="LogOut" size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;