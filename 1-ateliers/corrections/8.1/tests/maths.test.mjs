import assert from "node:assert";
import { sum, divide } from "../maths.mjs";
import { describe, it } from "node:test";
describe("Testing Maths functions", () => {
  describe("Testing sum", () => {
    it("Should have 6 when sum(2,4)", () => {
      // Arrange
      const n1 = 2;
      const n2 = 4;
      // Act
      const result = sum(n1, n2);
      // Assert
      assert.strictEqual(result, 6);
    });

    it("Should have 45 when sum(0,1,2,3,4,5,6,7,8,9)", () => {
      assert.strictEqual(45, sum(0,1,2,3,4,5,6,7,8,9))
    })
  });
  
  describe("Testing division", () => {
    it("Should have 2 when divide(8,2)", () => {
      assert.strictEqual(divide(8, 2), 4);
    });
    it("Should throw Error Exception when nb2 equals 0", () => {
      assert.throws(() => divide(10, 0), Error);
    });
    it("Should have error message 'Divide by 0 impossible'", () => {
      assert.throws(() => divide(10, 0), (err) => {
        assert.equal(err.message, 'Divide by 0 impossible')
        return true
      })
    });
  });
});
