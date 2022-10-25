import { createContext } from 'react';
import { FormAction, FormCardType, FormState } from './formPageReducer';

export interface IAppContext {
  formCards: FormState;
  setFormCards: React.Dispatch<FormAction>;
}

const defaultContext = {
  formCards: <FormCardType[]>[],
  setFormCards: () => {},
};

const AppContext = createContext<IAppContext>(defaultContext);

export default AppContext;
