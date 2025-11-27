import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

export default function Border({ children }: PropsWithChildren) {
  return (
    <motion.div
      className={'rounded-full'}
      initial={{
        boxShadow: 'none',
      }}
      whileHover={{
        boxShadow: '15px 13px 21.6px 0 rgba(10, 66, 30, 0.2)',
      }}
      transition={{
        duration: 0.3,
      }}
    >
      {children}
    </motion.div>
  );
}
