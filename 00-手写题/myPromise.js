// 手写 Promise 核心
// 目标:实现 class MyPromise,支持 new MyPromise(executor) 和 .then(onFulfilled, onRejected)
//
// 通过标准:
//   1. executor 同步执行;resolve/reject 立刻改状态
//   2. 状态只能改一次,改成 fulfilled 或 rejected 之后就锁死
//   3. then 的回调必须异步执行(微任务)
//   4. then 可能在状态还没变的时候就被调用 —— 这时要把回调先存起来
//   5. executor 里抛错,要自动走 reject
//   6. then 返回【新的 Promise】,上一个回调的返回值决定它的状态
//   7. resolve 进来的是 thenable 时不解包 —— 等它 settle,把里层的值传下去
//
// 踩过的坑:
//   - queueMicrotask(...) 是当场执行的,返回值 undefined;push 要的是函数本体,外面必须再包一层 () =>
//   - 'pending' 拼错成 'pedding' 不会报错,但那个 if 会永远 return,reject 静默失效
//   - this.value 在箭头函数里是"执行时才读",所以 pending 分支存的是引用,不是当时的值
//   - then 里没有 return 时返回 undefined,链式会崩在 Cannot read properties of undefined
//   - 忘了在 resolve 里检测 thenable,链子会把 Promise 对象原样传下去(原生会解包)

class MyPromise {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    this.fulfilledCallbacks = []
    this.rejectedCallbacks = []

    const resolve = (value) => {
      if (this.state !== 'pending') return // 状态不可逆
      // resolve 进来的是 thenable:不解包,等它 settle 后再回来调 resolve
      if (value && typeof value.then === 'function') {
        value.then(resolve, reject)
        return
      }
      this.state = 'fulfilled'
      this.value = value
      this.fulfilledCallbacks.forEach(cb => cb())
    }

    const reject = (reason) => {
      if (this.state !== 'pending') return
      this.state = 'rejected'
      this.reason = reason
      this.rejectedCallbacks.forEach(cb => cb())
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err) // 通过标准第 5 条:executor 抛错自动 reject
    }
  }

  then(onFulfilled, onRejected) {
    // 值穿透:不传参数时,值/错误照样往下传,别断在半路
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }

    // then 必须返回新 Promise:上一个回调的返回值就是它的 resolve 值
    return new MyPromise((resolve, reject) => {
      const callback = (cb, val) => {
        queueMicrotask(() => {
          try {
            resolve(cb(val)) // 回调的返回值 → resolve;如果它是 Promise,上面的解包会接住
          } catch (err) {
            reject(err) // 回调抛错 → reject 新 Promise
          }
        })
      }

      if (this.state === 'fulfilled') {
        callback(onFulfilled, this.value)
      } else if (this.state === 'rejected') {
        callback(onRejected, this.reason)
      } else {
        // 状态还是 pending:回调先存进数组,等 resolve/reject 那天再放出来
        // 外面这层 () => 不能少 —— 存的是"函数本身",不是"函数执行的结果"
        this.fulfilledCallbacks.push(() => callback(onFulfilled, this.value))
        this.rejectedCallbacks.push(() => callback(onRejected, this.reason))
      }
    })
  }
}
