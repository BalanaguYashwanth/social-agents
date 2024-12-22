import React from 'react';
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

const TabContent: React.FC<any> = ({ castsData, currentTab }) => (
  <>
    <CastList casts={castsData.filter.casts} tabType="filter" />
  </>
);

export default TabContent;
