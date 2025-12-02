'use client';
import ErrorBanner from '@/features/user/ui/error-banner';

/* eslint-disable sonarjs/no-globals-shadowing */
export default function Error() {
  return <ErrorBanner type='server' />;
}
