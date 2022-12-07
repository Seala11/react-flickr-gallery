// Form Page
export type FormCardType = {
  firstName: string;
  lastName: string;
  birthday: string;
  country: string;
  avatar: FileList | File | null;
  agreement: boolean;
  notifications: boolean;
};

export type InputValuesType = {
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

// Home Page
export type FetchParamsType = {
  value: string;
  sort: string;
  cardsPerPage: string;
  currPage: string;
};

export interface FlickrCard {
  farm: number;
  id: string;
  isfamily: number;
  isfriend: number;
  ispublic: number;
  owner: string;
  secret: string;
  server: string;
  title: string;
  ownername: string;
  iconfarm: number;
  iconserver: string;
  description: {
    _content: string;
  };
  datetaken: string;
  views: string;
  tags: string;
}

export type SearchFetchType = {
  photos: PhotoType;
  stat: string;
};

export type PhotoType = {
  page: number;
  pages: number;
  perpage: number;
  photo: FlickrCard[];
  total: number;
};

export type HomeState = {
  cards: FlickrCard[];
  currPage: number;
  totalPages: number;
  searchValue: string | null;
  sort: string;
  cardsPerPage: string;
  loading: boolean;
  error: string | null;
  scrollPos: number | null;
};
