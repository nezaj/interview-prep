// 8.1
// Write a method to generate the nth Fibonacci number
var assert = require('assert')

var memo = {}

function fib (n) {
  if (n === 1) { return 0 }
  if (n === 2) { return 1 }
  if (memo[n]) { return memo[n] }

  memo[n] = fib(n - 1) + fib(n - 2)
  return memo[n]
}

// [0, 1, 1, 2, 3, 5, 8, 13]
assert.deepEqual(fib(1), 0)
assert.deepEqual(fib(2), 1)
assert.deepEqual(fib(3), 1)
assert.deepEqual(fib(8), 13)

console.log('All tests pass!')
