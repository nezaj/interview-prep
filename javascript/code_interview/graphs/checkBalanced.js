/* 4.4 Check Balanced */
// ---------------------------------------------------------------------------
const assert = require('assert')

const {BinarySearchTree} = require('../../ds/bst')

const getHeight = (node) => {
  if (!node) { return -1 }

  try {
    const left = getHeight(node.left)
    const right = getHeight(node.right)
    const diff = Math.abs(left - right)
    if (diff > 1) { throw 'unbalanced' }
    return Math.max(left, right) + 1
  } catch (err) {
    throw 'unbalanced'
  }

}

const isBalanced = (node) => {
  try { getHeight(node) }
  catch (error) { return false }
  return true
}

const balanced = new BinarySearchTree([4, 2, 5, 3, 1])
assert.deepEqual(isBalanced(balanced.head), true)

const unbalanced = new BinarySearchTree([4, 2, 5, 3, 1, 0])
assert.deepEqual(isBalanced(unbalanced.head), false)

console.log('All tests pass!')
