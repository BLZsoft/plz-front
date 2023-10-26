// TODO: DUPLICATES DEFAULT OF "F3" (SP2 table 6.9)
// eslint-disable-next-line filename-rules/match
import { HazardClass, ResistanceLevel } from '~/shared/types';

import { Question } from '../../questions';
import { createAnswer } from '../helpers/create-answer';
import { FieldsDefinition } from '../types';

const Data = {
  1: {
    1200: createAnswer([ResistanceLevel.IV, [HazardClass.C2, HazardClass.C3]]),
    3600: createAnswer([ResistanceLevel.III, HazardClass.C1]),
    5200: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C1]),
    7800: createAnswer([ResistanceLevel.III, HazardClass.C0]),
    10400: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
  },
  2: {
    1200: createAnswer([ResistanceLevel.III, HazardClass.C1]),
    2000: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C1]),
  },
  // до 5
  3: {
    3600: createAnswer([ResistanceLevel.III, HazardClass.C0]),
  },
  // до 9
  6: {
    5200: createAnswer([[ResistanceLevel.I, ResistanceLevel.II], HazardClass.C0]),
  },
};

export const f522AbovegroundParkingClosed: FieldsDefinition = {
  [Question.AbovegroundFloors]: {
    getOptions: () => Object.keys(Data),
    getLabel: (o) => {
      if (o === '3') return `от 3 до 5 э.`;
      if (o === '6') return `от 6 до 9 э.`;
      return `${o} э.`;
    },
  },
  [Question.FireCompartmentFloorArea]: {
    getOptions: ({ abovegroundFloors }) => Object.keys(Data[abovegroundFloors] ?? {}),
    getLabel: (o) => `до ${o} кв. м.`,
    getShouldRender: ({ abovegroundFloors }) => !!abovegroundFloors,
    dependsOn: [Question.AbovegroundFloors],
  },
  _getResult: ({
    abovegroundFloors,
    fireCompartmentFloorArea,
  }): [ResistanceLevel | ResistanceLevel[], HazardClass | HazardClass[]] | null =>
    Data[abovegroundFloors][fireCompartmentFloorArea],
};
