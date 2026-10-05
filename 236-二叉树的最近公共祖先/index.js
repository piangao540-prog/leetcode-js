// 236.二叉树的最近公共祖先
// 考点: 二叉树
// 难度：Medium

// 思路：LCA是自下向上，通过遍历判断左右有没有结点，在判断自己

// 复杂度：时间O(n)/空间O(h)

var lowestCommonAncestor = function (root, p, q) {
    if (!root) return null
    if (root === p || root === q) return root

    const left = lowestCommonAncestor(root.left, p, q)
    const right = lowestCommonAncestor(root.right, p, q)
    if(left && right) return root
    return left || right
}