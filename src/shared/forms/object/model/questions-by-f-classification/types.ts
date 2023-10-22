import { Question } from '../questions';

type Value = string | number;

export type FieldDefinition<T = Value> = {
  getOptions: (dependsOn: Record<Question, Value>) => T[] | null;
  getLabel: (option: T, dependsOn: Record<Question, Value>) => string;
  getShouldRender?: (dependsOn: Record<Question, Value>) => boolean;
  dependsOn?: Question[];
};

export type FieldsDefinition = Partial<Record<Question, FieldDefinition>>;
