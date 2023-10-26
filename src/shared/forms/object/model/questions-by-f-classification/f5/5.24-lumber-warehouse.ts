// TODO: DUPLICATES DEFAULT OF "F3" (SP2 table 6.9)
// eslint-disable-next-line filename-rules/match
import { HazardClass, ResistanceLevel } from '~/shared/types';

import { Question } from '../../questions';
import { createAnswer } from '../helpers/create-answer';
import { FieldsDefinition } from '../types';

const Data = {
  В: {
    1200: createAnswer([ResistanceLevel.V, HazardClass.NotNormative]),
    2400: createAnswer([ResistanceLevel.IV, [HazardClass.C2, HazardClass.C3]]),
    4800: createAnswer([ResistanceLevel.IV, [HazardClass.C0, HazardClass.C1]]),
    9600: createAnswer([[ResistanceLevel.I, ResistanceLevel.II, ResistanceLevel.III], HazardClass.C0]),
  },
};

export const f524LumberWarehouse: FieldsDefinition = {
  [Question.Category]: {
    getOptions: () => Object.keys(Data),
    getLabel: (o) => `${o}`,
  },
  [Question.FireCompartmentFloorArea]: {
    getOptions: ({ category }) => Object.keys(Data[category] ?? {}),
    getLabel: (o) => `до ${o} кв. м.`,
    getShouldRender: ({ category }) => !!category,
    dependsOn: [Question.Category],
  },
  _getResult: ({
    category,
    fireCompartmentFloorArea,
  }): [ResistanceLevel | ResistanceLevel[], HazardClass | HazardClass[]] | null =>
    Data[category][fireCompartmentFloorArea],
};
