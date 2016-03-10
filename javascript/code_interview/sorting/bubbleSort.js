/* bubbleSort.js
 * Time complexity: O(n^2)
 * Memory: O(1)
 */
var assert = require('assert')

function bubbleSort (aList) {
  if (aList.length < 2) { return aList }

  var i, j
  var length = aList.length
  for (i = 0; i < length - 1; i++) {
    for (j = i + 1; j < length; j++) {
      var curr = aList[i]
      var next = aList[j]
      if (curr > next) {
        aList[i] = next
        aList[j] = curr
      }
    }
  }

  return aList
}

var t0 = [1, 2, 3]
var e0 = [1, 2, 3]
assert.deepEqual(bubbleSort(t0), e0)

var t1 = [2, 1, 0]
var e1 = [0, 1, 2]
assert.deepEqual(bubbleSort(t1), e1)

var t2 = [-1, 93, 32, 1, 0]
var e2 = [-1, 0, 1, 32, 93]
assert.deepEqual(bubbleSort(t2), e2)

console.log('All tests pass!')
