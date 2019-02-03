const toggleTodo = require("./10-avoidObjectMutations");
const deepFreeze = require("./utils/deepFreeze");

describe("testing toggleTodo. it...", () => {
  test("should return a new object with the toggle key the opposite boolean of the input", () => {
    expect(toggleTodo({ id: 5, text: "Learn Jest", completed: true })).toEqual({
      id: 5,
      text: "Learn Jest",
      completed: false
    });
  });
  test("should not mutate the original object", () => {
    expect(
      toggleTodo(deepFreeze({ id: 0, text: "Learn Redux", completed: false }))
    ).toEqual({
      id: 0,
      text: "Learn Redux",
      completed: true
    });
  });
});
