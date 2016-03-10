/* selectionSort.js
 * Time Complexity: O(n^2)
 * Memory Complexity: O(1)
 */
var assert = require('assert')

function selectionSort (aList) {
  if (aList.length < 2) { return aList }

  var i, j
  var length = aList.length
  for (i = 0; i < length; i++) {
    var min_idx = i
    for (j = i + 1; j < length; j++) {
      if (aList[j] < aList[min_idx]) {
        min_idx = j
      }
    }
    var tmp = aList[i]
    aList[i] = aList[min_idx]
    aList[min_idx] = tmp
  }

  return aList
}

var t0 = [1, 2, 3]
var e0 = [1, 2, 3]
assert.deepEqual(selectionSort(t0), e0)

var t1 = [2, 1, 0]
var e1 = [0, 1, 2]
assert.deepEqual(selectionSort(t1), e1)

var t2 = [-1, 93, 32, 1, 0]
var e2 = [-1, 0, 1, 32, 93]
assert.deepEqual(selectionSort(t2), e2)

console.log('All tests pass!')
