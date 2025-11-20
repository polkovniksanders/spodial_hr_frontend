import SignInForm from '@/features/auth/ui/SignInForm';
import SignInButtons from '@/features/auth/ui/SignInButtons';

export default function SignIn() {
  return (
    <div>
      <div className={'mb-[30px]'}>
        <SignInForm />
      </div>

      <SignInButtons />
    </div>
  );
}
