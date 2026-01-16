'use client';

import { ChevronUp, ChevronDown, Settings } from 'lucide-react';
import { useState, useActionState } from 'react';

import { setActiveOrganization } from '@/app/actions/organization';

import type { OrganizationProps } from '@/features/organization/model/types';

export default function OrganizationDropdown({
  organizations,
  organizationActiveId,
}: {
  organizations: OrganizationProps[];
  organizationActiveId: number;
}) {
  const [open, setOpen] = useState(false);
  const [, action, pending] = useActionState(setActiveOrganization, {
    ok: false,
  });
  const active = organizations.find(
    o => String(o.id) === String(organizationActiveId),
  );

  return (
    <div className='relative w-[260px]'>
      <button
        onClick={() => setOpen(prev => !prev)}
        className='w-full flex items-center justify-between gap-2
                   rounded-full bg-green-100 px-4 py-2
                   hover:bg-green-200 transition'
      >
        <div className='text-left'>
          <div className='text-sm font-medium text-green-900'>
            {active?.name ?? 'Select organization'}
          </div>
          <div className='text-xs text-green-700'>{active?.pivot?.role}</div>
        </div>

        {open ? (
          <ChevronUp size={24} className='text-accent' />
        ) : (
          <ChevronDown size={24} className='text-accent' />
        )}
      </button>

      {open && (
        <div
          className='absolute top-full left-0 mt-2 w-full
                     rounded-2xl bg-white shadow-xl
                     border border-gray-100 z-50 overflow-hidden'
        >
          {organizations.map(organization => (
            <form
              key={organization.id}
              action={formData => {
                action(formData);
                setOpen(false);
              }}
            >
              <input
                type='hidden'
                name='organization_id'
                value={organization.id}
              />

              <button
                type='submit'
                disabled={pending}
                className={`
                  w-full px-4 py-3 text-left flex items-center justify-between
                  hover:bg-gray-50 transition
                  ${
                    organization.id === organizationActiveId ? 'bg-gray-50' : ''
                  }
                `}
              >
                <div>
                  <div className='text-sm font-medium text-gray-900'>
                    {organization.name}
                  </div>
                  <div className='text-xs text-gray-500'>
                    {organization.pivot.role}
                  </div>
                </div>

                {organization.id === organizationActiveId && (
                  <Settings size={16} className='text-gray-400' />
                )}
              </button>
            </form>
          ))}

          <div className='my-1 h-px bg-gray-100' />

          <button
            type='button'
            className='w-full px-4 py-3 text-left
                       text-sm font-medium text-green-600
                       hover:bg-green-50 transition'
          >
            + Create
          </button>
        </div>
      )}
    </div>
  );
}
