import { describe, it } from "vitest";
import request from "supertest";
import app from "../../6.1/app.mjs";

describe("Testing hompeage route API", () => {
  describe("GET /", () => {
    it("Should have status 200", () => {
      return request(app).get("/").expect(200);
    });
    it("Should have JSON data", () => {
      return request(app).get("/").expect("Content-Type", /json/);
    });
    it("Should have a collection(array) of teams", async () => {
      const response = await request(app).get("/");
      expect(Array.isArray(response.body.routes)).toBe(true);
    });

    it("Should have a version from response like x.x or x.x.x", async () => {
      const response = await request(app).get("/");
      expect(response.body.version).toMatch(/\d\.\d(\.\d)?/);
    });
  });
});
