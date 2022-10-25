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
  ADD = 'add',
}

export type FormState = FormCardType[];

export type FormAction = { type: FormProviderActions.ADD; formCard: FormCardType };

export const formPageReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case FormProviderActions.ADD:
      const newState = [...state, action.formCard];
      return newState;
    default:
      return [...state];
  }
};
