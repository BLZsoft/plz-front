import { ElementType, HTMLProps, ReactNode } from 'react';

import { DaDataSuggestion, HttpCache } from 'react-dadata';

// https://github.com/vitalybaev/react-dadata#%D0%BE%D0%B1%D1%89%D0%B8%D0%B5-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B
export interface CommonProps<SuggestionType> {
  token: string;
  value?: DaDataSuggestion<SuggestionType>;
  url?: string;
  defaultQuery?: string;
  autoload?: boolean;
  delay?: number;
  count?: number;
  onChange?: (suggestion?: DaDataSuggestion<SuggestionType>) => void;
  inputProps?: HTMLProps<HTMLInputElement>;
  hintText?: ReactNode;
  renderOption?: (suggestion: DaDataSuggestion<SuggestionType>, inputValue: string) => ReactNode;
  containerClassName?: string;
  suggestionsClassName?: string;
  suggestionClassName?: string;
  currentSuggestionClassName?: string;
  hintClassName?: string;
  highlightClassName?: string;
  minChars?: number;
  customInput?: ElementType;
  selectOnBlur?: boolean;
  uid?: string;
  httpCache?: boolean | HttpCache;
  httpCacheTtl?: number;
}
