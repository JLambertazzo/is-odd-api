import { ObjectId } from "mongodb";
import * as db from "../driven";
import { Calculation } from "../entities/evenOdd";
import { User } from "../entities/users";

export interface IStorage {
  createUser: (user: User) => Promise<ObjectId>;
  getUser: (username: string) => Promise<User>;
  createCalculation: (username: string, calc: Calculation) => Promise<ObjectId>;
}

export const createUser: IStorage["createUser"] = db.createUser;
export const getUser: IStorage["getUser"] = db.getUserEntity;
export const createCalculation: IStorage["createCalculation"] = db.insertRecord;
