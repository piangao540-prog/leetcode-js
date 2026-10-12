// 21. 合并两个有序链表
// 考点:链表 / 双指针
// 难度:Easy

// 思路:双指针各指一条链表的头,比 val 谁小就接谁;被接的那个指针往后走一格,另一个原地不动
// 复杂度:时间 O(m+n) / 空间 O(1)
// 注意:dummy 假头是为了消灭"第一个节点"这个特殊情况——不然每接一个都得判 tail 是否为 null;忘了 new 会崩(this 落到全局、函数返回 undefined)
// 注意:while 在一条链表走完时就停,剩下的整支接上去(tail.next = p1 || p2),漏了会丢尾巴

// 将两个升序链表合并为一个新的升序链表并返回
// 新链表是通过拼接给定的两个链表的所有节点组成的

// 示例:
// 输入:1->2->4, 1->3->4
// 输出:1->1->2->3->4->4

// 链表节点(LeetCode 已提供,写出来是为了本地能跑)
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

var mergeTwoLists = function(list1, list2) {
    const dummy = new ListNode(0)
    let tail = dummy
    let p1 = list1
    let p2 = list2

    while(p1 && p2){
        if(p1.val <= p2.val){
            tail.next = p1
            tail = p1
            p1 = p1.next
        }else{
            tail.next = p2
            tail = p2
            p2 = p2.next
        }
    }
    tail.next = p1 || p2
    return dummy.next
};
