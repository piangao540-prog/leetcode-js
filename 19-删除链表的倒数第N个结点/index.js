// 19. 删除链表的倒数第 N 个结点
// 考点:链表 / 双指针
// 难度:Medium

// 思路(解法一·两遍遍历):先数出链表长度 len,再从哑节点出发走 len-n 步,停在要删节点的前一个,改 next 跳过它
// 复杂度:时间 O(n) / 空间 O(1)
// 关键:哑节点 dummy 统一处理"删头节点"的边界

var removeNthFromEnd = function (head, n) {
    let cur = head
    let len = 0
    while (cur !== null) {
        cur = cur.next
        len++
    }
    const dummy = new ListNode(0, head)
    cur = dummy
    for (let i = 0; i < len - n; i++) {
        cur = cur.next
    }
    cur.next = cur.next.next
    return dummy.next
};

// 思路(解法二·一遍遍历):快指针先走 n+1 步,再和慢指针一起走;快指针到 null 时,慢指针正好停在删除点前一个
// 复杂度:时间 O(n) / 空间 O(1)

// var removeNthFromEnd = function (head, n) {
//     const dummy = new ListNode(0, head)
//     let slow = dummy, fast = dummy
//     for (let i = 0; i <= n; i++) {
//         fast = fast.next
//     }
//     while (fast !== null) {
//         slow = slow.next
//         fast = fast.next
//     }
//     slow.next = slow.next.next
//     return dummy.next
// };