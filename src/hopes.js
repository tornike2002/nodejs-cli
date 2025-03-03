import { insertDB, saveDB, getDB } from "./db.js";

// creates new hope
export const newHope = async (hope, tags) => {
  const data = {
    tags,
    content: hope,
    id: Date.now(),
  };
  await insertDB(data);
  return data;
};

// gets all the hopes
export const getAllHopes = async () => {
  const db = await getDB();
  return db.hopes;
};

// finds hope depending on parametre
export const findHopes = async (filter) => {
  const hopes = await getAllHopes();
  return hopes.filter((hope) =>
    hope.content.toLowerCase().includes(filter.toLowerCase())
  );
};

// remove hopes from database by id
export const removeHope = async (id) => {
  const hopes = await getAllHopes();
  const match = hopes.find((hope) => hope.id === id);
  if (match) {
    const newHopes = hopes.filter((hopes) => hopes.id != id);
    await saveDB({ hopes: newHopes });
    return id;
  }
  return "Invalid ID, try again";
};

// cleans entire database
export const removeAllHopes = () => {
  saveDB({ hopes: [] });
};
