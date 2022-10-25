import { createContext } from 'react';
import { FormAction, FormState, initialFormState } from './formPageReducer';

export interface IAppContext {
  formCards: FormState;
  setFormCards: React.Dispatch<FormAction>;
}

export const defaultContext = {
  formCards: initialFormState,
  setFormCards: () => {},
};

const AppContext = createContext<IAppContext>(defaultContext);

export default AppContext;
