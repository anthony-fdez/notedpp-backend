import { Note, Folder } from "@prisma/client";
import supertest from "supertest";
import app from "../../../../../app";

jest.setTimeout(30000);
const request = supertest(app);

interface IRes {
  statusCode: number;
  body: {
    status: string;
    note: Note;
  };
}

interface IResNotesInFolder {
  statusCode: number;
  body: {
    status: string;
    notes: Note[];
    folder: Folder;
  };
}

describe("Get notes in a folder", () => {
  const test_user_id = "TEST_USER_GET_NOTES_IN_FOLDER";
  const folder_name = "TEST_FOLDER_GET_NOTES_IN_FOLDER";
  const note = "TEST NOTE";

  test("Should create a new note", async () => {
    const res: IRes = (await request.post("/notes/new-note").send({
      folder_name,
      test_user_id,
      note,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.note.note).toBe(note);
    expect(body.note.user_id).toBe(test_user_id);
  });

  test("Should create a second new note", async () => {
    const res: IRes = (await request.post("/notes/new-note").send({
      folder_name,
      test_user_id,
      note,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.note.note).toBe(note);
    expect(body.note.user_id).toBe(test_user_id);
  });

  test("Should get all the notes in the folder", async () => {
    const res: IResNotesInFolder = (await request
      .get("/notes/get-notes-in-folder")
      .send({
        folder_name,
        test_user_id,
      })) as unknown as IResNotesInFolder;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.notes.length).toBe(2);
    expect(body.folder.folder_name).toBe(folder_name);
  });

  test("Should delete the folder", async () => {
    const res: IRes = (await request.delete("/notes/delete-folder").send({
      folder_name,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode } = res;

    expect(statusCode).toBe(200);
  });

  test("Should try to get notes in folder that does not exist", async () => {
    const res: IResNotesInFolder = (await request
      .get("/notes/get-notes-in-folder")
      .send({
        folder_name,
        test_user_id,
      })) as unknown as IResNotesInFolder;

    const { statusCode } = res;

    expect(statusCode).toBe(400);
  });
});
