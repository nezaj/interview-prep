/* Classic merge-sort algorithim
 * Time complexity: O(n log n)
 * Memory complexity: O(n)
 */

var assert = require('assert')

function mergeSort (aList) {
  if (aList.length < 2) {
    return aList
  }

  var mid = Math.floor(aList.length / 2)
  var left = mergeSort(aList.slice(0, mid))
  var right = mergeSort(aList.slice(mid))

  return merge(left, right)
}

function merge (left, right) {
  var output = []
  var done = false
  // Sort in reverse order so we can use O(1) operations pop/push
  while (!done) {
    var left_len = left.length
    var right_len = right.length
    if (left_len > 0 && right_len > 0) {
      var l_val = left.pop()
      var r_val = right.pop()
      if (l_val > r_val) {
        output.push(l_val)
        right.push(r_val)
      } else {
        output.push(r_val)
        left.push(l_val)
      }
    } else if (left_len > 0) {
      output = output.concat(left.reverse())
      done = true
    } else {
      output = output.concat(right.reverse())
      done = true
    }
  }

  return output.reverse()
}

var t0 = [1, 2, 3]
var e0 = [1, 2, 3]
assert.deepEqual(mergeSort(t0), e0)

var t1 = [2, 1, 0]
var e1 = [0, 1, 2]
assert.deepEqual(mergeSort(t1), e1)

var t2 = [-1, 93, 32, 1, 0]
var e2 = [-1, 0, 1, 32, 93]
assert.deepEqual(mergeSort(t2), e2)

console.log('All tests pass!')
