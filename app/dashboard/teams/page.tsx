import { cookies } from 'next/headers';
import React from 'react';

import { getTeams } from '@/app/actions/team';
import TeamCreate from '@/features/teams/ui/team-create';
import { TeamList } from '@/features/teams/ui/team-list';
import Card from '@/shared/ui/card/Card';
import CardBody from '@/shared/ui/card/CardBody';
import ComponentHeader from '@/shared/ui/layout/component-header';

export default async function Page() {
  const cookieStore = await cookies();
  const organization_id = cookieStore.get('organization_id')?.value;
  if (!organization_id) return null;

  const teams = await getTeams(organization_id);

  return (
    <Card className='h-full flex flex-col'>
      <ComponentHeader>
        <h4 className={'text-[36px] font-normal'}>Teams</h4>
      </ComponentHeader>

      <CardBody>
        {teams.length > 0 ? (
          <TeamList teams={teams} />
        ) : (
          'No team in this organization'
        )}

        <TeamCreate />
      </CardBody>
    </Card>
  );
}
