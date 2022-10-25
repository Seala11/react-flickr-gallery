import React, { useMemo, useReducer } from 'react';
import AppContext from './context';
import { formPageReducer } from './formPageReducer';

export interface IAppProvider {
  children: React.ReactElement[] | React.ReactElement;
}

const AppProvider = ({ children }: IAppProvider) => {
  const [formCards, setFormCards] = useReducer(formPageReducer, []);

  const providerValue = useMemo(
    () => ({
      formCards,
      setFormCards,
    }),
    [formCards, setFormCards]
  );

  return <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>;
};

export default AppProvider;
