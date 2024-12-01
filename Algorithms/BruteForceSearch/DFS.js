// 例 78.子集 https://leetcode.cn/problems/subsets/ （元素唯一且不可重复选）
// 输入一个无重复元素的数组 nums，返回 nums 的所有不重复子集。（可以应对无序数组，因为元素无重复）
//             [ ]
//      /       |       \
//    [1]      [2]      [3]
//   |   |      |        
// [1,2][1,3] [2,3]
//   |
// [1,2,3]
function subsets(nums) {
    const res = []
    let track = []

    function backtrack(start) {
        // 将子集加入结果集, 初始为空集
        res.push([...track])

        // 遍历数组，将每个索引处往后的遍历都作为一个子问题；当索引等于数组长度时不会执行循环体，自动结束递归
        for (let i = start; i < nums.length; i++){
            // 做选择
            track.push(nums[i])

            // 回溯遍历下一层节点
            backtrack(i + 1)

            // 撤销选择
            track.pop()
        }   
    }

    /* 
     * ①enter -> 0层空集，遍历数组
     * ②enter -> 1层, 由于(1层)nums[0]存在，得到以其为首的子集[1] 
     * ③enter -> 2层，由于(2层)nums[1]存在，追加得到[1, 2] 
     * ④enter -> 3层，由于(3层)nums[2]存在，追加得到[1, 2, 3] 
     * ⑤enter -> 4层，由于nums[3]不存在，回溯到上一层(3层)将nums[2]弹出，由于(3层)nums[3]不存在，再次回溯到上一层(2层)将nums[1]弹出
     * ⑥由于(2层)nums[2]存在, enter -> 3层追加nums[2]得到[1, 3], 类似⑤回溯到1层将所有数字弹出
     * ⑦由于(1层)nums[1]存在，类似②得到[2], [2,3]
     * ⑧由于(1层)nums[2]存在，类似②得到[3]
     */
    backtrack(0)
    return res
}
// console.log(subsets([1,2,3]))

// 例 77.组合 https://leetcode.cn/problems/combinations （元素唯一且不可重复选）
// 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的不重复组合。（等价子集问题，只需要加个base case限制结果即可）
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
            // 回溯遍历下一层节点
            backtrack(i + 1)
            // 撤销选择
            track.pop()
        }   
        
    }

    backtrack(1)
    return res
}
// console.log(combine(3, 2))

// 例 46.全排列 https://leetcode.cn/problems/permutations （元素唯一且不可重复选）
// 给定一个不含重复数字的数组 nums，返回其所有可能的全排列。(每层从头遍历数组，选取未used的数字，直至无数字可选时进行回溯)
//                     [ ]
//       /              |             \
//      [1]            [2]           [3]
//   |       |      |       |      |      |
// [1,2]   [1,3]  [2,1]   [2,3]  [3,1]  [3,2]
//   |       |      |       |      |      |
// [1,2,3][1,3,2][2,1,3] [2,3,1][3,1,2][3,2,1]
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
                // 做选择
                used.add(nums[i])
                track.push(nums[i])
                console.log(used, track)
                // 进入下一层
                backtrack()
                // 取消选择
                track.pop()
                used.delete(nums[i])
            }
            
        }
    }

    backtrack()
    return res
}
// console.log(permute([1,2,3]))

// 例 90.子集Ⅱ https://leetcode.cn/problems/subsets-ii （元素可重复但不可重复选）
// 给你一个整数数组 nums，其中可能包含重复元素，请你返回该数组所有可能的子集。
// 两条值相同的相邻树枝会产生重复, 需要剪枝（与78.子集的区别在于，需要先对数组排序，将相同数字汇聚，然后(剪枝)跳过同层的相邻且相同的数字）
//             [ ]
//      /       |       X
//    [1]      [2]      [2']
//   |   X      |        
// [1,2][1,2'] [2,2']
//   |
// [1,2,2']
function subsetsWithDup(nums) {
    const res = []
    let track = []
    // 先排序
    nums.sort((a, b) => a - b)

    function backtrack(start) {
        // 将子集加入结果集, 初始为空集
        res.push([...track])

        // 遍历数组，将每个索引处往后的遍历都作为一个子问题；当索引等于数组长度时不会执行循环体，自动结束递归
        for (let i = start; i < nums.length; i++){
            // 若当前数字与同层上一节点的数字相同，则跳过
            if(i > start && nums[i] == nums[i - 1]) continue
            // 做选择
            track.push(nums[i])

            // 回溯遍历下一层节点
            backtrack(i + 1)

            // 撤销选择
            track.pop()
        }   
    }

    backtrack(0)
    return res
}
// console.log(subsetsWithDup([4, 4, 4, 1, 3]))

// 例 40.组合总和 https://leetcode.cn/problems/combination-sum-ii （元素可重复但不可重复选）
// 给你输入 candidates 和一个目标和 target，从 candidates 中找出中所有和为 target 的组合。
function combinationSum2(candidates, target) {
    const start = Date.now()
    const res = []
    let track = [], targetSum = 0

    // 先排序
    candidates.sort((a, b) => a - b)

    function backtrack(start) {
        // base case 到k层时结束
        if (targetSum == target){
            res.push([...track])
            return
        }
        
        // 当索引等于数组长度时不会执行循环体，自动结束递归
        for (let i = start; i < candidates.length; i++){
            // 重要！：若当前数字与同层上一节点的数字相同，则跳过
            if (i > start && candidates[i] == candidates[i - 1]) continue
            // 重要！：若targetSum大于target，不再往下
            if(targetSum > target) break
            // 做选择
            targetSum += candidates[i]
            track.push(candidates[i])
            // 回溯遍历下一层节点
            backtrack(i + 1)
            // 撤销选择
            track.pop()
            targetSum -= candidates[i]
        }   
        
    }

    backtrack(0)
    console.log((Date.now() - start))
    return res
}
// [14,6,25,9,30,20,33,34,28,30,16,12,31,9,9,12,34,16,25,32,8,7,30,12,33,20,21,29,24,17,27,34,11,17,30,6,32,21,27,17,16,8,24,12,12,28,11,33,10,32,22,13,34,18,12] 27
// console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8))

// 例 47.全排列Ⅱ https://leetcode.cn/problems/permutations-ii （元素可重复但不可重复选）
function permuteUnique(nums) {
    const res = [], used = new Array(nums.length).fill(false), track = []

    // 排序，将相同数字汇聚
    nums.sort((a, b) => a - b)

    function backtrack() {
        if (track.length == nums.length) {
            res.push([...track])
            return
        }
        // 遍历数组，若未使用过则加入路径
        for (let i = 0; i < nums.length; i++){
            // 剪枝（当前节点数字与上一索引数字相同但上一个索引数字没有使用，说明相邻节点即将重复）
            // 也可记录同层的前一节点的值进行剪枝（for外面记录声明preNum，插入track同时记录preNum，若当前节点数字与前一节点数字相同则剪枝)
            if(i > 0 && nums[i] == nums[i-1] && used[i-1] == false) continue
            if (used[i] == false) {
                // 做选择
                used[i] = true
                track.push(nums[i])
                // 进入下一层
                backtrack()
                // 取消选择
                track.pop()
                used[i] = false
            }
            
        }
    }

    backtrack()
    return res
}
// console.log(permuteUnique([1,1,3]))