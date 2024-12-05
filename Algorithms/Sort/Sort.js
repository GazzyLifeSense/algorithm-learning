/* 
 * 排序算法
 *
 * 关键点：时间复杂度、空间复杂度（是否原地排序）、排序稳定性
 * 
 * Ⅰ 选择排序: 每次都去遍历选择最小的元素。 （无关是否有序 O(n²) 原地排序 不稳定）
 * 
 * Ⅱ 冒泡排序（基于选择排序优化）: 每个元素根据自身大小一点一点向数组的一侧移动。 （最坏O(n²) 有序可提前终止 原地排序 稳定性）
 * 
 * Ⅲ 插入排序（基于选择排序优化）: 通过构建有序序列，将未排序的数据逐个插入到已排序的序列中。 （最坏O(n²) 有序接近O(n) 综合性能优于冒泡 原地排序 稳定性）
 * 
 * Ⅳ 希尔排序（基于插入排序优化）: 先对数组进行排序使之成为"h-有序"的，即数组中任意相距h的元素都是有序的，之后再减小h值再次排序，
 *              直至h减小到1成为插入排序，此时数组已部分有序，所以速度会快很多。（最坏O(n^1.5) 原地排序 不稳定性[相同数字在不同子数组中进行交互位置时相对位置可能发生变化]）
 * 
 * Ⅴ 快速排序（分治）: 在一个无序的序列中选取一个任意的基准元素pivot，利用pivot将待排序的序列分成两部分，前面部分元素均小于或等于基准元素，后面部分均大于或等于基准元素，
 *              然后采用递归的方法分别对前后两部分重复上述操作，直到将无序序列排列成有序序列。（平均O(nlogn) 最坏O(n²) 原地排序 不稳定性[121->112], 元素交换时相对位置可能发生变化）
 * 
 * Ⅵ 归并排序（分治）: 基于分治思想将数组划分段排序后再合并（所有情况O(nlogn) 非原地排序 空间O(n) 不稳定性）
 * 
 * Ⅶ 堆排序: ①、将无序序列构建成一个堆，根据升序降序需求选择大顶堆或小顶堆；
 *            ②、将堆顶元素与末尾元素进行交换，将最大元素“沉”到数组末端；
 *            ③、重新调整剩下结构，使其满足堆定义，然后继续交换堆顶元素与当前末尾元素，反复执行调整+交换步骤，直到整个序列有序。
 *            （所有情况O(nlogn) 原地排序 不稳定性）
 * 
 * Ⅷ 计数排序：通过统计每一个数字出现的次数，并把它映射到映射数组特定下标上，再遍历映射的数组使原数组有序
 *          [绝对映射]：映射到与数值相同的下标上；[相对映射]：映射到数值-min的下标上（避免空间浪费）
 *          只适合元素较为集中的数组排序，元素分散时内存消耗大; 只支持整数排序
 *          （所有情况O(n) 原地排序 空间O(max-min+1) 不稳定性）
 * 
 * Ⅸ 桶排序：利用函数的映射关系把待排序数组中的元素分配到若干个桶中，对每个桶中的元素分别进行排序，最后再把这些桶中的元素按顺序合并起来。
 *            数学基础：分开排序的时间复杂度总和是小于整体排序的，（假设有正整数n，且n=n1+n2+...+nk, 那么n²>=n1²+n2²+...+nk²，类比正方形面积）
 *            如果桶排序将待排序元素分配到尽可能多的桶中（k 尽可能大），即每个桶至多只有一个元素时，桶排序就转化成了计数排序，其复杂度也将降低到O(n)。
 *           （时间、空间复杂度、稳定性取决于桶内排序算法）
 */

//#region 选择排序: 每次都去遍历选择最小的元素。（无关是否有序 O(n²) 原地排序 不稳定）
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

//#region 冒泡排序: 每个元素根据自身大小一点一点向数组的一侧移动。（最坏O(n²) 有序可提前终止 原地排序 稳定性）
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

//#region 插入排序: 通过构建有序序列，将未排序的数据逐个插入到已排序的序列中。（最坏O(n²) 有序接近O(n) 综合性能优于冒泡 原地排序 稳定性）
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
//                 （最坏O(n^1.5) 原地排序 不稳定性[相同数字在不同子数组中进行交互位置时相对位置可能发生变化]）
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
//                （平均O(nlogn) 最坏O(n²) 原地排序 不稳定性[121 -> 112], 元素交换时相对位置可能发生变化）
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

