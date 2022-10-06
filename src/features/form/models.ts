export type FormFields = {
  lastName: HTMLInputElement;
  firstName: HTMLInputElement;
  birthday: HTMLInputElement;
  country: HTMLSelectElement;
  avatar: HTMLInputElement;
  agreement: HTMLInputElement;
  notifications: HTMLInputElement;
};

export type FormCardType = {
  firstName: string;
  lastName: string;
  birthday: string;
  country: string;
  avatar: FileList | null;
  agreement: boolean;
  notifications: boolean;
};

export enum UserInput {
  LAST_NAME = 'lastName',
  FIRST_NAME = 'firstName',
  BIRTHDAY = 'birthday',
  COUNTRY = 'country',
  AVATAR = 'avatar',
  AGREEMENT = 'agreement',
}