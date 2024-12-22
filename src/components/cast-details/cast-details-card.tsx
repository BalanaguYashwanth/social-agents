'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import CastHeader from '../home/casts/cast-header/cast-header';
import CastContent from '../home/casts/cast-content/cast-content';
import CastActionsBar from '../home/casts/cast-actions/cast-actions';
import CastFooter from '../home/casts/cast-footer';
import CastCardSidebar from '../home/casts/cast-sidebar/cast-sidebar';
import { useCastDetailsWithConversation } from '@/hooks/api/cast/useFetchCastConversation';
import { Avatar, AvatarImage } from '../ui/avatar';
import Link from 'next/link';

interface CastDetailsCardProps {
  castHash: string;
}

const CastDetailsCard: React.FC<CastDetailsCardProps> = ({ castHash }) => {
  const {
    data: fullCastDetails,
    isLoading,
    error,
    isError,
  } = useCastDetailsWithConversation(castHash);

  if (!fullCastDetails) {
    return <div>No cast details available</div>;
  }

  const { cast } = fullCastDetails;

  // some verification checks here to check if the cast has a parent cast or not
  const isParentCast = cast.parent_hash !== null;

  return (
    <motion.div
      layout
      //  layoutId={castHash}
      key="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-3 flex flex-col gap-[10px]"
    >
      <div className="flex flex-row gap-2">
        <Avatar className="w-[38px] h-[38px]">
          <AvatarImage src={cast.author.pfp_url} alt={cast.author.display_name} />
        </Avatar>
        <div className="flex flex-col items-start justify-center gap-0 w-full">
          <div className="flex flex-row gap-2">
            <p className="font-semibold text-sm md:text-base whitespace-nowrap">
              {cast.author.display_name}
            </p>{' '}
          </div>
          <div className="flex flex-row gap-2 items-center justify-start w-full">
            {cast.author.display_name && (
              <p className="text-sm md:text-base opacity-[40%]">@{cast.author.username}</p>
            )}
          </div>
        </div>
      </div>
      <motion.div layout className="flex flex-col gap-[4px] w-full">
        <CastContent
          castText={cast.text}
          mentionedProfiles={cast.mentioned_profiles}
          castEmbeds={cast.embeds}
          castFrames={cast.frames}
          readMore={false}
          isLoading={isLoading}
          isError={isError}
        />
        <CastActionsBar
          likesCount={cast.reactions.likes_count}
          recastsCount={cast.reactions.recasts_count}
          repliesCount={cast.replies.count}
          sharesCount={0}
          loading={isLoading}
        />
        <CastFooter
          likesCount={cast.reactions.likes_count}
          recastsCount={cast.reactions.recasts_count}
          repliesCount={cast.replies.count}
          sharesCount={0}
          dollarCount={0}
          castChannel={cast.channel?.name}
          loading={isLoading}
        />
      </motion.div>
    </motion.div>
  );
};

export default CastDetailsCard;
