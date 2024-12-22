'use client';
import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PrivyProvider } from '@privy-io/react-auth';

import QueryProvider from './query-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        loginMethods: ['farcaster'],
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          showWalletLoginFirst: false,
        },
        // embeddedWallets: {
        //   createOnLogin: 'all-users',
        // },
      }}
    >
      <QueryProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryProvider>{' '}
    </PrivyProvider>
  );
}
