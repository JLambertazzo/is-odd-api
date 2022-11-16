import { ObjectId } from "mongodb";
import { EvenOddResult } from "../entities/evenOdd";

export interface UserDoc {
  username: string;
  createdAt: Date;
}

export interface Record {
  at: Date;
  target: number;
  result: EvenOddResult;
  userId: ObjectId;
}
