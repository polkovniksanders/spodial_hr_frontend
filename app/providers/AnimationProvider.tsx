import { LazyMotion, domAnimation } from 'framer-motion';

import type { PropsWithChildren } from 'react';
export default function AnimationProvider({ children }: PropsWithChildren) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
