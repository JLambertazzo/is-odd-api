import { MongoClient, ObjectId } from "mongodb";
import { Calculation } from "../entities/evenOdd";
import { User } from "../entities/users";
import { Record, UserDoc } from "./types";
const MONGO_URI = "mongodb://root:rootpassword@mongodb";

const client = new MongoClient(MONGO_URI);

client
  .connect()
  .then(() => console.log("MONGO CONNECTED"))
  .catch(() => console.log("Error connecting mongoDB"));

const recordsToHistory = (records: Record[]): Calculation[] =>
  records.map((record) => ({
    at: record.at,
    result: record.result,
    target: record.target,
  }));

export const createUser = async (user: User) => {
  const exists = await getUser(user.username);
  if (exists) {
    throw new Error("Error: Username Taken");
  }
  const userDoc: UserDoc = { username: user.username, createdAt: new Date() };
  const result = await client
    .db("isOdd")
    .collection<UserDoc>("Users")
    .insertOne(userDoc);
  return result.insertedId;
};

export const getUser = (username: string) =>
  client.db("isOdd").collection<UserDoc>("Users").findOne({ username });

export const insertRecord = async (username: string, calc: Calculation) => {
  const userDoc = await getUser(username);
  if (!userDoc) {
    throw new Error("Error: User not found");
  }
  const record: Record = { ...calc, userId: userDoc._id };
  const result = await client
    .db("isOdd")
    .collection<Record>("Records")
    .insertOne(record);
  return result.insertedId;
};

export const getUserRecords = (userId: ObjectId) =>
  client.db("isOdd").collection<Record>("Records").find({ userId }).toArray();

export const getUserEntity = async (username: string): Promise<User> => {
  const userDoc = await getUser(username);
  if (!userDoc) {
    throw new Error("Error: User not found");
  }
  const records = await getUserRecords(userDoc._id);
  if (!records) {
    throw new Error("Error: Records not found");
  }
  return {
    username,
    history: recordsToHistory(records),
  };
};
