import OnboardingImage from '@/features/calendar/ui/onboarding/OnboardingImage';
import OnboardingButtons from '@/features/calendar/ui/onboarding/OnboardingButtons';
import { H1 } from '@/components/ui/typography/H1';

export default function CalendarOnboardingTrigger() {
  return (
    <div className={'flex flex-col gap-7.5 w-[654px]'}>
      <H1>Continue with Google</H1>
      <OnboardingImage />
      <OnboardingButtons />
    </div>
  );
}
