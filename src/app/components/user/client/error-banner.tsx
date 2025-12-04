import { USER_ERRORS } from '@/app/components/user/lib/options';
import Error from '@/components/ui/input/Error';

export default function ErrorBanner({
  type,
}: {
  type: keyof typeof USER_ERRORS;
}) {
  const { icon, message } = USER_ERRORS[type];
  return (
    <div className='flex justify-end mb-4 gap-2'>
      {icon}
      <Error>{message}</Error>
    </div>
  );
}
