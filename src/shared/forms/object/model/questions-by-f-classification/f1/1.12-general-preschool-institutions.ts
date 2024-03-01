// eslint-disable-next-line filename-rules/match
import { HazardClass, ResistanceLevel } from '~/shared/types';

import { Question } from '../../questions';
import { createAnswer } from '../helpers/create-answer';
import { FieldsDefinition } from '../types';

// Visitors -> AbovegroundFloors -> Height -> ResistanceLevel & HazardClass
const Data = {
  50: {
    1: {
      3: createAnswer([ResistanceLevel.III, HazardClass.C1]),
    },
  },
  100: {
    2: {
      6: createAnswer([ResistanceLevel.III, [HazardClass.C0, HazardClass.C1]]),
    },
  },
  150: {
    2: {
      6: createAnswer([ResistanceLevel.II, [HazardClass.C0, HazardClass.C1]]),
    },
  },
  350: {
    3: {
      9: createAnswer([ResistanceLevel.II, HazardClass.C0]),
    },
  },
};

export const f112GeneralPreschoolInstitutions: FieldsDefinition = {
  [Question.NumberOfVisitors]: {
    getOptions: () => Object.keys(Data),
    getLabel: (o) => `до ${o} чел.`,
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
    getLabel: (o) => `${o} м.`,
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
