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
  CHANGE_FIRST_NAME = 'change firts name',
  CHANGE_LAST_NAME = 'change last name',
  CHANGE_BIRTHDAY = 'change birthday',
  CHANGE_COUNTRY = 'change country',
  CHANGE_AGREEMENT = 'change agreement',
  CHANGE_AVATAR = 'change avatar',
  CHANGE_NOTIFICATIONS = 'change notifications',
  RESET = 'reset all inputs',
}

export type FormState = {
  cards: FormCardType[];
  firstName: string;
  lastName: string;
  birthday: string;
  country: string;
  agreement: boolean;
  notifications: boolean;
  avatar: FileList | File | null;
  btnDisable: boolean;
};

export type FormAction =
  | { type: FormProviderActions.ADD; formCard: FormCardType }
  | { type: FormProviderActions.CHANGE_FIRST_NAME; firstName: string }
  | { type: FormProviderActions.CHANGE_LAST_NAME; lastName: string }
  | { type: FormProviderActions.CHANGE_COUNTRY; country: string }
  | { type: FormProviderActions.CHANGE_BIRTHDAY; birthday: string }
  | { type: FormProviderActions.CHANGE_AGREEMENT; agreement: boolean }
  | { type: FormProviderActions.CHANGE_NOTIFICATIONS; notifications: boolean }
  | { type: FormProviderActions.CHANGE_AVATAR; avatar: FileList | null }
  | { type: FormProviderActions.RESET };

export const formPageReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case FormProviderActions.ADD:
      const newState = [...state.cards, action.formCard];
      return { ...state, cards: newState };

    case FormProviderActions.CHANGE_FIRST_NAME:
      return { ...state, btnDisable: false, firstName: action.firstName };

    case FormProviderActions.CHANGE_LAST_NAME:
      return { ...state, btnDisable: false, lastName: action.lastName };

    case FormProviderActions.CHANGE_BIRTHDAY:
      return { ...state, btnDisable: false, birthday: action.birthday };

    case FormProviderActions.CHANGE_COUNTRY:
      return { ...state, btnDisable: false, country: action.country };

    case FormProviderActions.CHANGE_AVATAR:
      return { ...state, btnDisable: false, avatar: action.avatar };

    case FormProviderActions.CHANGE_AGREEMENT:
      return { ...state, btnDisable: false, agreement: action.agreement };

    case FormProviderActions.CHANGE_NOTIFICATIONS:
      return { ...state, btnDisable: false, notifications: action.notifications };

    case FormProviderActions.RESET:
      return {
        ...state,
        firstName: '',
        lastName: '',
        birthday: '',
        country: '',
        agreement: false,
        notifications: false,
        avatar: null,
        btnDisable: true,
      };

    default:
      return state;
  }
};

export const initialFormState: FormState = {
  cards: [],
  firstName: '',
  lastName: '',
  birthday: '',
  country: '',
  agreement: false,
  notifications: false,
  avatar: null,
  btnDisable: true,
};
