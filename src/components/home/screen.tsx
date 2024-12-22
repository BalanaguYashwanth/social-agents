'use client';

import React, { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { Tabs } from '@/components/ui/tabs';
import LoadingSpinner from './loadingscreen';
import ErrorMessage from './errormessage';
import { useInView } from 'react-intersection-observer';
import { useFetchUserFeed } from '@/hooks/api/feed/useFetchUserFeed';
import TabHeader from './screen-tab-header';
import TabContent from './screen-tab-content';

type TabType = 'following' | 'filter';

interface CastData {
  casts: Cast[];
  nextCursor: string | null;
}

const HomeScreen: React.FC = () => {
  const { user } = usePrivy();
  const [currentTab, setCurrentTab] = useState<TabType>('following');
  const { ref, inView } = useInView({ threshold: 0 });

  const { castsData, loading, error, fetchMoreCasts } = useFetchUserFeed(
    user?.farcaster?.fid ?? undefined
  );

  useEffect(() => {
    if (inView && !loading) {
      fetchMoreCasts(currentTab);
    }
  }, [inView, loading, currentTab, fetchMoreCasts]);

  if (!user) return <ErrorMessage message="Not logged in" />;
  if (error) return <ErrorMessage message="Failed to load casts. Please try again later." />;

  return (
    <div className="flex flex-col w-full">
      <Tabs
        value={currentTab}
        onValueChange={(value) => setCurrentTab(value as TabType)}
        className="w-full flex flex-col flex-grow"
      >
        <TabHeader />
        <div className="flex-grow overflow-y-auto">
          <TabContent castsData={castsData} currentTab={currentTab} />
          {loading && <LoadingSpinner />}
          <div ref={ref} className="h-20" />
        </div>
      </Tabs>
    </div>
  );
};

export default HomeScreen;
