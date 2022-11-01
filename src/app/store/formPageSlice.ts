import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type FormCardType = {
  firstName: string;
  lastName: string;
  birthday: string;
  country: string;
  avatar: FileList | File | null;
  agreement: boolean;
  notifications: boolean;
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

export interface FormState {
  cards: FormCardType[];
  inputValues: InputValuesType;
  btnDisable: boolean;
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

const initialState: FormState = {
  cards: [],
  inputValues: defaultValues,
  btnDisable: true,
};

export const formPageSlice = createSlice({
  name: 'formPage',
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<FormCardType>) => {
      const newState = [...state.cards, action.payload];
      state.cards = newState;
    },
    changeInputValues: (state, action: PayloadAction<InputValuesType>) => {
      state.inputValues = action.payload;
    },
    resetInputValues: (state) => {
      state.inputValues = defaultValues;
    },
    disableBtn: (state) => {
      state.btnDisable = true;
    },
    enableBtn: (state) => {
      state.btnDisable = false;
    },
  },
});

export const { addForm, changeInputValues, resetInputValues, disableBtn, enableBtn } =
  formPageSlice.actions;

export default formPageSlice.reducer;
