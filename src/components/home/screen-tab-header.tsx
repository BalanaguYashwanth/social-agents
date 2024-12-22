import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

const TabHeader: React.FC = () => (
  <div className="bg-white z-10 w-full">
    <TabsList className="grid w-full grid-cols-2 border-b border-gray-200">
      <TabsTrigger value="following" className="text-[15px] h-12">
        Following
      </TabsTrigger>
      <TabsTrigger value="filter" className="text-[15px] h-12">
        Trending
      </TabsTrigger>
    </TabsList>
  </div>
);

export default TabHeader;
