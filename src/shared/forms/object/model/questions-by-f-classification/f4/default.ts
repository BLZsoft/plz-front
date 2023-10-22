// TODO: DUPLICATES DEFAULT OF "F3" (SP2 table 6.9)
// eslint-disable-next-line filename-rules/match
import { HazardClass, ResistanceLevel } from '~/shared/types';

import { Question } from '../../questions';
import { createAnswer } from '../helpers/create-answer';
import { FieldsDefinition } from '../types';

const Data = {
  1: {
    50: {
      6000: createAnswer([ResistanceLevel.I, HazardClass.C0]),
    },
    28: {
      5000: createAnswer([ResistanceLevel.II, HazardClass.C1]),
    },
    15: {
      3000: createAnswer([ResistanceLevel.III, HazardClass.C0]),
    },
    12: {
      2000: createAnswer([ResistanceLevel.III, HazardClass.C1]),
    },
    9: {
      2000: createAnswer([ResistanceLevel.IV, HazardClass.C0]),
    },
    6: {
      2000: createAnswer([ResistanceLevel.IV, HazardClass.C1]),
      1200: createAnswer([ResistanceLevel.IV, [HazardClass.C2, HazardClass.C3]]),
    },
  },
  2: {
    50: {
      5000: createAnswer([ResistanceLevel.I, HazardClass.C0]),
      4000: createAnswer([ResistanceLevel.II, HazardClass.C0]),
    },
    28: {
      3000: createAnswer([ResistanceLevel.II, HazardClass.C1]),
    },
    15: {
      2000: createAnswer([ResistanceLevel.III, HazardClass.C0]),
    },
    12: {
      1400: createAnswer([ResistanceLevel.III, HazardClass.C1]),
    },
    9: { 1400: createAnswer([ResistanceLevel.IV, HazardClass.C0]) },
    6: {
      2000: createAnswer([ResistanceLevel.IV, HazardClass.C1]),
      1200: createAnswer([ResistanceLevel.IV, [HazardClass.C2, HazardClass.C3]]),
    },
  },
  3: {
    50: {
      5000: createAnswer([ResistanceLevel.I, HazardClass.C0]),
      4000: createAnswer([ResistanceLevel.II, HazardClass.C0]),
    },
    28: {
      3000: createAnswer([ResistanceLevel.II, HazardClass.C1]),
    },
    15: {
      2000: createAnswer([ResistanceLevel.III, HazardClass.C0]),
    },
    12: {
      1200: createAnswer([ResistanceLevel.III, HazardClass.C1]),
    },
  },
  // от 4 до 5 этажей
  4: {
    50: {
      5000: createAnswer([ResistanceLevel.I, HazardClass.C0]),
      4000: createAnswer([ResistanceLevel.II, HazardClass.C0]),
    },
    28: {
      2000: createAnswer([ResistanceLevel.II, HazardClass.C1]),
    },
    15: {
      1200: createAnswer([ResistanceLevel.III, HazardClass.C0]),
    },
    12: {
      800: createAnswer([ResistanceLevel.III, HazardClass.C1]),
    },
  },
  // от 6 до 9 этажей
  6: {
    50: {
      5000: createAnswer([ResistanceLevel.I, HazardClass.C0]),
      4000: createAnswer([ResistanceLevel.II, HazardClass.C0]),
    },
    28: {
      1200: createAnswer([ResistanceLevel.II, HazardClass.C1]),
    },
  },
  // от 10 до 16 этажей
  10: {
    50: {
      2500: createAnswer([ResistanceLevel.I, HazardClass.C0]),
      2200: createAnswer([ResistanceLevel.II, HazardClass.C0]),
    },
  },
};

export const f4: FieldsDefinition = {
  [Question.AbovegroundFloors]: {
    getOptions: () => Object.keys(Data),
    getLabel: (o) => {
      if (o === '4') return '4, 5 э.';
      if (o === '6') return 'от 6 до 9 э.';
      if (o === '16') return 'от 10 до 16 э.';

      return `${o} э.`;
    },
  },
  [Question.Height]: {
    getOptions: (dependsOn) => {
      const abovegroundFloors = dependsOn[Question.AbovegroundFloors];

      return Object.keys(Data[abovegroundFloors]);
    },
    getLabel: (o) => `до ${o} м.`,
    getShouldRender: (dependsOn) => dependsOn[Question.AbovegroundFloors] !== undefined,
    dependsOn: [Question.AbovegroundFloors],
  },
  [Question.FireCompartmentFloorArea]: {
    getOptions: (dependsOn) => {
      const abovegroundFloors = dependsOn[Question.AbovegroundFloors];
      const height = dependsOn[Question.Height];

      return Object.keys(Data[abovegroundFloors][height]);
    },
    getLabel: (o) => `до ${o} кв.м.`,
    getShouldRender: (dependsOn) => dependsOn[Question.Height] !== undefined,
    dependsOn: [Question.AbovegroundFloors, Question.Height],
  },
};
