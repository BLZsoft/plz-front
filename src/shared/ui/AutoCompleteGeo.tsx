import { FC, useState } from 'react';

import Select, { LabeledValue } from 'antd/es/select';

import { Props } from './types';
import { useSearch } from './useSearch';

export const AutoCompleteGeo: FC<Props> = (props) => {
  const [value, setValue] = useState<LabeledValue[]>(props.defaultValue ?? []);
  const { loading, options, debouncedSearch } = useSearch();
  const handleSelect = (newValue: LabeledValue) => {
    const updatedValue = [...value, newValue];
    setValue(updatedValue);
    if (props.onSelect) props.onSelect(updatedValue);
  };

  const handleDeselect = (filteredOption: LabeledValue) => {
    const updatedValue = value.filter(({ value }) => value !== filteredOption.value);
    setValue(updatedValue);
    if (props.onSelect) props.onSelect(updatedValue);
  };

  return (
    <Select
      showSearch
      loading={loading}
      filterOption
      value={value}
      optionFilterProp="label"
      style={{ width: '400px' }}
      maxTagTextLength={100}
      size="middle"
      mode="multiple"
      placeholder="Введите часть адреса для поиска"
      onSearch={debouncedSearch}
      options={options}
      onDeselect={handleDeselect}
      onSelect={handleSelect}
    />
  );
};