//#region 归并排序: 基于分治思想将数组划分段排序后再合并（所有情况O(nlogn) 非原地排序 空间O(n) 不稳定性）
// （递归法）妙用二叉树后序位置，在二叉树遍历的后序位置将两个有序数组合并成一个有序数组。
//              152273
//             /     \
//           152     273
//           / \     /  \
//          15  2   27   3
//          /\  |   /\   |
//         1  5 |  2  7  |
//          \/  |   \/   |
//          15  2   27   3
//            \/      \/
//            125     237
//               \  /
//              12237
function mergeSort(nums) {
    let temp = new Array(nums.length)

    function sort(nums, left, right) {
        // 单个元素不排序
        if (left == right) return
        let mid = Math.floor((right - left) / 2 + left)

        // 将左右数组分别排序
        sort(nums, left, mid)
        sort(nums, mid + 1, right)

        // 后序位置合并数组
        
        merge(nums, left, mid, right)
    }
    
    // 将两个有序数组合并为一个有序数组
    function merge(nums, left, mid, right) {
        // cur指当前temp数组索引
        let i = left, j = mid + 1, cur = left

        while (cur <= right) {
            // 左侧数组已排序
            if (i === mid + 1) {
                temp[cur] = nums[j++]
            }
            // 右侧数组已排序
            else if (j === right + 1) {
                temp[cur] = nums[i++]
            }
            // 左侧小于右侧时，将左侧元素插入数组
            else if (nums[i] < nums[j]) {
                temp[cur] = nums[i++]
            }
            // 右侧小于左侧时，将右侧元素插入数组
            else if (nums[i] >= nums[j]) {
                temp[cur] = nums[j++]
            }
            cur++
        }

        // 将排序后的temp数组拷贝到原数组
        while (left <= right) {
            nums[left] = temp[left++]
        }
    }
    sort(nums, 0, nums.length - 1)
    return nums
}
// console.log(mergeSort([1,5,2,2,7,3]))
//#endregion

//#region 堆排序: ①、将无序序列构建成一个堆，根据升序降序需求选择大顶堆或小顶堆；
//          ②、将堆顶元素与末尾元素进行交换，将最大元素“沉”到数组末端；
//          ③、重新调整剩下结构，使其满足堆定义，然后继续交换堆顶元素与当前末尾元素，反复执行调整+交换步骤，直到整个序列有序。
//         （所有情况O(nlogn) 原地排序 不稳定性）
function heapSort(arr) {
    // [构造核心]（冒）：从最后一个非叶子节点开始，将无序序列构建成一个大顶堆（升序）或小顶堆（降序）
    for (let i = Math.floor(arr.length / 2 - 1); i >= 0; i--) {
        adjustHeap(arr,i,arr.length);
    }
    
    // [排序核心]（沉）：先把大的节点往上冒，然后将根节点（最大）与末尾的节点交换，接着对剩下的结构部分进行相同操作
    for (let j = arr.length - 1; j > 0; j--) {
        // 将堆顶元素与末尾元素交换
        [arr[0], arr[j]] = [arr[j], arr[0]]
        // 重新调整剩下结构，使其满足堆定义，然后继续交换堆顶元素与当前末尾元素，反复执行调整+交换步骤，直到整个序列有序
        adjustHeap(arr,0,j);
    }
    return arr
}

/* 将一个数组（二叉树）调整成一个大顶堆（子节点的值或索引总是大于父节点）
 * 
 * @param arr 待调整的数组
 * @param i 表示非叶子节点在数组中的索引
 * @param length 表示对多少个元素继续调整，length是在逐渐的减少
 */
