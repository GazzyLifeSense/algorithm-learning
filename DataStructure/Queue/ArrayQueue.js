/*
 * 环形数组实现队列
 *
 * Ⅰ 为了实现队尾插入、队头删除的操作时间复杂度都为O(1)，需要使用环形数组
 */
import { CycleArray } from "../Array/CycleArray.js"
class ArrayQueue {
    constructor() {
        this.list = new CycleArray()
    }

    // 向队尾插入元素，时间复杂度 O(1)
    push(e) {
        return this.list.addLast(e)
    }

    // 从队头删除元素，时间复杂度 O(1)
    pop() {
        return this.list.removeFirst()
    }

    // 查看队头元素，时间复杂度 O(1)
    peek() {
        return this.list.getFirst()
    }

    // 返回队列中的元素个数，时间复杂度 O(1)
    size() {
        return this.list.size
    }
}