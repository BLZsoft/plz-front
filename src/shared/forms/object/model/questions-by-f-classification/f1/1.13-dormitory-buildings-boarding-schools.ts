// eslint-disable-next-line filename-rules/match
import { HazardClass, ResistanceLevel } from '~/shared/types';

import { Question } from '../../questions';
import { createAnswer } from '../helpers/create-answer';
import { FieldsDefinition } from '../types';

const Data = {
  40: {
    1: {
      3: createAnswer([ResistanceLevel.NotNormative, HazardClass.NotNormative]),
    },
  },
  80: {
    1: {
      3: createAnswer([ResistanceLevel.IV, [HazardClass.C1, HazardClass.C2, HazardClass.C3]]),
    },
  },
  140: {
    1: {
      3: createAnswer([ResistanceLevel.IV, HazardClass.C0]),
    },
  },
  200: {
    1: {
      3: createAnswer([ResistanceLevel.III, HazardClass.C1]),
    },
  },
  280: {
    2: {
      7: createAnswer([ResistanceLevel.III, HazardClass.C0]),
    },
  },
  // 281 - NotNormative
  281: {
    4: {
      15: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
    },
  },
};

export const f113DormitoryBuildingsOfBoardingSchool: FieldsDefinition = {
  [Question.Visitors]: {
    getOptions: () => Object.keys(Data),
    getLabel: (o) => (o === '281' ? `свыше 280 чел.` : `до ${o} чел.`),
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
    getShouldRender: (dependsOn) => dependsOn[Question.AbovegroundFloors] !== undefined,
    dependsOn: [Question.Visitors, Question.AbovegroundFloors],
  },
};
