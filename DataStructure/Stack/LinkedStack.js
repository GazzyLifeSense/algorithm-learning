/*
 * 链表实现栈
 */
import { DoubleLinkedList } from "../LinkedList/DoubleLinkedList";

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