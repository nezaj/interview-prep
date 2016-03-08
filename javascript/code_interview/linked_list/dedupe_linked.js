/* Write code to remove duplicates from an unsorted linked list
 * FOLLOW UP
 * How would you solve this problem if a temporary buffer is not allowed?
 */
var assert = require('assert')

var LinkedList = require('../../ds').LinkedList

function dedupe (linked) {
  var node = linked.head
  var seen = {}
  var output = []
  while (node) {
    if (!(node.data in seen)) {
      output.push(node.data)
      seen[node.data] = true
    }
    node = node.next
  }

  return output
}

var link = new LinkedList([1, 3, 3, 10])
var expected = [1, 3, 10]
assert.deepEqual(dedupe(link), expected)
console.log('All tests pass!')
