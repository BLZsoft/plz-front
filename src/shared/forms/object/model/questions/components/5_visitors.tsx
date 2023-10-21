// eslint-disable-next-line filename-rules/match
import { FieldSelect } from '~/shared/forms/fields';

import { Question, QuestionComponent } from '../types';

export const QuestionVisitors: QuestionComponent = ({
  label = 'Число посетителей (мест), чел.',
  placeholder = 'Выберите значение',
  ...props
}) => <FieldSelect name={Question.Visitors} label={label} placeholder={placeholder} {...props} />;
