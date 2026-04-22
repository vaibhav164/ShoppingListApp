import { db } from "./index";

export const getLists = () => {
  return db.getAllSync("SELECT * FROM lists");
};

export const insertList = (name: string, priority: string) => {
  db.runSync("INSERT INTO lists (name, priority) VALUES (?, ?)", [
    name,
    priority,
  ]);
};
