import React from 'react';

import MethodologyForm from '@/features/methodology/ui/methodology-form';
import ButtonBack from '@/shared/ui/button/button-back';
import Card from '@/shared/ui/card/Card';
import CardBody from '@/shared/ui/card/CardBody';
import ComponentHeader from '@/shared/ui/layout/component-header';
import { H2 } from '@/shared/ui/typography/H2';

export default function Page() {
  return (
    <Card className='h-full flex flex-col'>
      <ComponentHeader>
        <ButtonBack />
        <H2>Methodologies</H2>
      </ComponentHeader>

      <CardBody>
        <MethodologyForm />
      </CardBody>
    </Card>
  );
}
