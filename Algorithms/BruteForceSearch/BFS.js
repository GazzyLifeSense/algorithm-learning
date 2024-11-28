/*
 * 常用暴力搜索算法 BFS
 *
 * Ⅰ BFS不仅可用来对树进行广度优先遍历，还可以运用在暴力搜索，关键点在于将数学问题抽象成图，每个节点有n个相邻节点
 * 
 * Ⅱ BFS 可以找到最短距离，但是空间复杂度高，而 DFS 的空间复杂度较低
 *      假设给二叉树是满二叉树，节点数为 N，对于 DFS 算法来说，空间复杂度无非就是递归堆栈，最坏情况下顶多就是树的高度，也就是O(logN)
 *      而BFS 算法，队列中每次都会储存着二叉树一层的节点，这样的话最坏情况下空间复杂度应该是树的最底层节点的数量，也就是O(N) 
 * 
 * Ⅲ 扩展：
 *      双向BFS
 *          传统的 BFS 框架就是从起点开始向四周扩散，遇到终点时停止；而双向 BFS 则是从起点和终点同时开始扩散，当两边有交集的时候停止。
 *          最坏复杂度都是O(N)，但双向BFS速度更快，局限是需要知道终点在哪
 */

// 模板
var BFS = function(start, target) {
    // 核心数据结构
    var q = [];
    // 避免走回头路
    var visited = new Set();
    var step = 0;
    
    // 将起点加入队列
    q.push(start);
    visited.add(start);

    while (q.length > 0) {
        var sz = q.length;
        // 将当前队列中的所有节点向四周扩散
        for (var i = 0; i < sz; i++) {
            var cur = q.shift();
            // 划重点：这里判断是否到达终点
            if (cur == target)
                return step;
            // 将 cur 的相邻节点加入队列 （ cur.adj()泛指cur的相邻节点列表 ）
            var adj = cur.adj();
            for (var j = 0; j < adj.length; j++) {
                var x = adj[j];
                if (!visited.has(x)) {
                    q.push(x);
                    visited.add(x);
                }
            }
        }
        step++;
    }
    // 如果走到这里，说明在图中没有找到目标节点
}

// 例 752.打开转盘锁 https://leetcode.cn/problems/open-the-lock/
// 往上拨一位
function plusOne(str, j){
    let ch = str.split('')
    if(ch[j] == '9') { ch[j] = '0'; }
    else ch[j] = parseInt(ch[j]) + 1 + ''
    return ch.join('')
}
// 往下拨一位
function minusOne(str, j){ 
    let ch = str.split('')
    if(ch[j] == '0') { ch[j] = '9'; }
    else ch[j] = parseInt(ch[j]) - 1 + ''
    return ch.join('')
}
var openLock = function(deadends, target) {
    var BFS = function(start, target) {
        // 核心数据结构
        var q = [];
        // 避免走回头路
        var visited = new Set(deadends);
        var step = 0;
        
        // 将起点加入队列
        q.push(start);
        visited.add(start);

        while (q.length > 0) {
            var sz = q.length;
            // 将当前队列中的所有节点向四周扩散
            for (var i = 0; i < sz; i++) {
                var cur = q.shift();

                // 处理起点为死锁的情况
                if(deadends.includes(cur)) continue
                // 划重点：这里判断是否到达终点
                if (cur == target)
                    return step;
                // 将 cur 的相邻节点加入队列，（即拨动一次后的新序列，共8种情况）
                for (var j = 0; j < cur.length; j++) {
                    const up = plusOne(cur, j), down = minusOne(cur, j);

                    if (!visited.has(up)) {
                        q.push(up);
                        visited.add(up);
                    }
                    if (!visited.has(down)) {
                        q.push(down);
                        visited.add(down);
                    }
                }
            }
            step++;
        }
        // 如果走到这里，说明在图中没有找到目标节点
        return -1
    }
    return BFS('0000', target)
};
// console.log(openLock(["0201", "0101", "0102", "1212", "2002"], "0202"))

// 双向BFS
var openLockDoubleBFS = function(deadends, target) {
    let deads = new Set(deadends);
    // 用集合不用队列，可以快速判断元素是否存在
    let q1 = new Set(["0000"]);
    let q2 = new Set([target]);
    let visited = new Set();
    
    let step = 0;
    
    while (q1.size > 0 && q2.size > 0) {
        // 哈希集合在遍历的过程中不能修改，用 temp 存储扩散结果
        let temp = new Set();

        // 将 q1 中的所有节点向周围扩散
        for (let cur of q1) {
            // 判断是否到达终点
            if (deads.has(cur)) {
                continue;
            }
            if (q2.has(cur)) {
                return step;
            }
                
            visited.add(cur);

            // 将一个节点的未遍历相邻节点加入集合
            for (let j = 0; j < 4; j++) {
                let up = plusOne(cur, j);
                if (!visited.has(up)) {
                    temp.add(up);
                }
                let down = minusOne(cur, j);
                if (!visited.has(down)) {
                    temp.add(down);
                }
            }
        }
        // 在这里增加步数
        step++;
        // temp 相当于 q1
        // 这里交换 q1 q2，下一轮 while 就是扩散 q2
        q1 = q2;
        q2 = temp;
    }
    return -1;
};
console.log(openLockDoubleBFS(["0201", "0101", "0102", "1212", "2002"], "0202"))
console.log(openLockDoubleBFS(["0000"], "8888"))
