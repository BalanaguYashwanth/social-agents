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
import CastList from './screen-cast-list';

type TabType = 'following' | 'filter';

interface CastData {
  casts: Cast[];
  nextCursor: string | null;
}

const HomeScreen: React.FC = () => {
  const { user } = usePrivy();
  const [currentTab, setCurrentTab] = useState<TabType>('filter');
  const { ref, inView } = useInView({ threshold: 0 });
  const [fids, setFids] = useState<any>([906065, 905779]);

  const fetchFids = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ELIZA_AGENT_API}/feedids`);
    const data = await response.json();

    const feedIds = data.feedIds;
    const fids = feedIds.map(({fid}: any) => parseInt(fid));
    if(!(fids.length > 0) || !fids){
      setFids([906065, 905779]);
      return;
    }
    setFids(fids);
  };

  useEffect(() => {
    fetchFids();
  }, []);

  const { castsData, loading, error, fetchMoreCasts } = useFetchUserFeed(
    user?.farcaster?.fid ?? undefined,
    fids
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
      <div className="mt-4">
        <CastList casts={castsData?.casts || []} tabType="filter" />
        {loading && <LoadingSpinner />}
        <div ref={ref} className="h-20" />
      </div>
    </div>
  );
};

export default HomeScreen;
