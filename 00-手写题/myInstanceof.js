// 手写 instanceof
// 思路:沿着 a 的原型链往上找 b.prototype,找到返回 true,到 null 还没找到返回 false
// 注意:比较用 ===,别写成 =

function myInstanceof(a, b) {
    let proto = Object.getPrototypeOf(a)
    while (proto !== null) {
        if (proto === b.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
    return false
}
