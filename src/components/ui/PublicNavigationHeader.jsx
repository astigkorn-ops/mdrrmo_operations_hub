import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import Icon from '../AppIcon';
import Button from './Button';

const PublicNavigationHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const { navigationItems, loading, error } = useNavigation();


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

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Transform database navigation items to component format
  const transformNavigationItems = (items) => {
    return items?.map(item => ({
      label: item?.title,
      path: item?.path,
      hasDropdown: item?.children?.length > 0,
      dropdownItems: item?.children?.map(child => ({
        label: child?.title,
        path: child?.path
      }))
    }));
  };

  // Split navigation items for main nav and more menu
  const getNavigationSections = () => {
    if (loading || error || !navigationItems) {
      return { mainItems: [], moreItems: [] };
    }

    const transformed = transformNavigationItems(navigationItems);
    const mainItems = transformed?.slice(0, 5); // First 5 items for main nav
    const moreItems = transformed?.slice(5); // Remaining items for "More" menu
    
    return { mainItems, moreItems };
  };

  const { mainItems, moreItems } = getNavigationSections();

  if (loading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-1000 bg-white border-b border-border shadow-sm">
        <div className="bg-error text-error-foreground py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm font-medium">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} />
              <span>Emergency Hotline: 911 | MDRRMO: (02) 8888-0000</span>
            </div>
          </div>
        </div>
        <nav className="bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={24} color="white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-primary">MDRRMO</span>
                  <span className="text-xs text-muted-foreground">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-white border-b border-border shadow-sm">
      {/* Emergency Banner */}
      <div className="bg-error text-error-foreground py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm font-medium">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} />
            <span>Emergency Hotline: 911 | MDRRMO: (02) 8888-0000</span>
          </div>
          <Button variant="ghost" size="sm" className="text-error-foreground hover:bg-white/20">
            <Icon name="Phone" size={16} className="mr-1" />
            Call Now
          </Button>
        </div>
      </div>
      {/* Main Navigation */}
      <nav className="bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={24} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-primary">MDRRMO</span>
                <span className="text-xs text-muted-foreground">Operations Hub</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1" ref={dropdownRef}>
              {mainItems?.map((item, index) => (
                <div key={index} className="relative">
                  {item?.hasDropdown ? (
                    <Button
                      variant="ghost"
                      className="text-sm font-medium text-foreground hover:text-primary hover:bg-muted px-3 py-2"
                      onClick={() => handleDropdownToggle(index)}
                    >
                      {item?.label}
                      <Icon 
                        name="ChevronDown" 
                        size={16} 
                        className={`ml-1 transition-transform duration-200 ${
                          activeDropdown === index ? 'rotate-180' : ''
                        }`} 
                      />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      className="text-sm font-medium text-foreground hover:text-primary hover:bg-muted px-3 py-2"
                      onClick={() => window.location.href = item?.path}
                    >
                      {item?.label}
                    </Button>
                  )}

                  {/* Dropdown Menu */}
                  {item?.hasDropdown && activeDropdown === index && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-border rounded-lg shadow-lg z-1002">
                      <div className="py-2">
                        {item?.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                          <button
                            key={dropdownIndex}
                            className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors duration-150"
                            onClick={() => {
                              window.location.href = dropdownItem?.path;
                              setActiveDropdown(null);
                            }}
                          >
                            {dropdownItem?.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* More Menu */}
              {moreItems?.length > 0 && (
                <div className="relative">
                  <Button
                    variant="ghost"
                    className="text-sm font-medium text-foreground hover:text-primary hover:bg-muted px-3 py-2"
                    onClick={() => handleDropdownToggle('more')}
                  >
                    MORE
                    <Icon 
                      name="ChevronDown" 
                      size={16} 
                      className={`ml-1 transition-transform duration-200 ${
                        activeDropdown === 'more' ? 'rotate-180' : ''
                      }`} 
                    />
                  </Button>

                  {activeDropdown === 'more' && (
                    <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-border rounded-lg shadow-lg z-1002">
                      <div className="py-2">
                        {moreItems?.map((item, index) => (
                          <div key={index} className="border-b border-border last:border-b-0">
                            <div className="px-4 py-2 text-sm font-medium text-primary bg-muted/50">
                              {item?.label}
                            </div>
                            {item?.dropdownItems?.map((subItem, subIndex) => (
                              <button
                                key={subIndex}
                                className="w-full text-left px-6 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors duration-150"
                                onClick={() => {
                                  window.location.href = subItem?.path;
                                  setActiveDropdown(null);
                                }}
                              >
                                {subItem?.label}
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Staff Login */}
              <Button
                variant="outline"
                size="sm"
                className="ml-4"
                onClick={() => window.location.href = '/login'}
              >
                <Icon name="LogIn" size={16} className="mr-2" />
                Staff Login
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMobileMenuToggle}
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-border">
            <div className="px-4 py-4 space-y-2">
              {/* Emergency Contact */}
              <div className="bg-error/10 border border-error/20 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} className="text-error" />
                    <span className="text-sm font-medium text-error">Emergency: 911</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-error">
                    Call
                  </Button>
                </div>
              </div>

              {/* Navigation Items */}
              {[...mainItems, ...moreItems]?.map((item, index) => (
                <div key={index} className="border-b border-border last:border-b-0 pb-2 last:pb-0">
                  <button
                    className="w-full text-left py-2 text-sm font-medium text-foreground hover:text-primary"
                    onClick={() => window.location.href = item?.path}
                  >
                    {item?.label}
                  </button>
                  {item?.dropdownItems && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item?.dropdownItems?.map((subItem, subIndex) => (
                        <button
                          key={subIndex}
                          className="block w-full text-left py-1 text-sm text-muted-foreground hover:text-primary"
                          onClick={() => window.location.href = subItem?.path}
                        >
                          {subItem?.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Staff Login */}
              <div className="pt-4 border-t border-border">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => window.location.href = '/login'}
                >
                  <Icon name="LogIn" size={16} className="mr-2" />
                  Staff Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default PublicNavigationHeader;