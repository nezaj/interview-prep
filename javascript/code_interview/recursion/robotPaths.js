// 8.2
// Imagine a robot sitting on the upper left hand corner of an NxN grid The robot can only move in two directions: right and down How many possible paths are there for the robot? FOLLOW UP Imagine certain squares are “off limits”, such that the robot can not step on them Design an algorithm to get all possible paths for the robot
var assert = require('assert')

function paths (matrix, x, y, memo) {
  memo = memo || {}
  x = x || 0
  y = y || 0
  var m = matrix[0].length - 1
  var n = matrix.length - 1

  if (x === m && y === n) { return 1 }
  if (x > m || y > n) { return 0 }
  if (matrix[x][y] !== 1) { return 0 }

  var key = x + '-' + y
  if (memo[key]) { return memo[key] }
  memo[key] = paths(matrix, x + 1, y, memo) + paths(matrix, x, y + 1, memo)
  return memo[key]
}

var matrix
matrix = [[1]]
assert.deepEqual(paths(matrix), 1)

matrix = [
  [ 1, 0, 1 ],
  [ 1, 1, 1 ],
  [ 0, 0, 1 ]
]
assert.deepEqual(paths(matrix), 1)

matrix = [
  [ 1, 0, 1 ],
  [ 1, 1, 1 ],
  [ 0, 1, 1 ]
]
assert.deepEqual(paths(matrix), 2)

console.log('All thests pass!')
