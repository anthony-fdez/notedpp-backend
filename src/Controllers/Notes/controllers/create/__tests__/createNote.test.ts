import { Note } from "@prisma/client";
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

describe("New note", () => {
  const test_user_id = "TEST_USER";
  const folder_name = "TEST";
  const note = "TEST NOTE";
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

  test("Should fail to create a new note", async () => {
    const res: IRes = (await request.post("/notes/new-note").send({
      folder_name,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(400);
    expect(body.status).toBe("error");
  });

  test("Delete Note", async () => {
    const res: IRes = (await request.delete("/notes/delete-note").send({
      note_id: newlyCreatedNoteId,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.note.note).toBe(note);
    expect(body.note.user_id).toBe(test_user_id);
    expect(body.note.id).toBe(newlyCreatedNoteId);
  });
});
