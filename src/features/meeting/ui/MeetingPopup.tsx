import { X } from 'lucide-react';
import { forwardRef } from 'react';

import Popup from '@/components/ui/popup/Popup';

import type { PopupComponentProps } from '@/components/ui/popup/popup.interface';

export const MeetingPopup = forwardRef<HTMLDivElement, PopupComponentProps>(
  ({ width, onClose, top, left }, ref) => {
    return (
      <Popup top={top} left={left}>
        <div
          style={{
            width: width,
          }}
          className={'bg-secondary box-shadow-secondary rounded-[40px]'}
        >
          <div onClick={onClose} className={'border-tertiary px-9.5 pb-4.5'}>
            <X size={36} />
          </div>

          <div className={'flex flex-col gap-2 p-5'}>f</div>
        </div>
      </Popup>
    );
  },
);
