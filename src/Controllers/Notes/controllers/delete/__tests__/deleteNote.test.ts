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
  let newlyCreatedNoteId: string;

  test("Should create a new note", async () => {
    const res: IRes = (await request.post("/notes/new").send({
      folder_name: "TEST",
      user_email: "test@test.test",
      note: "TEST NOTE",
    })) as unknown as IRes;

    const { statusCode, body } = res;

    newlyCreatedNoteId = body.note.id;

    expect(statusCode).toBe(200);
    expect(body.note.note).toBe("TEST NOTE");
    expect(body.note.user_email).toBe("test@test.test");
  });

  test("Should delete the note", async () => {
    const res: IRes = (await request.delete("/notes/delete-note").send({
      note_id: newlyCreatedNoteId,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.note.note).toBe("TEST NOTE");
    expect(body.note.user_email).toBe("test@test.test");
    expect(body.note.id).toBe(newlyCreatedNoteId);
  });

  test("Should try to delete a note that does not exist", async () => {
    const res: IRes = (await request.delete("/notes/delete-note").send({
      note_id: "fake id",
    })) as unknown as IRes;

    const { statusCode } = res;

    expect(statusCode).toBe(400);
  });
});
