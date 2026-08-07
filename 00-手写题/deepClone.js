// 深拷贝:每一层都复制,副本与原件互不影响
// 核心:基本类型直接返回;对象/数组递归;Map 登记已复制对象防循环引用
// 复杂度:时间 O(n) / 空间 O(n),n 为节点总数

function deepClone(obj, map = new Map()) {
    if (obj === null || typeof obj !== 'object') return obj
    if (map.has(obj)) return map.get(obj)
    const result = Array.isArray(obj) ? [] : {}
    map.set(obj, result)
    for (const key of Object.keys(obj)) {
        result[key] = deepClone(obj[key], map)
    }
    return result
}

// 自测:副本的嵌套对象和循环引用都不指向原件
const a = { name: 'a', info: { age: 21 } }
a.self = a
const copy = deepClone(a)
console.log('嵌套对象独立:', copy.info === a.info)   // false
console.log('循环引用独立:', copy.self === a)        // false
