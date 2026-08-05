// 142. 环形链表 II
// 考点:快慢指针 + 数学推导 / 哈希表
// 难度:Medium

// 思路(两指针版):先用快慢指针找相遇点,再把 slow 重置回 head,两个指针各走 1 步,再次相遇处即环入口
// 复杂度:时间 O(n) / 空间 O(1)

var detectCycle = function (head) {
    let slow = head, fast = head, n = null
    while (fast !== null && fast.next !== null) {
        slow = slow.next
        fast = fast.next.next
        if (slow === fast) {
            n = slow
            break
        }
    }
    if (n === null) return null

    slow = head
    while (slow !== fast) {
        slow = slow.next
        fast = fast.next
    }
    return slow
};

// 思路(Set 版):走过的节点都记下来,第一次重复遇到的节点就是环入口;更好理解,但空间是 O(n)
// 复杂度:时间 O(n) / 空间 O(n)

var detectCycleBySet = function (head) {
    let set = new Set()
    while (head !== null) {
        if (set.has(head)) return head
        set.add(head)
        head = head.next
    }
    return null
};
