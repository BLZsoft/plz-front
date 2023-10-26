// eslint-disable-next-line filename-rules/match
import { HazardClass, ResistanceLevel } from '~/shared/types';

import { Question } from '../../questions';
import { createAnswer } from '../helpers/create-answer';
import { FieldsDefinition } from '../types';

const Data = {
  В: {
    1: {
      8: {
        1200: createAnswer([ResistanceLevel.V, HazardClass.NotNormative]),
      },
      12: {
        2600: createAnswer([ResistanceLevel.IV, [HazardClass.C2, HazardClass.C3]]),
        25000: createAnswer([ResistanceLevel.IV, [HazardClass.C0, HazardClass.C1]]),
      },
      18: {
        25000: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      },
      36: {
        0: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      },
    },
    2: {
      12: {
        2000: createAnswer([ResistanceLevel.IV, [HazardClass.C2, HazardClass.C3]]),
        10400: createAnswer([ResistanceLevel.IV, [HazardClass.C0, HazardClass.C1]]),
      },
      18: {
        10400: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      },
      36: {
        25000: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      },
    },
    // более 2 э.,
    3: {
      18: {
        5200: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      },
      36: {
        10400: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      },
    },
  },
  Д: {
    1: {
      8: {
        2600: createAnswer([ResistanceLevel.V, HazardClass.NotNormative]),
      },
      12: {
        10400: createAnswer([ResistanceLevel.IV, [HazardClass.C2, HazardClass.C3]]),
        0: createAnswer([ResistanceLevel.IV, [HazardClass.C0, HazardClass.C1]]),
      },
      18: {
        0: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      },
      36: {
        0: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      },
    },
    2: {
      8: {
        1500: createAnswer([ResistanceLevel.V, HazardClass.NotNormative]),
      },
      12: {
        7800: createAnswer([ResistanceLevel.IV, [HazardClass.C2, HazardClass.C3]]),
        25000: createAnswer([ResistanceLevel.IV, [HazardClass.C0, HazardClass.C1]]),
      },
      18: {
        25000: createAnswer([ResistanceLevel.III, HazardClass.C1]),
        50000: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      },
      36: {
        0: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      },
    },
    // более 2 э.,
    3: {
      12: {
        7800: createAnswer([ResistanceLevel.IV, [HazardClass.C0, HazardClass.C1]]),
      },
      18: {
        10400: createAnswer([ResistanceLevel.III, HazardClass.C1]),
        15000: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      },
      36: {
        0: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      },
    },
  },
};

export const f53: FieldsDefinition = {
  [Question.Category]: {
    getOptions: () => Object.keys(Data),
    getLabel: (o) => `${o}`,
  },
  [Question.AbovegroundFloors]: {
    getOptions: ({ category }) => Object.keys(Data[category]),
    getLabel: (o) => (o === '0' ? 'Не огр.' : o === '3' ? `3 или более э.` : `${o} э.`),
    getShouldRender: ({ category }) => !!category,
    dependsOn: [Question.Category],
  },
  [Question.Height]: {
    getOptions: ({ category, abovegroundFloors }) => Object.keys(Data[category][abovegroundFloors]),
    getLabel: (o) => (o === '0' ? `Не огр.` : `до ${o} м.`),
    getShouldRender: ({ abovegroundFloors }) => !!abovegroundFloors,
    dependsOn: [Question.Category, Question.AbovegroundFloors],
  },
  [Question.FireCompartmentFloorArea]: {
    getOptions: ({ category, abovegroundFloors, height }) => Object.keys(Data[category][abovegroundFloors][height]),
    getLabel: (o) => (o === '0' ? `Не огр.` : `до ${o} кв.м.`),
    getShouldRender: ({ height }) => !!height,
    dependsOn: [Question.Category, Question.AbovegroundFloors, Question.Height],
  },
  _getResult: ({
    category,
    abovegroundFloors,
    fireCompartmentFloorArea,
    height,
  }): [ResistanceLevel | ResistanceLevel[], HazardClass | HazardClass[]] | null => {
    if (!!category && !!abovegroundFloors && !!height && !!fireCompartmentFloorArea) {
      return Data[category][abovegroundFloors][height][fireCompartmentFloorArea];
    }

    return null;
  },
};
