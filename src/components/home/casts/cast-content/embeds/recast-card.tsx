import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRecastData } from '@/hooks/useRecastData';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { VerifiedBadge } from '../../cast-header/cast-header';
import CastEmbeds from '.';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import CastText from '../cast-text';

interface RecastCardProps {
  castId: {
    fid: number;
    hash: string;
  };
  isNested?: boolean;
}

interface MentionedProfile {
  fid: number;
  username: string;
}

interface RecastData {
  author: {
    pfp_url: string;
    display_name: string;
    username: string;
    active_status: string;
  };
  text: string;
  timestamp: string;
  hash: string;
  embeds: any[]; // Replace 'any' with the correct type for embeds
  frames: any[]; // Replace 'any' with the correct type for frames
  mentions?: MentionedProfile[];
  reactions: {
    likes_count: number;
    recasts_count: number;
    dollars_earned: number;
  };
}

const MAX_CHARS = 280;

const RecastCard: React.FC<RecastCardProps> = ({ castId, isNested = false }) => {
  const { recastData, loading, error } = useRecastData(castId);

  if (loading) {
    return (
      <motion.div
        key="recast skeleton"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="p-3 flex flex-col mt-2 border-[3px] border-gray-100 rounded-2xl gap-4 w-full"
      >
        <div className="flex flex-row items-center justify-start gap-2">
          <Skeleton className="min-w-[28px] w-[28px] h-[28px] rounded-full" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <div className="flex flex-col gap-2 w-full  opacity-75">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </motion.div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (!recastData) {
    return <div className="p-4 text-center">No recast data available</div>;
  }

  const { author, timestamp, hash, embeds, frames, reactions } = recastData;

  const renderSubContent = () => {
    if (embeds && embeds.length > 0) {
      return <CastEmbeds castEmbeds={[embeds[0]]} isNested={true} />;
    }
    if (frames && frames.length > 0 && !isNested) {
      return <RecastCard castId={frames[0].castId} isNested={true} />;
    }
    return null;
  };

  return (
    <div
      className={`flex flex-col mt-2 gap-2 border-[3px] border-gray-100 rounded-2xl overflow-clip`}
    >
      <div className="flex flex-row gap-2 items-center pt-3 px-3">
        <Avatar className="w-[20px] h-[20px]">
          <AvatarImage src={author.pfp_url || '/default-avatar.png'} alt={author.display_name} />
        </Avatar>
        <div className="flex flex-row items-center justify-start gap-2 w-full">
          <div className="flex flex-row gap-2">
            <p className="font-semibold text-sm md:text-base whitespace-nowrap">
              {author.display_name}
            </p>{' '}
            {author.active_status === 'active' ? <VerifiedBadge /> : ''}
          </div>
          <div className="flex flex-row gap-2 items-center justify-start w-full">
            {author.display_name && author?.display_name.length <= 15 && (
              <p className="text-sm md:text-base opacity-[40%]">@{author.username}</p>
            )}
          </div>
        </div>
      </div>
      <CastText
        text={recastData.text}
        mentionedProfiles={recastData.mentions}
        castHash={recastData.hash}
        maxChars={isNested ? 140 : 280} // Adjust max chars for nested recasts if needed
        className={`${embeds.length <= 0 && isNested ? 'pb-3' : ''} px-3`}
      />
      {renderSubContent()}
      <div className="text-xs hidden text-gray-500">
        {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
      </div>
    </div>
  );
};

export default RecastCard;
