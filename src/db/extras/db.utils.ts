import { pgTableCreator } from "drizzle-orm/pg-core";

export const table_filter = "croc_";
export const createTable = pgTableCreator((name) => `${table_filter}${name}`);

export enum Roles {
  User = "user",
  Admin = "admin",
}
