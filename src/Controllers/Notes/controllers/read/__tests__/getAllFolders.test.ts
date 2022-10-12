import { Folder } from "@prisma/client";
import supertest from "supertest";
import app from "../../../../../app";

jest.setTimeout(30000);
const request = supertest(app);

describe("Get all folders", () => {
  test("Should get all folders", async () => {
    interface IRes {
      statusCode: number;
      body: {
        status: string;
        folders: Folder[];
      };
    }

    const res: IRes = (await request.get("/notes/get-all-folders").send({
      user_email: "test@test.test",
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
  });
});
