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
  [Question.Visitors]: {
    getOptions: () => Object.keys(Data),
    getLabel: (o) => `до ${o} чел.`,
  },
  [Question.AbovegroundFloors]: {
    getOptions: (dependsOn) => {
      const visitors = dependsOn[Question.Visitors];
      
      return Object.keys(Data[visitors]);
    },
    getLabel: (o) => `${o} э.`,
    getShouldRender: (dependsOn) => dependsOn[Question.Visitors] !== undefined,
    dependsOn: [Question.Visitors],
  },
  [Question.Height]: {
    getOptions: (dependsOn) => {
      const visitors = dependsOn[Question.Visitors];
      const abovegroundFloors = dependsOn[Question.AbovegroundFloors];

      return Object.keys(Data[visitors][abovegroundFloors]);
    },
    getLabel: (o) => `${o} м.`,
    getShouldRender: (dependsOn) => dependsOn[Question.Height] !== undefined,
    dependsOn: [Question.Visitors, Question.AbovegroundFloors],
  },
};
