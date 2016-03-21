/* subsets.js
 * Write a method that returns all subsets of a set
 */
var assert = require('assert')

function getSubsets (aList) {
  if (aList.length === 0) { return [''] }
  var head = aList.shift()
  var tail = getSubsets(aList)
  var head_tail = tail.map(function (t) { return head + t })
  return tail.concat(head_tail)
}

var aList = ['a', 'b', 'c']
var expected = ['', 'a', 'ab', 'abc', 'ac', 'b', 'bc', 'c']
var actual = getSubsets(aList).sort()
assert.deepEqual(actual, expected)

console.log('All tests pass!')
