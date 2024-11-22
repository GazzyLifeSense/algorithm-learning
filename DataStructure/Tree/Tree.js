/*
 * 二叉树
 *
 * Ⅰ 红黑树（二叉搜索树）、多叉树、二叉堆、图、字典树、并查集、线段树都基于二叉树
 * 
 * Ⅱ 不单纯是一种数据结构，更代表着递归的思维方式
 *      比如 回溯算法、BFS 算法、动态规划 本质上也是把具体问题抽象成树结构
 *
 * Ⅲ 根节点：最上方那个没有父节点的节点
 *      父节点：上方直接相连的节点
 *      子节点：每个节点下方直接相连的节点
 *      叶子节点：最下层没有子节点的节点
 *      最大深度/高度：从根节点到最下方叶子节点经过的节点个数
 *      最小深度：从根节点到最近叶子节点的距离
 * 
 * Ⅳ 满二叉树：每一层节点都是满的
 *      深度h，节点个数为2^h - 1
 *          1
 *         / \
 *        2   3
 *       / \  / \
 *      4   5 6  7
 * 
 * Ⅴ 完全二叉树：每一层的节点都紧凑靠左排列，且除了最后一层，其他每层都必须是满的
 *      索引存在明显的规律
 *      完全二叉树的左右子树中，至少有一棵是满二叉树
 *          1
 *         / \
 *        2   3
 *       / \
 *      4   5
 * 
 * Ⅵ 二叉搜索树（Binary Search Tree，BST）：对于树中的每个节点，其左子树的每个节点的值都要小于这个节点的值，右子树的每个节点的值都要大于这个节点的值。
 *      「左小右大」
 *          7
 *         / \
 *        4   9
 *       / \   \
 *      1   5   10
 */
export { TreeNode, BTree, DFS, BFS }

// 最常见的二叉树就是类似链表那样的链式存储结构，每个二叉树节点有指向左右子节点的指针
class TreeNode{
    constructor(x) {
        this.val = x;
        this.left = null;
        this.right = null;
    }
}

class BTree{
    constructor(arr) {
        this.root = null
        this.createRoot(arr)
    }
    
    // 按层依次初始化二叉树节点
    createRoot(arr) {
        const root = new TreeNode()
        const queue = [root]
        // 节点计数
        let count = arr.length - 1
        while (arr.length > 0) {
            let cur = queue.shift()
            const val = arr.shift()

            // 当前节点存在
            if (cur) {
                // 节点赋值
                if (val) cur.val = val
                
                // 若传入值非空，初始化左右子节点，否则置为null；进入队列供后序遍历赋值使用
                if (count > 0) {
                    queue.push(cur.left = arr[(arr.length+(arr.length - count--)) % arr.length] == null ? null : new TreeNode())
                }
                if (count > 0) {
                    queue.push(cur.right = arr[(arr.length+(arr.length - count--)) % arr.length] == null ? null : new TreeNode())
                }
            }
            
        }
        this.root = root
    }
}

// 递归遍历 DFS(Deep First Search, 深度优先遍历)

function DFS(root) {
    let preArr = [], midArr = [], postArr = []

    function traverse(root) {
        if (root == null) return

        // 前序位置
        preArr.push(root.val)

        // 左子树DFS
        traverse(root.left)

        // 中序位置
        midArr.push(root.val)

        // 右子树DFS
        traverse(root.right)

        // 后序位置
        postArr.push(root.val)
    }

    traverse(root)
    console.log(`前序：${preArr}; 中序：${midArr}; 后序：${postArr}`)
    return
}

// 层序遍历 BFS(Breath First Search, 广度优先遍历)  借助队列
function BFS(root) {
    if (root == null) return
    const q = []
    q.push(root)

    // 记录当前层数
    var depth = 1
    while (q.length) {
        // 从队列中依次取出当前层的节点
        const length = q.length
        for (let i = 0; i < length; i++){
            const cur = q.shift()
            console.log(`depth: ${depth}, val: ${cur.val}`)
            // 将当前节点的左右节点进入队列，供下一层遍历使用
            if(cur.left) q.push(cur.left)
            if (cur.right) q.push(cur.right)
        }
        
        depth++
    }
}

/* TEST CODE */
function test() {
    var root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.right.left = new TreeNode(5);
    root.right.right = new TreeNode(6);

    DFS(root)
    BFS(root)
    // 构建出来的二叉树是这样的：
    //     1
    //    / \
    //   2   3
    //  /   / \
    // 4   5   6
    // 前序：124356 、中序：421536、后序：425631
}

function test1() {
    const btree = new BTree([1, 2, 3, 4, null, 5, 6])
    DFS(btree.root)
}