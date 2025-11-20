export default function CalendarDays() {
  const days = [];
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  for (let day of weekDays) {
    days.push(
      <div key={day} className='text-center font-medium text-gray-500'>
        {day}
      </div>,
    );
  }
  return <div className='grid grid-cols-7 mb-2'>{days}</div>;
}
