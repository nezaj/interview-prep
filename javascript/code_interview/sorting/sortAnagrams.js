// 9.2
// Write a method to sort an array of strings so that all the anagrams are next
// to each other
var assert = require('assert')

function sortAnagrams (aList) {
  var map = {}
  var i
  var length = aList.length

  // Build map anagrams to list of words
  for (i = 0; i < length; i++) {
    var word = aList[i]
    var key = word.split('').sort().join('')
    map[key] = map[key] || []
    map[key].push(word)
  }

  var sorted_keys = Object.keys(map).sort()
  return sorted_keys.reduce(function (a, b) {
    return map[a].concat(map[b])
  })
}

var aList = ['abc', 'bc', 'cab']
assert.deepEqual(sortAnagrams(aList), ['abc', 'cab', 'bc'])

console.log('All tests pass!')
