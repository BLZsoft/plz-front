import { Object } from '~/shared/api/objects';
import { ResistanceLevel } from '~/shared/types';

export type ResultProps =
  | { notNormative: true }
  | {
      loadBearingElements1: string;
      externalCurtainWalls2: string;
      interfloorCeilings3: string;
      floorings4: string;
      beams5: string;
      interiorWalls6: string;
      landingOfStairs7: string;
    };

export function getResultProps(object: Object): ResultProps {
  if (!object.resistance_level) throw new Error('Объект не заполнен');

  if (object.resistance_level[0] === ResistanceLevel.I)
    return {
      loadBearingElements1: 'R120',
      externalCurtainWalls2: 'E30',
      interfloorCeilings3: 'REI60',
      floorings4: 'RE30',
      beams5: 'R30',
      interiorWalls6: 'REI120',
      landingOfStairs7: 'R60',
    };

  if (object.resistance_level[0] === ResistanceLevel.II)
    return {
      loadBearingElements1: 'R90',
      externalCurtainWalls2: 'E15',
      interfloorCeilings3: 'REI45',
      floorings4: 'RE15',
      beams5: 'R15',
      interiorWalls6: 'REI90',
      landingOfStairs7: 'R60',
    };

  if (object.resistance_level[0] === ResistanceLevel.III)
    return {
      loadBearingElements1: 'R45',
      externalCurtainWalls2: 'E15',
      interfloorCeilings3: 'REI45',
      floorings4: 'RE15',
      beams5: 'R15',
      interiorWalls6: 'REI60',
      landingOfStairs7: 'R45',
    };

  if (object.resistance_level[0] === ResistanceLevel.IV)
    return {
      loadBearingElements1: 'R15',
      externalCurtainWalls2: 'E15',
      interfloorCeilings3: 'REI15',
      floorings4: 'RE15',
      beams5: 'R15',
      interiorWalls6: 'REI45',
      landingOfStairs7: 'R15',
    };

  return { notNormative: true };
}
