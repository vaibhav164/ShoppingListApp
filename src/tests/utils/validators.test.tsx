import { isValidName } from "../../utils/validators";

describe("validators", () => {
  it("returns true for valid name", () => {
    expect(isValidName("Groceries")).toBe(true);
  });

  it("returns false for empty name", () => {
    expect(isValidName("")).toBe(false);
  });

  it("returns false for whitespace", () => {
    expect(isValidName("   ")).toBe(false);
  });
});
