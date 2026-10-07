// 415. 字符串相加
// 考点:字符串 / 模拟 / 双指针
// 难度:Easy

// 思路:模拟竖式加法,双指针从两串末位往左走,短的走完当 0;本位写 sum % 10,进位 Math.floor(sum / 10);最后补进位再反转
// 复杂度:时间 O(max(n,m)) / 空间 O(max(n,m))
// 注意:num1[i] 取出来是字符要转数字;循环判 i >= 0 而非 !== 0,否则走到负数仍为真会死循环;sum / 10 是小数要 Math.floor

var addStrings = function (num1, num2) {
    let i = num1.length - 1
    let j = num2.length - 1
    let carry = 0
    let res = ''

    while (i >= 0 || j >= 0) {
        const n1 = i >= 0 ? Number(num1[i]) : 0
        const n2 = j >= 0 ? Number(num2[j]) : 0
        const sum = n1 + n2 + carry
        res += sum % 10
        carry = Math.floor(sum / 10)
        i--
        j--
    }
    if (carry) res += carry
    return res.split('').reverse().join('')
};
