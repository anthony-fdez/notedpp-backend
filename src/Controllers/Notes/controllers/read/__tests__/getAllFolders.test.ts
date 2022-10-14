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

describe("Get notes in a folder", () => {
  const test_user_id = "TEST_USER_GET_ALL_FOLDER";
  const folder_name_1 = "TEST_FOLDER_GET_ALL_FOLDER_1";
  const folder_name_2 = "TEST_FOLDER_GET_ALL_FOLDER_2";

  test("Should create folder 1", async () => {
    const res: IRes = (await request.post("/notes/new-folder").send({
      folder_name: folder_name_1,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.folder.user_id).toBe(test_user_id);
  });

  test("Should create folder 2", async () => {
    const res: IRes = (await request.post("/notes/new-folder").send({
      folder_name: folder_name_2,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.folder.user_id).toBe(test_user_id);
  });

  test("Should get all folders", async () => {
    interface IResFolders {
      statusCode: number;
      body: {
        status: string;
        folders: Folder[];
      };
    }

    const res: IResFolders = (await request.get("/notes/get-all-folders").send({
      test_user_id,
    })) as unknown as IResFolders;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
    expect(body.folders).toHaveLength(2);
  });

  test("Should delete folder 1", async () => {
    const res: IRes = (await request.post("/notes/delete-folder").send({
      folder_name: folder_name_1,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode } = res;

    expect(statusCode).toBe(200);
  });

  test("Should delete folder 2", async () => {
    const res: IRes = (await request.post("/notes/delete-folder").send({
      folder_name: folder_name_2,
      test_user_id,
    })) as unknown as IRes;

    const { statusCode } = res;

    expect(statusCode).toBe(200);
  });
});
