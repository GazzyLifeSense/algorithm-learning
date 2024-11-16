/*
 * 拉链法实现哈希表
 *
 * Ⅰ 使用单链表节点，存储 key-value 对
 * 
 * Ⅱ 发生哈希冲突，后来者插入索引处单链表头部
 */
import { SingleLinkedList } from '../LinkedList/SingleLinkedList'
class KVNode{
    constructor(key, value) {
        this.key = key
        this.value = value
    }
}
class ChainingHashMap {
    constructor(initCapacity) {
        // 哈希表的底层数组，每个数组元素是一个链表，链表中每个节点是 KVNode 存储键值对
        this.table = []
        // 哈希表中存入的键值对个数
        this.size = 0
        // 底层数组的初始容量
        this.INIT_CAP = 4

        this.init(initCapacity)
    }
    
    // 初始化哈希表
    init(initCapacity) {
        const capacity = initCapacity || this.INIT_CAP
        this.table = new Array(capacity)
        this.size = 0
        for (let i = 0; i < capacity; i++){
            this.table[i] = new SingleLinkedList()
        }
    }

    /***** 增/改 *****/

    // 添加 key -> val 键值对
    // 如果键 key 已存在，则将值修改为 val
    put(key, val) {
        if (key == null) {
            throw new Error("key is null");
        }

        const list = this.table[this.hash(key)];
        // 如果 key 之前存在，则修改对应的 val
        for (let node of list) {
            if (node.key === key) {
                node.value = val;
                return;
            }
        }
        // 如果 key 之前不存在，则插入链表头部，size 增加
        list.addFirst(new KVNode(key, val));
        this.size++;

        // 如果元素数量超过了负载因子，进行扩容
        if (this.size >= this.table.length * 0.75) {
            this.resize(this.table.length * 2);
        }
    }

    /***** 删 *****/

    // 删除 key 和对应的 val
    remove(key) {
        if (key == null) {
            throw new Error("key is null");
        }

        const list = this.table[this.hash(key)];
        // 如果 key 存在，则删除，size 减少
        for (let i = 0; i < list.size; i++) {
            if (list.get(i).key === key) {
                list.remove(i);
                this.size--;

                // 缩容，当负载因子小于 0.125 时，缩容
                if (this.size <= this.table.length / 8) {
                    this.resize(Math.floor(this.table.length / 4));
                }
                return;
            }
        }
    }

    /***** 查 *****/

    // 返回 key 对应的 val，如果 key 不存在，则返回 null
    get(key) {
        if (key == null) {
            throw new Error("key is null");
        }

        const list = this.table[this.hash(key)];
        for (let node of list) {
            if (node.key === key) {
                return node.value;
            }
        }
        return null;
    }

    // 返回所有 key
    keys() {
        keys = [];
        for (let list of this.table) {
            for (let node of list) {
                keys.push(node.key);
            }
        }
        return keys;
    }

    /***** 其他工具函数 *****/

    // 哈希函数
    hash(key) {
        const str = JSON.stringify(key)
        let hash = 0, chr
        for (let i = 0; i < str.length; i++){
            chr = str.charCodeAt(i)
            hash = ((hash << 5) - hash) + chr
            hash |= 0 // Convert to int
        }
        // 映射到 table 的索引
        hash = (hash & 0x7fffffff) % this.table.length
        
        return hash;
    }

    resize(newCap) {
        // 构造一个更大容量的 HashMap
        const newMap = new ChainingHashMap(newCap);
        // 穷举当前 HashMap 中的所有键值对
        for (let list of this.table) {
            for (let node of list) {
                // 将键值对转移到新的 HashMap 中
                newMap.put(node.key, node.value);
            }
        }
        // 将当前 HashMap 的底层 table 换掉
        this.table = newMap.table;
    }

    
}

/* TEST CODE */
function test() { 
    const map = new ChainingHashMap();
    map.put(1, 1);
    map.put(2, 2);
    map.put(3, 3);
    console.log(map.get(1)); // 1
    console.log(map.get(2)); // 2

    map.put(1, 100);
    console.log(map.get(1)); // 100

    map.remove(2);
    console.log(map.get(2)); // null

    console.log(map.keys()); // [1, 3]（顺序可能不同）
}
test()