interface IStorage {
  [key: string]: string | null;
}

let store: IStorage = {};
export const mockLocalStorage = {
  getItem: (key: string): string | null => {
    return store[key] ? store[key] : null;
  },
  setItem: (key: string, value: string) => {
    store[key] = `${value}`;
  },
  removeItem: (key: string) => {
    delete store[key];
  },
  clear: () => {
    store = {};
  },
};
