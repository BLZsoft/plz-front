// eslint-disable-next-line filename-rules/match
import { HazardClass, ResistanceLevel } from '~/shared/types';

import { Question } from '../../questions';

export const Questions = [Question.Visitors, Question.AbovegroundFloors, Question.Height];

// Visitors -> AbovegroundFloors -> Height -> ResistanceLevel & HazardClass
export const Data = {
  50: {
    1: {
      3: [ResistanceLevel.III, HazardClass.C1],
    },
  },
  100: {
    2: {
      6: [ResistanceLevel.III, [HazardClass.C0, HazardClass.C1]],
    },
  },
  150: {
    2: {
      6: [ResistanceLevel.II, [HazardClass.C0, HazardClass.C1]],
    },
  },
  350: {
    3: {
      9: [ResistanceLevel.II, HazardClass.C0],
    },
  },
};

const Dictionary = {
  [Question.Visitors]: {
    50: 'до 50',
    100: 'до 100',
    150: 'до 150',
    350: 'до 350',
  },
  [Question.AbovegroundFloors]: {
    1: '1 этаж',
    2: '2 этажа',
    3: '3 этажа',
  },
  [Question.Height]: {
    3: 'до 3 м.',
    6: 'до 6 м.',
    9: 'до 9 м.',
  }
};

export const f112GeneralPreschoolInstitutions = {
  Questions,
  Data,
  Dictionary,
};
