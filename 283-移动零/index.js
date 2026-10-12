// 283. 移动零
// 考点:双指针
// 难度:Easy

// 思路:slow 指"下一个非零该去的位置",fast 从头扫到尾;扫到非零就跟 slow 处交换,顺手把 0 甩到后面
// 复杂度:时间 O(n) / 空间 O(1)
// 注意:交换法比"覆盖再补零"更省事——0 会被自动换到尾部,不用收尾循环;if(fast !== slow) 只是省掉"自己跟自己换"的无用功
// 注意:slow 是下标不是元素值;遇到第一个 0 之后 slow 和 fast 的距离只增不减,所以快指针不能写成 i+1

var moveZeroes = function(nums) {
    let slow = 0
    for(let fast = 0; fast < nums.length; fast++){
        if(nums[fast] !== 0){
            if(fast !== slow){
                const temp = nums[fast]
                nums[fast] = nums[slow]
                nums[slow] = temp
            }
            slow++
        }
    }
    return nums
};
