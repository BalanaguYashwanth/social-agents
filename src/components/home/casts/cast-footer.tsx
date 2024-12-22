import React from 'react';
import Icon from '@/components/ui/icon';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';

interface CastFooterProps {
  likesCount?: number;
  sharesCount?: number;
  recastsCount?: number;
  repliesCount?: number;
  dollarCount?: number;
  castChannel?: string;
  loading: boolean;
}

const CastFooter: React.FC<CastFooterProps> = ({
  likesCount,
  sharesCount,
  recastsCount,
  repliesCount,
  dollarCount,
  castChannel,
  loading,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={loading ? 'loading' : 'content'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        layout
        className="flex justify-between items-center pt-1"
      >
        {loading ? (
          <>
            <Skeleton className="h-4 w-[100px] opacity-10" />
            <Skeleton className="h-4 w-[50px] opacity-10" />
          </>
        ) : (
          <>
            <div className="text-xs text-gray-400">
              {likesCount} Likes · {recastsCount} Recasts · ${dollarCount} Earned
            </div>
            <div className="text-sm text-blue-500 hidden">/{castChannel}</div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CastFooter;
