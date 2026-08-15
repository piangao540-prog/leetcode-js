// 101. 对称二叉树
// 考点:二叉树 / 递归
// 难度:Easy

// 思路:check 永远比较一对"镜像节点"——都空则对称,一个空或值不等则不对称;递归比较 a.left 对 b.right、a.right 对 b.left
// 复杂度:时间 O(n) / 空间 O(h) h 为树高
// 注意:空树返回 true(边界常考);对象用 === 比的是引用,要比值用 .val

var isSymmetric = function (root) {
    if (root === null) return true
    return check(root.left, root.right)
};

function check(a, b) {
    if (a === null && b === null) return true
    if (a === null || b === null) return false
    if (a.val !== b.val) return false
    return check(a.left, b.right) && check(a.right, b.left)
}
