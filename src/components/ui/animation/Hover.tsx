import * as motion from 'motion/react-client';
import type { PropsWithChildren } from 'react';

export default function Hover({ children }: PropsWithChildren) {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.8 }}
    >
      {children}
    </motion.div>
  );
}
