import get from 'lodash/get';

import { Question } from '../questions';

import { f112GeneralPreschoolInstitutions } from './f1/1.12-general-preschool-institutions';
import { f113DormitoryBuildingsOfBoardingSchool } from './f1/1.13-dormitory-buildings-boarding-schools';
import { f13LivingHouse } from './f1/1.3-living-house';
import { f1 } from './f1/default';

export type FormQuestions = {
  Questions: Question[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Data: Record<string, any>;
  Dictionary: Partial<Record<Question, Record<string | number, string>>>;
};

export const F_TO_QUESTIONS: Record<string, FormQuestions> = {
  '1.1': f1,
  '1.12': f112GeneralPreschoolInstitutions,
  '1.13': f113DormitoryBuildingsOfBoardingSchool,
  '1.2': f1,
  '1.3': f13LivingHouse,
  '1.4': f1,
};

export function getOptionsByPrevious(
  formQuestions: Pick<FormQuestions, 'Data' | 'Questions'>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answers: Record<Question, any>,
) {
  const { Questions, Data } = formQuestions;

  const path: string[] = [];

  for (const question of Questions) {
    const answer = answers[question];

    if (!answer) {
      break;
    }

    path.push(answer);
  }

  if (!path.length) {
    return Object.keys(Data);
  }

  console.log('path:', path.join('.'));
  console.log('result:', get(Data, path.join('.')));

  return Object.keys(get(Data, path.join('.')));
}
