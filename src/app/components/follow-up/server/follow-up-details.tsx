import type { FollowUpDetailProps } from '@/app/components/follow-up/service/follow-up.interface';

export default function FollowUpDetails({
  data,
}: {
  data: FollowUpDetailProps;
}) {
  if (!data?.text) {
    return <div>Нет данных для отображения</div>;
  }

  let parsed;
  try {
    parsed = JSON.parse(data.text);
  } catch {
    return <div>Ошибка в формате JSON</div>;
  }

  return (
    <pre className='bg-scheduled p-4 rounded-lg overflow-x-auto text-sm font-mono whitespace-pre-wrap break-words'>
      {JSON.stringify(parsed, null, 2)}
    </pre>
  );
}
