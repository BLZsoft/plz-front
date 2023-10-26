import { f112GeneralPreschoolInstitutions } from './f1/1.12-general-preschool-institutions';
import { f113DormitoryBuildingsOfBoardingSchool } from './f1/1.13-dormitory-buildings-boarding-schools';
import { f13LivingHouse } from './f1/1.3-living-house';
import { f1 } from './f1/default';
import { f21 } from './f2/2.1';
import { f22 } from './f2/2.2';
import { f2 } from './f2/default';
import { f31TradeEnterprises } from './f3/3.1-trade-enterprises';
import { f35ConsumerServiceEnterprises } from './f3/3.5-consumer-service-enterprises';
import { f3 } from './f3/default';
import { f41Schools } from './f4/4.1-schools';
import { f4 } from './f4/default';
import { f52 } from './f5/5.2';
import { f521UndergroundParking } from './f5/5.21-underground-parking copy';
import { f522AbovegroundParkingClosed } from './f5/5.22-aboveground-parking-closed';
import { f523AbovegroundParkingOpened } from './f5/5.23-aboveground-parking-opened';
import { f524LumberWarehouse } from './f5/5.24-lumber-warehouse';
import { f53 } from './f5/5.3';
import { f5 } from './f5/default';
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
  // Ф3
  '3.1': f31TradeEnterprises,
  '3.2': f3,
  '3.3': f3,
  '3.4': f3,
  '3.5': f35ConsumerServiceEnterprises,
  '3.6': f3,
  '3.7': f3,
  // Ф4
  '4.1': f41Schools,
  '4.2': f4,
  '4.3': f4,
  '4.4': f4,
  // Ф5
  '5.1': f5,
  '5.2': f52,
  '5.21': f521UndergroundParking,
  '5.22': f522AbovegroundParkingClosed,
  '5.23': f523AbovegroundParkingOpened,
  '5.24': f524LumberWarehouse,
  '5.3': f53,
};
