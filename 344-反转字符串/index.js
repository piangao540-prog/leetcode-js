// 344. 反转字符串
// 考点:双指针
// 难度:Easy

// 思路:

// 复杂度:时间 _ / 空间 _

var reverseString = function (s) {
    let l = 0
    let r = s.length - 1
    while (l < r) {
        const temp = s[r]
        s[r] = s[l]
        s[l] = temp
        l++
        r--
    }
    return s
}
