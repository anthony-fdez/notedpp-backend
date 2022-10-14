import { Note, NoteHistory } from "@prisma/client";
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

describe("Get note history", () => {
  const test_user_id = "TEST_USER_EDIT_NOTE";
  const folder_name = "TEST_FOLDER_EDIT_NOTE";
  const note = "note 1";

  let createdNoteId: string;

  test("Should create note", async () => {
    const res: IRes = (await request.post("/notes/new-note").send({
      folder_name,
      test_user_id,
      note,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.note.note).toBe(note);
    expect(body.note.user_id).toBe(test_user_id);

    createdNoteId = body.note.id;
  });

  test("Should get the note", async () => {
    const res: IRes = (await request.get("/notes/get-note").send({
      note_id: createdNoteId,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.note.user_id).toBe(test_user_id);
    expect(body.note.note).toBe(note);
  });

  test("Delete edited note", async () => {
    const res: IRes = (await request.post("/notes/delete-note").send({
      note_id: createdNoteId,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.note.note).toBe(note);
    expect(body.note.user_id).toBe(test_user_id);
    expect(body.note.id).toBe(createdNoteId);
  });
});
