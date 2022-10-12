import { Folder } from "@prisma/client";
import supertest from "supertest";
import app from "../../../../../app";

jest.setTimeout(30000);
const request = supertest(app);

describe("New note", () => {
  test("Should create a new note", async () => {
    interface IRes {
      statusCode: number;
      body: {
        status: string;
        note: Folder[];
      };
    }

    const res: IRes = (await request.get("/notes/get-all-folders").send({
      user_email: "test@test.test",
    })) as unknown as IRes;

    const { statusCode, body } = res;

    expect(statusCode).toBe(200);
  });
});
