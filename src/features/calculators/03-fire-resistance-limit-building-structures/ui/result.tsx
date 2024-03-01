import type { FC } from 'react';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/shared/ui/table';

import type { ResultProps } from '../model';

export const Result: FC<ResultProps> = (props) => {
  const isNotNormative = 'notNormative' in props;

  return (
    <Table>
      <TableCaption>
        Соответствие степени огнестойкости и предела огнестойкости строительных конструкций зданий, сооружений и
        пожарных отсеков.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead colSpan={7} className={'text-center'}>
            Предел огнестойкости строительных конструкций
          </TableHead>
        </TableRow>
        <TableRow>
          <TableHead rowSpan={2}>Несущие стены, колонны и другие несущие элементы</TableHead>
          <TableHead rowSpan={2}>Наружные ненесущие стены</TableHead>
          <TableHead rowSpan={2}>Перекрытия междуэтажные (в том числе чердачные и над подвалами)</TableHead>
          <TableHead colSpan={2}>Строительные конструкции бесчердачных покрытий</TableHead>
          <TableHead colSpan={2}>Строительные конструкции лестничных клеток</TableHead>
        </TableRow>
        <TableRow>
          <TableHead>Настилы (в том числе с утеплителем)</TableHead>
          <TableHead>Фермы, балки, прогоны</TableHead>
          <TableHead>Внутренние стены</TableHead>
          <TableHead>Марши и площадки лестниц</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          {isNotNormative ? (
            <TableCell>Не нормируется</TableCell>
          ) : (
            <>
              <TableCell>{props.loadBearingElements1}</TableCell>
              <TableCell>{props.externalCurtainWalls2}</TableCell>
              <TableCell>{props.interfloorCeilings3}</TableCell>
              <TableCell>{props.floorings4}</TableCell>
              <TableCell>{props.beams5}</TableCell>
              <TableCell>{props.interiorWalls6}</TableCell>
              <TableCell>{props.landingOfStairs7}</TableCell>
            </>
          )}
        </TableRow>
      </TableBody>
    </Table>
  );
};
