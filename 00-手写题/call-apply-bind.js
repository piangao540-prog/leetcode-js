// 手写 call / apply / bind
// 场景:手动指定函数的 this(call/apply 立即执行,bind 返回新函数)
// 核心:把函数临时挂到 thisArg 上当方法调用,用完删除;bind 还要处理 new(被 new 调用时忽略绑定 this)
// 复杂度:时间 O(1) / 空间 O(1)

Function.prototype.myCall = function (thisArg, ...args) {
    thisArg = thisArg ?? globalThis
    const key = Symbol('key')
    thisArg[key] = this
    const result = thisArg[key](...args)
    delete thisArg[key]
    return result
}

Function.prototype.myApply = function (thisArg, args) {
    thisArg = thisArg ?? globalThis
    const key = Symbol('key')
    thisArg[key] = this
    const result = thisArg[key](...args)
    delete thisArg[key]
    return result
}

Function.prototype.myBind = function (thisArg, ...boundArgs) {
    const fn = this
    function boundFn(...args) {
        return fn.apply(this instanceof boundFn ? this : thisArg, [...boundArgs, ...args])
    }
    boundFn.prototype = fn.prototype
    return boundFn
}

// 自测
const obj = { x: 42 }
function getX(a) { return this.x + a }
console.log(getX.myCall(obj, 8))    // 50
console.log(getX.myApply(obj, [8])) // 50
const bound = getX.myBind(obj, 8)
console.log(bound())                // 50