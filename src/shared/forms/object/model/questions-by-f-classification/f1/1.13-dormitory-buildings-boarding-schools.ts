// eslint-disable-next-line filename-rules/match
import { HazardClass, ResistanceLevel } from '~/shared/types';

import { Question } from '../../questions';

export const Questions = [Question.Visitors, Question.AbovegroundFloors, Question.Height];

// Visitors -> AbovegroundFloors -> Height -> ResistanceLevel & HazardClass
export const Data = {
  40: {
    1: {
      3: [ResistanceLevel.NotNormative, HazardClass.NotNormative],
    },
  },
  80: {
    1: {
      3: [ResistanceLevel.IV, [HazardClass.C1, HazardClass.C2, HazardClass.C3]],
    },
  },
  140: {
    1: {
      3: [ResistanceLevel.IV, HazardClass.C0],
    },
  },
  200: {
    1: {
      3: [ResistanceLevel.III, HazardClass.C1],
    },
  },
  280: {
    2: {
      7: [ResistanceLevel.III, HazardClass.C0],
    },
  },
  // 0 - NotNormative
  0: {
    4: {
      15: [[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0],
    },
  },
};

export const Dictionary = {
  [Question.Visitors]: {
    40: 'до 40',
    80: 'до 80',
    140: 'до 140',
    200: 'до 200',
    280: 'до 280',
    0: 'свыше 280',
  },
  [Question.AbovegroundFloors]: {
    1: '1 этаж',
    2: '2 этажа',
    4: '4 этажа',
  },
  [Question.Height]: {
    3: 'до 3 м.',
    7: 'до 7 м.',
    15: 'до 15 м.',
  },
};

export const f113DormitoryBuildingsOfBoardingSchool = {
  Questions,
  Data,
  Dictionary,
};
