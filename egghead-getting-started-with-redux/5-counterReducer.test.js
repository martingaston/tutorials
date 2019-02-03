const counter = require("./5-counterReducer");

test("returns correct increment/decrement", () => {
  expect(counter(0, { type: "INCREMENT" })).toBe(1);
  expect(counter(1, { type: "INCREMENT" })).toBe(2);
  expect(counter(2, { type: "DECREMENT" })).toBe(1);
  expect(counter(1, { type: "DECREMENT" })).toBe(0);
});

test("returns current state if action is not understood", () => {
  expect(counter(1, { type: "SQUARE" })).toBe(1);
});

test("returns initial state of the application if state argument is undefined", () => {
  expect(counter(undefined, {})).toBe(0);
});
