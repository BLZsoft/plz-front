import { type FC, useEffect } from 'react';

import { useUnit } from 'effector-react';

import type { Object } from '~/shared/api/objects';
import { HazardClass, ResistanceLevel } from '~/shared/types';
import { Label } from '~/shared/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/shared/ui/select';

import { calculator05MinimalDistanceModel } from './model';

type Props = {
  object: Object;
};

export const Calculator05MinimalDistance: FC<Props> = ({ object }) => {
  const {
    neighborBuildingHazardClass,
    onNeighborBuildingHazardClassChange,
    neighborBuildingResistanceLevel,
    onNeighborBuildingResistanceLevelChange,
    onObjectChanged,
    error,
    result,
  } = useUnit(calculator05MinimalDistanceModel);

  useEffect(() => {
    onObjectChanged(object);
  }, [onObjectChanged, object]);

  return (
    <>
      <div className={'space-y-4'}>
        <div>
          <Label>Степень огнестойкости объекта, до которого определяется расстояние</Label>

          <Select
            value={neighborBuildingResistanceLevel ?? undefined}
            onValueChange={onNeighborBuildingResistanceLevelChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите значение" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(ResistanceLevel)
                .filter(([value]) => value !== ResistanceLevel.NotNormative)
                .map(([key, value]) => (
                  <SelectItem key={key} value={value}>
                    {key}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Класс конструктивной пожарной опасности объекта, до которого определяется расстояние</Label>
          <Select value={neighborBuildingHazardClass ?? undefined} onValueChange={onNeighborBuildingHazardClassChange}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите значение" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(HazardClass)
                .filter(([value]) => value !== HazardClass.NotNormative)
                .map(([key, value]) => (
                  <SelectItem key={key} value={value}>
                    {key}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {result && (
          <div>
            <span>
              Минимальное расстояние: <b>{result} метров</b>
            </span>
          </div>
        )}

        {error && <Label color={'red'}>{error}</Label>}
      </div>
    </>
  );
};
