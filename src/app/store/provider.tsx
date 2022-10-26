import React, { useMemo, useReducer } from 'react';
import AppContext from './context';
import { formPageReducer, initialFormState } from './formPageReducer';

export interface IAppProvider {
  children: React.ReactElement[] | React.ReactElement;
}

const AppProvider = ({ children }: IAppProvider) => {
  const [formPageState, formPageDispatch] = useReducer(formPageReducer, initialFormState);

  const providerValue = useMemo(
    () => ({
      formPageState,
      formPageDispatch,
    }),
    [formPageState, formPageDispatch]
  );

  return <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>;
};

export default AppProvider;
