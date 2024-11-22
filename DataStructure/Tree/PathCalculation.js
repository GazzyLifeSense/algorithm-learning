/*
 * 路径问题
 *
 * 最短路径：根节点到最近叶子节点的距离
 * 
 * DFS 常用于获取所有路径
 * BFS 常用于获取最短路径
 */

import { BTree } from "./Tree.js"
//       10
//      /  \
//     5    -3
//    / \   / \
//   3   2  4  6
//  / \   \
// 3  -2   1
// 获取所有路径及最短路径距离
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

function BFSShortestPath(root) {
    if(root == null) return
}

/* TEST CODE */
function test() {
    const btree = new BTree([10, 5, -3, 3, 2, 4, 6, 3, -2, null, 1])
    const res = DFSShortestPath(btree.root)
    console.log('所有路径：', res.allPath)
    console.log(`最短路径距离为：${res.shortest}`)
}