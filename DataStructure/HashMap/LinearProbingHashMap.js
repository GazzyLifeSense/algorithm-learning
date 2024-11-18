/*
 * 拉链法实现哈希表
 *
 * Ⅰ 发生冲突时往后找到一个空位
 * 
 * Ⅱ 需要使用环形数组技巧
 * 
 * Ⅲ 删除元素时保证元素连续的方法：
 *      ①把后面与被删除元素索引冲突的元素往前挪
 *      ②使用占位符标记被删entry，可以避免频繁数据迁移，不适用于频繁增删的场景
 */
class KVNode{
    constructor(key, value) {
        this.key = key
        this.value = value
    }
}
// 数据迁移方式
class LinearProbingHashMap{
    constructor(initCap) {
        this.table = []
        this.INIT_CAP = 4
        this.size = 0

        this.init(initCap)
    }

    init(initCap) {
        const capacity = initCap || this.INIT_CAP
        this.table = new Array(capacity)
        this.size = 0
    }

    // 增、改
    put(key, val) {
        if (key == null) throw new Error("key is null!")
        // 扩容
        if (this.size == this.length()) this.resize(this.length() * 2)
        
        const index = this.findKeyIndex(key)
        this.table[index] = new KVNode(key, val)
        this.size++
    }

    // 删
    remove(key) {
        if (key == null) throw new Error("key is null!")

        let index = this.findKeyIndex(key)
        const DeletedEntry = this.table[index]
        // key不存在
        if (DeletedEntry == null) return
        
        this.table[index] = null
        // 数据迁移
        index = (index + 1) % this.length()
        while (this.table[index] != null) {
            const entry = this.table[index]
            this.table[index] = null
            // rehash
            this.put(entry.key, entry.value)
            index = (index + 1) % this.length()
        }
        this.size--

        // 缩容
        if (this.size == this.length() / 4) this.resize(Math.floor(this.length() / 2))
        return DeletedEntry
    }

    // 查
    get(key) {
        if (key == null) throw new Error("key is null!")
        
        const index = this.findKeyIndex(key)
        return this.table[index]?.value ?? null
    }

    /***** 其他工具函数 *****/

    // 查找空位索引
    findKeyIndex(key) {
        let index = this.hash(key)

        while (this.table[index] != null) {
            if (this.table[index].key == key) {
                return index
            }
            index = (index + 1) % this.length()
        }

        return index
    }

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
        hash = (hash & 0x7fffffff) % this.length()
        
        return hash;
    }

    length() {
        return this.table.length    
    }

    // 扩缩容
    resize(newCap) {
        const newMap = new LinearProbingHashMap(newCap)
        for (let i = 0; i < this.length(); i++){
            const entry = this.table[i]
            if (entry.key != null) {
                newMap.put(entry.key, entry.value)
            }
        }

        this.table = newMap
    }
}

// 占位符方式
class LinearProbingHashMapWithPlaceholder{
    constructor(initCap) {
        this.table = []
        this.INIT_CAP = 4
        this.size = 0
        this.DELETED = new KVNode(-1, 'DELETED')
        this.init(initCap)
    }

    init(initCap) {
        const capacity = initCap || this.INIT_CAP
        this.table = new Array(capacity)
        this.size = 0
    }

    // 增、改
    put(key, val) {
        if (key == null) throw new Error("key is null!")
        // 扩容 （仅当有效entry数量 = 数组长度时扩容，因为没有空位时会优先替换占位符的位置）
        if (this.size == this.length()) this.resize(this.length() * 2)
        
        let index = this.findKeyIndex(key)
        // key存在 -> 修改value
        if (index != -1) {
            this.table[index].value = val
            return
        }

        // key不存在 -> 新建节点并插入
        index = this.hash(key)
        while (this.table[index] != null && this.table[index] != this.DELETED) {
            index = (index + 1) % this.length()
        }
        this.table[index] = new KVNode(key, val)
        this.size++
    }

    // 删
    remove(key) {
        if (key == null) throw new Error("key is null!")

        let index = this.findKeyIndex(key)
        // key不存在
        if (index == -1) return
        // 使用占位符表示删除
        const DeletedEntry = this.table[index]
        this.table[index] = this.DELETED
        this.size--

        // 缩容
        if (this.size == this.length() / 4) this.resize(Math.floor(this.length() / 2))
        return DeletedEntry
    }

    // 查
    get(key) {
        if (key == null) throw new Error("key is null!")
        
        const index = this.findKeyIndex(key)
        return index != -1 ? this.table[index].value : null
    }

    /***** 其他工具函数 *****/

    // 查找已存在的key在table中的索引, 若不存在则返回-1
    findKeyIndex(key) {
        for (let i = this.hash(key), step = 0; this.table[i] != null; i = (i + 1) % this.length()){
            const entry = this.table[i]
            // 遇到占位符直接跳过
            if (entry == this.DELETED) continue
            if (entry.key == key) return i
            if(++step == this.length()) return -1
        }

        return -1
    }

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
        hash = (hash & 0x7fffffff) % this.length()
        
        return hash;
    }

    length() {
        return this.table.length    
    }

    // 扩缩容，同时清理占位符
    resize(newCap) {
        const newMap = new LinearProbingHashMapWithPlaceholder(newCap)
        for (let i = 0; i < this.length(); i++){
            const entry = this.table[i]
            if (entry != null && entry != this.DELETED) {
                newMap.put(entry.key, entry.value)
            }
        }

        this.table = newMap.table
    }
}

/* TEST CODE */
function test() {
    const map = new LinearProbingHashMap(10)
    map.put(1, 1)
    map.put(2, 2)
    map.put(10, 10)
    map.put(20, 20)
    map.put(30, 30)
    map.put(3, 3)

    console.log(map.get(1))
    console.log(map.get(2))
    console.log(map.get(20))

    map.put(1, 100)
    console.log(map.get(1))

    map.remove(20)
    console.log(map.get(20))
    console.log(map.get(30))
}
test()