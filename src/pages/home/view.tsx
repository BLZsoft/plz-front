import { FC } from 'react';

import { Todo } from './model';

type Props = {
  data: Todo[];
};

export const HomePageView: FC<Props> = ({ data }) => (
  <>
    {data?.map((t) => (
      <h1 key={t.id}>{t.name}</h1>
    ))}
  </>
);
