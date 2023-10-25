// TODO: DUPLICATES DEFAULT OF "F3" (SP2 table 6.9)
// eslint-disable-next-line filename-rules/match
import { HazardClass, ResistanceLevel } from '~/shared/types';

import { Question } from '../../questions';
import { createAnswer } from '../helpers/create-answer';
import { FieldsDefinition } from '../types';

const Data = {
  А: {
    36: {
      1: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      2: {
        5200: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      },
      3: {
        3500: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      },
    },
    24: {
      1: {
        7800: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      },
      2: {
        3500: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      },
      3: {
        2600: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      },
    },
    2: {
      1: {
        3500: createAnswer([ResistanceLevel.IV, HazardClass.C0]),
      },
    },
  },
  Б: {
    36: {
      1: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      2: {
        10400: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      },
      3: {
        7800: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      },
    },
    24: {
      1: {
        7800: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      },
      2: {
        3500: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      },
      3: {
        2600: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      },
    },
    2: {
      1: {
        3500: createAnswer([ResistanceLevel.IV, HazardClass.C0]),
      },
    },
  },
  В: {
    48: {
      1: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      2: {
        25000: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      },
      3: {
        10400: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      },
    },
    24: {
      1: {
        25000: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      },
      2: {
        10400: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      },
      3: {
        5200: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      },
    },
    18: {
      1: {
        25000: createAnswer([ResistanceLevel.IV, [HazardClass.C0, HazardClass.C1]]),
        2600: createAnswer([ResistanceLevel.IV, [HazardClass.C2, HazardClass.C3]]),
      },
      2: {
        10400: createAnswer([ResistanceLevel.IV, [HazardClass.C0, HazardClass.C1]]),
        2000: createAnswer([ResistanceLevel.IV, [HazardClass.C2, HazardClass.C3]]),
      },
    },
    12: {
      1: {
        1200: createAnswer([ResistanceLevel.V, HazardClass.NotNormative]),
      },
      2: {
        600: createAnswer([ResistanceLevel.V, HazardClass.NotNormative]),
      },
    },
  },
  Г: {
    54: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
    36: {
      1: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      2: {
        25000: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      },
      3: {
        10400: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      },
    },
    30: {
      1: createAnswer([ResistanceLevel.III, HazardClass.C1]),
      2: {
        10400: createAnswer([ResistanceLevel.III, HazardClass.C1]),
      },
      3: {
        7800: createAnswer([ResistanceLevel.III, HazardClass.C1]),
      },
    },
    24: {
      1: createAnswer([ResistanceLevel.IV, HazardClass.C0]),
      2: {
        10400: createAnswer([ResistanceLevel.IV, HazardClass.C0]),
      },
      3: {
        5200: createAnswer([ResistanceLevel.IV, HazardClass.C0]),
      },
    },
    18: {
      1: {
        6500: createAnswer([ResistanceLevel.IV, HazardClass.C1]),
      },
      2: {
        5200: createAnswer([ResistanceLevel.IV, HazardClass.C1]),
      },
    },
  },
  Д: {
    54: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
    36: {
      1: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      2: {
        50000: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      },
      3: {
        15000: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      },
    },
    30: {
      1: createAnswer([ResistanceLevel.III, HazardClass.C1]),
      2: {
        25000: createAnswer([ResistanceLevel.III, HazardClass.C1]),
      },
      3: {
        10400: createAnswer([ResistanceLevel.III, HazardClass.C1]),
      },
    },
    24: {
      1: createAnswer([ResistanceLevel.IV, [HazardClass.C0, HazardClass.C1]]),
      2: {
        25000: createAnswer([ResistanceLevel.IV, [HazardClass.C0, HazardClass.C1]]),
      },
      3: {
        7800: createAnswer([ResistanceLevel.IV, [HazardClass.C0, HazardClass.C1]]),
      },
    },
    18: {
      1: {
        10400: createAnswer([ResistanceLevel.IV, [HazardClass.C2, HazardClass.C3]]),
      },
      2: {
        7800: createAnswer([ResistanceLevel.IV, [HazardClass.C2, HazardClass.C3]]),
      },
    },
    12: {
      1: {
        2600: createAnswer([ResistanceLevel.V, HazardClass.NotNormative]),
      },
      2: {
        1500: createAnswer([ResistanceLevel.V, HazardClass.NotNormative]),
      },
    },
  },
};

export const f5: FieldsDefinition = {
  [Question.Category]: {
    getOptions: () => Object.keys(Data),
    getLabel: (o) => `${o}`,
  },
  [Question.Height]: {
    getOptions: ({ category }) => Object.keys(Data[category] ?? {}),
    getLabel: (o) => `до ${o} м.`,
    getShouldRender: (dependsOn) => dependsOn[Question.Category] !== undefined,
    dependsOn: [Question.Category],
  },
  [Question.AbovegroundFloors]: {
    getOptions({ category, height }) {
      if (!category || !height) return null;

      if (category === 'Г' && height === '54') return null;
      if (category === 'Д' && height === '54') return null;

      return Object.keys(Data[category][height] ?? {});
    },
    getLabel: (o) => (o === '3' ? `3 или более э.` : `${o} э.`),
    getShouldRender(dependsOn) {
      return this.getOptions(dependsOn) !== null;
    },
    dependsOn: [Question.Category, Question.Height],
  },
  [Question.FireCompartmentFloorArea]: {
    getOptions: ({ category, height, abovegroundFloors }) => {
      if (!category || !height || !abovegroundFloors) return null;

      if (category === 'А' && height === '36' && abovegroundFloors === '1') return null;
      if (category === 'Б' && height === '36' && abovegroundFloors === '1') return null;
      if (category === 'В' && height === '48' && abovegroundFloors === '1') return null;
      if (category === 'Г' && (height === '36' || height === '30' || height === '24') && abovegroundFloors === '1')
        return null;
      if (category === 'Д' && (height === '36' || height === '30' || height === '24') && abovegroundFloors === '1')
        return null;

      return Object.keys(Data[category][height][abovegroundFloors] ?? {});
    },
    getLabel: (o) => `до ${o} кв. м.`,
    getShouldRender(dependsOn) {
      return this.getOptions(dependsOn) !== null;
    },
    dependsOn: [Question.Category, Question.Height, Question.AbovegroundFloors],
  },
  _getResult: ({
    category,
    height,
    abovegroundFloors,
    fireCompartmentFloorArea,
  }): [ResistanceLevel | ResistanceLevel[], HazardClass | HazardClass[]] | null => {
    let result = Data;

    if (category) result = result[category];
    if (height) result = result[height];
    if (abovegroundFloors) result = result[abovegroundFloors];
    if (fireCompartmentFloorArea) result = result[fireCompartmentFloorArea];

    if (Array.isArray(result)) {
      return result as unknown as [ResistanceLevel | ResistanceLevel[], HazardClass | HazardClass[]];
    }

    return null;
  },
};
