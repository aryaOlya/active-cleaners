export const setUserName = (email: string): string => {
  const atIndex: number = email.indexOf("@");
  return email.slice(0, atIndex);
};

export const idGenerator = (): number => {
  return Math.floor(Math.random() * (999 - 100 + 1)) + 100;
};

export const timeGenerator = (): string => {
  const currentDate = new Date();
  return currentDate.toISOString().slice(0, 19) + "Z";
};
