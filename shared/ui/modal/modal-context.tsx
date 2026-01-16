'use client';

import { createContext } from 'react';

import type { ModalContextValue } from '@/shared/types/modal';

export const ModalContext = createContext<ModalContextValue | null>(null);
