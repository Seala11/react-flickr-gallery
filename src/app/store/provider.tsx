import React, { useMemo, useState } from 'react';
import AppContext, { FormCardType } from './context';

export interface IAppProvider {
  children: React.ReactElement[] | React.ReactElement;
}

const AppProvider = ({ children }: IAppProvider) => {
  const [formCards, setFormCards] = useState<FormCardType[]>([]);

  const providerValue = useMemo(
    () => ({
      formCards: formCards,
      setFormCards: setFormCards,
    }),
    [formCards]
  );
  return <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>;
};

export default AppProvider;
