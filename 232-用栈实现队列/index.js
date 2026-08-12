// 232. 用栈实现队列
// 考点:栈 / 队列
// 难度:Easy

// 思路:两个栈,输入栈只管进,输出栈只管出;输出栈空时把输入栈整体倒过来(顺序反转),队首就变成输出栈栈顶;只在空时倒,摊还 O(1)
// 复杂度:push O(1) / pop、peek 摊还 O(1) / 空间 O(n)
// 注意:peek 是 length - 1,别越界;empty 要两个栈都空

var MyQueue = function () {
    this.instack = []
    this.outstack = []
};

MyQueue.prototype.push = function (x) {
    this.instack.push(x)
};

MyQueue.prototype.pop = function () {
    if (this.outstack.length === 0) {
        while (this.instack.length) {
            this.outstack.push(this.instack.pop())
        }
    }
    return this.outstack.pop()
};

MyQueue.prototype.peek = function () {
    if (this.outstack.length === 0) {
        while (this.instack.length) {
            this.outstack.push(this.instack.pop())
        }
    }
    return this.outstack[this.outstack.length - 1]
};

MyQueue.prototype.empty = function () {
    return this.instack.length === 0 && this.outstack.length === 0
};
