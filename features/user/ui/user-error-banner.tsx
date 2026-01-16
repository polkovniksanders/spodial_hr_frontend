import { USER_ERRORS } from '@/features/user/lib/options';
import Error from '@/shared/ui/input/Error';

export default function UserErrorBanner({
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
