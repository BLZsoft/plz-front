import { useState } from 'react';

import { LabeledValue } from 'antd/es/select';
import axios from 'axios';
import { nanoid } from 'nanoid';

import { useDebouncedCallback } from '../hooks/useDebouncedCallback';

import { TFeatures } from './types';

type TResponse = {
  features: Array<TFeatures>;
};
export const useSearch = () => {
  const [options, setOptions] = useState<LabeledValue[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get<TResponse>(`https://photon.komoot.io/api/?q=${query}&layer=house`);

      const result: LabeledValue[] = data.features.map((item) => ({
        label: [
          item.properties.country,
          item.properties.city,
          item.properties.street,
          item.properties.housenumber,
          item.properties.name,
        ]
          .filter((v) => !!v)
          .join(', '),
        value: `${nanoid()}-${item.geometry.coordinates[0]}-${item.geometry.coordinates[1]}`,
      }));
      setOptions(result);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebouncedCallback<typeof handleSearch>(handleSearch, [], 300);

  return {
    debouncedSearch,
    options,
    loading,
  };
};
