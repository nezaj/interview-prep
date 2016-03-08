var assert = require('assert')

function quickSort (aList) {
  if (aList.length < 2) { return aList }

  var pivot = aList[0]
  var tail = aList.slice(1)
  var less = quickSort(tail.filter(function (e) { return e < pivot }))
  var equal = quickSort(tail.filter(function (e) { return e === pivot }))
  var greater = quickSort(tail.filter(function (e) { return e > pivot }))

  return [].concat(less, pivot, equal, greater)
}

var t0 = [1, 2, 3]
var e0 = [1, 2, 3]
assert.deepEqual(quickSort(t0), e0)

var t1 = [2, 1, 0]
var e1 = [0, 1, 2]
assert.deepEqual(quickSort(t1), e1)

var t2 = [-1, 93, 32, 1, 0]
var e2 = [-1, 0, 1, 32, 93]
assert.deepEqual(quickSort(t2), e2)

console.log('All tests pass!')
