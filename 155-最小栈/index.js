// 155. 最小栈
// 考点:栈
// 难度:Medium

// 思路:
// 复杂度:

var MinStack = function () {
    // 这里初始化你要用的东西
    this.stack = []
    this.minstack = []
};

MinStack.prototype.push = function (value) {
    this.stack.push(value)
    if (this.minstack.length === 0) {
        this.minstack.push(value)
    } else {
        this.minstack.push(Math.min(value, this.minstack[this.minstack.length - 1]))
    }
};

MinStack.prototype.pop = function () {
    this.stack.pop()
    this.minstack.pop()
};

MinStack.prototype.top = function () {
    return this.stack[this.stack.length - 1]
};

MinStack.prototype.getMin = function () {
    return this.minstack[this.minstack.length - 1]
};
