// eslint-disable-next-line filename-rules/match
import { FieldSelect } from '~/shared/forms/fields';

import { Question, QuestionComponent } from '../types';

export const QuestionAbovegroundFloors: QuestionComponent = ({
  label = 'Количество надземных этажей',
  placeholder = '3',
  ...props
}) => <FieldSelect name={Question.AbovegroundFloors} label={label} placeholder={placeholder} {...props} />;
