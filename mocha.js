import assert from 'node:assert';

test('Add numbers', () => {
  const result = sum(2, 3);
  const expected = 5;
  expect(result).toBe(expected);
});

test('Subtract numbers', () => {
  const result = subtract(2, 3);
  const expected = -1;
  expect(result).toBe(expected);
});

function sum(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function test(title, callback) {
  try {
    callback();
    console.log(`_/ ${title}`);
  } catch (error) {
    console.error(`X ${title}`);
    console.error(error);
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not ${expected}`);
      }
    },
  };
}
