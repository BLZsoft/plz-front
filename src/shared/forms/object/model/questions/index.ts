import {
  QuestionAbovegroundFloors,
  QuestionAddress,
  QuestionCategory,
  QuestionFireCompartmentFloorArea,
  QuestionHeight,
  QuestionUndergroundFloors,
  QuestionVisitors,
} from './components';
import { Question } from './types';

export const questionsMap = {
  [Question.Address]: QuestionAddress,
  [Question.AbovegroundFloors]: QuestionAbovegroundFloors,
  [Question.UndergroundFloors]: QuestionUndergroundFloors,
  [Question.FireCompartmentFloorArea]: QuestionFireCompartmentFloorArea,
  [Question.Height]: QuestionHeight,
  [Question.Category]: QuestionCategory,
  [Question.NumberOfVisitors]: QuestionVisitors,
};

export { Question };
