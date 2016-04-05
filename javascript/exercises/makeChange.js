// makeChange problem solved using recursion
var assert = require('assert')

function makeChange (amount, items) {
  if (amount === 0) { return [] }

  var candidates = items.filter(function (item) { return item <= amount })
  while (candidates.length > 0) {
    var head = candidates.shift()
    var tail = makeChange(amount -= head, items)
    if (tail) { return [head].concat(tail) }
  }
}

var amount, items

amount = 10
items = [25, 10, 9]
assert.deepEqual(makeChange(amount, items), [10])

amount = 34
items = [25, 10, 9]
assert.deepEqual(makeChange(amount, items), [25, 9])

amount = 134
items = [25, 10, 9]
assert.deepEqual(makeChange(amount, items), [25, 25, 25, 25, 25, 9])

amount = 134
items = [25, 10, 8]
assert.deepEqual(makeChange(amount, items), undefined)

console.log('All tests pass!')
