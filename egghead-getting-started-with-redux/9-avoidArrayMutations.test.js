const {
  addCounter,
  removeCounter,
  incrementCounter
} = require("./9-avoidArrayMutations");
const deepFreeze = require("./utils/deepFreeze");

// https://github.com/substack/deep-freeze
describe("testing addCounter. it...", () => {
  test("should return a new array with a new counter at the array end", () => {
    expect(addCounter([])).toEqual([0]);
  });
  test("should not mutate the original array", () => {
    expect(addCounter(deepFreeze([]))).toEqual([0]);
  });
});

describe("testing removeCounter. it...", () => {
  test("should return an array with list parameter index removed", () => {
    expect(removeCounter([0, 10, 20], 1)).toEqual([0, 20]);
  });
  test("should not mutate the original array", () => {
    expect(removeCounter(deepFreeze([0, 10, 20]), 1)).toEqual([0, 20]);
  });
});

describe("testing incrementCounter. it...", () => {
  test("should return a list with the indexed entry incremented by 1", () => {
    expect(incrementCounter([0, 10, 20], 2)).toEqual([0, 10, 21]);
  });
  test("should not mutate the original array", () => {
    expect(incrementCounter(deepFreeze([5, 10]), 1)).toEqual([5, 11]);
  });
});
