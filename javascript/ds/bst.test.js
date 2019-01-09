const assert = require('assert')

const {BinarySearchTree} = require('./bst')

// It inserts a simple node
// ---------------------------------------------------------------------------
const one = new BinarySearchTree([1])
assert.deepEqual(one.traverse(), [1])

// Inserts things in correct order
// ---------------------------------------------------------------------------
const three = new BinarySearchTree([1, 2, 3])
assert.deepEqual(three.traverse(), [1, 2, 3])

const reverse = new BinarySearchTree([3, 2, 1])
assert.deepEqual(reverse.traverse(), [1, 2, 3])

const random = new BinarySearchTree([16, 27, 4, 7, 80])
assert.deepEqual(random.traverse(), [4, 7, 16, 27, 80])

// Recursive transverse works as expected
assert.deepEqual(random.recur_traverse(), [4, 7, 16, 27, 80])

// It finds the succesor node
// ---------------------------------------------------------------------------
assert.deepEqual(random.successor(16), 27)
assert.deepEqual(random.successor(4), 7)
assert.deepEqual(random.successor(80), -1)

// It finds the predecessor node
// ---------------------------------------------------------------------------
assert.deepEqual(random.predecessor(16), 7)
assert.deepEqual(random.predecessor(4), -1)
assert.deepEqual(random.predecessor(80), 27)

// Pre-order works
// ---------------------------------------------------------------------------
const values = [4, 2, 1, 3, 6, 5, 7]
const pre = new BinarySearchTree(values)
assert.deepEqual(pre.preOrder(), values)

console.log('All tests pass!')


