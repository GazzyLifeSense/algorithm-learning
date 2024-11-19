/*
 * 双链表实现栈
 *
 * 把双链表的头部或尾部作为栈顶，栈顶增删元素的时间复杂度都为O(1)
 */
import { DoubleLinkedList } from "../LinkedList/DoubleLinkedList.js";

class LinkedStack {
    constructor() {
        this.list = new DoubleLinkedList()
    }

    // 向栈顶插入元素，时间复杂度 O(1)
    push(e) {
        return this.list.addFirst(e)
    }

    // 从栈顶删除元素，时间复杂度 O(1)
    pop() {
        return this.list.removeFirst()
    }

    // 查看栈顶元素，时间复杂度 O(1)
    peek() {
        return this.list.getFirst()
    }

    // 返回栈中的元素个数，时间复杂度 O(1)
    size() {
        return this.list.size
    }
}

/* TEST CODE */
function test() {
    const stack = new LinkedStack();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    console.log(stack.pop()); // 3
    console.log(stack.pop()); // 2
    console.log(stack.peek()); // 1
}
test()