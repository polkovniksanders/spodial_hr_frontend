import React from 'react';

import ButtonBack from '@/shared/ui/button/button-back';
import ComponentHeader from '@/shared/ui/layout/component-header';
import { H2 } from '@/shared/ui/typography/H2';

export default function MeetingHeader({ title }: { title: string }) {
  return (
    <ComponentHeader>
      <ButtonBack />
      <H2>{title}</H2>
    </ComponentHeader>
  );
}
