import React, { useMemo, useReducer } from 'react';
import AppContext, { FormCardType } from './context';

export interface IAppProvider {
  children: React.ReactElement[] | React.ReactElement;
}

export enum FormProviderActions {
  ADD = 'add',
}

type FormState = FormCardType[];

export type FormAction = { type: FormProviderActions.ADD; formCard: FormCardType };

const AppProvider = ({ children }: IAppProvider) => {
  const formCardsReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
      case FormProviderActions.ADD:
        const newState = [...state, action.formCard];
        return newState;
      default:
        return [...state];
    }
  };

  const [formCards, setFormCards] = useReducer(formCardsReducer, []);

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
