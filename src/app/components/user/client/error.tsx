'use client';

/* eslint-disable sonarjs/no-globals-shadowing */
import ErrorBanner from '@/app/components/user/client/error-banner';

export default function Error() {
  return <ErrorBanner type='server' />;
}
