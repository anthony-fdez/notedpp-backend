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
    notes: Note[];
    folder: Folder;
  };
}

describe("Move note to other folder", () => {
  const test_user_id = "TEST_USER_EDIT_NOTE";
  const folder_name_1 = "TEST_FOLDER_MOVE_FOLDER_NOTE_1";
  const folder_name_2 = "TEST_FOLDER_MOVE_FOLDER_NOTE_2";
  const note = "note";

  let createdNoteId: string;
  let folder_2_id: string;

  test("Should create note", async () => {
    const res: IRes = (await request.post("/notes/new-note").send({
      folder_name: folder_name_1,
      test_user_id,
      note: note,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.note.note).toBe(note);
    expect(body.note.user_id).toBe(test_user_id);

    createdNoteId = body.note.id;
  });

  test("Should create empty folder", async () => {
    const res: IRes = (await request.post("/notes/new-folder").send({
      folder_name: folder_name_2,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.folder.user_id).toBe(test_user_id);

    folder_2_id = body.folder.id;
  });

  test("Should move note from folder 1 to folder 2", async () => {
    const res: IRes = (await request.patch("/notes/move-note").send({
      note_id: createdNoteId,
      test_user_id,
      new_folder_id: folder_2_id,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.note.user_id).toBe(test_user_id);
    expect(body.note.id).toBe(createdNoteId);
  });

  test("Folder 1 should be empty", async () => {
    const res: IRes = (await request.get("/notes/get-notes-in-folder").send({
      folder_name: folder_name_1,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.notes.length).toBe(0);
    expect(body.folder.folder_name).toBe(folder_name_1);
  });

  test("Folder 2 should have 1 note", async () => {
    const res: IRes = (await request.get("/notes/get-notes-in-folder").send({
      folder_name: folder_name_2,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.notes.length).toBe(1);
    expect(body.folder.folder_name).toBe(folder_name_2);
  });

  test("Delete folder 1", async () => {
    const res: IRes = (await request.post("/notes/delete-folder").send({
      folder_name: folder_name_1,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode } = res;

    expect(statusCode).toBe(200);
  });

  test("Delete folder 2", async () => {
    const res: IRes = (await request.post("/notes/delete-folder").send({
      folder_name: folder_name_2,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode } = res;

    expect(statusCode).toBe(200);
  });
});
