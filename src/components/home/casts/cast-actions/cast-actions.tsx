import React, { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrivy } from '@privy-io/react-auth';
import { reduceAPICredits } from '@/utils/trade.action';
import toast, { Toaster } from 'react-hot-toast';

interface CastActionsBarProps {
  likesCount?: number;
  sharesCount?: number;
  recastsCount?: number;
  repliesCount?: number;
  loading: boolean;
  castData: any;
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
  castData,
}) => {
  const { user } = usePrivy();
  const userFid = Number(user?.farcaster?.fid);
  const ownerFid = Number(castData?.fid);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async (e: any) => {
    try {
      e.preventDefault();
      toast.loading('Processing...');
      const data = await reduceAPICredits({ userFid, ownerFid });
      toast.dismiss();
      if (!data) {
        toast.error('You must need at least 2 coins to like.');
        return;
      } else if (data?.credits) {
        toast.success(`You have ${data.credits} coins remaining.`);
        setIsLiked(true);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
    //faracaster api
    // const response = await fetch(`/api/like`, {
    //   method: 'POST',
    //   body: JSON.stringify({ userFid, ownerFid }),
    // });
  };

  return (
    <AnimatePresence mode="wait">
      {/* <Toaster /> */}
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
            <div
              onClick={handleLike}
              className="px-2 py-2 flex flex-row items-center justify-center gap-2 rounded-full bg-white"
            >
              <Icon
                isToggled={isLiked}
                name="heart"
                className="w-[20px] h-[20px]"
                color="text-gray-400"
                strokeWidth={2}
              />
              <p className="text-gray-400 text-sm pb-[2px] font-semiBold">{1}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CastActionsBar;
