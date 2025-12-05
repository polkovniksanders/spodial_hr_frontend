import { Minus } from 'lucide-react';

import { findMinMaxKeys } from '@/app/components/analysis/lib/findMinMaxKeys';
import { getMetricLabel } from '@/app/components/analysis/lib/metricsKeyMap';
import { MAX_TOTAL_SCORE } from '@/app/components/analysis/lib/options';
import { renderScore } from '@/app/components/analysis/lib/score';
import ComponentCard from '@/app/components/analysis/server/component-card';
import Conclusion from '@/app/components/analysis/server/conclusion';
import DonutChart from '@/app/components/analysis/server/donat-chart';
import LinearProgress from '@/app/components/analysis/server/linear-progress';
import LinearProgressAgenda from '@/app/components/analysis/server/linear-progress-agenda';
import MinMax from '@/app/components/analysis/server/min-max';
import {
  getFollowUp,
  getFollowUps,
} from '@/app/components/follow-up/service/get-follow-up';
import { H4 } from '@/components/ui/typography/H4';

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

        <div className={'flex flex-col gap-1'}>
          <H4>
            Итоговый бал:{' '}
            <span className={'font-bold'}>{parsed.total_score}</span> из{' '}
            <span className={'font-bold'}>{MAX_TOTAL_SCORE}</span>
          </H4>
          <p className={'text-secondary'}>{renderScore(parsed.total_score)}</p>
        </div>
      </div>

      <div className={'flex flex-col gap-2'}>
        <p className={'text-[16px] font-bold'}>Быстрый срез</p>
        <div className={'grid grid-cols-2 gap-4'}>
          <ComponentCard>
            <p className={'font-medium text-[20px] mb-2'}>Максимальный вклад</p>

            <div className={'flex flex-row'}>
              {getMetricLabel(maxKey)}
              <Minus /> <MinMax minValue={maxValue} />
            </div>
          </ComponentCard>
          <ComponentCard>
            <p className={'font-medium text-[20px] mb-2'}>
              Главный фокус на рост
            </p>
            <div className={'flex flex-row'}>
              {getMetricLabel(minKey)} <Minus />
              <MinMax minValue={minValue} />
            </div>
          </ComponentCard>
        </div>
      </div>

      <div className={'flex flex-col gap-2'}>
        <p className={'text-[16px] font-bold'}>Подготовка ко встрече</p>
        <ComponentCard>
          <LinearProgressAgenda
            value={parsed.metrics.client_research_and_goal_setting}
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
            <LinearProgressAgenda
              value={parsed.metrics.small_talk}
              title={'Small Talk'}
            />
            <LinearProgress value={parsed.metrics.small_talk} />
          </ComponentCard>

          <ComponentCard>
            <LinearProgressAgenda
              value={parsed.metrics.small_talk}
              title={'Регламент встречи'}
            />
            <LinearProgress value={parsed.metrics.small_talk} />
          </ComponentCard>

          <ComponentCard>
            <LinearProgressAgenda
              value={parsed.metrics.small_talk}
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
            <LinearProgressAgenda
              value={parsed.metrics.spin_questions.situational}
              title={'SPIN: Situational'}
            />
            <LinearProgress value={parsed.metrics.spin_questions.situational} />
          </ComponentCard>

          <ComponentCard>
            <LinearProgressAgenda
              value={parsed.metrics.spin_questions.problem}
              title={'SPIN: Problem'}
            />
            <LinearProgress value={parsed.metrics.spin_questions.problem} />
          </ComponentCard>

          <ComponentCard>
            <LinearProgressAgenda
              value={parsed.metrics.spin_questions.implication}
              title={'SPIN: Implication'}
            />
            <LinearProgress value={parsed.metrics.spin_questions.implication} />
          </ComponentCard>

          <ComponentCard>
            <LinearProgressAgenda
              value={parsed.metrics.spin_questions.need_payoff}
              title={'SPIN: Need-payoff'}
            />
            <LinearProgress value={parsed.metrics.spin_questions.need_payoff} />
          </ComponentCard>
        </div>
      </div>

      <div className={'flex flex-col gap-2'}>
        <p className={'text-[16px] font-bold'}>Презентация продукта</p>

        <div className={'grid grid-cols-1 gap-4'}>
          <ComponentCard>
            <LinearProgressAgenda
              value={parsed.metrics.product_presentation_alignment}
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
              value={parsed.metrics.proposal_discussion}
              title={'Обсуждение предложения'}
            />
            <LinearProgress value={parsed.metrics.proposal_discussion} />
          </ComponentCard>
          <ComponentCard>
            <LinearProgressAgenda
              value={parsed.metrics.commitment_to_next_steps}
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
              value={parsed.metrics.objection_handling.algorithm_adherence}
              title={'Алгоритм работы с возражениями'}
            />
            <LinearProgress
              value={parsed.metrics.objection_handling.algorithm_adherence}
            />
          </ComponentCard>
          <ComponentCard>
            <LinearProgressAgenda
              value={parsed.metrics.objection_handling.response_effectiveness}
              title={'Эффективность ответа'}
            />
            <LinearProgress
              value={parsed.metrics.objection_handling.response_effectiveness}
            />
          </ComponentCard>
          <ComponentCard>
            <LinearProgressAgenda
              value={parsed.metrics.objection_handling.proactive_prevention}
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
              value={parsed.metrics.language_and_communication.clarity}
              title={'Ясность коммуникации'}
            />
            <LinearProgress
              value={parsed.metrics.language_and_communication.clarity}
            />
          </ComponentCard>
          <ComponentCard>
            <LinearProgressAgenda
              value={parsed.metrics.language_and_communication.empathy}
              title={'Эмпатия и активное слушание'}
            />
            <LinearProgress
              value={parsed.metrics.language_and_communication.empathy}
            />
          </ComponentCard>
        </div>
      </div>

      <Conclusion list={parsed.conclusion} />
    </div>
  );
}
