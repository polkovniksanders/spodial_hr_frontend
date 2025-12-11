import React from 'react';

import MethodologyForm from '@/app/components/methodology/client/methodology-form';
import Card from '@/components/ui/card/Card';
import ComponentHeader from '@/components/ui/layout/component-header';
import { H2 } from '@/components/ui/typography/H2';

export default function Page() {
  return (
    <Card className='h-full flex flex-col'>
      <ComponentHeader>
        <H2>Methodology</H2>
      </ComponentHeader>

      <div className='flex-1 flex'>
        <MethodologyForm />
      </div>
    </Card>
  );
}
