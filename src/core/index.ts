import { evaluate } from "../entities/evenOdd";
import { addToHistory, User } from "../entities/users";

export const runCalculation = (user: User, target: number) => {
  const calculation = evaluate(target);
  const updatedUser = addToHistory(user, calculation);
  return { calculation, user: updatedUser };
};
