// 例 78.子集 https://leetcode.cn/problems/subsets/ （元素唯一且不可重复选）
// 输入一个无重复元素的数组 nums，其中每个元素最多使用一次，返回 nums 的所有子集。
function subsets(nums) {
    const res = []
    let track = []

    function backtrack(start) {
        // 将子集加入结果集, 初始为空集
        res.push([...track])
        
        // 遍历数组，将每个索引处往后的遍历都作为一个子问题；当索引等于数组长度时不会执行循环体，自动结束递归
        for (let i = start; i < nums.length; i++){
            // 做选择
            track.push(nums[start])
            console.log(track)
            // 回溯遍历下一层节点
            backtrack(i + 1)
            // 撤销选择
            track.pop()
        }       
    }

    backtrack(0)
    return res
}
// console.log(subsets([1,2,3]))

// 例 77.组合 https://leetcode.cn/problems/combinations （元素唯一且不可重复选）
// 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
function combine(n, k) {
    const res = []
    let track = []

    function backtrack(start) {
        // base case 到k层时结束
        if (track.length == k){
            res.push([...track])
            return
        }
        
        // 当索引等于数组长度时不会执行循环体，自动结束递归
        for (let i = start; i <= n; i++){
            // 做选择
            track.push(i)
            console.log(track)
            // 回溯遍历下一层节点
            backtrack(i)
            // 撤销选择
            track.pop()
        }   
        
    }

    backtrack(1)
    return res
}
// console.log(combine(3, 2))

// 例 46.全排列 https://leetcode.cn/problems/permutations （元素唯一且不可重复选）
// 给定一个不含重复数字的数组 nums，返回其所有可能的全排列。
function permute(nums) {
    const res = [], used = new Set(), track = []

    function backtrack() {
        if (track.length == nums.length) {
            res.push([...track])
            return
        }
        // 遍历数组，若未使用过则加入路径
        for (let i = 0; i < nums.length; i++){
            if (!used.has(nums[i])) {
                used.add(nums[i])
                track.push(nums[i])
                console.log(used, track)
                backtrack()
                used.delete(nums[i])
                used.delete(nums[i])
                track.pop()
            }
            
        }
    }

    backtrack()
    return res
}
// console.log(permute([1,2,3]))