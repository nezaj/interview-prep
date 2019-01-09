const assert = require('assert')
// const Tree = require('../../ds')
// const BinTree = Tree.BinTree
// const buildTree = Tree.buildTree

const {buildTree, BinTree, BinTreeNode} = require('./binTree')

const n1 = new BinTreeNode(1)
// const n4 = new BinTreeNode(4)
// const n6 = new BinTreeNode(6)
// const n7 = new BinTreeNode(7)
// const n8 = new BinTreeNode(8)
//
// const missing = new BinTreeNode(16)

const t1 = new BinTree(n1)
assert.deepEqual(t1.traverse(), [1])

const t2 = buildTree([1, 4, 6, 7, 8])
assert.deepEqual(t2.traverse(), [1, 4, 6, 7, 8])

console.log('All tests pass!')
