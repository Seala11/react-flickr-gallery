import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { FormCardType, FormState, InputValuesType } from './types';

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

export const formPageSelector = (state: RootState) => state.formPage;

export default formPageSlice.reducer;
