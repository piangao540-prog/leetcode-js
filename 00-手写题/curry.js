// 手写柯里化 curry
// 场景:把多参数函数变成可以逐个传参的形式
// 核心:返回一个收集参数的函数;每次调用都判断"参数够不够"(args.length >= fn.length);够了执行 fn,不够返回新函数继续收

// 复杂度:时间 O(1) 每次调用 / 空间 O(n) 参数

// 注意:够了要调 fn 不是 curried,否则无限递归
// 注意:fn.length 是形参个数(不含默认值和 rest 参数)
// 注意:新参数要和旧参数合并后再交给 curried 判断,用 [...args, ...next]

function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args)
        }
        return function (...next) {
            return curried(...args, ...next)
        }
    }
}

// 自测
const add = (a, b, c) => a + b + c
const curried = curry(add)
console.log(curried(1)(2)(3))
console.log(curried(1, 2)(3))
console.log(curried(1)(2, 3))
console.log(curried(1, 2, 3))
