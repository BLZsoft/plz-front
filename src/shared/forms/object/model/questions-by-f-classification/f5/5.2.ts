// eslint-disable-next-line filename-rules/match
import { HazardClass, ResistanceLevel } from '~/shared/types';

import { Question } from '../../questions';
import { createAnswer } from '../helpers/create-answer';
import { FieldsDefinition } from '../types';

const Data = {
  А: {
    1: {
      75: createAnswer([ResistanceLevel.IV, [HazardClass.C2, HazardClass.C3]]),
      3600: createAnswer([ResistanceLevel.IV, HazardClass.C0]),
      4400: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      5200: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
    },
  },
  Б: {
    1: {
      75: createAnswer([ResistanceLevel.IV, [HazardClass.C2, HazardClass.C3]]),
      5200: createAnswer([ResistanceLevel.IV, HazardClass.C0]),
      6500: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      7800: {
        18: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      },
    },
    2: {
      5200: {
        18: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      },
    },
    // больше 2
    3: {
      3500: {
        18: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      },
    },
  },
  В: {
    1: {
      1200: createAnswer([ResistanceLevel.V, HazardClass.NotNormative]),
      2600: createAnswer([ResistanceLevel.IV, [HazardClass.C2, HazardClass.C3]]),
      7800: createAnswer([ResistanceLevel.IV, [HazardClass.C0, HazardClass.C1]]),
      10400: {
        24: createAnswer([ResistanceLevel.III, HazardClass.C0]),
        36: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      },
    },
    2: {
      5200: {
        24: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      },
      7800: {
        36: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      },
    },
    // больше 2
    3: {
      2600: {
        24: createAnswer([ResistanceLevel.III, HazardClass.C0]),
      },
      5200: {
        36: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      },
    },
  },
  Д: {
    1: {
      2200: {
        9: createAnswer([ResistanceLevel.V, HazardClass.NotNormative]),
      },
      5200: createAnswer([ResistanceLevel.IV, [HazardClass.C2, HazardClass.C3]]),
      0: {
        12: createAnswer([ResistanceLevel.IV, [HazardClass.C0, HazardClass.C1]]),
        36: createAnswer([ResistanceLevel.III, [HazardClass.C0, HazardClass.C1]]),
        0: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      },
    },
    2: {
      10400: {
        0: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      },
      7800: {
        36: createAnswer([ResistanceLevel.III, [HazardClass.C0, HazardClass.C1]]),
      },
      2200: {
        12: createAnswer([ResistanceLevel.IV, [HazardClass.C0, HazardClass.C1]]),
      },
      1200: {
        9: createAnswer([ResistanceLevel.V, HazardClass.NotNormative]),
      },
    },
    // больше 2
    3: {
      7800: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
      5200: {
        36: createAnswer([ResistanceLevel.III, [HazardClass.C0, HazardClass.C1]]),
      },
    },
  },
};

export const f52: FieldsDefinition = {
  [Question.Category]: {
    getOptions: () => Object.keys(Data),
    getLabel: (o) => `${o}`,
  },
  [Question.AbovegroundFloors]: {
    getOptions: ({ category }) => Object.keys(Data[category]),
    getLabel: (o) => (o === '3' ? `3 или более э.` : `${o} э.`),
    getShouldRender: ({ category }) => !!category,
    dependsOn: [Question.Category],
  },
  [Question.FireCompartmentFloorArea]: {
    getOptions: ({ category, abovegroundFloors }) => Object.keys(Data[category][abovegroundFloors]),
    getLabel: (o) => (o === '0' ? `Не огр.` : `до ${o} кв.м.`),
    getShouldRender: ({ abovegroundFloors }) => !!abovegroundFloors,
    dependsOn: [Question.Category, Question.AbovegroundFloors],
  },
  [Question.Height]: {
    getOptions: ({ category, abovegroundFloors, fireCompartmentFloorArea }) => {
      if (
        category === 'Б' &&
        (abovegroundFloors !== '1' || (fireCompartmentFloorArea === '7800' && abovegroundFloors === '1'))
      ) {
        return Object.keys(Data[category][abovegroundFloors][fireCompartmentFloorArea]);
      }

      if (
        category === 'В' &&
        (abovegroundFloors !== '1' || (fireCompartmentFloorArea === '10400' && abovegroundFloors === '1'))
      ) {
        return Object.keys(Data[category][abovegroundFloors][fireCompartmentFloorArea]);
      }

      if (
        (category === 'Д' &&
          (abovegroundFloors !== '1' || (fireCompartmentFloorArea === '0' && abovegroundFloors === '1'))) ||
        (fireCompartmentFloorArea === '2200' && abovegroundFloors === '1')
      ) {
        return Object.keys(Data[category][abovegroundFloors][fireCompartmentFloorArea]);
      }

      return null;
    },
    getLabel: (o) => (o === '0' ? `Не огр.` : `до ${o} м.`),
    getShouldRender(dependsOn) {
      const options = this.getOptions(dependsOn);
      return options !== null;
    },
    dependsOn: [Question.Category, Question.AbovegroundFloors, Question.FireCompartmentFloorArea],
  },
  _getResult: ({
    category,
    abovegroundFloors,
    fireCompartmentFloorArea,
    height,
  }): [ResistanceLevel | ResistanceLevel[], HazardClass | HazardClass[]] | null => {
    let result = Data;

    if (category) result = result[category];
    if (abovegroundFloors) result = result[abovegroundFloors];
    if (fireCompartmentFloorArea) result = result[fireCompartmentFloorArea];
    if (height) result = result[height];

    if (Array.isArray(result)) {
      return result as unknown as [ResistanceLevel | ResistanceLevel[], HazardClass | HazardClass[]];
    }

    return null;
  },
};
