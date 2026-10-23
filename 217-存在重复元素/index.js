// 217. 存在重复元素
// 考点:Set / 哈希
// 难度:Easy

// 题目:任一值出现至少两次返回 true,否则 false
// 示例:[1,2,3,1] → true;[1,2,3,4] → false

// 思路:
// 复杂度:

var containsDuplicate = function(nums) {
    const n = nums.length
    const set = new Set()
    if(n === 0) return false
    for(let i of nums){
        if(set.has(i)){
            return true
        }else{
            set.add(i)
        }
    }
    return false
};
