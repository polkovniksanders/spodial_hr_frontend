import React from 'react';

import BackButton from '@/app/components/meeting/ui/MeetingBackButton';
import ComponentHeader from '@/components/ui/layout/component-header';
import { H2 } from '@/components/ui/typography/H2';

export default function MeetingHeader({ title }: { title: string }) {
  return (
    <ComponentHeader>
      <BackButton />
      <H2>{title}</H2>
    </ComponentHeader>
  );
}
