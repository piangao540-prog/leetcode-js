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
