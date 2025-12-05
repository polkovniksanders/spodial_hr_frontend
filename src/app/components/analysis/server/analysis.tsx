import { Minus } from 'lucide-react';

import { findMinMaxKeys } from '@/app/components/analysis/lib/findMinMaxKeys';
import { renderScore } from '@/app/components/analysis/lib/getTotalScore';
import { getMetricLabel } from '@/app/components/analysis/lib/metricsKeyMap';
import ComponentCard from '@/app/components/analysis/server/ComponentCard';
import DonutChart from '@/app/components/analysis/server/DonatChart';
import Insights from '@/app/components/analysis/server/Insights';
import LinearProgress from '@/app/components/analysis/server/LinearProgress';
import LinearProgressAgenda from '@/app/components/analysis/server/LinearProgressAgenda';
import {
  getFollowUp,
  getFollowUps,
} from '@/app/components/follow-up/service/get-follow-up';
import { H2 } from '@/components/ui/typography/H2';

import type {
  FollowUpResponse,
  FollowUpsResponse,
} from '@/app/components/follow-up/service/follow-up.interface';

export default async function Analysis({ id }: { id: number }) {
  const followUps: FollowUpsResponse = await getFollowUps(id);

  if (!followUps?.data || followUps.data.length === 0) {
    return <div>No analysis</div>;
  }

  const latestId = Math.max(...followUps.data.map(item => item.id));
  const followUp: FollowUpResponse = await getFollowUp(latestId);

  let parsed;
  try {
    parsed = JSON.parse(followUp.data.text);
  } catch {
    return <div>Ошибка в формате JSON</div>;
  }

  if (!parsed) return;

  const { minValue, maxValue, maxKey, minKey } = findMinMaxKeys(parsed.metrics);

  console.log('parsed', parsed);

  return (
    <div className={'flex flex-col gap-10'}>
      <div className={'flex flex-row items-center gap-4'}>
        <DonutChart value={parsed.total_score} />

        <div className={'flex flex-col gap-3'}>
          <H2>Итоговый бал:{parsed.total_score} </H2>
          {renderScore(parsed.total_score)}
        </div>
      </div>

      <div className={'flex flex-col gap-2'}>
        <p className={'text-[16px] font-bold'}>Быстрый срез</p>
        <div className={'grid grid-cols-2 gap-4'}>
          <ComponentCard>
            <p>Максимальный вклад</p>

            <div className={'flex flex-row'}>
              {getMetricLabel(maxKey)}
              <Minus /> {maxValue} из 4
            </div>
          </ComponentCard>
          <ComponentCard>
            <p>Главный фокус на рост</p>
            <div className={'flex flex-row'}>
              {getMetricLabel(minKey)} <Minus />
              {minValue} из 4
            </div>
          </ComponentCard>
        </div>
      </div>

      <div className={'flex flex-col gap-2'}>
        <p className={'text-[16px] font-bold'}>Подготовка ко встрече</p>
        <ComponentCard>
          <LinearProgressAgenda
            min={0}
            max={4}
            title={'Исследование клиента и постановка целей'}
          />
          <LinearProgress
            value={parsed.metrics.client_research_and_goal_setting}
          />
        </ComponentCard>
      </div>

      <div className={'flex flex-col gap-2'}>
        <p className={'text-[16px] font-bold'}>Первая встреча</p>

        <div className={'grid grid-cols-3 gap-4'}>
          <ComponentCard>
            <LinearProgressAgenda min={0} max={4} title={'Small Talk'} />
            <LinearProgress value={parsed.metrics.small_talk} />
          </ComponentCard>

          <ComponentCard>
            <LinearProgressAgenda min={0} max={4} title={'Регламент встречи'} />
            <LinearProgress value={parsed.metrics.small_talk} />
          </ComponentCard>

          <ComponentCard>
            <LinearProgressAgenda
              min={0}
              max={4}
              title={'Формирование доверия'}
            />
            <LinearProgress value={parsed.metrics.small_talk} />
          </ComponentCard>
        </div>
      </div>

      <div className={'flex flex-col gap-2'}>
        <p className={'text-[16px] font-bold'}>Методология SPIN</p>

        <div className={'grid grid-cols-4 gap-4'}>
          <ComponentCard>
            <LinearProgressAgenda min={0} max={4} title={'SPIN: Situational'} />
            <LinearProgress value={parsed.metrics.spin_questions.situational} />
          </ComponentCard>

          <ComponentCard>
            <LinearProgressAgenda min={0} max={4} title={'SPIN: Problem'} />
            <LinearProgress value={parsed.metrics.spin_questions.problem} />
          </ComponentCard>

          <ComponentCard>
            <LinearProgressAgenda min={0} max={4} title={'SPIN: Implication'} />
            <LinearProgress value={parsed.metrics.spin_questions.implication} />
          </ComponentCard>

          <ComponentCard>
            <LinearProgressAgenda min={0} max={4} title={'SPIN: Need-payoff'} />
            <LinearProgress value={parsed.metrics.spin_questions.need_payoff} />
          </ComponentCard>
        </div>
      </div>

      <div className={'flex flex-col gap-2'}>
        <p className={'text-[16px] font-bold'}>Презентация продукта</p>

        <div className={'grid grid-cols-1 gap-4'}>
          <ComponentCard>
            <LinearProgressAgenda
              min={0}
              max={4}
              title={'Презентация продукта'}
            />
            <LinearProgress
              value={parsed.metrics.product_presentation_alignment}
            />
          </ComponentCard>
        </div>
      </div>

      <div className={'flex flex-col gap-2'}>
        <p className={'text-[16px] font-bold'}>Предложение и договорённости</p>

        <div className={'grid grid-cols-2 gap-4'}>
          <ComponentCard>
            <LinearProgressAgenda
              min={0}
              max={4}
              title={'Обсуждение предложения'}
            />
            <LinearProgress value={parsed.metrics.proposal_discussion} />
          </ComponentCard>
          <ComponentCard>
            <LinearProgressAgenda
              min={0}
              max={4}
              title={'Фиксация следующих шагов'}
            />
            <LinearProgress value={parsed.metrics.commitment_to_next_steps} />
          </ComponentCard>
        </div>
      </div>

      <div className={'flex flex-col gap-2'}>
        <p className={'text-[16px] font-bold'}>Работа с возражениями</p>

        <div className={'grid grid-cols-3 gap-4'}>
          <ComponentCard>
            <LinearProgressAgenda
              min={0}
              max={4}
              title={'Алгоритм работы с возражениями'}
            />
            <LinearProgress
              value={parsed.metrics.objection_handling.algorithm_adherence}
            />
          </ComponentCard>
          <ComponentCard>
            <LinearProgressAgenda
              min={0}
              max={4}
              title={'Эффективность ответа'}
            />
            <LinearProgress
              value={parsed.metrics.objection_handling.response_effectiveness}
            />
          </ComponentCard>
          <ComponentCard>
            <LinearProgressAgenda
              min={0}
              max={4}
              title={'Проактивная профилактика'}
            />
            <LinearProgress
              value={parsed.metrics.objection_handling.proactive_prevention}
            />
          </ComponentCard>
        </div>
      </div>

      <div className={'flex flex-col gap-2'}>
        <p className={'text-[16px] font-bold'}>Коммуникация</p>

        <div className={'grid grid-cols-2 gap-4'}>
          <ComponentCard>
            <LinearProgressAgenda
              min={0}
              max={4}
              title={'Ясность коммуникации'}
            />
            <LinearProgress
              value={parsed.metrics.language_and_communication.clarity}
            />
          </ComponentCard>
          <ComponentCard>
            <LinearProgressAgenda
              min={0}
              max={4}
              title={'Эмпатия и активное слушание'}
            />
            <LinearProgress
              value={parsed.metrics.language_and_communication.empathy}
            />
          </ComponentCard>
        </div>
      </div>

      <Insights list={parsed.conclusion} />
    </div>
  );
}
