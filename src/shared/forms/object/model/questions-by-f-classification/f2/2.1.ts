// eslint-disable-next-line filename-rules/match
import { HazardClass, ResistanceLevel } from '~/shared/types';

import { Question } from '../../questions';
import { createAnswer } from '../helpers/create-answer';
import { FieldsDefinition } from '../types';

const Data = {
  50: {
    // не норм.
    0: createAnswer([ResistanceLevel.I, HazardClass.C0]),
  },
  9: {
    3: {
      800: createAnswer([ResistanceLevel.II, HazardClass.C0]),
    },
  },
  6: {
    2: {
      600: createAnswer([ResistanceLevel.II, HazardClass.C1]),
    },
  },
  3: {
    1: {
      400: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      300: createAnswer([
        [ResistanceLevel.IV, ResistanceLevel.V],
        [HazardClass.C0, HazardClass.C1, HazardClass.C2, HazardClass.C3],
      ]),
    },
  },
};

export const f21: FieldsDefinition = {
  [Question.Height]: {
    getOptions: () => Object.keys(Data),
    getLabel: (o) => `до ${o} м.`,
  },
  [Question.AbovegroundFloors]: {
    getOptions: (dependsOn) => {
      const height = dependsOn[Question.Height];

      if (height === '50') return null;

      return Object.keys(Data[height]);
    },
    getLabel: (o) => `${o} э.`,
    getShouldRender: (dependsOn) => {
      const height = dependsOn[Question.Height];

      if (height === '50') return false;

      return dependsOn[Question.Height] !== undefined;
    },
    dependsOn: [Question.Height],
  },
  [Question.Visitors]: {
    getOptions: (dependsOn) => {
      const height = dependsOn[Question.Height];

      if (height === '50') return Object.keys(Data[height]);

      const abovegroundFloors = dependsOn[Question.AbovegroundFloors];

      return Object.keys(Data[height][abovegroundFloors]);
    },
    getLabel: (o) => (o !== '0' ? `до ${o}` : `Не норм.`),
    getShouldRender: (dependsOn) => {
      const height = dependsOn[Question.Height];

      if (height === '50') return true;

      return dependsOn[Question.AbovegroundFloors] !== undefined;
    },
    dependsOn: [Question.Height, Question.AbovegroundFloors],
  },
  _getResult: (fields) => {
    const height = fields[Question.Height];
    const abovegroundFloors = fields[Question.AbovegroundFloors];
    const visitors = fields[Question.Visitors];

    if (height === '50') return Data[height][visitors];

    return Data[height][abovegroundFloors][visitors];
  },
};
