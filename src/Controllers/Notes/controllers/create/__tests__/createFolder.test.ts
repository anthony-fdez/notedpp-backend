import { Note } from "@prisma/client";
import supertest from "supertest";
import app from "../../../../../app";

jest.setTimeout(30000);
const request = supertest(app);

interface IRes {
  statusCode: number;
  body: {
    status: string;
    folder: Note;
  };
}

describe("New Folder", () => {
  const test_user_id = "TEST_USER";
  const folder_name = "create_folder_test";
  let createdFolderId: string;

  test("Should delete folder if exists", async () => {
    const res: IRes = (await request.post("/notes/delete-folder").send({
      folder_name,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode } = res;

    try {
      expect(statusCode).toBe(200);
    } catch (error: unknown) {
      expect(statusCode).toBe(400);
    }
  });

  test("Should create a new folder", async () => {
    const res: IRes = (await request.post("/notes/new-folder").send({
      folder_name,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.folder.user_id).toBe(test_user_id);

    createdFolderId = body.folder.id;
  });

  test("Should try and create the same folder", async () => {
    const res: IRes = (await request.post("/notes/new-folder").send({
      folder_name,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode } = res;

    expect(statusCode).toBe(400);
  });

  test("Should delete created folder", async () => {
    const res: IRes = (await request.post("/notes/delete-folder").send({
      folder_name,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.folder.id).toBe(createdFolderId);
  });
});
