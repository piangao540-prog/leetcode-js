// 节流:固定时间间隔内最多执行一次(场景:滚动、拖拽)
// 核心:时间戳对比,距离上次执行超过 delay 才执行
// 复杂度:时间 O(1) / 空间 O(1)

function throttle(fn, delay = 300) {
    let time = null
    return function (...args) {
        const now = Date.now()
        if (time === null || now - time >= delay) {
            time = now
            fn.apply(this, args)
        }
    }
}

// 自测:立即打印一次,300ms 内再调用不打印
const log2 = throttle((x) => console.log('throttle 执行:', x), 300)
log2(1)
log2(2)
log2(3)
