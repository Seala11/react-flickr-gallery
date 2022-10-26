import { createContext } from 'react';
import { FormAction, FormState, initialFormState } from './formPageReducer';

export interface IAppContext {
  formPageState: FormState;
  formPageDispatch: React.Dispatch<FormAction>;
}

export const defaultContext = {
  formPageState: initialFormState,
  formPageDispatch: () => {},
};

const AppContext = createContext<IAppContext>(defaultContext);

export default AppContext;
