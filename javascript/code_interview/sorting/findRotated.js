// 9.3
// Given a sorted array of n integers that has been rotated an unknown number of
// times, give an O(logn) algorithm that finds an element in the array
// You may assume that the array was originally sorted in increasing order
// EXAMPLE:
//   Input: find 5 in array (15 16 19 20 25 1 3 4 5 7 10 14)
//   Output: 8 (the index of 5 in the array)
var assert = require('assert')

function findRotated (aList, target) {
  var left = 0
  var right = aList.length - 1
  var mid
  while (left <= right) {
    mid = Math.floor((left + right) / 2)
    if (aList[mid] === target) {
      return mid
    } else if (aList[left] <= aList[mid]) {
      if (target >= aList[left] && target < aList[mid]) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    } else {
      if (target <= aList[right] && target > aList[mid]) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }

  return -1
}

var aList = [15, 16, 19, 20, 25, 1, 3, 4, 5, 7, 10, 14]
assert.deepEqual(findRotated(aList, 5), 8)

console.log('All tests pass!')
