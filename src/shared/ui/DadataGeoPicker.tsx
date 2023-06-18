import { FC } from 'react';

import { AddressSuggestions, DaDataAddress, DaDataSuggestion } from 'react-dadata';

import Input from 'antd/es/input/Input';
// import { CreateBuildingDto } from 'services/api';
import { commonConfig } from 'shared/config/common';

import 'react-dadata/dist/react-dadata.css';

type Props = {
  onChange: (v: DaDataSuggestion<DaDataAddress>) => void;
  value: unknown & {
    rawValue: DaDataSuggestion<DaDataAddress>;
  };
};
export const DadataGeoPicker: FC<Partial<Props>> = (props) => {
  return (
    // нужно для интеграции с антовской формой
    // @ts-ignore
    <AddressSuggestions
      autoload
      {...props}
      value={props.value?.rawValue}
      token={commonConfig.dadataApiKey}
      filterLanguage={'ru'}
      filterRestrictValue
      defaultQuery={!props.value?.rawValue ? 'Москва' : undefined}
      httpCache={true}
      customInput={Input}
      delay={300}
    />
  );
};
