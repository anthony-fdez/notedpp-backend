import { Folder } from "@prisma/client";
import supertest from "supertest";
import app from "../../../../../app";

jest.setTimeout(30000);
const request = supertest(app);

interface IRes {
  statusCode: number;
  body: {
    status: string;
    folder: Folder;
  };
}

describe("Rename Folder", () => {
  const test_user_id = "TEST_USER_RENAME_FOLDER";
  const folder_name = "TEST_FOLDER_RENAME_FOLDER";
  const new_folder_name = "TEST_FOLDER_NEW_NAME";

  test("Should create a new folder", async () => {
    const res: IRes = (await request.post("/notes/new-folder").send({
      folder_name,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.folder.user_id).toBe(test_user_id);
  });

  test("Should rename the folder", async () => {
    const res: IRes = (await request.patch("/notes/rename-folder").send({
      folder_name,
      new_folder_name,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.folder.user_id).toBe(test_user_id);
    expect(body.folder.folder_name).toBe(new_folder_name);
  });

  test("Should try to rename to a folder name that is already in use", async () => {
    const res: IRes = (await request.patch("/notes/rename-folder").send({
      folder_name: new_folder_name,
      new_folder_name,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode } = res;

    expect(statusCode).toBe(400);
  });

  test("Should delete created folder", async () => {
    const res: IRes = (await request.post("/notes/delete-folder").send({
      folder_name: new_folder_name,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode } = res;

    expect(statusCode).toBe(200);
  });
});
