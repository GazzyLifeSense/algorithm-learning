/*
 * 双链表实现
 * 
 * 双链表不需要一整块连续的内存空间，通过每个节点上的 next, prev 指针，可将零散的内存块串联起来形成一个链式结构。
 * 内存利用率高，没有容量限制（除非占满内存），不需要考虑扩缩容和数据搬移的问题
 * 增删元素只需要接上或断开，但不支持通过索引快速访问元素
 * 
 * Ⅰ 同时持有头尾节点的引用
 *      头尾增删元素的时间复杂度都为O(1)
 * 
 * Ⅱ 虚拟头尾节点
 *      无论双链表是否为空，这两个节点都存在；避免出现空指针，可避免很多边界情况的处理。
 *      对外不可见，如get(index)都是从真实节点开始计算索引
 * 
 */
export { Node, DoubleLinkedList }

// 双链表节点
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

    list.show();
    // 0 <-> 1 <-> 100 <-> 2 <-> 3 <-> null
}
test()