// eslint-disable-next-line filename-rules/match
import { HazardClass, ResistanceLevel } from '~/shared/types';

import { Question } from '../../questions';
import { createAnswer } from '../helpers/create-answer';
import { FieldsDefinition } from '../types';

const Data = {
  1: {
    18: {
      3000: createAnswer([ResistanceLevel.I, HazardClass.C0]),
    },
    6: {
      2500: createAnswer([ResistanceLevel.II, HazardClass.C1]),
    },
    5: {
      1000: createAnswer([ResistanceLevel.III, HazardClass.C1]),
      500: createAnswer([ResistanceLevel.IV, [HazardClass.C2, HazardClass.C3]]),
    },
  },
  2: {
    18: {
      2500: createAnswer([ResistanceLevel.I, HazardClass.C0]),
    },
    6: {
      1000: createAnswer([ResistanceLevel.II, HazardClass.C1]),
    },
  },
};

export const f35ConsumerServiceEnterprises: FieldsDefinition = {
  [Question.AbovegroundFloors]: {
    getOptions: () => Object.keys(Data),
    getLabel: (o) => {
      if (o === '2') return `2-6 э.`;
      return `${o} э.`;
    },
  },
  [Question.Height]: {
    getOptions: (dependsOn) => {
      const abovegroundFloors = dependsOn[Question.AbovegroundFloors];
      return Object.keys(Data[abovegroundFloors]);
    },
    getLabel: (o) => `до ${o} м.`,
    getShouldRender: (dependsOn) => Boolean(dependsOn[Question.AbovegroundFloors]),
    dependsOn: [Question.AbovegroundFloors],
  },
  [Question.FireCompartmentFloorArea]: {
    getOptions: (dependsOn) => {
      const abovegroundFloors = dependsOn[Question.AbovegroundFloors];
      const height = dependsOn[Question.Height];
      return Object.keys(Data[abovegroundFloors][height]);
    },
    getLabel: (o) => `до ${o} кв.м.`,
    getShouldRender: (dependsOn) => Boolean(dependsOn[Question.Height]),
    dependsOn: [Question.AbovegroundFloors, Question.Height],
  },
  _getResult: (fields) => {
    const abovegroundFloors = fields[Question.AbovegroundFloors];
    const height = fields[Question.Height];
    const fireCompartmentFloorArea = fields[Question.FireCompartmentFloorArea];

    return Data[abovegroundFloors][height][fireCompartmentFloorArea];
  },
};
