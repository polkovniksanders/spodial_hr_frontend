import Card from '@/components/ui/card/Card';
import Calendar from '@/features/calendar/ui/Calendar';

export default function Page() {
  return (
    <Card className={'min-h-full h-full'}>
      <Calendar />
    </Card>
  );
}
