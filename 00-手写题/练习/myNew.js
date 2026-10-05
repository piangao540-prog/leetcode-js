function myNew(fn,...args){
    const obj = Object.create(fn.prototype)
    const result = fn.apply(obj,args)
    const isObject = (typeof result === 'object' || typeof result === 'function') && result !== null
    return isObject ? result : obj
}