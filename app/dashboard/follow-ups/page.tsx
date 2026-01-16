import React from 'react';

import Card from '@/shared/ui/card/Card';
import CardBody from '@/shared/ui/card/CardBody';
import ComponentHeader from '@/shared/ui/layout/component-header';
import { H2 } from '@/shared/ui/typography/H2';

export default function Page() {
  return (
    <Card className='min-h-full h-full overflow-x-hidden overflow-y-scroll'>
      <ComponentHeader>
        <H2>Follow ups</H2>
      </ComponentHeader>
      <CardBody>Follow ups</CardBody>
    </Card>
  );
}
