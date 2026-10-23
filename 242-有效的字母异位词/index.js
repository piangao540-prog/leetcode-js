// 242. 有效的字母异位词
// 考点:哈希计数
// 难度:Easy

// 题目:两个字符串字母种类和数量都相同、只是顺序不同,返回 true,否则 false
// 示例:"anagram" 和 "nagaram" → true;"rat" 和 "car" → false

// 思路:
// 复杂度:

var isAnagram = function (s, t) {
    if (s.length !== t.length) return false

    const count = {}

    for (const i of s) {
        count[i] = (count[i] || 0) + 1
    }

    for (const i of t) {
        if (!count[i]) return false
        count[i]--
    }

    for (const i in count) {
        if (count[i] !== 0) return false
    }

    return true
}
