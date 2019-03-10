const deepFreeze = require("./utils/deepFreeze");
const todos = require("./13-reducerComposition");

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
  test("todos can toggle todo using TOGGLE_TODO action", () => {
    const stateBefore = deepFreeze([
      {
        id: 0,
        text: "Learn Redux",
        completed: false
      },
      {
        id: 1,
        text: "Watch Superbowl",
        completed: false
      }
    ]);
    const stateAfter = [
      {
        id: 0,
        text: "Learn Redux",
        completed: false
      },
      {
        id: 1,
        text: "Watch Superbowl",
        completed: true
      }
    ];
    const action = deepFreeze({
      type: "TOGGLE_TODO",
      id: 1
    });
    expect(todos(stateBefore, action)).toEqual(stateAfter);
  });
});
