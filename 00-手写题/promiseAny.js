// 手写 Promise.any
// 场景:并发多个异步任务,只要有一个成功就要结果(比如多镜像源取数据,谁先成功用谁)
// 核心:成功那条路直接 resolve,一次成功就定局,后面的自动失效、不用计数;失败那条路才记 errors[i] + 计数,count 收满才 reject(AggregateError)

// 复杂度:时间 O(n) / 空间 O(n)(errors 数组)

// 注意:骨架同 allSettled,最大分歧是——成功分支什么都不用存,直接 resolve
// 注意:count 必须是 let;而且它只能放在失败回调里 ++,放到 forEach 同步体里会瞬间数满
// 注意:errors 用下标 i 存,保证跟输入顺序一致(按完成顺序 push 就乱了)
// 注意:空数组立刻 reject,不是 resolve——跟 all([]) 立刻成功、race([]) 永远 pending 都不一样
// 注意:AggregateError 是 ES2021 内置的,错误挂在 .errors 上

function promiseAny(promises) {
    return new Promise((resolve, reject) => {
        const errors = []
        let count = 0

        if (promises.length === 0) {
            reject(new AggregateError([], 'All promises were rejected'))
            return
        }

        promises.forEach((p, i) => {
            Promise.resolve(p).then(
                value => resolve(value),
                reason => {
                    errors[i] = reason
                    count++
                    if (count === promises.length) {
                        reject(new AggregateError(errors, 'All promises were rejected'))
                    }
                }
            )
        })
    })
}

// 自测
promiseAny([Promise.reject('a'), Promise.resolve(2)]).then(console.log)   // 2
promiseAny([Promise.reject('a'), Promise.reject('b')]).catch(e => console.log(e.errors))   // ['a','b']
