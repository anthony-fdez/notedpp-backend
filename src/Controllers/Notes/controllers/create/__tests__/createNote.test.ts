import { Note } from "@prisma/client";
import supertest from "supertest";
import app from "../../../../../app";

jest.setTimeout(30000);
const request = supertest(app);

describe("New note", () => {
  let newlyCreatedNoteId: string;

  test("Should create a new note", async () => {
    interface IRes {
      statusCode: number;
      body: {
        status: string;
        note: Note;
      };
    }

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

  test("Should fail to create a new note", async () => {
    interface IRes {
      statusCode: number;
      body: {
        status: string;
        note: Note;
      };
    }

    const res: IRes = (await request.post("/notes/new").send({
      folder_name: "TEST",
      note: "TEST NOTE",
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(400);
    expect(body.status).toBe("error");
  });

  test("Delete Note", async () => {
    interface IRes {
      statusCode: number;
      body: {
        status: string;
        note: Note;
      };
    }

    const res: IRes = (await request.delete("/notes/delete-note").send({
      note_id: newlyCreatedNoteId,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.note.note).toBe("TEST NOTE");
    expect(body.note.user_email).toBe("test@test.test");
    expect(body.note.id).toBe(newlyCreatedNoteId);
  });
});
