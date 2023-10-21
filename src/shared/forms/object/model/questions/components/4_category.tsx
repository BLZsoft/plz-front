// eslint-disable-next-line filename-rules/match
import { FieldSelect } from '~/shared/forms/fields';

import { Question, QuestionComponent } from '../types';

export const QuestionCategory: QuestionComponent = ({
  label = 'Категория по взрывопожарной или пожарной опасности',
  ...props
}) => <FieldSelect name={Question.Category} label={label} {...props} />;
