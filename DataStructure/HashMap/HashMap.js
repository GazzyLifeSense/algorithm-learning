/*
 * 哈希表
 *
 * Ⅰ 可以理解为加强版的数组
 * 
 * Ⅱ 根据key查找value的时间复杂度O(1)，受哈希函数时间复杂度和哈希冲突影响
 *
 * Ⅲ key 唯一，value 可以重复；key不可变，可以是数字、字符串等多种类型
 * 
 * Ⅳ 哈希函数：把任意长度的输入（key）转化成固定长度的输出（索引）
 *      输入相同key -> 相同输出
 *      依赖table.length，即扩缩容可能导致哈希值、索引变化
 * 
 * Ⅴ 哈希冲突（不可避免）：不同key得到相同输出
 *      解决方法：
 *          Ⅰ 拉链法：纵向延伸，底层数组存储链表，新冲突kv插入链表头部
 *          Ⅱ 线性探查法（开放寻址法）：横向延伸，当前index已被占用则往index+1,...查看直到找到空位
 * 
 * Ⅵ 负载因子：哈希表装满的程度的度量，当哈希表内元素达到负载因子时，哈希表会扩容。
 *          计算：size / table.length，默认0.75为佳
 */
class HashMap {
    constructor() {
        this.table = new Array(1000).fill(null);
    }

    // 增/改，复杂度 O(1)
    put(key, value) {
        const index = this.hash(key);
        this.table[index] = value;
    }

    // 查，复杂度 O(1)
    get(key) {
        const index = this.hash(key);
        return this.table[index];
    }

    // 删，复杂度 O(1)
    remove(key) {
        const index = this.hash(key);
        this.table[index] = null;
    }

    // 哈希函数，把 key 转化成 table 中的合法索引
    // 时间复杂度必须是 O(1)，才能保证上述方法的复杂度都是 O(1)
    hash(key) {
        // ...
    }
}