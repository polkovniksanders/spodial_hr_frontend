import { X } from 'lucide-react';

import Hover from '@/shared/ui/animation/Hover';

export default function ModalHeader({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) {
  return (
    <div className={'px-7 py-4.5 border-b-table'}>
      <div className={'flex flex-row justify-between '}>
        <p className={'text-[28px] font-normal'}>{title}</p>
        <Hover>
          <button
            className={'cursor-pointer text-accent hover:.hover'}
            onClick={onClick}
          >
            <X size={36} />
          </button>
        </Hover>
      </div>
    </div>
  );
}
