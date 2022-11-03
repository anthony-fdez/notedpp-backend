import { Note } from "@prisma/client";
import supertest from "supertest";
import app from "../../../../../app";

jest.setTimeout(30000);
const request = supertest(app);

interface IRes {
  statusCode: number;
  body: {
    status: string;
    editedNote?: Note;
    note: Note;
  };
}

describe("Update note status", () => {
  const test_user_id = "TEST_USER_UPDATE_NOTE_STATUS";
  const folder_name = "TEST_FOLDER_UPDATE_NOTE_STATUS";
  const note1 = "note 1";

  let createdNoteId: string;

  test("Should create note", async () => {
    const res: IRes = (await request.post("/notes/new-note").send({
      folder_name,
      test_user_id,
      note: note1,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.note.note).toBe(note1);
    expect(body.note.user_id).toBe(test_user_id);

    createdNoteId = body.note.id;
  });

  test("Should update the note status", async () => {
    const res: IRes = (await request.patch("/notes/update-status").send({
      note_id: createdNoteId,
      status: "done",
      test_user_id,
    })) as unknown as IRes;

    const { statusCode } = res;

    expect(statusCode).toBe(200);
  });

  test("Should try to update the note status and fail", async () => {
    const res: IRes = (await request.patch("/notes/update-status").send({
      note_id: createdNoteId,
      status: "test",
      test_user_id,
    })) as unknown as IRes;

    const { statusCode } = res;

    expect(statusCode).toBe(400);
  });

  test("Delete edited note", async () => {
    const res: IRes = (await request.post("/notes/delete-note").send({
      note_id: createdNoteId,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    if (!body.editedNote) return;

    expect(statusCode).toBe(200);
    expect(body.editedNote.user_id).toBe(test_user_id);
    expect(body.editedNote.id).toBe(createdNoteId);
  });
});
