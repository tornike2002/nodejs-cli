import { beforeEach, expect, jest } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insertDB, saveDB, getDB } = await import("../src/db.js");
const { newHope, getAllHopes, removeHope } = await import("../src/hopes.js");

beforeEach(() => {
  insertDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

test("newHope inserts data into the database", async () => {
  const hope = {
    content: "this is my note",
    id: Date.now(),
    tags: ["happy", "sad"],
  };
  insertDB.mockResolvedValue(hope.content, hope.tags);
  const result = await newHope(hope.content, hope.tags);
  expect(result).toEqual(hope);
});

test("getAllHope gets all the data from the database", async () => {
  const db = {
    hopes: ["hope1", "hope2", "hope3"],
  };
  getDB.mockResolvedValue(db);
  const result = await getAllHopes();
  expect(result).toEqual(db.hopes);
});

test("removeHope removes a hope from the database", async () => {
  const hopes = [
    { id: 1, content: "hope1", tags: ["happy", "sad"] },
    { id: 2, content: "hope1", tags: ["happy", "sad"] },
    { id: 3, content: "hope1", tags: ["happy", "sad"] },
  ];
  saveDB.mockResolvedValue(hopes);
  const result = await removeHope(2);
  expect(result).toBe("Invalid ID, try again");
});

