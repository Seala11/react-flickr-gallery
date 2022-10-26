import React, { useMemo, useReducer } from 'react';
import AppContext from './context';
import { formPageReducer, initialFormState } from './formPageReducer';
import { initialSearchState, searchPageReducer } from './searchPageReducer';

export interface IAppProvider {
  children: React.ReactElement[] | React.ReactElement;
}

const AppProvider = ({ children }: IAppProvider) => {
  const [formPageState, formPageDispatch] = useReducer(formPageReducer, initialFormState);
  const [homePageState, homePageDispatch] = useReducer(searchPageReducer, initialSearchState);

  const providerValue = useMemo(
    () => ({
      formPageState,
      formPageDispatch,
      homePageState,
      homePageDispatch,
    }),
    [formPageState, formPageDispatch, homePageState, homePageDispatch]
  );

  return <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>;
};

export default AppProvider;
