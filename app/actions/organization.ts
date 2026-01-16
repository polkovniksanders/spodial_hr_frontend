'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { selectOrganizationAction } from '@/app/actions/select-organization';
import { getAuthHeaders } from '@/shared/lib/getAuthToken';
import { ROUTES } from '@/shared/lib/routes';

import type {
  OrganizationDTO,
  OrganizationProps,
} from '@/features/organization/model/types';
import type { ApiResponse } from '@/shared/types/common';

const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error('API_URL is not defined');
}

export async function getOrganizations(): Promise<OrganizationProps[]> {
  const authHeaders = await getAuthHeaders();

  const res = await fetch(`${API_URL}/organizations?limit=50&offset=0`, {
    method: 'GET',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(
      `getOrganizations failed: ${res.status} ${res.statusText} — ${text}`,
    );
  }

  const json: ApiResponse<OrganizationProps[]> = await res.json();

  if (!json.success || !json.data) {
    throw new Error(json.error ?? 'Invalid API response');
  }

  return json.data;
}

export async function getOrganization(
  organization_id: number,
): Promise<OrganizationProps> {
  const authHeaders = await getAuthHeaders();

  const res = await fetch(`${API_URL}/organizations/${organization_id}`, {
    method: 'GET',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `getOrganization failed: ${res.status} ${res.statusText} — ${text}`,
    );
  }

  const json: ApiResponse<OrganizationProps> = await res.json();

  if (!json.success || !json.data) {
    throw new Error(json.error ?? 'Invalid API response');
  }

  return json.data;
}

export async function createOrganization(
  data: OrganizationDTO,
): Promise<OrganizationProps> {
  const authHeaders = await getAuthHeaders();

  const res = await fetch(`${API_URL}/organizations`, {
    method: 'POST',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `createOrganization failed: ${res.status} ${res.statusText} — ${text}`,
    );
  }

  const json: ApiResponse<OrganizationProps> = await res.json();

  if (!json.success || !json.data) {
    throw new Error(json.error ?? 'Invalid API response');
  }

  const formData = new FormData();
  formData.append('organization_id', String(json.data.id));

  await selectOrganizationAction(formData);
  revalidatePath('/organizations');
  redirect(ROUTES.DASHBOARD.CALENDAR);
}

export async function setActiveOrganization(
  prevState: { ok: boolean },
  formData: FormData,
) {
  const id = formData.get('organization_id') as string;

  const store = await cookies();

  store.set({
    name: 'organization_id',
    value: id,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });

  revalidatePath('/dashboard');

  return { ok: true };
}
