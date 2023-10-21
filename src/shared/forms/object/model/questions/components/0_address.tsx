// eslint-disable-next-line filename-rules/match
import { FieldAddressInput } from '~/shared/forms/fields';

import { Question, QuestionComponent } from '../types';

export const QuestionAddress: QuestionComponent = ({
  label = 'Адрес объекта',
  placeholder = 'ул. Пушкина д. 12',
  ...props
}) => <FieldAddressInput name={Question.Address} label={label} placeholder={placeholder} {...props} />;
