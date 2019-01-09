/* Binary Search Tree ADT */
// ---------------------------------------------------------------------------
const assert = require('assert')

class BinarySearchTreeNode {
  constructor(value, left=null, right=null) {
    this.key = value
    this.left = left
    this.right = right
  }
}

class BinarySearchTree {
  constructor(data) {
    this.head = null
    if (Array.isArray(data)) {
      this.extend(data)
    } else {
      this.insert(data)
    }
  }

  insert(value) {
    const newNode = new BinarySearchTreeNode(value)
    if (this.head === null) {
      this.head = newNode
      return null;
    }

    let current = this.head
    while (true) {
      if (value < current.key) {
        // go left
        if (!current.left) {
          current.left = newNode
          return null
        } else {
          current = current.left
        }
      } else {
        // go right
        if (!current.right) {
          current.right = newNode
          return null
        } else {
          current = current.right
        }
      }
    }
  }

  extend(data) {
    data.forEach(n => this.insert(n))
    return null
  }

  predecessor(value) {
    if (!this.head) { return -1 }

    let prev = -1
    let current = this.head
    while (current) {
      if (current.key < value) {
        prev = current.key
        current = current.right
      } else {
        current = current.left
      }
    }

    return prev
  }

  successor(value) {
    if (!this.head) { return -1 }

    let next = -1
    let current = this.head
    while (current) {
      if (value < current.key) {
        next = current.key
        current = current.left
      } else {
        current = current.right
      }
    }

    return next
  }

  traverse() {
    // Performs in-order traversal
    if (this.head == null) { return [] }

    let res = []
    let explore = [this.head]
    let current = null
    let seen = new Set()
    while (explore.length > 0) {
      current = explore.pop()
      if (!current.left || seen.has(current.left)) {
        res.push(current.key)
        current.right ? explore.push(current.right) : null
      } else {
        seen.add(current.left)
        explore.push(current, current.left)
      }
    }

    return res
  }

  recur_traverse(node = this.head) {
    // Performs in-order traversal using recursion
    if (node == null) { return [] }
    return [].concat(
      this.recur_traverse(node.left),
      node.key,
      this.recur_traverse(node.right)
    )
  }

  preOrder(node=this.head) {
    // Performs pre-order traversal using recursion
    if (node === null) { return [] }
    return [].concat(
      node.key,
      this.preOrder(node.left),
      this.preOrder(node.right),
    )
  }
}

module.exports = {
  BinarySearchTree,
  BinarySearchTreeNode,
}
