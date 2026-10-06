// 236. 二叉树的最近公共祖先
// 考点:二叉树 / 递归 / 后序遍历
// 难度:Medium

// 思路:后序递归,自底向上。左右子树都找到目标则当前节点即 LCA,否则把找到的那个往上报
// 复杂度:时间 O(n) / 空间 O(h),h 为树高;链状树最坏退化成 O(n)
// 注意:左右都为空时要返回 null 不是 root(踩过这个坑);root === p 时可直接返回,不用管 q 在不在下面

var lowestCommonAncestor = function (root, p, q) {
    if (!root) return null
    if (root === p || root === q) return root

    const left = lowestCommonAncestor(root.left, p, q)
    const right = lowestCommonAncestor(root.right, p, q)
    if(left && right) return root
    return left || right
}