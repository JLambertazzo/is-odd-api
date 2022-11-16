import { evaluate } from "../entities/evenOdd";
import { User } from "../entities/users";
import * as Storage from "./ioc";

export const createUser = async (user: User) => {
  try {
    return await Storage.createUser(user);
  } catch (err) {
    console.log("Unexpected Error Creating User", err);
    return null;
  }
};

export const getUser = async (username: string) => {
  try {
    return await Storage.getUser(username);
  } catch (err) {
    console.log("Unexpected Error Fetching User", err);
    return null;
  }
};

export const calculate = async (username: string, target: number) => {
  const calculation = evaluate(target);
  try {
    await Storage.createCalculation(username, calculation);
  } catch (err) {
    console.log("Unexpected Error Running Calculation");
    return null;
  }
  return calculation.result;
};
