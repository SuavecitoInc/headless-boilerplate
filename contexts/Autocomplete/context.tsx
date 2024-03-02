import { createContext } from 'react';
import { AutocompleteContextType } from './types';

const defaultContext: AutocompleteContextType = {
  showSearch: false,
  setShowSearch: () => {},
  instance: null,
};

export const AutocompleteContext =
  createContext<AutocompleteContextType>(defaultContext);
export default AutocompleteContext;
