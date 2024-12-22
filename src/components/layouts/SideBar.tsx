'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  {
    id: 1,
    href: '/',
    label: 'Send it',
    authReq: false,
  },
  {
    id: 2,
    href: '/leaderboard',
    label: 'Leaderboard',
    authReq: false,
  },
  {
    id: 3,
    href: '/profile',
    label: 'Profile',
    authReq: true,
  },
];

const AuthChecker = ({
  authReq,
  href,
  children,
}: {
  authReq: boolean;
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href} className="w-full">
      {children}
    </Link>
  );
};

const TabComponent = ({
  id,
  href,
  label,
  activeTab,
  setActiveTab,
  authReq,
}: {
  id: number;
  href: string;
  label: string;
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  authReq: boolean;
}) => {
  const pathname = usePathname();

  return (
    <motion.div
      key={id}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => {
        setActiveTab(id);
      }}
      className={`flex cursor-pointer relative select-none items-center w-full px-4 py-2 bg-transparent rounded-2xl gap-3`}
    >
      <AuthChecker authReq={authReq} href={href}>
        <div className="flex items-center w-full gap-3" style={{ zIndex: 2 }}>
          <div className="z-10">
            {id === 1 ? (
              <SendSVG color={pathname === href ? '#0091EB' : '#9B9B9B'} />
            ) : id === 2 ? (
              <LeaderboardSVG color={pathname === href ? '#0091EB' : '#9B9B9B'} />
            ) : (
              <ProfileSVG color={pathname === href ? '#0091EB' : '#9B9B9B'} />
            )}
          </div>
          <h1
            className={`text-lg xl:block lg:hidden ${
              pathname === href ? 'text-textPrimary' : 'text-textSecondary'
            }`}
            style={{ zIndex: 2 }}
          >
            {label}
          </h1>
        </div>
        {pathname === href && (
          <motion.span
            layoutId="side_panel_activeTab"
            className="absolute inset-0 xl:min-w-[220px] lg:min-w-[20px] h-12 bg-surfacePrimary"
            style={{ borderRadius: 16, zIndex: 1 }}
            transition={{ type: 'spring', bounce: 0.05, duration: 0.4 }}
          />
        )}
      </AuthChecker>
    </motion.div>
  );
};

const SideBar = () => {
  let [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="fixed xl:min-w-[280px] lg:min-w-[100px]">
      <motion.div layout className="flex flex-col items-start justify-start py-6 px-4 gap-4 ">
        <AnimatePresence initial={false}>
          {tabs.map((tab) => {
            return (
              <TabComponent
                key={tab.id}
                id={tab.id}
                href={tab.href}
                label={tab.label}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                authReq={tab.authReq}
              />
            );
          })}
        </AnimatePresence>
        <div className="px-4 w-full xl:block md:hidden">
          <Button
            onClick={() => {
              window.open('https://jup.ag/swap/SOL-SEND', '_blank');
            }}
            className="w-full"
          >
            Buy $SEND
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

const SendSVG = ({ color }: { color?: string }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className="z-1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 0C7.16344 7.72516e-07 -7.72516e-07 7.16345 0 16C7.72516e-07 24.8366 7.16345 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 -7.72516e-07 16 0ZM8 14.5858C8 15.3668 8.63317 16 9.41421 16H14L14 24C14 25.1046 14.8954 26 16 26C17.1046 26 18 25.1046 18 24V16L22.5858 16C23.3668 16 24 15.3668 24 14.5858C24 14.2107 23.851 13.851 23.5858 13.5858L17.4142 7.41421C16.6332 6.63316 15.3668 6.63316 14.5858 7.41421L8.41421 13.5858C8.149 13.851 8 14.2107 8 14.5858Z"
        fill={color}
      />
    </svg>
  );
};
const LeaderboardSVG = ({ color }: { color?: string }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className="z-1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 2.0625C8 0.923413 8.92341 0 10.0625 0H21.9375C23.0766 0 24 0.923413 24 2.0625V4H29.9375C31.0766 4 32 4.92341 32 6.0625V8C32 12.9128 28.4573 16.9982 23.7872 17.8408C23.1075 20.7274 20.8641 23.0108 18 23.748V28H22C23.1046 28 24 28.8954 24 30C24 31.1046 23.1046 32 22 32H10C8.89543 32 8 31.1046 8 30C8 28.8954 8.89543 28 10 28H14V23.748C11.1359 23.0108 8.89255 20.7274 8.2128 17.8408C3.54271 16.9982 0 12.9128 0 8V6.0625C0 4.92341 0.923413 4 2.0625 4H8V2.0625ZM24 13.6586V8H27.5875C27.8153 8 28.0015 8.18513 27.986 8.41242C27.821 10.8444 26.2067 12.8786 24 13.6586ZM8 8H4.4125C4.18468 8 3.99852 8.18513 4.01395 8.41242C4.17905 10.8444 5.79327 12.8786 8 13.6586V8Z"
        fill={color}
      />
    </svg>
  );
};
const ProfileSVG = ({ color }: { color?: string }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className="z-1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 18C18.7614 18 21 15.7614 21 13C21 10.2386 18.7614 8 16 8C13.2386 8 11 10.2386 11 13C11 15.7614 13.2386 18 16 18Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM12 20C9.60581 20 7.53915 21.4023 6.57655 23.4304C4.96301 21.3868 4 18.8059 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16C28 18.8059 27.037 21.3868 25.4235 23.4304C24.4609 21.4023 22.3942 20 20 20H12Z"
        fill={color}
      />
    </svg>
  );
};

export default SideBar;
