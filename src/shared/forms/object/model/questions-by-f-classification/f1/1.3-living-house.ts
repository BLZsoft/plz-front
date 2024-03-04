// eslint-disable-next-line filename-rules/match
import { HazardClass, ResistanceLevel } from '~/shared/types';

import { Question } from '../../questions';
import { createAnswer } from '../helpers/create-answer';
import { FieldsDefinition } from '../types';

const Data = {
  75: {
    2500: createAnswer([ResistanceLevel.I, HazardClass.C0]),
  },
  50: {
    2500: createAnswer([ResistanceLevel.II, HazardClass.C0]),
  },
  28: {
    2200: createAnswer([ResistanceLevel.II, HazardClass.C1]),
    1800: createAnswer([ResistanceLevel.III, HazardClass.C0]),
  },
  15: {
    1800: createAnswer([ResistanceLevel.III, HazardClass.C1]),
  },
  5: {
    1000: createAnswer([ResistanceLevel.IV, HazardClass.C0]),
    800: createAnswer([ResistanceLevel.IV, HazardClass.C1]),
    500: createAnswer([ResistanceLevel.IV, HazardClass.C2]),
  },
  3: {
    1400: createAnswer([ResistanceLevel.IV, HazardClass.C0]),
    1200: createAnswer([ResistanceLevel.IV, HazardClass.C1]),
    900: createAnswer([ResistanceLevel.IV, HazardClass.C2]),
    800: createAnswer([ResistanceLevel.V, HazardClass.NotNormative]),
  },
};

export const f13LivingHouse: FieldsDefinition = {
  [Question.Height]: {
    getOptions: () => Object.keys(Data),
    getLabel: (o) => `до ${o} м.`,
  },
  [Question.AbovegroundFloors]: {
    getOptions: (dependsOn) => {
      const height = dependsOn[Question.Height];

      return Object.keys(Data[height]);
    },
    getLabel: (o) => `до ${o} кв.м.`,
    getShouldRender: (dependsOn) => Boolean(dependsOn[Question.Height]),
    dependsOn: [Question.Height],
  },
  _getResult: (fields) => {
    const height = fields[Question.Height];
    const abovegroundFloors = fields[Question.AbovegroundFloors];

    return Data[height][abovegroundFloors];
  },
};
