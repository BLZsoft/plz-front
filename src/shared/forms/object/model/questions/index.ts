import {
  QuestionAbovegroundFloors,
  QuestionAddress,
  QuestionCategory,
  QuestionFireCompartmentFloorArea,
  QuestionHeight,
  QuestionVisitors,
} from './components';
import { Question } from './types';

export const questionsMap = {
  [Question.Address]: QuestionAddress,
  [Question.AbovegroundFloors]: QuestionAbovegroundFloors,
  [Question.FireCompartmentFloorArea]: QuestionFireCompartmentFloorArea,
  [Question.Height]: QuestionHeight,
  [Question.Category]: QuestionCategory,
  [Question.Visitors]: QuestionVisitors,
};

export { Question };
