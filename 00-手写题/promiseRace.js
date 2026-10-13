// 手写 Promise.race
// 场景:并发发起多个异步任务,谁先出结果就用谁——先成功就成功,先失败就失败
// 核心:

// 复杂度:时间 _ / 空间 _

function promiseRace(promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(p => {
            // ← 这里填一行
        })
    })
}

// 自测
promiseRace([new Promise(r => setTimeout(() => r('慢的'), 100)), '快的']).then(console.log)   // 快的
promiseRace([Promise.reject('先炸的'), new Promise(r => setTimeout(() => r('慢的'), 100))]).catch(console.log)   // 先炸的
