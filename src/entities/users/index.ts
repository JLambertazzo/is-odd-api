import { Calculation } from "../evenOdd";

export declare interface User {
  username: string;
  history: Calculation[];
}

export const newUser = (username: string): User => ({
  username,
  history: [],
});

export const addToHistory = (user: User, calculation: Calculation) => ({
  ...user,
  history: user.history.concat(calculation),
});

export const clearHistory = (user: User) => ({
  ...user,
  history: [],
});
