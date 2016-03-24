// Implement the “paint fill” function that one might see on many image editing
// programs That is, given a screen (represented by a 2 dimensional array of
// Colors), a point, and a new color, fill in the surrounding area until you
// hit a border of that color
var assert = require('assert')

function paintFill (m, row, col, fillValue) {
  // Current pixel is already fill value, don't do more work
  if (m[row][col] === fillValue) { return m }

  // Clone so we don't modify input array
  var clone = m.map(function(arr) { return arr.slice() })

  var max_row = clone.length, max_col = clone[0].length
  var explore = [[row, col]], explored = {}
  var pos, pos_x, pos_y
  while (explore.length > 0) {
    pos = explore.pop(); pos_x = pos[0]; pos_y = pos[1]
    if (pos in explored) {
      ;
    } else if (clone[pos_x][pos_y] === fillValue) {
      explored[pos.toString()] = true
    } else {
      // Replace value
      clone[pos_x][pos_y] = fillValue

      // Explore up
      if (pos_x + 1 < max_row) { explore.push([pos_x + 1, pos_y]) }
      // Explore down
      if (pos_x - 1 >= 0) { explore.push([pos_x - 1, pos_y]) }
      // Explore left
      if (pos_y - 1 >= 0) { explore.push([pos_x, pos_y - 1]) }
      // Explore right
      if (pos_y + 1 < max_col) { explore.push([pos_x, pos_y + 1]) }

      explored[pos.toString()] = true
    }
  }

  return clone
}

var matrix, expected

matrix = [
  ['x', 'x', 'o', 'x', 'x'],
  ['x', 'o', 'x', 'o', 'x'],
  ['x', 'o', 'x', 'x', 'x'],
  ['x', 'o', 'x', 'x', 'x']
]

expected = [
  ['o', 'o', 'o', 'x', 'x'],
  ['o', 'o', 'x', 'o', 'x'],
  ['o', 'o', 'x', 'x', 'x'],
  ['o', 'o', 'x', 'x', 'x']
]
assert.deepEqual(paintFill(matrix, 0, 0, 'o'), expected)

expected = [
  ['x', 'x', 'o', 'o', 'o'],
  ['x', 'o', 'o', 'o', 'o'],
  ['x', 'o', 'o', 'o', 'o'],
  ['x', 'o', 'o', 'o', 'o']
]
assert.deepEqual(paintFill(matrix, 1, 2, 'o'), expected)

console.log('All tests pass!')
