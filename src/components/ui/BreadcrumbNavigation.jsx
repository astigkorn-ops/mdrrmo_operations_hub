import React from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const BreadcrumbNavigation = ({ items = [], className = '' }) => {
  const defaultItems = [
    { label: 'Dashboard', path: '/main-dashboard', icon: 'Home' }
  ];

  const breadcrumbItems = items?.length > 0 ? items : defaultItems;

  const handleItemClick = (item) => {
    if (item?.path && item?.path !== window.location?.pathname) {
      window.location.href = item?.path;
    }
  };

  return (
    <nav className={`flex items-center space-x-1 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbItems?.map((item, index) => {
          const isLast = index === breadcrumbItems?.length - 1;
          const isClickable = item?.path && !isLast;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={14} 
                  className="text-muted-foreground mx-2" 
                />
              )}
              <div className="flex items-center">
                {item?.icon && index === 0 && (
                  <Icon 
                    name={item?.icon} 
                    size={14} 
                    className={`mr-1 ${
                      isLast ? 'text-primary' : 'text-muted-foreground'
                    }`} 
                  />
                )}
                
                {isClickable ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleItemClick(item)}
                    className="h-auto p-0 text-sm font-normal text-muted-foreground hover:text-primary hover:bg-transparent"
                  >
                    {item?.label}
                  </Button>
                ) : (
                  <span 
                    className={`${
                      isLast 
                        ? 'text-primary font-medium' :'text-muted-foreground'
                    }`}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item?.label}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;