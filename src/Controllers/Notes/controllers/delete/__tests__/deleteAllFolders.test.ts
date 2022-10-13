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

interface IResDeletedFolders {
  statusCode: number;
  body: {
    status: string;
    deletedNotes: {
      count: number;
    };
    deletedFolders: {
      count: number;
    };
  };
}

describe("Delete all folders", () => {
  const test_user_id = "test_user_delete_all_folders";
  const folder_name_1 = "delete_all_folders_1";
  const folder_name_2 = "delete_all_folders_2";
  const folder_name_3 = "delete_all_folders_3";

  test("Should create note 1 in folder 1", async () => {
    const note = "note";

    const res: IRes = (await request.post("/notes/new-note").send({
      folder_name: folder_name_1,
      test_user_id,
      note,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.note.note).toBe(note);
    expect(body.note.user_id).toBe(test_user_id);
  });

  test("Should create note 2 in folder 2", async () => {
    const note = "note";

    const res: IRes = (await request.post("/notes/new-note").send({
      folder_name: folder_name_2,
      test_user_id,
      note,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.note.note).toBe(note);
    expect(body.note.user_id).toBe(test_user_id);
  });

  test("Should create note 3 in folder 3", async () => {
    const note = "note";

    const res: IRes = (await request.post("/notes/new-note").send({
      folder_name: folder_name_3,
      test_user_id,
      note,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.note.note).toBe(note);
    expect(body.note.user_id).toBe(test_user_id);
  });

  test("Should delete all folders and notes", async () => {
    const res: IResDeletedFolders = (await request
      .delete("/notes/delete-all-folders")
      .send({
        test_user_id,
      })) as unknown as IResDeletedFolders;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.deletedFolders.count).toBeGreaterThan(0);
    expect(body.deletedNotes.count).toBeGreaterThan(0);
  });

  test("All folders should have been deleted", async () => {
    const res: IResDeletedFolders = (await request
      .delete("/notes/delete-all-folders")
      .send({
        test_user_id,
      })) as unknown as IResDeletedFolders;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.deletedFolders.count).toBe(0);
    expect(body.deletedNotes.count).toBe(0);
  });
});
