import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* MDRRMO Logo and Branding */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          {/* Main Logo Circle */}
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <Icon name="Shield" size={40} color="white" />
          </div>
          
          {/* Government Seal Indicator */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-warning rounded-full flex items-center justify-center border-2 border-white">
            <Icon name="Star" size={12} color="white" />
          </div>
        </div>
      </div>

      {/* Organization Name */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-primary">
          MDRRMO Operations Hub
        </h1>
        <p className="text-lg font-semibold text-foreground">
          Municipal Disaster Risk Reduction
        </p>
        <p className="text-lg font-semibold text-foreground -mt-1">
          and Management Office
        </p>
        <div className="flex items-center justify-center space-x-2 mt-3">
          <div className="h-px bg-border flex-1 max-w-12"></div>
          <p className="text-sm text-muted-foreground font-medium">
            Pio Duran, Albay
          </p>
          <div className="h-px bg-border flex-1 max-w-12"></div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-lg">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Staff Portal Access
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Secure access to the disaster management system for authorized government personnel. 
          Please sign in with your official credentials to continue.
        </p>
      </div>

      {/* Security Notice */}
      <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-muted-foreground">
        <Icon name="Lock" size={14} />
        <span>Secured by government authentication protocols</span>
      </div>
    </div>
  );
};

export default LoginHeader;