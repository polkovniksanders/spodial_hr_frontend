import React from 'react';

import { getMethodology } from '@/app/actions/methodology';
import MethodologyForm from '@/features/methodology/ui/methodology-form';
import ButtonBack from '@/shared/ui/button/button-back';
import Card from '@/shared/ui/card/Card';
import CardBody from '@/shared/ui/card/CardBody';
import ComponentHeader from '@/shared/ui/layout/component-header';
import { H2 } from '@/shared/ui/typography/H2';

import type { PageProps } from '@/shared/types/common';

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const methodology = await getMethodology(id);

  return (
    <Card className='h-full flex flex-col'>
      <ComponentHeader>
        <ButtonBack /> <H2>{methodology.name}</H2>
      </ComponentHeader>

      <CardBody>
        <MethodologyForm values={methodology} />
      </CardBody>
    </Card>
  );
}
