import { FC, forwardRef } from 'react';

import { AddressSuggestions, DaDataAddress, DaDataAddressBounds } from 'react-dadata';

import { Input } from '~/shared/ui/input';

import { DADATA_API_KEY } from './config';
import { CommonProps } from './types';

import 'react-dadata/dist/react-dadata.css';

// https://github.com/vitalybaev/react-dadata#%D0%B4%D0%BE%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B-%D0%B4%D0%BB%D1%8F-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0-%D0%B0%D0%B4%D1%80%D0%B5%D1%81%D0%BE%D0%B2
type BaseDadataAddressProps = CommonProps<DaDataAddress> & {
  filterLanguage?: 'ru' | 'en';
  filterFromBound?: DaDataAddressBounds;
  filterToBound?: DaDataAddressBounds;
  filterLocations?: Record<string, unknown>[];
  filterLocationsBoost?: Record<string, unknown>[];
  filterRestrictValue?: boolean;
};

type DadataAddressProps = Omit<BaseDadataAddressProps, 'token'>;

export const DadataAddress: FC<DadataAddressProps> = forwardRef<AddressSuggestions, DadataAddressProps>(
  (props, ref) => (
    <AddressSuggestions
      {...props}
      ref={ref}
      token={DADATA_API_KEY}
      filterLanguage={'ru'}
      customInput={Input}
      httpCache={true}
      delay={300}
      autoload
    />
  ),
);
