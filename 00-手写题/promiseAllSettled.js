// 手写 Promise.allSettled
// 场景:并发多个异步任务,不管成败都要拿到每一份结果(比如批量上传后统计哪些成了、哪些败了)
// 核心:new Promise 包一层,executor 只收 resolve(外层永不失败);成功/失败两个分支都走"先按 i 位置记一笔,再 finish() 计数";count 收齐才 resolve

// 复杂度:时间 O(n) / 空间 O(n)

// 注意:跟 promiseAll 的差别全在语义——all 撞见失败立刻 reject 不等了,allSettled 必须等齐,所以两条路都要记一笔
// 注意:executor 只有一个 resolve;写上 reject 不会报错(永远不调用),但语义上就错了
// 注意:成功记 {status:'fulfilled', value},失败记 {status:'rejected', reason}——字段名一个 value 一个 reason
// 注意:'fulfilled' 是 ful + fill + ed(词根是 fill 填满,不是 full);拼错不报错,只能靠跟原生 API 对拍抓
// 注意:finish() 少调一次就永远不 resolve,程序静默挂死;空数组要单独 resolve([])

function promiseAllSettled(promises) {
    return new Promise((resolve) => {
        const results = []
        let count = 0

        // 这段跟 promiseAll 一模一样,给你写好了
        if (promises.length === 0) {
            resolve(results)
            return
        }

        promises.forEach((p, i) => {
            // "记一笔 + 看看收齐了没",两条路都要走这一步
            const finish = () => {
                count++
                if (count === promises.length) resolve(results)
            }

            Promise.resolve(p).then(
                value => { results[i] = {status: 'fulfilled', value}; finish() },
                reason => { results[i] = {status: 'rejected', reason}; finish() }
            )
        })
    })
}

// 自测:期望
//   [{status:'fulfilled',value:1}, {status:'rejected',reason:'炸了'}, {status:'fulfilled',value:3}]
//   而且【不会】走到 catch
promiseAllSettled([1, Promise.reject('炸了'), Promise.resolve(3)])
    .then(r => console.log(JSON.stringify(r, null, 2)))
    .catch(e => console.log('❌ 不该走到这里:', e))
