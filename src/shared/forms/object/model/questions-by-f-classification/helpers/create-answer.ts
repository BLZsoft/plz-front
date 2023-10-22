import { HazardClass, ResistanceLevel } from '~/shared/types';

type Input = [ResistanceLevel | ResistanceLevel[], HazardClass | HazardClass[]];

export function createAnswer(input: Input) {
  return input;
}
