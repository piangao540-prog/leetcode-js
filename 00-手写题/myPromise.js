// 手写 Promise 核心
// 目标:实现 class MyPromise,支持 new MyPromise(executor) 和 .then(onFulfilled, onRejected)
//
// 通过标准:
//   1. executor 同步执行;resolve/reject 立刻改状态
//   2. 状态只能改一次,改成 fulfilled 或 rejected 之后就锁死
//   3. then 的回调必须异步执行(微任务)
//   4. then 可能在状态还没变的时候就被调用 —— 这时要把回调先存起来
//   5. executor 里抛错,要自动走 reject
//
// 踩过的坑:
//   - queueMicrotask(...) 是当场执行的,返回值 undefined;push 要的是函数本体,外面必须再包一层 () =>
//   - 'pending' 拼错成 'pedding' 不会报错,但那个 if 会永远 return,reject 静默失效
//   - this.value 在箭头函数里是"执行时才读",所以 pending 分支存的是引用,不是当时的值

class MyPromise {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    this.fulfilledCallbacks = []
    this.rejectedCallbacks = []

    const resolve = (value) => {
      if (this.state !== 'pending') return // 状态不可逆
      this.state = 'fulfilled'
      this.value = value
      this.fulfilledCallbacks.forEach(cb => cb()) // 把存着的回调放出来
    }

    const reject = (reason) => {
      if(this.state !== 'pending') return
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
    if (this.state === 'fulfilled') {
      // 值已经到手,但回调必须异步执行 → 包进微任务
      queueMicrotask(() => onFulfilled(this.value))
    } else if (this.state === 'rejected') {
      queueMicrotask(() => onRejected(this.reason))
    } else {
      // 状态还是 pending,值还没来:回调先存进数组,等 resolve/reject 那天再放出来
      // 外面这层 () => 不能少 —— 存的是"函数本身",不是"函数执行的结果"
      this.fulfilledCallbacks.push(() => queueMicrotask(() => onFulfilled(this.value)))
      this.rejectedCallbacks.push(() => queueMicrotask(() => onRejected(this.reason)))
    }
  }
}
