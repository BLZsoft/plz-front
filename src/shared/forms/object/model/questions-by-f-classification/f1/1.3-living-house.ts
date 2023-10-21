// eslint-disable-next-line filename-rules/match
import { HazardClass, ResistanceLevel } from '~/shared/types';

import { Question } from '../../questions';

export const Questions = [Question.Height, Question.FireCompartmentFloorArea];

// Height -> FireCompartmentFloorArea -> ResistanceLevel & HazardClass
export const Data = {
  75: {
    2500: [ResistanceLevel.I, HazardClass.C0],
  },
  50: {
    2500: [ResistanceLevel.II, HazardClass.C0],
  },
  28: {
    2200: [ResistanceLevel.II, HazardClass.C1],
    1800: [ResistanceLevel.III, HazardClass.C0],
  },
  15: {
    1800: [ResistanceLevel.III, HazardClass.C1],
  },
  5: {
    1000: [ResistanceLevel.IV, HazardClass.C0],
    800: [ResistanceLevel.IV, HazardClass.C1],
    500: [ResistanceLevel.IV, HazardClass.C2],
  },
  3: {
    1400: [ResistanceLevel.IV, HazardClass.C0],
    1200: [ResistanceLevel.IV, HazardClass.C1],
    900: [ResistanceLevel.IV, HazardClass.C2],
    800: [ResistanceLevel.V, HazardClass.NotNormative],
  },
};

const Dictionary = {
  [Question.Height]: {
    75: 'до 75',
    50: 'до 50',
    28: 'до 28',
    15: 'до 15',
    5: 'до 5',
    3: 'до 3',
  },
  [Question.FireCompartmentFloorArea]: {
    2500: 'до 2500',
    2200: 'до 2200',
    1800: 'до 1800',
    1400: 'до 1400',
    1200: 'до 1200',
    1000: 'до 1000',
    900: 'до 900',
    800: 'до 800',
    500: 'до 500',
  }
};

export const f13LivingHouse = {
  Questions,
  Data,
  Dictionary
};
