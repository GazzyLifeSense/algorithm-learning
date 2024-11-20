/*
 * 数组加强哈希表
 *
 * Ⅰ 实现randomKey() API，可以在 O(1) 的时间复杂度返回一个随机键
 *      （每个键均匀随机，需要考虑空洞问题）
 *      拉链法每个索引处的链表节点数不一定相同，不是均匀随机
 *      线性查找法每次查找方向相同，两侧元素概率不等，不是均匀随机
 *      通过遍历底层数组存储所有key的时间复杂度是O(n)，不符合要求
 * 
 * Ⅱ 底层使用数组存储元素，另外使用一个数组来存储索引值, 不适应于大量数据的场景
 */
import { ChainingHashMap } from "./ChainingHashMap.js";

class ArrayHashMap extends ChainingHashMap {
    constructor(initCapacity) {
        super(initCapacity)
        this.keys = []
    }

    newNode(key, value) {
        const newNode = super.newNode(key, value)
        this.keys.push(key)
        return newNode
    }

    remove(key) {
        // 从底层数组删除元素
        const DeletedNode = super.remove(key)

        this.keys = this.keys.filter(k => k != key)

        return DeletedNode
    }

    randomKey() {
        return this.keys[Math.floor(Math.random() * this.keys.length)]
    }
}

/* TEST CODE */
function test() { 
    const map = new ArrayHashMap();
    map.put('123', 1);
    map.put(2, 2);
    map.put('hello', 3);
    map.put({ t: 1 }, 1);
    console.log(map.keys)

    map.remove('hello')
    console.log(map.keys)

    console.log(map.randomKey())
    console.log(map.randomKey())
    console.log(map.randomKey())
}