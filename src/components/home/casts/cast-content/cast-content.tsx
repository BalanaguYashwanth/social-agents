import React from 'react';
import { Frame, User } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import CastEmbeds from './embeds';
import CastText from './cast-text';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';

interface CastContentProps {
  castText?: string;
  mentionedProfiles?: User[];
  castEmbeds?: any[];
  castFrames?: Frame[];
  readMore?: boolean;
  isLoading: boolean;
  isError: boolean; // Change this prop
  error?: Error | null; // Add this prop
}

const CastContent: React.FC<CastContentProps> = ({
  castText,
  mentionedProfiles,
  castEmbeds,
  castFrames,
  readMore,
  isLoading,
  isError,
  error, // Add this prop
}) => {
  return (
    <motion.div layout className="w-full">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            layout
            key="skeleton"
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="py-2 flex flex-col gap-2"
          >
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-3/4" />
            <div className="h-8" />
          </motion.div>
        ) : error ? (
          <motion.div
            layout
            key="error"
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="p-4 rounded-xl bg-red-50 flex items-center gap-2 text-red-500"
          >
            <span className="text-sm">Error: {error.message}</span>
          </motion.div>
        ) : (
          <motion.div layout key="content" initial="hidden" animate="visible" exit="hidden">
            <CastText
              text={castText}
              mentionedProfiles={mentionedProfiles}
              castHash={castText}
              readMore={readMore}
            />
            <CastEmbeds castEmbeds={castEmbeds} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CastContent;
