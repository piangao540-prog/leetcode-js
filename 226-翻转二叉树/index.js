// 226. 翻转二叉树
// 考点:二叉树 / 递归
// 难度:Easy

// 思路:递归三件套——终止条件(root 为空) → 当前节点交换左右子树 → 递归处理左右
// 复杂度:时间 O(n) / 空间 O(h) h 为树高

var invertTree = function (root) {
    if (root === null) return null
    const middle = root.right
    root.right = root.left
    root.left = middle
    invertTree(root.right)
    invertTree(root.left)
    return root
};