function adjustHeap(arr, i, length) {
    //取出当前元素的值保存在临时变量
    let temp = arr[i]; 
    //k = 2 * i + 1是i节点的左子节点
    for (let k = 2 * i + 1; k < length; k = 2 * k + 1) {
        // 左右子节点都存在，且左子节点值小于右子节点的值, 则k指向右子节点
        if(k + 1 < length && arr[k] < arr[k + 1]) { 
            k++; 
        }
        // 左右子节点中最大的一者若大于父节点，则将值赋给父节点，且作为下一个要调整成大顶堆的子树的父节点
        if(arr[k] > temp) { 
            arr[i] = arr[k];
            i = k; 
        } else {
            break;
        }
    }
    //当for循环结束后，我们已经将以i为父节点的树的最大值，放在了最顶（局部）
    arr[i] = temp; // 将temp的值放到调整后的位置
}
// console.log(heapSort([4, 6, 3, 5, 9]))
//     4                   4                   9                     9                4                   4
//    / \     6 < 9       / \     4 < 9       / \       4 < 6       / \     ②沉底    / \    ③剩下部分    / \
//   6   3 ------------> 9   3  -------->    4   3   ------------> 6   3  --------> 6   3  ---------->  6   3
//  / \      9无左节点  / \                 / \        4有子节点  / \              / \      重复步骤   /
// 5   9       跳出    5   6               5   6          继续   5   4            5   9               5
//#endregion

//#region 计数排序：通过统计每一个数字出现的次数，并把它映射到映射数组特定下标上，再遍历映射的数组使原数组有序
//        [绝对映射]：映射到与数值相同的下标上；[相对映射]：映射到数值-min的下标上（避免空间浪费）
//        只适合元素较为集中的数组排序，元素分散时内存消耗大; 只支持整数排序
//        （所有情况O(n) 原地排序 空间O(max-min+1) 不稳定性）
function countSort(nums) {
    if (nums.length < 1) return []
    
    let max = nums[0], min = nums[0]
    for (let i = 1; i < nums.length; i++){
        if (nums[i] > max) max = nums[i]
        if (nums[i] < min) min = nums[i]
    }

    // 相对映射：开辟映射数组的空间为最大值-最小值+1，避免空间浪费 
    const Size = max - min + 1, CountArr = new Array(Size).fill(0)
    for (let i = 0; i < nums.length; i++){
        CountArr[nums[i] - min]++
    }

    // 遍历映射数组，覆盖原数组（原地排序）
    let cur = 0
    for (let i = 0; i < CountArr.length; i++){
        while (CountArr[i] > 0) {
            nums[cur++] = i + min
            CountArr[i]--
        }
    }

    return nums
}
// console.log(countSort([103,105,102,100,109]))
//#endregion

//#region 桶排序：利用函数的映射关系把待排序数组中的元素分配到若干个桶中，对每个桶中的元素分别进行排序，最后再把这些桶中的元素按顺序合并起来。
//                数学基础：分开排序的时间复杂度总和是小于整体排序的，（假设有正整数n，且n=n1+n2+...+nk, 那么n²>=n1²+n2²+...+nk²，类比正方形面积）
//                如果桶排序将待排序元素分配到尽可能多的桶中（k 尽可能大），即每个桶至多只有一个元素时，桶排序就转化成了计数排序，其复杂度也将降低到O(n)。
//               （最好(有序情况下)时间复杂度O(n)，最坏O(n²)、桶内原地排序时空间复杂度O(n+k) 、稳定性取决于桶内排序算法）
//  步骤：①初始化桶：确定桶的数量和每个桶的数据范围，每个桶尽可能均匀包含一部分数据
//        ②分配元素：遍历待排序序列，将元素放入对应桶中
//        ③桶内排序：使用其它排序算法进行排序（一般使用插入排序较稳定）
//        ④合并桶
function bucketSort(nums, bucketSize) {
    if(nums.length < 1) return []
    
    // 计算最大值、最小值
    let max = nums[0], min = nums[0], res = []
    for (let i = 0; i < nums.length; i++){
        if (nums[i] > max) max = nums[i]
        if (nums[i] < min) min = nums[i]
    }

    // 初始化桶 
    const BucketCount = Math.ceil((max - min + 1) / bucketSize) // 桶数量
    const BucketArr = new Array(BucketCount).fill(0).map(()=>new Array())
    
    // 分配元素
    for (let i = 0; i < nums.length; i++){
        let bucketIndex = Math.floor((nums[i] - min) / bucketSize)
        BucketArr[bucketIndex].push(nums[i])
    }

    // 合并桶
    for (let i = 0; i < BucketArr.length; i++){
        // 内部一般使用插入排序（较稳定，但也可以使用其它排序算法）
        insertSort(BucketArr[i])
        res = res.concat(...BucketArr[i])
    }

    return res
}
console.log(bucketSort([42, 32, 33, 52, 37, 47, 51, 46, 41, 43], 5))
//#endregion