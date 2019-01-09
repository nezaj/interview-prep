const assert = require('assert')

var trap = function(height) {
    let first = new Array(height.length).fill(0)
    let max = height[0]
    let curr
    for (let i = 1; i < height.length - 1; i++) {
        curr = height[i]
        if (curr > max) { max = curr }
        else { first[i] = max - curr }
    }

    let second = new Array(height.length).fill(0)
    max = height[height.length - 1]
    for (let j = height.length - 2; j > 0; j--) {
        curr = height[j]
        if (curr > max) { max = curr}
        else { second[j] = max - curr }
    }

    let sum = 0;
    console.log(first)
    console.log(second)
    for (let k = 0; k < first.length; k++) {
        sum += Math.min(first[k], second[k])
    }

    return sum

};

const example = [0,1,0,2,1,0,1,3,2,1,2,1]
assert.deepEqual(trap(example), 6)
console.log('All tests pass!')
