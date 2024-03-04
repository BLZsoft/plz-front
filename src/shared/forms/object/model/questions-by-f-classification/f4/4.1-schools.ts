// eslint-disable-next-line filename-rules/match
import { HazardClass, ResistanceLevel } from '~/shared/types';

import { Question } from '../../questions';
import { createAnswer } from '../helpers/create-answer';
import { FieldsDefinition } from '../types';

const Data = {
  100: {
    1: {
      3: createAnswer([ResistanceLevel.NotNormative, HazardClass.NotNormative]),
    },
  },
  270: {
    1: {
      3: createAnswer([ResistanceLevel.III, HazardClass.C1]),
    },
  },
  350: {
    2: {
      7: createAnswer([ResistanceLevel.III, HazardClass.C0]),
    },
  },
  600: {
    3: {
      11: createAnswer([ResistanceLevel.II, HazardClass.C0]),
    },
  },
  1600: {
    3: {
      1: createAnswer([ResistanceLevel.I, HazardClass.C1]),
    },
  },
  // 1601 - NotNormative
  1601: {
    5: {
      19: createAnswer([ResistanceLevel.I, HazardClass.C0]),
    },
  },
};

export const f41Schools: FieldsDefinition = {
  [Question.NumberOfVisitors]: {
    getOptions: () => Object.keys(Data),
    getLabel: (o) => (o === '1601' ? `свыше 1600 чел.` : `до ${o} чел.`),
  },
  [Question.AbovegroundFloors]: {
    getOptions: (dependsOn) => {
      const visitors = dependsOn[Question.NumberOfVisitors];

      return Object.keys(Data[visitors]);
    },
    getLabel: (o) => `${o} э.`,
    getShouldRender: (dependsOn) => Boolean(dependsOn[Question.NumberOfVisitors]),
    dependsOn: [Question.NumberOfVisitors],
  },
  [Question.Height]: {
    getOptions: (dependsOn) => {
      const visitors = dependsOn[Question.NumberOfVisitors];
      const abovegroundFloors = dependsOn[Question.AbovegroundFloors];

      return Object.keys(Data[visitors][abovegroundFloors]);
    },
    getLabel: (o) => `до ${o} м.`,
    getShouldRender: (dependsOn) => Boolean(dependsOn[Question.AbovegroundFloors]),
    dependsOn: [Question.NumberOfVisitors, Question.AbovegroundFloors],
  },
  _getResult: (fields) => {
    const visitors = fields[Question.NumberOfVisitors];
    const abovegroundFloors = fields[Question.AbovegroundFloors];
    const height = fields[Question.Height];

    return Data[visitors][abovegroundFloors][height];
  },
};
