import { createContext } from 'react';
import { FormAction } from './provider';

export type FormCardType = {
  firstName: string;
  lastName: string;
  birthday: string;
  country: string;
  avatar: FileList | File | null;
  agreement: boolean;
  notifications: boolean;
};

export interface IAppContext {
  formCards: FormCardType[];
  setFormCards: React.Dispatch<FormAction>;
}

const defaultContext = {
  formCards: <FormCardType[]>[],
  setFormCards: () => {},
};

const AppContext = createContext<IAppContext>(defaultContext);

export default AppContext;
