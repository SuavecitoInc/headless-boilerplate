'use client';

import React from 'react';
import { Button, IconSearch } from '@/components/ui';
import { useAutocomplete } from '@/contexts/Autocomplete';

const SearchIcon: React.FC = () => {
  const { showSearch, setShowSearch } = useAutocomplete();
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  return (
    <Button isUnstyled onClick={toggleSearch}>
      <IconSearch />
    </Button>
  );
};

export default SearchIcon;
