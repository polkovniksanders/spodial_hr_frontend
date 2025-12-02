import Link from 'next/link';
import React from 'react';

import Hover from '@/components/ui/animation/Hover';
import { Button } from '@/components/ui/button/Button';

interface Props {
  primaryButton: string;
  primaryText: string;
  secondaryText: string;
  secondaryRoute: string;
  formId: string;
}

export default function FormFooter({
  primaryButton,
  primaryText,
  secondaryText,
  secondaryRoute,
  formId,
}: Props) {
  return (
    <div className={'flex flex-col gap-6 mt-12'}>
      <Button type={'submit'} form={formId}>
        {primaryButton}
      </Button>

      <div className={'flex gap-1'}>
        <p>{secondaryText}</p>
        <Hover>
          <Link className={'text-primary font-bold'} href={secondaryRoute}>
            {primaryText}
          </Link>
        </Hover>
      </div>
    </div>
  );
}
