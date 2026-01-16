'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { type ReactNode, useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40'
        />

        {/* Modal */}
        <div className='fixed inset-0 flex items-center justify-center z-50 p-4'>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className='bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden'
          >
            {/* Header */}
            <div className='flex items-center justify-between px-6 py-4 border-b border-neutral-200'>
              <h2 className='text-xl font-semibold text-neutral-900'>
                {title}
              </h2>
              <button
                onClick={onClose}
                className='p-2 hover:bg-neutral-100 rounded-lg transition-colors'
                aria-label='Close modal'
              >
                <X className='w-5 h-5 text-neutral-500' />
              </button>
            </div>

            {/* Content */}
            <div className='px-6 py-4 overflow-y-auto max-h-[calc(90vh-80px)]'>
              {children}
            </div>
          </motion.div>
        </div>
      </>
    )
  );
}
