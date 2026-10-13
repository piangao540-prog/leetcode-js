// 26. 删除有序数组中的重复项
// 考点:双指针(快慢指针)
// 难度:Easy

// 给你一个【非严格递增】排列的数组 nums,请你【原地】删除重复出现的元素,使每个元素只出现一次
// 返回删除后数组的新长度。元素的相对顺序应该保持一致
// 不要使用额外的数组空间,必须原地修改输入数组,并在 O(1) 额外空间的条件下完成

// 示例:
// 输入:nums = [1,1,2]
// 输出:2,nums 前两项为 [1,2]
//
// 输入:nums = [0,0,1,1,1,2,2,3,3,4]
// 输出:5,nums 前五项为 [0,1,2,3,4]

// 思路:slow 指"已去重部分的最后一个元素"的下标(初始 0,nums[0] 天然保留),fast 从 1 往后扫;nums[fast] 跟 nums[slow] 不等就是新值,slow 先 ++ 再把新值盖到 nums[slow];相等就是重复,跳过
// 复杂度:时间 O(n) / 空间 O(1)(只有 slow、fast 两个数字变量,没开新数组)

// 注意:返回的是"长度"不是数组,而 slow 是下标,所以 return slow + 1(下标 0 那个也算有效)
// 注意:空数组要单独挡——公式"长度 = slow + 1"隐含前提是"nums[0] 天然保留",空数组里根本没有 nums[0],slow 的 0 会凭空变出 1
// 注意:只跟 nums[slow] 比就够,全靠"非严格递增"——相等的元素必然挨在一起,不可能出现"跟更前面相等却跟 slow 不等"
// 注意:跟 283 的分工——283 用交换(0 还要留着,只是挪位置),这题重复项是废品,直接覆盖,少三行 temp;fast 从 1 起步而不是 0,就是默认收下了 nums[0]

var removeDuplicates = function (nums) {
    if(nums.length === 0) return 0
    let slow = 0
    for(let fast = 1; fast < nums.length; fast++){
        if(nums[fast] !== nums[slow]){
            slow++
            nums[slow] = nums[fast]
        }
    }
    return slow + 1
}
