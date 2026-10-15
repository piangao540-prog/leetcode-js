// 手写 Promise.allSettled
// 场景:并发多个异步任务,不管成败都要拿到每一份结果(比如批量上传后统计哪些成了、哪些败了)
// 核心:

// 复杂度:时间 _ / 空间 _

function promiseAllSettled(promises) {
    // 空1:new Promise 的这个函数收【几个】参数?为什么?
    return new Promise((______) => {
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
                value => { /* 空2:成功这条路 */ },
                reason => { /* 空3:失败这条路 */ }
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
