/*
 * 多叉树
 *
 * Ⅰ 每个节点有任意个子节点
 * 
 * Ⅱ 结构和遍历是二叉树的延伸
 * 
 * Ⅲ 没有中序位置
 * 
 */

class NTreeNode {
    constructor(val) {
        this.val = val;
        this.children = [];
    }
}

class NTree{
    constructor(arr) {
        this.root = null
        this.createRoot(arr)
    }
    
    // 按层依次初始化多叉树节点
    createRoot(arr) {
        // 初始化头节点
        const val = arr.shift()
        if (val == null) return
        const root = new NTreeNode(val)
        const queue = [root]

        // 当前操作节点
        let cur
        // 遍历传入arr
        while (arr.length > 0) {
            const val = arr.shift()
            // 遇到null时，将指针指向当前队列头部的节点
            if (val == null) {
                cur = queue.shift()
                continue
            }
            // 非null时，使用val初始化子节点并插入当前操作节点的children列表，并将子节点插入队列
            else {
                const newNode = new NTreeNode(val)
                cur.children.push(newNode)
                queue.push(newNode)
            }
        }
        this.root = root
    }
}

// 多叉树深度优先遍历
function NTreeDFS(root) {
    // 前序遍历顺序，后序遍历顺序
    let preArr = [], postArr = []
    function traverse(root) {
        if (root == null) return
        
        // 前序位置
        preArr.push(root.val)

        // DFS遍历子树
        for (let i = 0; i < root.children.length; i++){
            traverse(root.children[i])
        }

        // 后序位置
        postArr.push(root.val)
    }
    traverse(root)
    return { preArr, postArr }
}

// 多叉树广度优先遍历
function NTreeBFS(root) {
    if (root == null) return
    
    // 遍历顺序
    const res = [root.val]
    // 待遍历节点队列
    const q = [root]

    // 记录当前深度
    let depth = 1
    while (q.length > 0) {
        const length = q.length
        // 遍历队列中同层的节点
        for (let i = 0; i < length; i++){
            const node = q.shift()
            // 将节点的子节点进入队列，供下一层遍历
            for (let j = 0; j < node.children.length; j++){
                const childNode = node.children[j]
                q.push(childNode)
                res.push(childNode.val)
            }
        }

        // 若有下一层才增加深度
        if(q.length) depth++
    }

    return { depth, res }
}

/* TEST CODE */
function test() {
    const nTree = new NTree([1, null, 3, 2, 4, null, 5, 6, null, 7])
    //              1
    //           /  |  \
    //         3    2   4
    //       / \   /
    //      5   6 7
    const DFSRes = NTreeDFS(nTree.root)
    console.log(`前序：${DFSRes.preArr}; 后序：${DFSRes.postArr}`) // 前序：135624  后序：563241
    const BFSRes = NTreeBFS(nTree.root)
    console.log(`多叉树深度: ${BFSRes.depth}; BFS遍历顺序: ${BFSRes.res}`) // 深度：3  BFS遍历顺序：132456
}