// eslint-disable-next-line filename-rules/match

import { HazardClass, ResistanceLevel } from '~/shared/types';

import { Question } from '../../questions';

export const Questions = [Question.AbovegroundFloors, Question.Height, Question.FireCompartmentFloorArea];

// AbovegroundFloors -> Height -> FireCompartmentFloorArea -> ResistanceLevel & HazardClass
export const Data = {
  1: {
    50: {
      6000: [ResistanceLevel.I, HazardClass.C0],
    },
    28: {
      5000: [ResistanceLevel.II, HazardClass.C1],
    },
    15: {
      3000: [ResistanceLevel.III, HazardClass.C0],
    },
    12: {
      2000: [ResistanceLevel.III, HazardClass.C1],
    },
    9: {
      2000: [ResistanceLevel.IV, HazardClass.C0],
    },
    6: {
      2000: [ResistanceLevel.IV, HazardClass.C1],
      1200: [ResistanceLevel.IV, [HazardClass.C2, HazardClass.C3]],
    },
  },
  2: {
    50: {
      5000: [ResistanceLevel.I, HazardClass.C0],
      4000: [ResistanceLevel.II, HazardClass.C0],
    },
    28: {
      3000: [ResistanceLevel.II, HazardClass.C1],
    },
    15: {
      2000: [ResistanceLevel.III, HazardClass.C0],
    },
    12: {
      1400: [ResistanceLevel.III, HazardClass.C1],
    },
    9: { 1400: [ResistanceLevel.IV, HazardClass.C0] },
    6: {
      2000: [ResistanceLevel.IV, HazardClass.C1],
      1200: [ResistanceLevel.IV, [HazardClass.C2, HazardClass.C3]],
    },
  },
  3: {
    50: {
      5000: [ResistanceLevel.I, HazardClass.C0],
      4000: [ResistanceLevel.II, HazardClass.C0],
    },
    28: {
      3000: [ResistanceLevel.II, HazardClass.C1],
    },
    15: {
      2000: [ResistanceLevel.III, HazardClass.C0],
    },
    12: {
      1200: [ResistanceLevel.III, HazardClass.C1],
    },
  },
  4_5: {
    50: {
      5000: [ResistanceLevel.I, HazardClass.C0],
      4000: [ResistanceLevel.II, HazardClass.C0],
    },
    28: {
      2000: [ResistanceLevel.II, HazardClass.C1],
    },
    15: {
      1200: [ResistanceLevel.III, HazardClass.C0],
    },
    12: {
      800: [ResistanceLevel.III, HazardClass.C1],
    },
  },
  6_9: {
    50: {
      5000: [ResistanceLevel.I, HazardClass.C0],
      4000: [ResistanceLevel.II, HazardClass.C0],
    },
    28: {
      1200: [ResistanceLevel.II, HazardClass.C1],
    },
  },
  10_16: {
    50: {
      2500: [ResistanceLevel.I, HazardClass.C0],
      2200: [ResistanceLevel.II, HazardClass.C0],
    },
  },
};

const Dictionary = {
  [Question.AbovegroundFloors]: {
    1: '1 этаж',
    2: '2 этажа',
    3: '3 этажа',
    4_5: '4-5 этажей',
    6_9: '6-9 этажей',
    10_16: '10-16 этажей',
  },
  [Question.Height]: {
    50: 'до 50',
    28: 'до 28',
    15: 'до 15',
    12: 'до 12',
    9: 'до 9',
    6: 'до 6',
  },
  [Question.FireCompartmentFloorArea]: {
    6000: 'до 6000',
    5000: 'до 5000',
    4000: 'до 4000',
    3000: 'до 3000',
    2000: 'до 2000',
    1400: 'до 1400',
    1200: 'до 1200',
    1000: 'до 1000',
    900: 'до 900',
    800: 'до 800',
    500: 'до 500',
  },
};

export const f1 = {
    Questions,
    Data,
    Dictionary
}

