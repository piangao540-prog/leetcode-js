function deepClone(obj, map = new Map()){
    if(obj === null || typeof obj !== 'object') return obj
    if(map.has(obj)) return map.get(obj) 

    const result = Array.isArray(obj) ? [] : {}
    map.set(obj, result)

    for(const key of Object.keys(obj)){
        result[key] = deepClone(obj[key], map)
    }
    return result
} 