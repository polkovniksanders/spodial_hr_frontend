'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { getAuthHeaders } from '@/shared/lib/getAuthToken';
import { ROUTES } from '@/shared/lib/routes';

import type {
  MethodologyDTO,
  MethodologyProps,
} from '@/features/methodology/model/types';
import type { ApiResponse, RequestID } from '@/shared/types/common';

const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error('API_URL is not defined');
}
export async function createMethodology(
  id: number | undefined,
  data: MethodologyDTO,
): Promise<MethodologyProps> {
  const authHeaders = await getAuthHeaders();

  const payload = {
    organization_id: id,
    ...data,
  };

  const res = await fetch(`${API_URL}/methodologies`, {
    method: 'POST',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `createOrganization failed: ${res.status} ${res.statusText} — ${text}`,
    );
  }

  const json: ApiResponse<MethodologyProps> = await res.json();

  if (!json.success || !json.data) {
    throw new Error(json.error);
  }

  revalidatePath('METHODOLOGY');
  redirect(ROUTES.DASHBOARD.METHODOLOGY);
}

export async function updateMethodology(
  id: number | undefined,
  data: MethodologyDTO,
): Promise<MethodologyProps> {
  const authHeaders = await getAuthHeaders();

  const payload = {
    organization_id: id,
    ...data,
  };

  const res = await fetch(`${API_URL}/methodologies/${id}`, {
    method: 'PATCH',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `updateMethodology failed: ${res.status} ${res.statusText} — ${text}`,
    );
  }

  const json: ApiResponse<MethodologyProps> = await res.json();

  if (!json.success || !json.data) {
    throw new Error(json.error ?? 'Invalid API response');
  }

  revalidatePath('METHODOLOGY');
  redirect(ROUTES.DASHBOARD.METHODOLOGY);
}

export async function getMethodologies(organization_id: RequestID) {
  const authHeaders = await getAuthHeaders();

  const res = await fetch(
    `${API_URL}/organizations/${organization_id}/methodologies`,
    {
      method: 'GET',
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  if (!res.ok) {
    const text = await res.text();
    console.error('Events fetch failed:', res.status, text);
  }

  const json: ApiResponse<MethodologyProps[]> = await res.json();

  if (!json.success || !json.data) {
    throw new Error(json.error ?? 'Invalid API response');
  }

  return { data: json.data };
}

export async function getMethodology(id: string): Promise<MethodologyProps> {
  const authHeaders = await getAuthHeaders();

  const res = await fetch(`${API_URL}/methodologies/${id}`, {
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
      `getMethodology failed: ${res.status} ${res.statusText} — ${text}`,
    );
  }

  const json: ApiResponse<MethodologyProps> = await res.json();

  if (!json.success || !json.data) {
    throw new Error(json.error ?? 'Invalid API response');
  }

  return json.data;
}

export async function deleteMethodology(id: string): Promise<MethodologyProps> {
  const authHeaders = await getAuthHeaders();

  const res = await fetch(`${API_URL}/methodologies/${id}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `deleteMethodology failed: ${res.status} ${res.statusText} — ${text}`,
    );
  }

  const json: ApiResponse<MethodologyProps> = await res.json();

  if (!json.success || !json.data) {
    throw new Error(json.error ?? 'Invalid API response');
  }
  revalidatePath('METHODOLOGY');

  return json.data;
}
