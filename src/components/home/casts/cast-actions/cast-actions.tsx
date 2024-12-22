import React from 'react';
import Icon from '@/components/ui/icon';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';

interface CastActionsBarProps {
  likesCount?: number;
  sharesCount?: number;
  recastsCount?: number;
  repliesCount?: number;
  loading: boolean;
}

interface EmojiReactionProps {
  textColor: string;
  icon?: string;
  count: number;
  selected?: boolean;
  onClick?: () => void;
}

const EmojiReaction: React.FC<EmojiReactionProps> = ({
  textColor,
  count,
  icon,
  selected = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center px-2 py-[6px] rounded-xl text-sm border-none
        ${selected ? 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-700'}
        hover:bg-blue-200 transition-colors duration-200
      `}
    >
      <img src={icon} alt="sendcoin" className="w-[18px] h-[18px] rounded-full mr-1" />
      <span className={`text-xs font-semibold mr-1 ${textColor}`}>{count}</span>
    </button>
  );
};

const CastActionsBar: React.FC<CastActionsBarProps> = ({
  likesCount,
  sharesCount,
  recastsCount,
  repliesCount,
  loading,
}) => {
  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-between pt-1"
        >
          <Skeleton className="h-5 w-12 rounded-full opacity-30" />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-row justify-between items-center gap-2 pt-1"
        >
          {/* Existing content */}
          <div className="flex gap-0 justify-start items-center">
            <div className="px-2 py-2 flex flex-row items-center justify-center gap-2 rounded-full bg-white">
              <Icon
                name="heart"
                className="w-[20px] h-[20px]"
                color="text-gray-400"
                strokeWidth={2}
              />
              <p className="text-gray-400 text-sm pb-[2px] font-semiBold">{1}</p>
            </div>
            <div className="px-2 py-1 flex flex-row items-center justify-center gap-2 rounded-full bg-white">
              <Icon
                name="recast"
                className="w-[20px] h-[20px]"
                color="text-gray-400 "
                strokeWidth={2}
              />
              <p className="text-gray-400 text-md font-semiBold hidden">{recastsCount}</p>
            </div>
            <div className="px-2 py-1 flex flex-row items-center justify-center gap-2 rounded-full bg-white">
              <Icon
                name="annotation"
                className="w-[20px] h-[20px]"
                color="text-gray-400 "
                strokeWidth={2}
              />
              <p className="text-gray-400 text-md font-semiBold hidden">{recastsCount}</p>
            </div>
          </div>
          <div className="flex gap-1">
            {recastsCount !== undefined && recastsCount > 0 && (
              <EmojiReaction
                icon="https://pbs.twimg.com/profile_images/1831795880300601344/ICk7r70l_400x400.jpg"
                count={recastsCount}
                textColor="text-blue-600"
                selected
              />
            )}
            {likesCount !== undefined && likesCount > 0 && (
              <EmojiReaction
                icon="https://pbs.twimg.com/profile_images/1600956334635098141/ZSzYTrHf_400x400.jpg"
                count={likesCount}
                textColor="text-yellow-500"
                selected
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CastActionsBar;
