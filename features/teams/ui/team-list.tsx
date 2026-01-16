import { TeamItem } from '@/features/teams/ui/team-item';

import type { TeamProps } from '@/features/teams/model/types';

export function TeamList({ teams }: { teams: TeamProps[] }) {
  if (!teams) return null;

  return (
    <div className='flex flex-col h-full'>
      {teams.map(team => (
        <TeamItem key={team.id} team={team} />
      ))}
    </div>
  );
}
