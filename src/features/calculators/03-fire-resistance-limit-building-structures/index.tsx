import type { FC } from 'react';

import { Object } from '~/shared/api/objects';

import { getResultProps } from './model';
import { Result } from './ui/result';

type Props = {
  object: Object;
};

export const Calculator03FireResistanceLimitBuildingStructures: FC<Props> = ({ object }) => {
  const resultProps = getResultProps(object);

  return <Result {...resultProps} />;
};
