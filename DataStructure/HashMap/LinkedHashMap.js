/*
 * 哈希链表
 *
 * Ⅰ 兼具了哈希表 O(1) 的增删查改效率，和像数组链表一样保持键的插入顺序。
 *      （例如python中的dict和Java中的LinkedHashMap）
 *      而Golang中的map每次遍历顺序随机是有意而为，其利用了环形数组，每次遍历从随机索引开始读取
 * 
 * Ⅱ 底层使用数组存储元素，另外使用双链表维护元素的插入顺序
 */
import { DoubleLinkedList } from '../LinkedList/DoubleLinkedList.js'
import { ChainingHashMap } from './ChainingHashMap.js'

class LinkedHashMap extends ChainingHashMap{
    constructor(initCapacity) {
        super(initCapacity)
        this.order = new DoubleLinkedList()
    }

    newNode(key, value) {
        const newNode = super.newNode(key, value)
        this.order.addLast(newNode)
        return newNode
    }

    remove(key) {
        // 从底层数组删除元素
        const DeletedNode = super.remove(key)
        // 从插入顺序链表中删除元素
        let cur = this.order.head.next, index = 0
        while (cur != this.order.tail) {
            if (cur.val.key == key) {
                this.order.remove(index)
                break
            }
            cur = cur.next
            index++
        }
        return DeletedNode
    }

    keys() {
        const keys = []
        let cur = this.order.head.next
        while (cur != this.order.tail) {
            keys.push(cur.val.key)
            cur = cur.next
        }
        return keys
    }
}

/* TEST CODE */
function test() { 
    const map = new LinkedHashMap();
    map.put(3, 1);
    map.put(2, 2);
    map.put(4, 3);
    map.put(1, 1);
    console.log(map.keys())

    map.remove(4)
    console.log(map.keys())
}