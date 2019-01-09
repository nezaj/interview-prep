/* Binary Tree ADT */
// ---------------------------------------------------------------------------
const assert = require('assert')

const buildTree = (aList) => {
  const nodes = aList.map(v => new BinTreeNode(v))
  return new BinTree(nodes)
}

// Classes
// --------------------------------------------------------------------------
class BinTreeNode {
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
  }
}

class BinTree {
  constructor(data) {
    this.head = null
    if (Array.isArray(data)) {
      this.extend(data)
    } else {
      this.insert(data)
    }
  }

  insert(node) {
    if (this.head == null) {
      this.head = node
    } else {
      let explore = [this.head]
      let current = null
      let done = false
      while (!done) {
        current = explore.shift()
        if (current.left == null) { current.left = node; done = true }
        else if (current.right == null) { current.right = node; done = true }
        else { explore.push(current.left, current.right) }
      }

      return null
    }
  }

  extend(aList) {
    aList.forEach(node => this.insert(node))
    return null
  }

  traverse(node=this.head) {
    if (node == null) { return [] }
    let explore = [this.head]
    let current = null
    let res = []
    while (explore.length > 0) {
      current = explore.shift()
      res.push(current.key)
      current.left ? explore.push(current.left) : null
      current.right ? explore.push(current.right) : null
    }

    return res
  }

}

module.exports = {
  buildTree,
  BinTree,
  BinTreeNode,
}
