/* Heap ADT */
// ---------------------------------------------------------------------------
const assert = require('assert')

class HeapNode {
  constructor(value, parent=null, left=null, right=null) {
    this.key = value
    this.parent = parent
    this.left = left
    this.right = right
  }
}

class MinHeap {
  constructor(data) {
    this.head = null
    if (Array.isArray(data)) {
      this.extend(data)
    } else {
      this.insert(data)
    }
  }

  insert(value) {
    const newNode = new HeapNode(value)
    if (this.head == null) {
      this.head = newNode
      return null
    }

    // Insert node at bottom level of heap
    let current = null
    let explore = [this.head]
    while (!newNode.parent) {
      current = explore.shift()
      if (!current.left) {
        current.left = newNode
        newNode.parent = current
      } else if (!current.right) {
        current.right = newNode
        newNode.parent = current
      } else {
        explore.push(current.left, current.right)
      }
    }

    // Swap up as needed
    let finishSwap = false
    let parent = newNode.parent
    let child = newNode
    let temp = null
    while (!finishSwap) {
      if (parent && child.key < parent.key) {
        temp = {...parent}
        parent.key = child.key
        child.key = temp.key

        child = parent
        parent = temp.parent
      } else {
        finishSwap = true
      }
    }

    return null
  }

  extend(aList) {
    aList.forEach(n => this.insert(n))
    return null
  }

  extractMin() {
    if (this.head == null) { return null }
    const extracted = this.head.key

    // Find bottom-most node
    let explore = [this.head]
    let found = null
    let current = null
    while (!found) {
      current = explore.shift()
      if (current.left) { explore.push(current.left) }
      if (current.right) { explore.push(current.right) }
      if (explore.length === 0) { found = current }
    }

    // Move bottom-most key to head
    this.head.key = found.key
    const foundParent = found.parent
    foundParent.left.key === found.key
      ? foundParent.left = null
      : foundParent.right = null

    // Swap down as needed
    let finishSwap = false
    let temp = null
    let smaller = null
    let parent = this.head
    while (!finishSwap) {
      if (!parent.left) {
        finishSwap = true
      } else if (parent.left && !parent.right) {
        if (parent.key > parent.left.key) {
          temp = {...parent}
          parent.key = parent.left.key
          parent.left.key = temp.key
          parent = temp.left
        } else {
          finishSwap = true
        }
      } else {
        smaller = parent.left.key < parent.right.key
          ? parent.left
          : parent.right
        if (parent.key > smaller.key) {
          temp = {...parent}
          parent.key = smaller.key
          if (smaller.key === parent.left.key) {
            parent.left.key = temp.key
            parent = temp.left
          } else {
            parent.right.key = temp.key
            parent = temp.right
          }
        } else {
          finishSwap = true
        }
      }
    }

    return extracted
  }

  traverse() {
    // left-to-right traversal by levels
    if (this.head == null) { return [] }

    let res = []
    let explore = [this.head]
    let current = null
    while (explore.length > 0) {
      current = explore.shift()
      if (current.left != null) { explore.push(current.left) }
      if (current.right != null) { explore.push(current.right) }
      res.push(current.key)
    }

    return res
  }
}

// It can insert a node
// ---------------------------------------------------------------------------
const one = new MinHeap([1])
assert.deepEqual(one.traverse(), [1])

// Inserts things in correct order
// ---------------------------------------------------------------------------
const three = new MinHeap([16, 27, 4])
assert.deepEqual(three.traverse(), [4, 27, 16])

const random = new MinHeap([16, 27, 4, 7, 80])
assert.deepEqual(random.traverse(), [4, 7, 16, 27, 80])

// Extracts things correctly
// ---------------------------------------------------------------------------
const del = new MinHeap([16, 27, 4, 7, 80])
assert.deepEqual(del.extractMin(), 4)
assert.deepEqual(del.traverse(), [7, 27, 16, 80])
assert.deepEqual(del.extractMin(), 7)
assert.deepEqual(del.traverse(), [16, 27, 80])
assert.deepEqual(del.extractMin(), 16)
assert.deepEqual(del.traverse(), [27, 80])

console.log('All tests pass!')
