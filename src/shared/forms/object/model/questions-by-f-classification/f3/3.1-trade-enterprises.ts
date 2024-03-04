// eslint-disable-next-line filename-rules/match
import { HazardClass, ResistanceLevel } from '~/shared/types';

import { Question } from '../../questions';
import { createAnswer } from '../helpers/create-answer';
import { FieldsDefinition } from '../types';

const Data = {
  1: {
    28: {
      3500: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
    },
    8: { 2000: createAnswer([ResistanceLevel.III, [HazardClass.C0, HazardClass.C1]]) },
    3: {
      1000: createAnswer([ResistanceLevel.IV, HazardClass.C0]),
      500: createAnswer([
        [ResistanceLevel.IV, ResistanceLevel.V],
        [HazardClass.C1, HazardClass.C2, HazardClass.C3],
      ]),
    },
  },
  2: {
    28: {
      3000: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
    },
    8: {
      1000: createAnswer([ResistanceLevel.III, [HazardClass.C0, HazardClass.C1]]),
    },
  },
  3: {
    28: {
      2500: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
    },
  },
};

export const f31TradeEnterprises: FieldsDefinition = {
  [Question.AbovegroundFloors]: {
    getOptions: () => Object.keys(Data),
    getLabel: (o) => {
      if (o === '3') return `3-5 э.`;
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
