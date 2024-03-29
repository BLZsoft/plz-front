// eslint-disable-next-line filename-rules/match
import { FieldSelect } from '~/shared/forms/fields';

import { Question, QuestionComponent } from '../types';

export const QuestionHeight: QuestionComponent = ({
  label = 'Высота здания, м',
  placeholder = 'Выберите значение...',
  description = 'Высота производственных и складских зданий измеряется от пола 1-го этажа до потолка верхнего этажа, включая технический; при переменной высоте потолка принимается средняя высота этажа. Для остальных зданий,  высота определяется высотой расположения верхнего этажа, не считая верхнего технического этажа, а высота расположения этажа определяется разностью отметок поверхности проезда для пожарных машин и нижней границы открывающегося проема (окна) в наружной стене. При отсутствии открывающихся окон (проемов), высота расположения этажа определяется полусуммой отметок пола и потолка этажа. При наличии эксплуатируемого покрытия, высота здания определяется по максимальному значению разницы отметок поверхности проездов для  пожарных машин и верхней границы ограждений покрытия',
  ...props
}) => (
  <FieldSelect name={Question.Height} label={label} placeholder={placeholder} description={description} {...props} />
);
