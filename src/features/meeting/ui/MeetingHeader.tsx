import React from 'react';

import ComponentHeader from '@/components/ui/layout/component-header';
import { H2 } from '@/components/ui/typography/H2';
import BackButton from '@/features/meeting/MeetingBackButton';

export default function MeetingHeader({ title }: { title: string }) {
  return (
    <ComponentHeader>
      <BackButton />
      <H2>{title}</H2>
    </ComponentHeader>
  );
}
