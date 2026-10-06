// 14. 最长公共前缀
// 考点:字符串 / 遍历
// 难度:Easy

// 思路:拿第一个字符串当基准 head,逐个和后面的比;对不上就砍掉 head 末位,直到匹配或砍空
// 复杂度:时间 O(n*m),n 为字符串个数,m 为最短串长度 / 空间 O(1)
// 注意:任何字符串都以空串开头,startsWith('') 恒为 true;所以 head 砍空后要提前返回

var longestCommonPrefix = function (strs) {
    if (strs.length === 0) return ""
    let head = strs[0]
    for (let i = 1; i < strs.length; i++) {
        while (!strs[i].startsWith(head)) {
            head = head.slice(0, -1)
            if (head === '') return ''
        }
    }
    return head
};
