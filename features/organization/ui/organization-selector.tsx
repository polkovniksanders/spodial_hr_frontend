import { cookies } from 'next/headers';

import { getOrganizations } from '@/app/actions/organization';
import OrganizationDropdown from '@/features/organization/ui/organization-dropdown';

export default async function OrganizationSelector() {
  const organizations = await getOrganizations();

  const cookieStore = await cookies();
  const organization_id = cookieStore.get('organization_id')?.value;

  if (!organizations) return null;

  return (
    <div>
      <OrganizationDropdown
        organizationActiveId={organization_id ? +organization_id : null}
        organizations={organizations}
      />
    </div>
  );
}
