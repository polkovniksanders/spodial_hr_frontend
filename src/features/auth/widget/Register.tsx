import RegisterButtons from '@/features/auth/ui/RegisterButtons';
import RegisterForm from '@/features/auth/ui/RegisterForm';

export default function Register() {
  return (
    <div>
      <div className={'mb-[30px]'}>
        <RegisterForm />
      </div>

      <RegisterButtons />
    </div>
  );
}
