// 20. 有效的括号
// 考点:字符串 / 栈
// 难度:Easy

// 思路:左括号入栈;遇右括号就弹栈顶比对,不匹配立刻 false;遍历完栈必须为空才算有效
// 复杂度:时间 O(n) / 空间 O(n)
// 注意:Map 的 key 是右括号,所以 map.has(ch) 问的就是"它是不是右括号";return 要放在循环外面,得等全部字符处理完才能判断栈空

var isValid = function(s) {
    const map = new Map([
        ['}','{'],
        [']','['],
        [')','(']
    ])

    const sum = []
    const n = s.length
    if(n % 2 !== 0) return false

    for(const i of s){
        if(map.has(i)){
            if(sum.pop() !== map.get(i)){
                return false
            }
        }else{
            sum.push(i)
        }
    }
    return sum.length === 0
};
