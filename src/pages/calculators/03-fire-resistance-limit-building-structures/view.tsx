import type { FC } from 'react';

import { Calculator03FireResistanceLimitBuildingStructures } from '~/features/calculators/03-fire-resistance-limit-building-structures';

import type { Object } from '~/shared/api/objects';
import { Label } from '~/shared/ui/label';

export type Props = {
  object: Object | null;
};

export const CalculatorFireResistanceLimitBuildingStructures03PageView: FC<Props> = ({ object }) => {
  if (!object) return <h1>Что-то пошло не так</h1>;

  return (
    <>
      <Label className={'mb-6 block'}>
        03. Соответствие степени огнестойкости и предела огнестойкости строительных конструкций зданий
      </Label>

      <Calculator03FireResistanceLimitBuildingStructures object={object} />
    </>
  );
};

export const CalculatorFireResistanceLimitBuildingStructures03PageLoad = () => (
  <div className={'mt-4'}>
    Загрузка... Соответствие степени огнестойкости и предела огнестойкости строительных конструкций зданий
  </div>
);
