import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import CastList from './screen-cast-list';
import { Cast } from '@neynar/nodejs-sdk/build/neynar-api/v2';

type TabType = 'following' | 'filter';

interface CastData {
  casts: Cast[];
  nextCursor: string | null;
}

interface TabContentProps {
  castsData: Record<TabType, CastData>;
  currentTab: TabType;
}

const TabContent: React.FC<TabContentProps> = ({ castsData, currentTab }) => (
  <>
    <TabsContent value="following" className="w-full">
      <CastList casts={castsData.following.casts} tabType="following" />
    </TabsContent>
    <TabsContent value="filter" className="w-full">
      <CastList casts={castsData.filter.casts} tabType="filter" />
    </TabsContent>
  </>
);

export default TabContent;
