import { LabeledValue } from 'antd/es/select';

export type TFeatures = {
  type: string;
  geometry: {
    coordinates: [string, string];
    type: string;
  };
  properties: {
    country: string;
    contrycode: string;
    extent: string[];
    name: string;
    street: string;
    housenumber?: string;
    city: string;
    osm_id: string;
  };
};

export type Props = {
  defaultValue?: LabeledValue[];
  onSelect?: (value: LabeledValue[]) => void;
};
