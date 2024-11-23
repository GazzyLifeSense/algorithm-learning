/*
 * 路径问题
 *
 * 最短路径：根节点到最近叶子节点的距离
 * 
 * DFS 常用于获取所有路径
 * BFS 常用于获取最短路径
 */

import { BinaryTree } from "./BinaryTree.js"
//       10
//      /  \
//     5    -3
//    / \   / \
//   3   2  4  6
//  / \   \
// 3  -2   1
// DFS获取所有路径及最短路径距离
function DFSShortestPath(root) {
    let shortest = Infinity, depth = 0
    const allPath = [], curPath = []
    
    function traverse(root) {
        if (root == null) return
        depth++
        curPath.push(root.val)

        // 若节点为叶子节点则更新最短路径
        if (root.left == null && root.right == null) {
            if (depth) shortest = Math.min(shortest, depth)
            allPath.push(curPath.slice())
        }

        traverse(root.left)
        traverse(root.right)

        depth--
        curPath.pop()
    }
    traverse(root)

    return { allPath, shortest }
}

class State{
    constructor(node, path) {
        this.node = node
        this.path = path
        // 用于可视化
        this.val = `${node.val}, path:${path.join('->')}`
    }
}
// BFS获取所有路径及最短路径距离（借助State类保存节点的路径）
function BFSShortestPath(root) {
    if (root == null) return
    let shortest = Infinity
    const q = [], allPath = []
    q.push(new State(root, [root.val]))

    // 记录当前层数
    var depth = 1
    while (q.length) {
        // 从队列中依次取出当前层的节点
        const length = q.length
        for (let i = 0; i < length; i++){
            const cur = q.shift()
            const node = cur.node, path = cur.path
            // 若当前节点为叶子节点，记录路径
            if (node.left == null && node.right == null) {
                allPath.push(path)
                shortest = Math.min(shortest, path.length)
            }
            // 将当前节点的左右节点进入队列，供下一层遍历使用
            if(node.left) q.push(new State(node.left, [...path, node.left.val]))
            if (node.right) q.push(new State(node.right, [...path, node.right.val]))
        }
        // 如果只需要查找最短路径，当当前层遍历完毕且出现最短路径时即可返回结果
        console.log(`层数：${depth}； 当前最短路径：${shortest}`)
        depth++
    }

    return { allPath, shortest }
}

/* TEST CODE */
function test() {
    const binaryTree = new BinaryTree([10, 5, -3, 3, 2, 4, 6, 3, -2, null, 1])
    const DFSres = DFSShortestPath(binaryTree.root)
    console.log('所有路径：', DFSres.allPath)
    console.log(`最短路径距离为：${DFSres.shortest}`)

    const BFSres = BFSShortestPath(binaryTree.root)
    console.log('所有路径：', BFSres.allPath)
    console.log(`最短路径距离为：${BFSres.shortest}`)
}