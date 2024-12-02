/* 
 * 排序算法
 *
 * Ⅰ 关键点：时间复杂度、空间复杂度（是否原地排序）、排序稳定性
 * 
 * Ⅱ 选择排序: 每次都去遍历选择最小的元素
 */

//#region 选择排序: 每次都去遍历选择最小的元素
function selectSort(arr) {
    // 目前需要排序的索引
    let sortedIndex = 0
    while (sortedIndex < arr.length) {
        let minIndex = sortedIndex
        for (let i = sortedIndex; i < arr.length - 1; i++){
            if(arr[minIndex] > arr[i+1]) minIndex = i + 1
        }
        // 交换最小值和sortedIndex处的元素
        [arr[minIndex], arr[sortedIndex]] = [arr[sortedIndex], arr[minIndex]]
        sortedIndex++
    }
    return arr
}
console.log(selectSort([1,3,0,7,6,5]))
//#endregion