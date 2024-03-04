import type { FC } from 'react';

import type { Object } from '~/shared/api/objects';

export type Props = {
  object: Object | null;
};

export const CalculatorWecs04PageView: FC<Props> = ({ object }) => {
  console.log(object);

  return <div>Тип СОУЭ</div>;
};

export const CalculatorWecs04PageLoad = () => <div className={'mt-4'}>Загрузка... Тип СОУЭ</div>;
