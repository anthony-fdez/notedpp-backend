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

describe("Delete Folder", () => {
  const test_user_id = "TEST_USER";
  const folder_name = "delete_folder_test";
  let createdFolderId: string;

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

  test("Should delete the folder", async () => {
    const res: IRes = (await request.post("/notes/delete-folder").send({
      folder_name,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.folder.id).toBe(createdFolderId);
  });

  test("Should try delete a folder that does not exist", async () => {
    const res: IRes = (await request.post("/notes/delete-folder").send({
      folder_name,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode } = res;

    expect(statusCode).toBe(400);
  });
});
