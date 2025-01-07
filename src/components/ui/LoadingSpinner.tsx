import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return <Loader2 className="animate-spin text-indigo-600" size={48} />;
};