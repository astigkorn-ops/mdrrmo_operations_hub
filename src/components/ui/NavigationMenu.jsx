import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationMenu = ({ 
  menuName = 'main_navigation',
  orientation = 'horizontal',
  showIcons = true,
  className = '',
  onItemClick
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { navigationItems, loading, error } = useNavigation(menuName);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    } else if (item?.path) {
      window.location.href = item?.path;
    }
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="flex space-x-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 bg-muted rounded w-20"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-error text-sm ${className}`}>
        <Icon name="AlertCircle" size={16} className="inline mr-2" />
        Navigation unavailable
      </div>
    );
  }

  const renderNavigationItem = (item, index, isChild = false) => {
    const hasChildren = item?.children?.length > 0;
    const itemClasses = `
      ${isChild ? 'px-4 py-2 text-sm' : 'px-3 py-2 text-sm font-medium'}
      text-foreground hover:text-primary hover:bg-muted
      transition-colors duration-150 rounded-md
      ${orientation === 'vertical' ? 'w-full justify-start' : ''}
    `;

    return (
      <div key={item?.id || index} className="relative">
        {hasChildren ? (
          <Button
            variant="ghost"
            className={itemClasses}
            onClick={() => handleDropdownToggle(isChild ? `child-${index}` : index)}
          >
            {showIcons && item?.icon && (
              <Icon name={item?.icon} size={16} className="mr-2" />
            )}
            {item?.title}
            {hasChildren && (
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`ml-1 transition-transform duration-200 ${
                  activeDropdown === (isChild ? `child-${index}` : index) ? 'rotate-180' : ''
                }`} 
              />
            )}
          </Button>
        ) : (
          <Button
            variant="ghost"
            className={itemClasses}
            onClick={() => handleItemClick(item)}
          >
            {showIcons && item?.icon && (
              <Icon name={item?.icon} size={16} className="mr-2" />
            )}
            {item?.title}
          </Button>
        )}

        {/* Dropdown Menu */}
        {hasChildren && activeDropdown === (isChild ? `child-${index}` : index) && (
          <div className={`absolute z-50 mt-1 bg-white border border-border rounded-lg shadow-lg ${
            orientation === 'horizontal' 
              ? 'top-full left-0 w-56' 
              : 'left-full top-0 w-48 ml-2'
          }`}>
            <div className="py-2">
              {item?.children?.map((child, childIndex) => (
                <button
                  key={child?.id || childIndex}
                  className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors duration-150"
                  onClick={() => handleItemClick(child)}
                >
                  {showIcons && child?.icon && (
                    <Icon name={child?.icon} size={14} className="mr-2 inline" />
                  )}
                  {child?.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (orientation === 'vertical') {
    return (
      <nav className={`space-y-1 ${className}`} ref={dropdownRef}>
        {navigationItems?.map((item, index) => renderNavigationItem(item, index))}
      </nav>
    );
  }

  return (
    <nav className={`flex items-center space-x-1 ${className}`} ref={dropdownRef}>
      {navigationItems?.map((item, index) => renderNavigationItem(item, index))}
    </nav>
  );
};

export default NavigationMenu;