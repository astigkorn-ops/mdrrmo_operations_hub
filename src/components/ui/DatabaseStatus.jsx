import React from 'react';
import { useSupabase } from './SupabaseProvider';
import Icon from '../AppIcon';
import Button from './Button';

const DatabaseStatus = ({ className = '' }) => {
  const { isConnected, connectionError } = useSupabase();

  if (isConnected) {
    return (
      <div className={`flex items-center space-x-2 text-success ${className}`}>
        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
        <span className="text-sm">Database Connected</span>
      </div>
    );
  }

  if (connectionError) {
    return (
      <div className={`flex items-center space-x-2 text-error ${className}`}>
        <Icon name="AlertCircle" size={16} />
        <span className="text-sm">Database Error</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.location.reload()}
          className="text-error hover:text-error"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 text-warning ${className}`}>
      <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
      <span className="text-sm">Connecting...</span>
    </div>
  );
};

export default DatabaseStatus;