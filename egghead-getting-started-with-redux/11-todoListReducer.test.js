const deepFreeze = require("./utils/deepFreeze");
const todos = require("./11-todoListReducer");

describe("testing todos reducer function. it...", () => {
  test("todos can to state using ADD_TODO action", () => {
    const stateBefore = deepFreeze([]);
    const action = deepFreeze({
      type: "ADD_TODO",
      id: 0,
      text: "Learn Redux"
    });
    const stateAfter = [
      {
        id: 0,
        text: "Learn Redux",
        completed: false
      }
    ];
    expect(todos(stateBefore, action)).toEqual(stateAfter);
  });
});
