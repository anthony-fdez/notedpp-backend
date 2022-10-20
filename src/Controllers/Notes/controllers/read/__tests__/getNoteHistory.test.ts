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
  const note1 = "note 1";
  const note2 = "note 2";
  const note3 = "note 3";

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

  test("Should edit note", async () => {
    const res: IRes = (await request.patch("/notes/edit-note").send({
      new_note: note2,
      note_id: createdNoteId,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode } = res;

    expect(statusCode).toBe(200);
  });

  test("Should edit note again", async () => {
    const res: IRes = (await request.patch("/notes/edit-note").send({
      new_note: note2,
      note_id: createdNoteId,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode } = res;

    expect(statusCode).toBe(200);
  });

  test("Should get note history", async () => {
    interface IResNoteHistory {
      statusCode: number;
      body: {
        status: string;
        noteHistory: NoteHistory[];
      };
    }

    const res: IResNoteHistory = (await request
      .post("/notes/get-note-history")
      .send({
        note_id: createdNoteId,
        test_user_id,
      })) as unknown as IResNoteHistory;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.noteHistory).toHaveLength(2);
  });

  test("Delete edited note", async () => {
    const res: IRes = (await request.post("/notes/delete-note").send({
      note_id: createdNoteId,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.note.note).toBe(note2);
    expect(body.note.user_id).toBe(test_user_id);
    expect(body.note.id).toBe(createdNoteId);
  });
});
