/*
 * 链表实现队列
 */

import { DoubleLinkedList } from "../LinkedList/DoubleLinkedList";

class LinkedQueue {
    constructor() {
        this.list = new DoubleLinkedList()
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

/* TEST CODE */
function test() {
    const queue = new LinkedQueue();
    queue.push(1);
    queue.push(2);
    queue.push(3);
    console.log(queue.peek()); // 1
    console.log(queue.pop()); // 1
    console.log(queue.pop()); // 2
    console.log(queue.peek()); // 3
}
test()