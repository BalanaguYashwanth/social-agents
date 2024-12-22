'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex w-full flex-col items-start justify-start gap-10 py-6 px-4 mx-auto"
    >
      <div className="w-full flex flex-col rounded-2xl gap-6 h-full lg:gap-8"></div>
    </motion.div>
  );
};

export default ProfilePage;
