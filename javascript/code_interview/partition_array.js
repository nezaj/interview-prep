/*
 * Parition Array
 * Given an array and a pivot, write a function that moves all elements less
 * than the pivot to the left and all elements greater than or equal to the
 * pivot to the right
*/
const assert = require('assert')

const partition = (aList, pivot) => {
  let pivotIndex = aList.indexOf(pivot)
  let insertIndex = null
  let succesorIndex = pivotIndex
  let predecessorIndex = pivotIndex
  if (pivotIndex === -1) { return aList }

  aList.forEach((val, i) => {
    if (val > pivot && i < pivotIndex) {
      // ------------------------------------------------------
      // Handle case where bigger value is to the left of pivot
      // ------------------------------------------------------

      // Swap values
      insertIndex = pivotIndex
      aList[insertIndex] = val
      aList[i] = pivot
      pivotIndex = i

      // Update successorIndex if needed
      if (aList[insertIndex] < aList[succesorIndex]) {
        successorIndex = insertIndex
      }

      // Swap pivot with successor if needed
      if (succesorIndex && succesorIndex < pivotIndex) {
        aList[pivotIndex] = aList[succesorIndex]
        aList[succesorIndex] = pivot
        pivotIndex = successorIndex
        successorIndex = i
      }
    } else if (val < pivot && i > pivotIndex) {
      // ------------------------------------------------------
      // Handle case where smaller value is to the right of pivot
      // ------------------------------------------------------

      // Swap values
      insertIndex = pivotIndex
      aList[insertIndex] = val
      aList[i] = pivot
      pivotIndex = i

      // Update predecessorIndex if needed
      if (aList[insertIndex] > aList[predecessorIndex]) {
        predecessorIndex = insertIndex
      }

      // Swap pivot with predecessor if needed
      if (predecessorIndex && predecessorIndex > pivotIndex) {
        aList[pivotIndex] = aList[predecessorIndex]
        aList[predecessorIndex] = pivot
        pivotIndex = predecessorIndex
        predecessorIndex = i
      }
    } else { /* Do nothing */ }
    console.log(aList)
    console.log(`pivotIndex: ${pivotIndex} successorIndex: ${succesorIndex}`)
  })

  return aList
}

// Works regardless of order of elements
// assert.deepEqual(partition([1, 2, 3,], 1), [1, 2, 3])
// assert.deepEqual(partition([3, 2, 1], 1), [1, 2, 3])
// assert.deepEqual(partition([2, 3, 1], 1), [1, 3, 2])

// Handles more complex cases
assert.deepEqual(partition([2, 17, 16, 21, 9, 1], 17), [2, 16, 9, 17, 1, 21])
// assert.deepEqual(partition([2, 9, 16, 18, 17, 15], 15), [2, 9, 15, 18, 17, 16])

console.log('All tests pass!')
