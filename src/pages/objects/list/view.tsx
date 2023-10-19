import { FC } from 'react';

import { ObjectsTable } from '~/entities/objects';

import type { Object } from '~/shared/api/objects';

type Props = {
  data: Object[];
};

export const ObjectHomePageView: FC<Props> = ({ data }) => <ObjectsTable data={data} />;

export const ObjectHomePageLoader = () => <h1>Тут могла быть ваша реклама</h1>;
