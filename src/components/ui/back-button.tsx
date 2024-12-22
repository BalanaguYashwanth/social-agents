'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Icon from './icon';

interface BackButtonProps {
  isScrolled: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({ isScrolled }) => {
  const router = useRouter();

  return (
    <motion.button
      onClick={() => router.back()}
      className="transform  flex items-center justify-center active:scale-90"
      animate={{
        height: isScrolled ? 32 : 36,
        width: isScrolled ? 32 : 56,
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{
          width: isScrolled ? 24 : 28,
          height: isScrolled ? 24 : 28,
        }}
        transition={{ duration: 0.3 }}
      >
        <Icon name="leftArrow" className="w-full h-full" />
      </motion.div>
    </motion.button>
  );
};

export default BackButton;
