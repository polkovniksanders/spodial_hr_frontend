import Popup from '@/components/ui/popup/Popup';
import { X } from 'lucide-react';
import { forwardRef } from 'react';
import type { PopupComponentProps } from '@/components/ui/popup/popup.interface';

const items = [
  {
    id: 1,
    title: 'Directors meeting',
  },
  {
    id: 2,
    title: 'Directors meeting',
  },
  {
    id: 3,
    title: 'Directors meeting',
  },
];

export const CalendarPopup = forwardRef<HTMLDivElement, PopupComponentProps>(
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

          <div className={'flex flex-col gap-2 p-5'}>
            {items.map(item => (
              <div
                key={item.id}
                className={'bg-primary rounded-full px-1.5 py-2.5'}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      </Popup>
    );
  },
);
