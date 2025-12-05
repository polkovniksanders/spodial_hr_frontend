'use client';

import { Copy } from 'lucide-react';

export default function ButtonCopy({ copyText }: { copyText: string }) {
  function copy() {
    navigator.clipboard.writeText(copyText);
  }

  return (
    <button onClick={copy}>
      <Copy className={'w-4 h-4 text-accent cursor-pointer'} />
    </button>
  );
}
