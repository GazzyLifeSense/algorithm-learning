/*
 * 二叉树
 *
 * Ⅰ 红黑树（二叉搜索树）、多叉树、二叉堆、图、字典树、并查集、线段树都基于二叉树
 * 
 * Ⅱ 不单纯是一种数据结构，更代表着递归的思维方式
 *      比如 回溯算法、BFS 算法、动态规划 本质上也是把具体问题抽象成树结构
 *
 * Ⅲ 根节点：最上方那个没有父节点的节点
 *    父节点：上方直接相连的节点
 *    子节点：每个节点下方直接相连的节点
 *    叶子节点：最下层没有子节点的节点
 *    最大深度/高度：从根节点到最下方叶子节点经过的节点个数
 *    最小深度：从根节点到最近叶子节点的距离
 *    「直径」长度，就是任意两个结点之间的路径长度
 * 
 * Ⅳ 前中后序是遍历二叉树过程中处理每一个节点的三个特殊时间点，绝不仅仅是三个顺序不同的 List
 *      二叉树的所有问题，就是让你在前中后序位置注入逻辑，思考每一个节点应该做什么
 *      前中后序位置的代码，能力依次增强：
    *      前序位置的代码在刚刚进入一个二叉树节点的时候执行，只能从参数中获取父节点传递的数据；
    *      中序位置的代码在一个二叉树节点左子树都遍历完，即将开始遍历右子树的时候执行，能获取父节点和左子树传递的数据；
    *      后序位置的代码在将要离开一个二叉树节点的时候执行，能获取父节点和左右子树传递的数据；
 * 
 * Ⅴ 满二叉树：每一层节点都是满的
 *      深度h，节点个数为2^h - 1
 *          1
 *         / \
 *        2   3
 *       / \  / \
 *      4   5 6  7
 * 
 * Ⅵ 完全二叉树：每一层的节点都紧凑靠左排列，且除了最后一层，其他每层都必须是满的
 *      索引存在明显的规律
 *      完全二叉树的左右子树中，至少有一棵是满二叉树
 *          1
 *         / \
 *        2   3
 *       / \
 *      4   5
 * 
 * Ⅶ 二叉搜索树（Binary Search Tree，BST）：对于树中的每个节点，其左子树的每个节点的值都要小于这个节点的值，右子树的每个节点的值都要大于这个节点的值。
 *      「左小右大」
 *          7
 *         / \
 *        4   9
 *       / \   \
 *      1   5   10
 */
export { TreeNode, BinaryTree, DFS, BFS }

// 最常见的二叉树就是类似链表那样的链式存储结构，每个二叉树节点有指向左右子节点的指针
class TreeNode{
    constructor(x) {
        this.val = x;
        this.left = null;
        this.right = null;
    }
}

//#region 二叉树
class BinaryTree{
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

    // 节点数
    count() {
        const root = this.root
        let nodeCount = 0

        function traverse(root) {
            if (root == null) return
            
            nodeCount++
            traverse(root.left)
            traverse(root.right)
        }
        
        traverse(root)
        return nodeCount
    }

    // 例 104.二叉树的最大深度 https://leetcode.cn/problems/maximum-depth-of-binary-tree/
    maxDepth() {
        const root = this.root
        let maxRes = 0, maxCur = 0

        function traverse(root) {
            if (root == null) return
            
            maxCur++
            // 到叶子节点时更新最大深度
            if (root.left == null && root.right == null) {
                maxRes = Math.max(maxRes, maxCur)
            }
            traverse(root.left)
            traverse(root.right)
            maxCur--
        }

        traverse(root)
        return maxRes
    }

    // 例 543.二叉树的直径 https://leetcode.cn/problems/diameter-of-binary-tree
    maxDiameter() {
        const root = this.root

        let maxDiameter = 0;

        const maxDepth = function(root) {
            if (root === null) {
                return 0;
            }
            let leftMax = maxDepth(root.left);
            let rightMax = maxDepth(root.right);
            // 后序位置，计算最大直径
            let myDiameter = leftMax + rightMax;
            maxDiameter = Math.max(maxDiameter, myDiameter);

            return 1 + Math.max(leftMax, rightMax);
        }

        maxDepth(root);
        return maxDiameter;
    }
}
//#endregion

//#region 递归遍历 DFS(Deep First Search, 深度优先遍历)
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
//#endregion

//#region 层序遍历 BFS(Breath First Search, 广度优先遍历)  借助队列
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
        
        if(q.length) depth++
    }
    
    return depth
}
//#endregion

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
    const binaryTree = new BinaryTree([1, 2, 3, 4, null, 5, 6])
    DFS(binaryTree.root)
    BFS(binaryTree.root)
}
function test2() {
    //       1
    //      /
    //     2
    //    / \
    //   3   5
    //  /   / \
    // 1   4   2
    const binaryTree = new BinaryTree([1, 2, null, 3, 5, 1, null, 4, 2])
    console.log(`二叉树的节点数：${binaryTree.count()}`) // 7
    console.log(`二叉树的最大深度：${binaryTree.maxDepth()}`) // 4
    console.log(`二叉树的最大直径：${binaryTree.maxDiameter()}`) // 4
}