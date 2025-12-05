interface Props {
  title: string;
  items: string[];
}

export function InsightSection({ title, items }: Props) {
  return (
    <div className='p-6'>
      <p className='text-[16px] mb-4 font-bold'>{title}</p>

      <ul className='space-y-4 text-sm leading-relaxed'>
        {items.map((item, i) => (
          <li key={i} className='flex'>
            <span className='text-accent mr-2'>•</span>
            <span
              dangerouslySetInnerHTML={{
                __html: item.replaceAll(
                  'Цитата: ',
                  '<br><span class="text-secondary italic">Цитата: </span>',
                ),
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
