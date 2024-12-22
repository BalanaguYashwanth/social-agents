import React from 'react';
import { CastWithInteractions, User } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CastCardSidebarProps {
  castDetails: {
    hash: string;
    parent_hash: string | null;
    parent_url: string | null;
    timestamp: string;
    author: User;
  };
  isParent?: boolean;
}

const CastCardSidebar: React.FC<CastCardSidebarProps> = ({ castDetails, isParent = false }) => {
  return (
    <motion.div layout className="relative w-[38px]">
      <Link href={`/user/${castDetails.author.username}`} key={castDetails.author.fid}>
        <Avatar className="w-[38px] h-[38px]">
          <AvatarImage src={castDetails.author.pfp_url} alt={castDetails.author.display_name} />
        </Avatar>
      {isParent && (
        <div className="absolute top-[38px] left-1/2 w-0.5 h-full bg-gray-300 -translate-x-1/2" />
      )}
      </Link>
    </motion.div>
  );
};

export default CastCardSidebar;
