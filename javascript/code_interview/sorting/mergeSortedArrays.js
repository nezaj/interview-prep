// 9.1
// You are given two sorted arrays, A and B, and A has a large enough buffer at
// the end to hold B.
// Write a method to merge B into A in sorted order
var assert = require('assert')

function mergeSorted (aList, bList) {
  var idx = aList.length + bList.length - 1
  var a_ptr = idx - bList.length
  var b_ptr = idx - aList.length

  while (a_ptr >= 0 && b_ptr >= 0) {
    if (aList[a_ptr] > bList[b_ptr]) {
      aList[idx--] = aList[a_ptr--]
    } else {
      aList[idx--] = bList[b_ptr--]
    }
  }

  while (b_ptr >= 0) {
    aList[idx--] = bList[b_ptr--]
  }
}

var aList = [2, 3, 8]
var bList = [1, 4]
mergeSorted(aList, bList)
assert.deepEqual(aList, [1, 2, 3, 4, 8])

console.log('All tests pass!')
