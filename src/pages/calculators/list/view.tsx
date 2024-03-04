import { FC } from 'react';

import { Link } from 'atomic-router-react';

import { routes } from '~/shared/router';
import { Button } from '~/shared/ui/button';

export type Props = {
  objectId: string;
};

export const CalculatorsListPageView: FC<Props> = ({ objectId }) => (
  <div className={'mt-4 flex flex-col'}>
    <Button variant={'link'} asChild>
      <Link to={routes.calculators.fireResistanceLimitBuildingStructures03} params={{ objectId }}>
        03. Соответствие степени огнестойкости и предела огнестойкости строительных конструкций зданий
      </Link>
    </Button>

    <Button variant={'link'} disabled={true}>
      04. Тип СОУЭ
    </Button>

    <Button variant={'link'} asChild>
      <Link to={routes.calculators.minimalDistance05} params={{ objectId }}>
        05. Минимальное расстояние до соседнего здания
      </Link>
    </Button>

    <Button variant={'link'} disabled={true}>
      06. АУП или АУПТ или АУПС
    </Button>

    <Button variant={'link'} disabled={true}>
      07. Необходимость дымоудаления
    </Button>

    <Button variant={'link'} disabled={true}>
      08. Необходимость подпора воздуха
    </Button>

    <Button variant={'link'} disabled={true}>
      09. Расход воды
    </Button>

    <Button variant={'link'} disabled={true}>
      10. Вид пожарного извещателя
    </Button>

    <Button variant={'link'} disabled={true}>
      11. Расстояние от перекрытия до извещателя
    </Button>
  </div>
);

export const CalculatorsListPageLoad = () => <div className={'mt-4'}>Загрузка... Разводящая калькуляторов</div>;
