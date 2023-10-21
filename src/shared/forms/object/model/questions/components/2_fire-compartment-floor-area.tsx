// eslint-disable-next-line filename-rules/match
import { FieldSelect } from '~/shared/forms/fields';

import { Question, QuestionComponent } from '../types';

export const QuestionFireCompartmentFloorArea: QuestionComponent = ({
  label = 'Площадь этажа пожарного отсека, м2',
  placeholder = 'Выберите значение...',
  ...props
}) => <FieldSelect name={Question.FireCompartmentFloorArea} label={label} placeholder={placeholder} {...props} />;
