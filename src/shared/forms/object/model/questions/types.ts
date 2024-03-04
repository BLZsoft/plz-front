import { ComponentType } from 'react';

export enum Question {
  Address = 'address',
  AbovegroundFloors = 'abovegroundFloors',
  FireCompartmentFloorArea = 'fireCompartmentFloorArea',
  Height = 'height',
  Width = 'width',
  Category = 'category',
  Volume = 'volume',
  UndergroundFloors = 'undergroundFloors',
  GroundFloorArea = 'groundFloorArea',
  TotalSalesArea = 'totalSalesArea',
  IsUndergroundSalesArea = 'isUndergroundSalesArea',
  SalesArea = 'salesArea',
  IsDinningRoomInBasement = 'isDinningRoomInBasement',
  NumberOfVisitors = 'numberOfVisitors',
  HasSalesRoomWithoutNaturalLight = 'hasSalesRoomWithoutNaturalLight',
}

export type CommonProps = {
  label: string;
  placeholder?: string;
  description?: string;
};

export type QuestionComponent<P = Record<string, unknown>> = ComponentType<CommonProps & P>;
