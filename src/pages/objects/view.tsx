import { FC } from 'react';

export type ObjectsRootPageProps = {
  ChildRoutes: FC;
};

export const ObjectsRootPageView: FC<ObjectsRootPageProps> = ({ ChildRoutes }) => <ChildRoutes />;

export const ObjectsRootPageLoader = () => <h1>Загрузка...</h1>;
