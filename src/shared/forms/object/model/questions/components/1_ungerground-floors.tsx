// eslint-disable-next-line filename-rules/match
import { FieldSelect } from '~/shared/forms/fields';

import { Question, QuestionComponent } from '../types';

export const QuestionUndergroundFloors: QuestionComponent = ({
  label = 'Количество подземных этажей',
  placeholder = 'Выберите значение...',
  ...props
}) => <FieldSelect name={Question.UndergroundFloors} label={label} placeholder={placeholder} {...props} />;
