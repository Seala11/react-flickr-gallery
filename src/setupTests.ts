// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom';

interface IStorage {
  [key: string]: string | null;
}

let store: IStorage = {};
const mockLocalStorage = {
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

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});
