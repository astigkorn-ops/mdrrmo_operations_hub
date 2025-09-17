import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginFooter = () => {
  const currentYear = new Date()?.getFullYear();

  const emergencyContacts = [
    { label: 'Emergency Hotline', number: '911', icon: 'Phone' },
    { label: 'MDRRMO Direct', number: '(052) 123-4567', icon: 'Headphones' },
    { label: 'Municipal Hall', number: '(052) 765-4321', icon: 'Building' }
  ];

  return (
    <div className="mt-12 space-y-6">
      {/* Emergency Contacts */}
      <div className="bg-error/5 border border-error/10 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="AlertTriangle" size={16} className="text-error" />
          <h3 className="text-sm font-semibold text-error">Emergency Contacts</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {emergencyContacts?.map((contact, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name={contact?.icon} size={14} className="text-muted-foreground" />
              <div className="text-xs">
                <p className="font-medium text-foreground">{contact?.label}</p>
                <p className="text-muted-foreground">{contact?.number}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* System Information */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Globe" size={12} />
            <span>mdrrmo.pioduran.gov.ph</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Mail" size={12} />
            <span>info@mdrrmo.pioduran.gov.ph</span>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
          <button 
            onClick={() => window.location.href = '/public-homepage'}
            className="hover:text-primary transition-colors duration-150"
          >
            Public Portal
          </button>
          <span>•</span>
          <button className="hover:text-primary transition-colors duration-150">
            System Status
          </button>
          <span>•</span>
          <button className="hover:text-primary transition-colors duration-150">
            Help & Support
          </button>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Municipal Disaster Risk Reduction and Management Office
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Municipality of Pio Duran, Province of Albay, Philippines
          </p>
        </div>

        {/* Government Compliance */}
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={12} />
            <span>Government Secured</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={12} />
            <span>Privacy Policy</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <Icon name="FileText" size={12} />
            <span>Terms of Use</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFooter;