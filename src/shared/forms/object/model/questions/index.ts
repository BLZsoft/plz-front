import {
  QuestionAbovegroundFloors,
  QuestionAddress,
  QuestionCategory,
  QuestionFireCompartmentFloorArea,
  QuestionHeight,
  QuestionVisitors,
} from './components';
import { hocs } from './hocs';
import { Question, QuestionComponent } from './types';

export const questionsMap = withHocs({
  [Question.Address]: QuestionAddress,
  [Question.AbovegroundFloors]: QuestionAbovegroundFloors,
  [Question.FireCompartmentFloorArea]: QuestionFireCompartmentFloorArea,
  [Question.Height]: QuestionHeight,
  [Question.Category]: QuestionCategory,
  [Question.Visitors]: QuestionVisitors,
});

function withHocs<T extends Record<string, QuestionComponent>>(map: T): T {
  return Object.entries(map).reduce((acc, [key, value]) => {
    acc[key as keyof T] = hocs(value);
    return acc;
  }, {} as T);
}

export { Question };
