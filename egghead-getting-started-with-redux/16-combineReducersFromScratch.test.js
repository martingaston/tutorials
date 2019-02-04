const { createStore } = require("redux");
const {
  visibilityFilter,
  todos,
  combineReducers
} = require("./16-combineReducersFromScratch");

const todoApp = combineReducers({
  todos,
  visibilityFilter
});
const store = createStore(todoApp);

test("combineReducers returns a default state with a new store", () => {
  expect(store.getState()).toEqual({ todos: [], visibilityFilter: "SHOW_ALL" });
});

test("a dispatch action will update the state accordingly", () => {
  store.dispatch({ type: "ADD_TODO", id: 0, text: "Learn Redux" });
  expect(store.getState()).toEqual({
    todos: [{ id: 0, text: "Learn Redux", completed: false }],
    visibilityFilter: "SHOW_ALL"
  });
});
