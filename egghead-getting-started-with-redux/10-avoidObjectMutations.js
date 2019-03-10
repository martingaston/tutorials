module.exports = todo => ({
  ...todo,
  completed: !todo.completed
});
