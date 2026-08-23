Function.prototype.myCall = function(thisArg , ...args){
    thisArg = thisArg ?? globalThis
    const key =  Symbol('key')
    thisArg[key] = this
    const result = thisArg[key](...args)
    delete thisArg[key]
    return result
}

Function.prototype.myApply = function(thisArg, argsArray){
    thisArg = thisArg ?? globalThis
    const key = Symbol('key')
    thisArg[key] = this
    const result = thisArg[key](...argsArray)
    delete thisArg[key]
    return result
}

Function.prototype.myBind = function(thisArg,...boundArgs){
    const fn = this
    return function(...args){
        if(new.target){
            return new fn(...boundArgs,...args)
        }
        return fn.apply(thisArg,[...boundArgs,...args])
    }
}