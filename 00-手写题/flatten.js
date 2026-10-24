// 手写数组扁平化
// 场景:把任意层级的嵌套数组压成一维
// 核心:

// 复杂度:

// 注意:

function flatten(arr) {
    const results = []
    for(const i of arr){
        if(Array.isArray(i)){
            results.push(...flatten(i))
        }else{
            results.push(i)
        }
    }
    return results
}

// 自测
console.log(flatten([1, [2, [3, [4]]]]))
