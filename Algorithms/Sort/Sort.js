/* 
 * 排序算法
 *
 * Ⅰ 关键点：时间复杂度、空间复杂度（是否原地排序）、排序稳定性
 * 
 * Ⅱ 选择排序: 每次都去遍历选择最小的元素。 （无关是否有序 O(n²) 原地排序 不稳定）
 *    冒泡排序（基于选择排序优化）: 每个元素根据自身大小一点一点向数组的一侧移动。 （最坏O(n²) 有序可提前终止 原地排序 稳定性）
 *    插入排序（基于选择排序优化）: 通过构建有序序列，将未排序的数据逐个插入到已排序的序列中。 （最坏O(n²) 有序接近O(n) 综合性能优于冒泡 原地排序 稳定性）
 *    希尔排序（基于插入排序优化）: 先对数组进行排序使之成为"h-有序"的，即数组中任意相距h的元素都是有序的，之后再减小h值再次排序，
 *              直至h减小到1成为插入排序，此时数组已部分有序，所以速度会快很多。（最坏O(n^1.5) 原地排序 不稳定性[相同数字在不同子数组中进行交互位置时相对位置可能发生变化]）
 *    快速排序（分治）: 在一个无序的序列中选取一个任意的基准元素pivot，利用pivot将待排序的序列分成两部分，前面部分元素均小于或等于基准元素，后面部分均大于或等于基准元素，
 *              然后采用递归的方法分别对前后两部分重复上述操作，直到将无序序列排列成有序序列。（平均O(nlog2n) 最坏O(n²) 原地排序 不稳定性[121->112], 元素交换时相对位置可能发生变化）
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
        // 逆向思维：每轮将nums[sortedIndex]插入左侧nums[0...sortedIndex-1]有序序列中
        for (let j = sortedIndex; j > 0; j--){
            if (nums[j] < nums[j - 1]) {
                [nums[j], nums[j - 1]] = [nums[j - 1], nums[j]]
            }
            // 若nums[sortedIndex] > nums[sortedIndex-1]，证明左侧数组有序，直接跳过本轮
            else {
                break
            }
        }
        // 逐步右移 sortedIndex，直到整个数组有序
        sortedIndex++
    }
    return nums
}
// console.log(insertSort([1,3,0,7,6,5]))
//#endregion

//#region 希尔排序: 先对数组进行排序使之成为"h-有序"的，即数组中任意相距h的元素都是有序的，
//                  之后再减小h值再次排序，直至h减小到1成为插入排序，此时数组已部分有序，所以速度会快很多。
function shellSort(nums) {
    let n = nums.length;
    // 把生成函数换成 (3^k - 1) / 2
    // 即 h = 1, 4, 13, 40, 121, 364...
    let h = 1;
    while (h < n / 3) {
        h = 3 * h + 1;
    }

    // 不同间隔的轮次
    while (h >= 1) {
        // 当前要排序的索引
        let sortedIndex = h;
        // 对间隔为h的所有子数组进行插入排序
        while (sortedIndex < n) {
            // 逆向思维：将nums[i]插入左侧所属子数组的有序子序列中
            for (let i = sortedIndex; i >= h; i -= h) {
                // 将nums[i]插入到左侧有序数组中
                if (nums[i] < nums[i - h]) {
                    [nums[i], nums[i - h]] = [nums[i - h], nums[i]]
                }
                // 当nums[i] > nums[i - h]时，说明数组[..., i - h, i]有序，无需插入
                else {
                    break
                }
            }
            // 逐步右移 sortedIndex，直到整个数组有序
            sortedIndex++;
        }

        // 按照递增函数的规则，缩小 h
        h = Math.floor(h / 3);
    }

    return nums
}
// console.log(shellSort([1,3,0,7,6,5,1,2,3,2]))
//#endregion

//#region 快速排序: 在一个无序的序列中选取一个任意的基准元素pivot，利用pivot将待排序的序列分成两部分，前面部分元素均小于或等于基准元素，后面部分均大于或等于基准元素，
//                 然后采用递归的方法分别对前后两部分重复上述操作，直到将无序序列排列成有序序列。
// （递归法）妙用二叉树前序位置，在二叉树遍历的前序位置将一个元素排好位置，然后递归地将剩下的元素排好位置。
function quickSort(nums) {
    
    function sort(nums, left, right) {
        if (left >= right) return
        
        // 获取切分点
        const p = partition(nums, left, right)

        // 对左右侧数组进行排序
        sort(nums, left, p - 1)
        sort(nums, p + 1, right)
    }

    // 核心：分区，将小于支点的节点放左侧、大于支点的节点放右侧，返回支点索引
    function partition(nums, left, right) {
        // 支点索引
        const key = left
        while (left < right) {
            // 右边先走保证重合时停留在比key小处
            // 右边开始寻找值 <= 支点的索引
            while (left < right && nums[right] >= nums[key]) right--
            // 左边开始寻找值 > 支点的索引
            while (left < right && nums[left] <= nums[key]) left++
            // 左右下标互换
            [nums[left], nums[right]] = [nums[right], nums[left]]
        }
        // 最终右下标一定是小于等于支点的，所以将支点与左下标交换位置，此时左侧小于支点，右侧大于支点
        [nums[key], nums[right]] = [nums[right], nums[key]]
        // 返回支点索引
        return right
    }
    sort(nums, 0, nums.length - 1)
    return nums
}
// console.log(quickSort([3,3,5,10,6,8,9,3,1,4]))
//#endregion