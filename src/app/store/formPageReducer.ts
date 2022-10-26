export type FormCardType = {
  firstName: string;
  lastName: string;
  birthday: string;
  country: string;
  avatar: FileList | File | null;
  agreement: boolean;
  notifications: boolean;
};

export enum FormProviderActions {
  ADD = 'add new form',
  CHANGE_INPUT_VALUES = 'change values',
  RESET = 'reset all inputs',
  DISABLE_BTN = 'disable submit button',
  ENABLE_BTN = 'enable submit button',
}

export const defaultValues = {
  firstName: '',
  lastName: '',
  birthday: '',
  country: '---',
  agreement: false,
  notifications: false,
  avatar: null,
};

type InputValuesType = {
  firstName: string;
  lastName: string;
  birthday: string;
  country: string;
  agreement: boolean;
  notifications: boolean;
  avatar: FileList | File | null;
};

export type FormState = {
  cards: FormCardType[];
  inputValues: InputValuesType;
  btnDisable: boolean;
};

export type FormAction =
  | { type: FormProviderActions.ADD; formCard: FormCardType }
  | { type: FormProviderActions.CHANGE_INPUT_VALUES; values: InputValuesType }
  | { type: FormProviderActions.DISABLE_BTN }
  | { type: FormProviderActions.ENABLE_BTN }
  | { type: FormProviderActions.RESET };

export const formPageReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case FormProviderActions.ADD:
      const newState = [...state.cards, action.formCard];
      return { ...state, cards: newState };

    case FormProviderActions.CHANGE_INPUT_VALUES:
      return { ...state, inputValues: action.values };

    case FormProviderActions.RESET:
      return {
        ...state,
        inputValues: defaultValues,
      };

    case FormProviderActions.DISABLE_BTN:
      return {
        ...state,
        btnDisable: true,
      };

    case FormProviderActions.ENABLE_BTN:
      return {
        ...state,
        btnDisable: false,
      };

    default:
      return state;
  }
};

export const initialFormState: FormState = {
  cards: [],
  inputValues: defaultValues,
  btnDisable: true,
};
