export const pickOne = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const pickMany = <T>(arr: T[], amount: number): T[] => {
  const result: T[] = [];

  for (let i = 0; i < amount; i++) {
    result.push(pickOne(arr));
  }

  return result;
};
