const addCounter = list => list.concat(...list, 0);

const removeCounter = (list, index) => [
  ...list.slice(0, index),
  ...list.slice(index + 1)
];

const incrementCounter = (list, index) => [
  ...list.slice(0, index),
  ++list[index],
  ...list.slice(index + 1)
];

module.exports = { addCounter, removeCounter, incrementCounter };
