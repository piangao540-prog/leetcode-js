// 手写 Promise.race
// 场景:并发发起多个异步任务,谁先出结果就用谁——先成功就成功,先失败就失败
// 核心:new Promise 包一层,forEach 里把每个 p 先用 Promise.resolve 统一包装,再 .then(resolve, reject);谁先 settle 谁就先把外层定下来,后面那些因为"状态只能变一次"自动失效

// 复杂度:时间 O(n) / 空间 O(1)(没有 results 数组也没有 count,比 promiseAll 少一个 O(n))

// 注意:跟 promiseAll 就差一件事——all 要"等全部到齐",所以必须有结果数组 + 计数器;race 不等,这两样直接消失
// 注意:.then 的两个回调直接把 resolve / reject 传进去就行,不用包成 value => resolve(value)(绕了一圈做同一件事);当时只包了成功那条、reject 那条直接传,前后不一致
// 注意:数组里可能是普通值('快的'),所以要先 Promise.resolve(p) 包一遍,否则 .then 直接报错
// 注意:race([]) 永远 pending,别去补 if(空) resolve()——空集合没有"第一个";all([]) 才是立刻成功

function promiseRace(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(p => {
            Promise.resolve(p).then(resolve, reject)
        })
    })
}

// 自测
promiseRace([new Promise(r => setTimeout(() => r('慢的'), 100)), '快的']).then(console.log)   // 快的
promiseRace([Promise.reject('先炸的'), new Promise(r => setTimeout(() => r('慢的'), 100))]).catch(console.log)   // 先炸的
