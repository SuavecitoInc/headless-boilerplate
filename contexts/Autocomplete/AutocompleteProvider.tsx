import React, { useState, useMemo } from 'react';
import { AutocompleteContext } from './context';

type Props = {
  children: React.ReactNode;
  instance: React.ReactNode;
};

const AutocompleteProvider: React.FC<Props> = ({ children, instance }) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const memoizedValue = useMemo(
    () => ({ showSearch, setShowSearch, instance }),
    [showSearch, setShowSearch, instance]
  );

  return (
    <AutocompleteContext.Provider value={memoizedValue}>
      {children}
    </AutocompleteContext.Provider>
  );
};

export default AutocompleteProvider;
