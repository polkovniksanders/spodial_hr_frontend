import type { Key, PropsWithChildren } from 'react';

const Title = ({ children }: PropsWithChildren) => {
  return (
    <h3 className='text-xl font-semibold text-accent mb-5 flex items-center gap-3'>
      <span className='text-2xl'>{children}</span>
    </h3>
  );
};
// @ts-ignore
export default function Insights({ list }) {
  return (
    <div className='py-12'>
      <h2 className='text-2xl font-bold text-primary mb-4 text-center'>
        Качественные инсайты
      </h2>

      <div
        className='grid
  grid-cols-1
  sm:grid-cols-1
  md:grid-cols-1
  lg:grid-cols-1
  xl:grid-cols-3
  2xl:grid-cols-3
  gap-6 lg:gap-4'
      >
        <div className='p-6'>
          <Title>Сильные стороны</Title>

          <ul className='space-y-4  text-sm leading-relaxed'>
            {list.strengths.map((item: string, i: Key | null | undefined) => (
              <li key={i} className='flex'>
                <span className='text-accent mr-2'>•</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: item.replaceAll(
                      'Цитата: ',
                      '<br><span class="text-accent italic">Цитата: </span>',
                    ),
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className='p-6'>
          <Title>Зоны развития</Title>

          <ul className='space-y-4 text-sm leading-relaxed'>
            {list.areas_for_development.map(
              (item: string, i: Key | null | undefined) => (
                <li key={i} className='flex'>
                  <span className='text-accent mr-2'>•</span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item.replaceAll(
                        'Цитата: ',
                        '<br><span class="text-accent italic">Цитата: </span>',
                      ),
                    }}
                  />
                </li>
              ),
            )}
          </ul>
        </div>

        <div className='p-6'>
          <Title>Рекомендованный план</Title>

          <ul className='space-y-4 text-sm leading-relaxed'>
            {list.action_plan.map((item: string, i: Key | null | undefined) => (
              <li key={i} className='flex'>
                <span className='text-accent mr-2'>•</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: item.replaceAll(
                      'Цитата: ',
                      '<br><span class="text-accent italic">Цитата: </span>',
                    ),
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
