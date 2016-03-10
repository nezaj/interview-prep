// Implement binary search on a sorted list
var assert = require('assert')

function binSearch (aList, target) {
  var left = 0
  var right = aList.length - 1
  var mid
  while (left <= right) {
    mid = Math.floor((left + right) / 2)
    if (aList[mid] === target) {
      return mid
    } else if (aList[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  return -1
}

var aList
aList = [1, 2, 3, 4]
assert.deepEqual(binSearch(aList, 4), 3)

aList = [-1, 0, 3, 4]
assert.deepEqual(binSearch(aList, -1), 0)

aList = [-1, 0, 3, 4, 7]
assert.deepEqual(binSearch(aList, 1), -1)

console.log('All tests pass!')
