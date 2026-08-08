// 155. 最小栈
// 考点:栈
// 难度:Medium

// 思路:辅助栈 minStack 与主栈同步进退,每个位置记录"到这一步为止的最小值";getMin 直接看 minStack 栈顶,O(1)
// 复杂度:时间 O(1)(所有操作) / 空间 O(n)
// 注意:类名必须和题目一致(MinStack);length 别拼错

var MinStack = function () {
    this.stack = []
    this.minStack = []
};

MinStack.prototype.push = function (value) {
    this.stack.push(value)
    const min = this.minStack.length === 0
        ? value
        : Math.min(value, this.minStack[this.minStack.length - 1])
    this.minStack.push(min)
};

MinStack.prototype.pop = function () {
    this.stack.pop()
    this.minStack.pop()
};

MinStack.prototype.top = function () {
    return this.stack[this.stack.length - 1]
};

MinStack.prototype.getMin = function () {
    return this.minStack[this.minStack.length - 1]
};