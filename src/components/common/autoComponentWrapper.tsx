'use client';

import React, { useState, useEffect } from 'react';

function AutoComponentWrapper<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> {
  return function EnhancedComponent(props: P) {
    const [isClient, setIsClient] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsClient(true);
      setIsMounted(true);
    }, []);

    if (!isMounted) {
      return null; // Prevent hydration mismatch
    }

    const borderColor = isClient ? 'border-blue-500' : 'border-green-500';
    const textColor = isClient ? 'text-blue-500' : 'text-green-500';
    const componentType = isClient ? 'Client Component' : 'Server Component';

    return (
      <div className={`border-2 ${borderColor} p-4 m-2`}>
        <div className={`text-xs ${textColor} mb-2`}>{componentType}</div>
        <WrappedComponent {...props} />
      </div>
    );
  };
}

export default AutoComponentWrapper;
