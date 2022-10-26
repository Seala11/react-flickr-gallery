import { createContext } from 'react';
import { FormAction, FormState, initialFormState } from './formPageReducer';
import { initialSearchState, SearchAction, SearchState } from './searchPageReducer';

export interface IAppContext {
  formPageState: FormState;
  formPageDispatch: React.Dispatch<FormAction>;
  homePageState: SearchState;
  homePageDispatch: React.Dispatch<SearchAction>;
}

export const defaultContext = {
  formPageState: initialFormState,
  formPageDispatch: () => {},
  homePageState: initialSearchState,
  homePageDispatch: () => {},
};

const AppContext = createContext<IAppContext>(defaultContext);

export default AppContext;
