// 125. 验证回文串
// 考点:字符串 / 双指针
// 难度:Easy

// 思路:左右双指针向中间靠,遇到非字母数字就跳过;两侧统一小写后比较,不等即 false
// 复杂度:时间 O(n) / 空间 O(1)
// 注意:空串或全是符号时 l >= r,循环不进入,直接返回 true

var isPalindrome = function (s) {
    let l = 0, r = s.length - 1
    while (l < r) {
        if (!/[a-zA-Z0-9]/.test(s[l])) {
            l++
        } else if (!/[a-zA-Z0-9]/.test(s[r])) {
            r--
        } else if (s[l].toLowerCase() === s[r].toLowerCase()) {
            l++
            r--
        } else {
            return false
        }
    }
    return true
};
