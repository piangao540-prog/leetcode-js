// 102. 二叉树的层序遍历
// 考点:二叉树 / BFS / 队列
// 难度:Medium

// 思路:BFS + 队列。每层开始先记 queue.length(size),只处理这一层的 size 个节点;子节点先左后右入队
// 复杂度:时间 O(n) / 空间 O(n)
// 注意:queue 只装节点,result 只装层,level 只装值;空树返回 []

var levelOrder = function (root) {
    if (!root) return []
    const result = []
    const queue = [root]
    while (queue.length) {
        const size = queue.length
        const level = []
        for (let i = 0; i < size; i++) {
            const node = queue.shift()
            level.push(node.val)
            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
        }
        result.push(level)
    }
    return result
};
