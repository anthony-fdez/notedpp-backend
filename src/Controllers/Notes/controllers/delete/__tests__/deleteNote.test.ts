import { Note } from "@prisma/client";
import supertest from "supertest";
import app from "../../../../../app";

jest.setTimeout(30000);
const request = supertest(app);

interface IRes {
  statusCode: number;
  message?: string;
  body: {
    status: string;
    note: Note;
  };
}

describe("Delete Notes", () => {
  const test_user_id = "TEST_USER_DELETE_NOTE";
  const folder_name = "TEST";
  const note = "NEW NOTE";
  let newlyCreatedNoteId: string;

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

    newlyCreatedNoteId = body.note.id;
  });

  test("Should delete the note", async () => {
    const res: IRes = (await request.post("/notes/delete-note").send({
      note_id: newlyCreatedNoteId,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.note.note).toBe(note);
    expect(body.note.user_id).toBe(test_user_id);
    expect(body.note.id).toBe(newlyCreatedNoteId);
  });

  test("Should try to delete a note that does not exist", async () => {
    const res: IRes = (await request.post("/notes/delete-note").send({
      note_id: "fake id",
      test_user_id,
    })) as unknown as IRes;

    const { statusCode } = res;

    expect(statusCode).toBe(500);
  });
});
