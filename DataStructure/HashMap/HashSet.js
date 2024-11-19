/*
 * 哈希集合
 *
 * Ⅰ 不允许重复（底层是哈希表，用key存储元素，value统一是PRESENT), key可以为null
 * 
 */
import { LinearProbingHashMap } from "./LinearProbingHashMap.js"

class HashSet{
    constructor(initCap) {
        this.table = new LinearProbingHashMap(initCap)
        this.PRESENT = {}
    }

    add(key) {
        this.table.put(key, this.PRESENT)
    }

    contains(key) {
        return this.table.get(key) ? true : false
    }

    // 有该key删除成功返回PRESENT, 无该key返回null
    remove(key) {
        return this.table.remove(key)?.value ?? null
    }

    size() {
        return this.table.size
    }
}
/* TEST CODE */
function test() {
    const myHashSet = new HashSet()
    myHashSet.add({})
    myHashSet.remove({})
    console.log(myHashSet.contains({}))
}
test()