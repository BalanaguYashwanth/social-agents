'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import Avatar from 'boring-avatars';
import BackButton from './back-button';

const UserNavButton = () => {
  const { user, logout } = usePrivy();
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        {user?.farcaster?.pfp ? (
          <img src={user.farcaster.pfp} alt="User avatar" className="h-8 w-8 rounded-full" />
        ) : (
          <Avatar
            size={32}
            name={user?.farcaster?.displayName || 'User'}
            variant="beam"
            colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
          />
        )}
        <p className="text-sm font-medium">{user?.farcaster?.displayName || 'User'}</p>
      </div>
    </div>
  );
};

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 10); // Reduced threshold for quicker response
    });
    return () => unsubscribe();
  }, [scrollY]);

  const isHome = pathname === '/';

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-white to-white/70 backdrop-blur-md"
      initial={{ height: 80 }}
      animate={{ height: isScrolled ? 60 : 80 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {!isHome && (
          <motion.div
            initial={{ x: -20, y: 16, scale: 0.7, opacity: 0 }}
            animate={{ x: 0, y: 16, scale: 1, opacity: 1 }}
            exit={{ x: -20, y: 16, scale: 0.7, opacity: 0 }}
            transition={{
              duration: 0.3,
              type: 'spring',
            }}
            className="absolute translate-y-1/2 "
          >
            <BackButton isScrolled={isScrolled} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="xl:px-4 mx-auto flex justify-between items-center h-full px-4">
        <Link href="/" prefetch={false} className="w-fit mx-auto">
          <h3 className="text-2xl italic">x13Fi Socials</h3>
        </Link>
      </div>
    </motion.nav>
  );
}
