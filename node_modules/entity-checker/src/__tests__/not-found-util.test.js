const notFoundUtil = require("../index");

test("checks if null is not found", () => {
  const checker = notFoundUtil;
  expect(checker.isNotFound(null)).toBe(true);
});

test("checks if undefined is not found", () => {
  const checker = notFoundUtil;
  expect(checker.isNotFound(undefined)).toBe(true);
});

test("checks if empty array is not found", () => {
  const checker = notFoundUtil;
  expect(checker.isNotFound([])).toBe(true);
});

test("checks if array with empty strings is not found", () => {
  const checker = notFoundUtil;
  expect(checker.isNotFound(["", ""])).toBe(true);
});

test("checks if zero is not found", () => {
  const checker = notFoundUtil;
  expect(checker.isNotFound(0)).toBe(true);
});

test("checks if false is not found", () => {
  const checker = notFoundUtil;
  expect(checker.isNotFound(false)).toBe(true);
});

test("checks if NaN is not found", () => {
  const checker = notFoundUtil;
  expect(checker.isNotFound(NaN)).toBe(true);
});

test("checks if empty object is not found", () => {
  const checker = notFoundUtil;
  expect(checker.isNotFound({})).toBe(true);
});

test("checks if object with properties is not found", () => {
  const checker = notFoundUtil;
  expect(checker.isNotFound({ key: "value" })).toBe(false);
});
