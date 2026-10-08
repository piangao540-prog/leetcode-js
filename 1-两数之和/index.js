// 1. 两数之和
// 考点:数组 / 哈希表
// 难度:Easy

// 思路:边遍历边存"值→下标";对每个 nums[i] 先查 target - nums[i] 在不在表里,在就返回两下标,不在就把自己存进去
// 复杂度:时间 O(n) / 空间 O(n)
// 注意:存的方向是 值→下标 别反了(key 是值,value 是下标);has 只回答"在不在",要拿下标必须用 get;先查后存天然避免同一个元素用两次

var twoSum = function(nums, target) {
    const map = new Map()
    for (let i = 0; i < nums.length; i++) {
        const remain = target - nums[i]
        if (map.has(remain)) {
            return [map.get(remain), i]
        }
        map.set(nums[i], i)
    }
}
