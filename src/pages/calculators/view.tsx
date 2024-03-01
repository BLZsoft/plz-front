import { FC } from 'react';

export type CalculatorsRootPageProps = {
  ChildRoutes: FC;
};

export const CalculatorsRootPageView: FC<CalculatorsRootPageProps> = ({ ChildRoutes }) => <ChildRoutes />;

export const CalculatorsRootPageLoad = () => <h1>Загрузка...</h1>;
