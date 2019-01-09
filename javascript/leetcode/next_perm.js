/** https://leetcode.com/problems/next-permutation/
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
    let decrease = null
    let i = nums.length - 1
    while (decrease == null && i > 0) {
        if (nums[i - 1] < nums[i]) { decrease = i - 1 }
        else { i-- }
    }

    if (decrease != null) {
        let increase = null
        let j = nums.length - 1
        while (increase == null && j > decrease) {
            if (nums[j] > nums[decrease]) { increase = j }
            else { j-- }
        }

        swap(nums, decrease, increase)
        return reverse(nums, decrease + 1)
    }

    else { return reverse(nums, 0) }
};

var reverse = function(nums, start) {
    let i = start
    let j = nums.length - 1
    for (let i = start, j = nums.length - 1; i < j; i++, j--) {
        swap(nums, i, j)
    }

    return nums
}

var swap = function(nums, i, j) {
    const temp = nums[i]
    nums[i] = nums[j]
    nums[j] = temp
}
