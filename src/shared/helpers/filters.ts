export const filterByName = (name: string, value: string): RegExpMatchArray | null => {
  const test = new RegExp(`${value.replace(/\s/g, '')}`);
  const result = name.replace(/\s/g, '').toLowerCase().match(test);
  return result;
};
