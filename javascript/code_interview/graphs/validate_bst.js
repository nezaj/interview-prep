/* 4.4 validate BST */
// ---------------------------------------------------------------------------
const assert = require('assert')

const {BinarySearchTree} = require('../../ds/bst')
const {buildTree} = require('../../ds/binTree')

const traverse = (node) => {
  if (!node) { return [] }
  return [].concat(
    traverse(node.left),
    node.key,
    traverse(node.right),
  )
}

const validate = (tree) => {
  if (!tree.head) { return true }

  // Build in-order traversal
  const order = traverse(tree.head)

  // Traverse through, comparing current value to previous
  let prev = -1
  let current = null
  for (i = 0; i < order.length; i++) {
    current = order[i]
    if (current < prev) { return false }
    prev = current
  }

  return true
}



const validBST = new BinarySearchTree([4, 2, 5, 3, 1])
assert.deepEqual(traverse(validBST.head), [1, 2, 3, 4, 5])
assert.deepEqual(validate(validBST), true)

const invalidBST = buildTree([1, 2, 3, 4, 5])
assert.deepEqual(validate(invalidBST), false)

// Second approach using property that left <= root < right
// ---------------------------------------------------------------------------
const _checkBST = (node, min, max) => {
  if (!node) { return true }

  if ((min != null && node.key < min) || (max != null && node.key > max)) {
    return false
  }

  const validLeft = _checkBST(node.left, null, node.key)
  const validRight = _checkBST(node.right, node.key, null)
  return !validLeft || !validRight ? false : true
}

const checkBST = (tree) => {
  return _checkBST(tree.head, null, null)
}

assert.deepEqual(checkBST(validBST), true)
assert.deepEqual(checkBST(invalidBST), false)

console.log('All tests pass!')
