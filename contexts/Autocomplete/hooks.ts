import { useContext } from 'react';
import { AutocompleteContext } from './context';

export const useAutocomplete = () => useContext(AutocompleteContext);
