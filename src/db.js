import fs from "node:fs/promises";

const DB_PATH = new URL("../db.json", import.meta.url);

// GETs Whole database
export const getDB = async () => {
  const db = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(db);
};

//  Saves Database
export const saveDB = async (db) => {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
};

// Inserts in DB
export const insertDB = async (data) => {
  const db = await getDB();
  db.hopes.push(data);
  await saveDB(db);
  return data;
};
