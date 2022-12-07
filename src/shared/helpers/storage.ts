enum StorageItem {
  SEARCH = 'searchValue',
}

export const getSearchValueFromStorage = () => localStorage.getItem(StorageItem.SEARCH);

export const setSearchValueToStorage = (value: string) =>
  localStorage.setItem(StorageItem.SEARCH, value);
