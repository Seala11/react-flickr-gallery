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
}

const API_KEY = 'd1743560a339c2a8d5327c0466b8874b';

export const requestData = {
  method: 'flickr.photos.search',
  api_key: API_KEY,
  text: 'cats',
  sort: '',
  per_page: '',
  license: '4',
  extras: 'owner_name, license',
  format: 'json',
  nojsoncallback: '1',
  safe_search: '1',
};

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
