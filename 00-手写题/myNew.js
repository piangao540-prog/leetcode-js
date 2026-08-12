// 手写 new
// 思路:Object.create(fn.prototype) 创建新对象并连上原型,fn.apply(obj, args) 调用构造函数;构造函数返回了对象/函数就返回它,否则返回新对象
// 复杂度:O(1)

function myNew(fn, ...args) {
    const obj = Object.create(fn.prototype)
    const result = fn.apply(obj, args)
    const isObject = result !== null && (typeof result === 'object' || typeof result === 'function')
    return isObject ? result : obj
}
