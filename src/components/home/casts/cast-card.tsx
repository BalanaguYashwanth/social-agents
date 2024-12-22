'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { User } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import CastHeader from './cast-header/cast-header';
import CastContent from './cast-content/cast-content';
import CastActionsBar from './cast-actions/cast-actions';
import CastFooter from './cast-footer';
import CastCardSidebar from './cast-sidebar/cast-sidebar';
import { useFetchCastDetails } from '@/hooks/api/cast/useFetchCastDetails';
import { usePrivy } from '@privy-io/react-auth';

interface CastCardProps {
  castData: {
    hash: string;
    parent_hash: string | null;
    parent_url: string | null;
    timestamp: string;
    author: User;
  };
  viewerFid?: number;
  isParent?: boolean;
}

const CastCard: React.FC<CastCardProps> = ({ castData, viewerFid, isParent }) => {
  const { user } = usePrivy();
  const {
    data: fullCastDetails,
    isLoading,
    isError,
    error,
  } = useFetchCastDetails(castData.hash, user?.farcaster?.fid);

  console.log('fullCastDetails', fullCastDetails);
  return (
    <motion.div
      layout
      key="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-3 flex flex-row gap-[10px]"
    >
      <CastCardSidebar castDetails={castData} isParent={isParent} />
      <motion.div layout className="flex flex-col gap-[4px] w-full">
        <CastHeader
          castAuthor={castData.author}
          castHash={castData.hash}
          castTimestamp={castData.timestamp}
          castChannel={fullCastDetails?.cast.channel}
          loading={false} // this loading will always be false because it is coming from top level
        />
        <CastContent
          castText={fullCastDetails?.cast.text}
          mentionedProfiles={fullCastDetails?.cast.mentioned_profiles}
          castEmbeds={fullCastDetails?.cast.embeds}
          castFrames={fullCastDetails?.cast.frames}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
        <CastActionsBar
          likesCount={fullCastDetails?.cast.reactions.likes_count}
          recastsCount={fullCastDetails?.cast.reactions.recasts_count}
          repliesCount={fullCastDetails?.cast.replies.count}
          sharesCount={0}
          loading={isLoading}
        />
        <CastFooter
          likesCount={fullCastDetails?.cast.reactions.likes_count}
          recastsCount={fullCastDetails?.cast.reactions.recasts_count}
          repliesCount={fullCastDetails?.cast.replies.count}
          sharesCount={0}
          dollarCount={0}
          castChannel={fullCastDetails?.cast.channel?.name}
          loading={isLoading}
        />
      </motion.div>
    </motion.div>
  );
};

export default CastCard;
