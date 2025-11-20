import Avatar from '@/features/user/ui/Avatar';

export default function User() {
  return (
    <div className={'flex gap-[8px] items-center justify-end mb-4'}>
      <div className={'flex flex-col text-right'}>
        <p className={'text-primary'}>Robert</p>
        <p className={'text-[#818F85]'}>Robert34@gmail.com</p>
      </div>
      <Avatar />
    </div>
  );
}
