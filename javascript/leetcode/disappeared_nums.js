/** https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        const val = Math.abs(nums[i])
        nums[val - 1] = -1 * Math.abs(nums[val - 1])
    }

    return nums.map((x, idx) => x > 0 ? idx + 1: null).filter(x => x)
};
