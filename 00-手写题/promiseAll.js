// 手写 Promise.all
// 场景:并发请求多个异步任务,全部成功才继续(任一失败立即失败)
// 核心:new Promise 包一层;Promise.resolve 统一包装输入;成功按下标存结果并计数,最后一个完成才 resolve;reject 直接透传,状态只能变一次天然 fail-fast
// 复杂度:时间 O(n) / 空间 O(n)

function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = []
        let count = 0

        if (promises.length === 0) {
            resolve(results)
            return
        }

        promises.forEach((p, i) => {
            Promise.resolve(p).then(value => {
                results[i] = value
                count++
                if (count === promises.length) {
                    resolve(results)
                }
            }, reject)
        })
    })
}

// 自测
promiseAll([Promise.resolve(1), 2, Promise.resolve(3)]).then(console.log) // [1, 2, 3]
promiseAll([Promise.reject('fail'), Promise.resolve(1)]).catch((e) => console.log('caught:', e)) // caught: fail