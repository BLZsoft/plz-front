// TODO: DUPLICATES DEFAULT OF "F3" (SP2 table 6.9)
// eslint-disable-next-line filename-rules/match
import { HazardClass, ResistanceLevel } from '~/shared/types';

import { Question } from '../../questions';
import { createAnswer } from '../helpers/create-answer';
import { FieldsDefinition } from '../types';

const Data = {
  5: {
    3000: createAnswer([ResistanceLevel.I, HazardClass.C0]),
  },
  3: {
    3000: createAnswer([ResistanceLevel.II, HazardClass.C0]),
  },
};

export const f521UndergroundParking: FieldsDefinition = {
  [Question.UndergroundFloors]: {
    getOptions: () => Object.keys(Data),
    getLabel: (o) => `до ${o} э.`,
  },
  [Question.FireCompartmentFloorArea]: {
    getOptions: ({ undergroundFloors }) => Object.keys(Data[undergroundFloors] ?? {}),
    getLabel: (o) => `до ${o} кв. м.`,
    getShouldRender: ({ undergroundFloors }) => !!undergroundFloors,
    dependsOn: [Question.UndergroundFloors],
  },
  _getResult: ({
    undergroundFloors,
    fireCompartmentFloorArea,
  }): [ResistanceLevel | ResistanceLevel[], HazardClass | HazardClass[]] | null =>
    Data[undergroundFloors][fireCompartmentFloorArea],
};
