// 防抖:连续触发,只执行最后一次(场景:搜索框输入)
// 核心:闭包记住 timer,每次触发先 clearTimeout 再重新计时
// 复杂度:时间 O(1) / 空间 O(1)

function debounce(fn, delay = 300) {
    let time = null
    return function (...args) {
        clearTimeout(time)
        time = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

// 自测:300ms 内连点 3 次,只打印一次
const log = debounce((x) => console.log('debounce 执行:', x), 300)
log(1)
log(2)
log(3)
