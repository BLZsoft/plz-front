import { FC, useMemo } from 'react';

import { useFormContext } from 'react-hook-form';

import { Question } from '../model/questions';
import { FieldsDefinition } from '../model/questions-by-f-classification/types';

type Props = {
  fields: FieldsDefinition;
};

export const Result: FC<Props> = ({ fields }) => {
  const form = useFormContext();
  const answers = form.watch();

  const result = useMemo(() => {
    try {
      return fields._getResult(answers as Record<Question, string | number>);
    } catch (e) {
      return null;
    }
  }, [fields, answers]);

  const resistanceLevel = useMemo(() => {
    if (!result) return null;
    const value = result[0];
    return Array.isArray(value) ? value.join(', ') : value;
  }, [result]);

  const hazardClass = useMemo(() => {
    if (!result) return null;
    const value = result[1];
    return Array.isArray(value) ? value.join(', ') : value;
  }, [result]);

  return (
    <div className="flex flex-col">
      {resistanceLevel && (
        <span>
          <b>Resistance Level:</b> {resistanceLevel}
        </span>
      )}
      {hazardClass && (
        <span>
          <b>Hazard Class:</b> {hazardClass}
        </span>
      )}
    </div>
  );
};
