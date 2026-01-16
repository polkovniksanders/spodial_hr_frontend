import { cookies } from 'next/headers';
import React from 'react';

import { getMethodologies } from '@/app/actions/methodology';
import MethodologyCreate from '@/features/methodology/ui/methodology-create';
import MethodologyList from '@/features/methodology/ui/methodology-list';
import Card from '@/shared/ui/card/Card';
import CardBody from '@/shared/ui/card/CardBody';
import ComponentHeader from '@/shared/ui/layout/component-header';
import { H2 } from '@/shared/ui/typography/H2';

export default async function Page() {
  const cookieStore = await cookies();
  const id = cookieStore.get('organization_id')?.value;

  if (!id) return;

  const methodologies = await getMethodologies(id);

  if (!methodologies) return null;

  return (
    <Card className='h-full flex flex-col'>
      <ComponentHeader>
        <H2>Methodologies</H2>
      </ComponentHeader>

      <CardBody>
        <MethodologyList data={methodologies} />
        <MethodologyCreate />
      </CardBody>
    </Card>
  );
}
