/* 
 * 排序算法
 *
 * Ⅰ 关键点：时间复杂度、空间复杂度（是否原地排序）、排序稳定性
 * 
 * Ⅱ 选择排序: 每次都去遍历选择最小的元素。 （无关是否有序 O(n²) 原地排序 不稳定）
 *    冒泡排序（基于选择排序优化）: 每个元素根据自身大小一点一点向数组的一侧移动。 （最坏O(n²) 有序可提前终止 原地排序 稳定性）
 *    插入排序（基于选择排序优化）: 通过构建有序序列，将未排序的数据逐个插入到已排序的序列中。 （最坏O(n²) 有序接近O(n) 综合性能优于冒泡 原地排序 稳定性）
 */

//#region 选择排序: 每次都去遍历选择最小的元素。
function selectSort(arr) {
    // 目前需要排序的索引
    let sortedIndex = 0
    while (sortedIndex < arr.length) {
        let minIndex = sortedIndex
        for (let i = sortedIndex; i < arr.length - 1; i++){
            if(arr[minIndex] > arr[i+1]) minIndex = i + 1
        }
        // 交换最小值和sortedIndex处的元素(失去稳定性)
        [arr[minIndex], arr[sortedIndex]] = [arr[sortedIndex], arr[minIndex]]
        sortedIndex++
    }
    return arr
}
// console.log(selectSort([1,3,0,7,6,5]))
//#endregion

//#region 冒泡排序: 每个元素根据自身大小一点一点向数组的一侧移动。
function bubbleSort(arr) {
    const n = arr.length
    let sortedIndex = 0
    // 对比n-1轮
    while (sortedIndex < n - 1) {
        let swapped = false
        // 每轮对比n-1-sortedIndex次
        for (let j = n - 1; j > sortedIndex; j--){
            if (arr[j] < arr[j - 1]) {
                [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
                swapped = true
            }
        }
        // 当前轮未交换过数字，说明数组已经有序，提前终止
        if(!swapped) break
        sortedIndex++
    }
    return arr
}
// console.log(bubbleSort([1,3,0,7,6,5]))
//#endregion

//#region 插入排序: 通过构建有序序列，将未排序的数据逐个插入到已排序的序列中。
function insertSort(nums) {
    const n = nums.length
    // 当前需要排序的索引
    let sortedIndex = 0
    while (sortedIndex < n) {
        // 每轮将nums[sortedIndex]插入nums[0...sortedIndex-1]有序序列中
        for (let j = sortedIndex; j > 0; j--){
            if (nums[j] < nums[j - 1]) {
                [nums[j], nums[j - 1]] = [nums[j - 1], nums[j]]
            }
            // 若nums[sortedIndex] > nums[sortedIndex-1]，证明左侧数组有序，直接跳过本轮
            else {
                break
            }
        }
        sortedIndex++
    }
    return nums
}
// console.log(insertSort([1,3,0,7,6,5]))
//#endregion