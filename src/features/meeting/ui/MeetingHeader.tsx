import React from 'react';

import ComponentHeader from '@/components/ui/layout/ComponentHeader';
import { H2 } from '@/components/ui/typography/H2';
import BackButton from '@/features/meeting/MeetingBackButton';

export default function MeetingHeader() {
  return (
    <ComponentHeader>
      <BackButton />
      <H2>Directors' meeting</H2>
    </ComponentHeader>
  );
}
