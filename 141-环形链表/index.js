// 141. 环形链表
// 考点:快慢指针
// 难度:Easy

// 思路:慢指针每次走 1 步,快指针每次走 2 步,有环则必会追上;快指针走到 null 则无环
// 复杂度:时间 O(n) / 空间 O(1)

var hasCycle = function (head) {
    let slow = head, fast = head
    while (fast !== null && fast.next !== null) {
        slow = slow.next
        fast = fast.next.next
        if (slow === fast) {
            return true
        }
    }
    return false
};
