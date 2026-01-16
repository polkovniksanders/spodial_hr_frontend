import Link from 'next/link';

import { TeamActions } from '@/features/teams/ui/team-actions';
import { ROUTES } from '@/shared/lib/routes';
import { H3 } from '@/shared/ui/typography/H3';

import type { TeamProps } from '@/features/teams/model/types';

export function TeamItem({ team }: { team: TeamProps }) {
  const route = `${ROUTES.DASHBOARD.TEAMS}/${team.id}`;

  return (
    <div className='flex items-center justify-between border-b-table py-4.5'>
      <Link className={'flex-1'} href={route}>
        <H3>{team.name}</H3>
        <p className='text-sm text-secondary'>
          {team.employee_count < 1
            ? `no employee in ${team.name}`
            : `${team.employee_count} employee`}
        </p>
      </Link>

      <TeamActions id={team.id} />
    </div>
  );
}
