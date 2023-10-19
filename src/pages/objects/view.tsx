import { FC } from 'react';

type Props = {
  ChildRoutes: FC;
};

export const ObjectsRootPageView: FC<Props> = ({ ChildRoutes }) => <ChildRoutes />;

export const ObjectsRootPageLoader = () => <h1>Загрузка...</h1>;
