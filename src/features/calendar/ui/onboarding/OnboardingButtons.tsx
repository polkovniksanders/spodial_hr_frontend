import { BUTTON_TEXT } from '@/features/auth/utils/options';
import { Button } from '@/components/ui/button/Button';

export default function OnboardingButtons() {
  return (
    <div className={'px-[54px] w-full'}>
      <Button>{BUTTON_TEXT.GET_STARTED}</Button>
    </div>
  );
}
