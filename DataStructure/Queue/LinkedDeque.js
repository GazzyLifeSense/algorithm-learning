/*
 * 双链表实现双端队列
 *
 * Ⅰ 为了实现双端增删的操作时间复杂度都为O(1)，需要使用双链表
 */
import { DoubleLinkedList } from "../LinkedList/DoubleLinkedList.js";
class LinkedDeque {
    constructor() {
        this.deque = new DoubleLinkedList();
    }

    // 从队头插入元素，时间复杂度 O(1)
    addFirst(e) {
        return this.deque.addFirst(e);
    }

    // 从队尾插入元素，时间复杂度 O(1)
    addLast(e) {
        return this.deque.addLast(e);
    }

    // 从队头删除元素，时间复杂度 O(1)
    removeFirst() {
        return this.deque.removeFirst();
    }

    // 从队尾删除元素，时间复杂度 O(1)
    removeLast() {
        return this.deque.removeLast();
    }

    // 查看队头元素，时间复杂度 O(1)
    peekFirst() {
        return this.deque.getFirst();
    }

    peekLast() {
        return this.deque.getLast();
    }
}

/* TEST CODE */
function test() {
    const myDeque = new LinkedDeque();

    myDeque.addFirst(1);
    myDeque.addFirst(2);
    myDeque.addLast(3);
    myDeque.addLast(4);

    console.log(myDeque.removeFirst()); // 2
    console.log(myDeque.removeLast()); // 4
    console.log(myDeque.peekFirst()); // 1
    console.log(myDeque.peekLast()); // 3
}
test()