// 739. 每日温度
// 考点:栈 / 单调栈
// 难度:Medium

// 思路:单调栈存下标(栈底到栈顶温度递减);遍历时,当前温度比栈顶大就把栈顶弹出并算出答案(下标差);每个元素进出栈一次
// 复杂度:时间 O(n) / 空间 O(n)

var dailyTemperatures = function (temperatures) {
    const n = temperatures.length
    const answer = new Array(n).fill(0)
    const stack = []
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prev = stack.pop()
            answer[prev] = i - prev
        }
        stack.push(i)
    }
    return answer
};