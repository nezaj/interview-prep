const assert = require('assert')

const bubbleSort = (aList) => {
  if (aList.length < 2) { return aList }
  let temp = null
  for (let i = 0; i < aList.length - 1; i++) {
    for (let j = i + 1; j < aList.length; j++) {
      if (aList[j - 1] > aList[j]) {
        temp = aList[j - 1]
        aList[j - 1] = aList[j]
        aList[j] = temp
      }
    }
  }

  return aList
}

const selectionSort = (aList) => {
  if (aList.length < 2) { return aList }
  let temp = null
  for (let i = 0; i < aList.length - 1; i++) {
    for (let j = i + 1; j < aList.length; j++) {
      if (aList[j] < aList[i]) {
        temp = aList[i]
        aList[i] = aList[j]
        aList[j] = temp
      }
    }
  }

  return aList
}

const insertionSort = (aList) => {
  if (aList.length < 2) { return aList }

  let temp = null
  let j = null
  let inserted = null
  for (let i = 1; i < aList.length; i++) {
    j = i
    inserted = false
    while (!inserted && j > 0) {
      if (aList[j] < aList[j - 1]) {
        temp = aList[j]
        aList[j] = aList[j - 1]
        aList[j - 1] = temp
        j--
      } else {
        inserted = true
      }
    }
  }

  return aList
}

const mergeSort = (aList) => {
  if (aList.length < 2) { return aList }

  const mid = Math.floor(aList.length / 2)
  const left = mergeSort(aList.slice(0, mid))
  const right = mergeSort(aList.slice(mid))

  return merge(left, right)
}

const merge = (left, right) => {
  let res = []
  let done = false
  let l_index = 0
  let r_index = 0
  while (!done) {
    if (l_index < left.length && r_index < right.length) {
      if (left[l_index] < right[r_index]) {
        res.push(left[l_index])
        l_index++
      } else {
        res.push(right[r_index])
        r_index++
      }
    } else if (l_index < left.length) {
      left.slice(l_index).forEach(x => res.push(x))
      done = true
    } else {
      right.slice(r_index).forEach(x => res.push(x))
      done = true
    }
  }

  return res
}

const quickSort = (aList) => {
  if (aList.length < 2) { return aList }

  const pivot = aList[0]
  let left = []
  let right = []
  aList.slice(1).forEach(x => x < pivot ? left.push(x) : right.push(x) )

  return [].concat(
    quickSort(left),
    pivot,
    quickSort(right),
  )
}

const x = [2, -1, 3, 8]

// Tests bubbleSort
assert.deepEqual(bubbleSort(x), [-1, 2, 3, 8])

// Tests selectionSort
assert.deepEqual(selectionSort(x), [-1, 2, 3, 8])

// Tests insertionSort
assert.deepEqual(insertionSort(x), [-1, 2, 3, 8])

// Tests mergeSort
assert.deepEqual(mergeSort(x), [-1, 2, 3, 8])

// Tests quickSort
assert.deepEqual(quickSort(x), [-1, 2, 3, 8])

console.log('All tests pass!')
