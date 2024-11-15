/*
 * 数组实现栈
 * 
 * ①以数组尾部为栈顶
 */
class ArrayStack {
    constructor() {
        this.list = []
    }

    // 向栈顶插入元素，时间复杂度 O(1)
    push(e) {
        return this.list.push(e)
    }

    // 从栈顶删除元素，时间复杂度 O(1)
    pop() {
        return this.list.pop()
    }

    // 查看栈顶元素，时间复杂度 O(1)
    peek() {
        return this.list[this.list.length - 1]
    }

    // 返回栈中的元素个数，时间复杂度 O(1)
    size() {
        return this.list.length
    }
}