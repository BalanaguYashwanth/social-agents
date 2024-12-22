import { Avatar } from '@/components/ui/avatar';
import { Channel, User, DehydratedChannel } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { AvatarImage } from '@radix-ui/react-avatar';
import Link from 'next/link';
import React from 'react';
import CustomCastTimestamp from './timestamp';
import CastOptionsMenu from './options-menu';
import CastOptionsBottomSheet from './options-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';

interface CastHeaderProps {
  castAuthor: User;
  castHash: string;
  castTimestamp: string;
  castChannel?: any;
  loading: boolean;
}

const CastHeader: React.FC<CastHeaderProps> = ({
  castAuthor,
  castHash,
  castTimestamp,
  castChannel,
  loading,
}) => {
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div layout>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="py-1"
            variants={fadeVariants}
            transition={{ duration: 0.3 }}
          >
            <Skeleton className="h-4 w-[200px]" />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={fadeVariants}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between gap-2 w-full ">
              <div className="flex items-center gap-2">
                <div className="flex flex-row items-center justify-start gap-2 w-full">
                  <div className="flex flex-row gap-2">
                    <p className="font-semibold text-sm md:text-base whitespace-nowrap">
                      {castAuthor.display_name}
                    </p>{' '}
                    {/* {castAuthor.active_status === 'active' ? <VerifiedBadge /> : ''} */}
                  </div>
                  <div className="flex flex-row gap-2 items-center justify-start w-full">
                    {castAuthor.display_name && castAuthor?.display_name.length <= 15 && (
                      <p className="text-sm md:text-base opacity-[40%]">@{castAuthor.username}</p>
                    )}
                    {castChannel && (
                      <>
                        <div className="w-1 h-1 bg-gray-300 rounded-full hidden" />
                        <Link
                          href={'/channel/' + castChannel.id}
                          className="hidden text-sm md:text-base lowercase overflow-hidden line-clamp-1 text-blue-500"
                        >
                          /{castChannel.name}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-fit flex flex-row gap-1 items-center justify-end ">
                {/* <CastOptionsBottomSheet castHash={castHash} /> */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const VerifiedBadge: React.FC = () => (
  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.58559 2.30472C7.3666 1.52367 8.63293 1.52367 9.414 2.30472L10.0807 2.97139C10.2057 3.09641 10.3753 3.16665 10.5521 3.16665H11.3331C12.4377 3.16665 13.3331 4.06208 13.3331 5.16665V5.94769C13.3331 6.12451 13.4034 6.29407 13.5284 6.4191L14.1951 7.08577C14.9761 7.86682 14.9761 9.13315 14.1951 9.91422L13.5284 10.5809C13.4034 10.7059 13.3331 10.8755 13.3331 11.0523V11.8333C13.3331 12.9379 12.4377 13.8333 11.3331 13.8333H10.5521C10.3753 13.8333 10.2057 13.9036 10.0807 14.0286L9.414 14.6952C8.63293 15.4763 7.36667 15.4763 6.58559 14.6952L5.91892 14.0286C5.79389 13.9036 5.62433 13.8333 5.44751 13.8333H4.66647C3.56189 13.8333 2.66647 12.9379 2.66647 11.8333V11.0523C2.66647 10.8755 2.59623 10.7059 2.4712 10.5809L1.80454 9.91422C1.02349 9.13315 1.02349 7.86682 1.80453 7.08577L2.4712 6.4191C2.59623 6.29408 2.66647 6.12451 2.66647 5.94769V5.16665C2.66647 4.06208 3.56189 3.16665 4.66647 3.16665H5.44751C5.62433 3.16665 5.79389 3.09641 5.91892 2.97139L6.58559 2.30472ZM10.2127 7.38229C10.4238 7.08065 10.3505 6.66497 10.0488 6.45383C9.7472 6.24268 9.33147 6.31604 9.12033 6.61767L7.21307 9.34235L6.43884 8.66495C6.16175 8.42249 5.74057 8.45055 5.49812 8.72762C5.25567 9.00475 5.28374 9.42589 5.56083 9.66835L6.8942 10.835C7.03667 10.9597 7.2254 11.0179 7.4134 10.9952C7.60133 10.9724 7.77073 10.8708 7.87933 10.7156L10.2127 7.38229Z"
      fill="#2558DC"
    />
  </svg>
);

export default CastHeader;
