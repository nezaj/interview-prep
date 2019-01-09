/* 4.2 Minimal Tree */
const assert = require('assert')

const minTree = (aList) => {
  if (aList.length < 2) { return aList }

  const mid = Math.floor((aList.length + 1) / 2) - 1
  const root = aList[mid]
  const left = minTree(aList.slice(0, mid))
  const right = minTree(aList.slice(mid + 1, aList.length))
  return [].concat(root, left, right)
}

const e1 = [1, 2, 3, 4, 5, 6, 7]
const a1 = [4, 2, 1, 3, 6, 5, 7]
assert.deepEqual(minTree(e1), a1)

const e2 = [1, 2, 3, 4, 5, 6]
const a2 = [3, 1, 2, 5, 4, 6]
assert.deepEqual(minTree(e2), a2)

console.log('All tests pass')
