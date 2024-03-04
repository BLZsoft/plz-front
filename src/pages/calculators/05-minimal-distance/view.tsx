import type { FC } from 'react';

import { Calculator05MinimalDistance } from '~/features/calculators/05-minimal-distance';

import type { Object } from '~/shared/api/objects';
import { Label } from '~/shared/ui/label';

export type Props = {
  object: Object | null;
};

export const CalculatorMinimalDistance05PageView: FC<Props> = ({ object }) => {
  if (!object) return <h1>Что-то пошло не так</h1>;

  return (
    <>
      <Label className={'mb-6 block'}>05. Минимальное расстояние до соседнего здания</Label>

      <Calculator05MinimalDistance object={object} />
    </>
  );
};

export const CalculatorMinimalDistance05PageLoad = () => (
  <div className={'mt-4'}>Загрузка... Минимальное расстояние до соседнего здания</div>
);
