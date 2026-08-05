// 160. 相交链表
// 考点:双指针
// 难度:Easy

// 思路:两个指针同时移动,走到链表末尾就换到另一条链表继续;两条链表总路程一样,有交集就必然相遇
// 复杂度:时间 O(m+n) / 空间 O(1)

var getIntersectionNode = function (headA, headB) {
    let a = headA, b = headB
    while (a !== b) {
        a = a ? a.next : headB
        b = b ? b.next : headA
    }
    return a
};
