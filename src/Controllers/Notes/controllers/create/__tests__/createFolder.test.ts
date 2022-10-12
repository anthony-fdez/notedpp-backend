import { Folder } from "@prisma/client";
import supertest from "supertest";
import app from "../../../../../app";

jest.setTimeout(30000);
const request = supertest(app);

describe("New Folder", () => {
  // here goes the test
});
