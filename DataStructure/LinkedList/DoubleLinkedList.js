/*
 * 双链表实现
 * 
 * ①同时持有头尾节点的引用
 * 
 * ②虚拟头尾节点
 * 
 */
export { Node, DoubleLinkedList }
class Node{
    constructor(val) {
        this.val = val
        this.prev = null
        this.next = null
    }
}

class DoubleLinkedList{
    constructor() {
        this.head = new Node()
        this.tail = new Node()
        this.head.next = this.tail
        this.tail.prev = this.head
        this.size = 0
    }

    // 查
    getNode(index) {
        this.checkElementIndex(index)

        let cur     
        // 靠近哪头从哪头开始遍历
        if (index + 1 <= this.size / 2) {
            cur = this.head.next
            for (let i = 0; i < index; i++){
                cur = cur.next
            }
        } else {
            cur = this.tail.prev
            for (let i = this.size - 1; i > index; i--){
                cur = cur.prev
            }
        }
        
        return cur
    }

    get(index) {
        this.checkEmpty()

        return this.getNode(index).val
    }

    getFirst() {
        this.checkEmpty()

        return this.head.next.val
    }

    getLast() {
        this.checkEmpty()

        return this.tail.prev.val
    }

    // 改
    set(index, val) {
        this.checkElementIndex(index)
        
        const targetNode = this.getNode(index)
        targetNode.val = val

        return targetNode.val
    }

    // 增
    add(index, val) {
        this.checkPositionIndex(index)

        if (index === this.size) {
            return this.addLast(val)
        }

        const newNode = new Node(val)
        // 指向插入位置的当前节点
        const cur = this.getNode(index)

        newNode.prev = cur.prev
        newNode.next = cur

        cur.prev.next = newNode
        cur.prev = newNode

        this.size++
    }
    
    addFirst(val) {
        this.add(0, val)
    }

    addLast(val) {
        const newNode = new Node(val)
        // 指向虚拟尾节点
        const cur = this.tail

        newNode.prev = cur.prev
        newNode.next = cur

        cur.prev.next = newNode
        cur.prev = newNode

        this.size++
    }

    // 删
    remove(index) {
        const DeletedNode = this.getNode(index)

        DeletedNode.prev.next = DeletedNode.next
        DeletedNode.next.prev = DeletedNode.prev

        DeletedNode.prev = DeletedNode.next = null
        this.size--
        return DeletedNode.val
    }

    removeFirst() {
        this.checkEmpty()

        return this.remove(0)
    }

    removeLast() {
        this.checkEmpty()

        return this.remove(this.size - 1)
    }

    // 是否合法元素索引
    isValidElementIndex(index) {
        return index >= 0 && index < this.size
    }

    // 是否合法位置索引
    isValidPositionIndex(index) {
        return index >= 0 && index <= this.size
    }

    checkEmpty() {
        if (this.size === 0) {
            throw new Error("No elements in the list!")
        }    
    }

    checkElementIndex(index) {
        if (!this.isValidElementIndex(index)) {
            throw new Error(`Index Out of Boundary! (Index: ${index}, Size: ${this.size})`)
        }
    }

    checkPositionIndex(index) {
        if (!this.isValidPositionIndex(index)) {
            throw new Error(`Invalid Position Index! (Index: ${index}, Size: ${this.size})`)
        }
    }

    show() {
        let cur = this.head.next
        let str = ""
        while (cur != this.tail) {
            str += `${cur.val} <-> `
            cur = cur.next
        }
        console.log(str + 'null')
    }
}

/* TEST CODE */
function test() {
    const list = new DoubleLinkedList();
    list.addLast(1);
    list.addLast(2);
    list.addLast(3);
    list.addFirst(0);
    list.add(2, 100);

    list.display();
    // 0 <-> 1 <-> 100 <-> 2 <-> 3 <-> null
}
test()