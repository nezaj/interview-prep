/* subsets.js
 * Write a method that returns all the permutations of a string
 */
var assert = require('assert')

function getPermutations (aStr) {
  if (aStr.length === 1) { return [aStr] }

  var head = aStr[0]
  var tail = getPermutations(aStr.slice(1))
  var seen = {}
  tail.forEach(function (sub) {
    // Careful with off-by-one here, since we want to append character
    // to the end as well
    for (var j = 0, sub_length = sub.length; j < sub_length + 1; j++) {
      var perm = sub.slice(0, j) + head + sub.slice(j)
      var in_seen = perm in seen
      if (!in_seen) { seen[perm] = true }
    }
  })
  // }

  return Object.keys(seen)
}

var aStr = 'abc'
var actual = getPermutations(aStr)
var expected = ['abc', 'acb', 'cab', 'cba', 'bac', 'bca']
assert.deepEqual(actual.sort(), expected.sort())

// Gets rid of dupes
var aStrdupe = 'aabc'
console.log(getPermutations(aStrdupe))
assert.deepEqual(getPermutations(aStrdupe).length, 12)
console.log('All tests pass!')
