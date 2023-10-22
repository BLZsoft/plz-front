import { f112GeneralPreschoolInstitutions } from './f1/1.12-general-preschool-institutions';
import { f113DormitoryBuildingsOfBoardingSchool } from './f1/1.13-dormitory-buildings-boarding-schools';
import { f13LivingHouse } from './f1/1.3-living-house';
import { f1 } from './f1/default';
import { f21 } from './f2/2.1';
import { f22 } from './f2/2.2';
import { f2 } from './f2/default';
import { FieldsDefinition } from './types';

export const F_TO_FIELDS: Record<string, FieldsDefinition> = {
  // Ф1
  '1.1': f1,
  '1.12': f112GeneralPreschoolInstitutions,
  '1.13': f113DormitoryBuildingsOfBoardingSchool,
  '1.2': f1,
  '1.3': f13LivingHouse,
  '1.4': f1,
  // Ф2
  '2.1': f21,
  '2.2': f22,
  '2.3': f2,
  '2.4': f2,
};
