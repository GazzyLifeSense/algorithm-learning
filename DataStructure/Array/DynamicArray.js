/*
 * 动态数组实现
 * 
 * 「静态数组」就是一块连续的内存空间，在创建的时候就要确定数组的元素类型和元素数量
 * 「动态数组」是在静态数组的基础上添加了一些常用的 API，队列、栈、哈希表等复杂数据结构都会依赖它进行实现
 * 
 * Ⅰ 自动扩缩容策略：
 *      当数组元素个数达到底层静态数组的容量上限时，扩容为原来的 2 倍；
 *      当数组元素个数缩减到底层静态数组的容量的 1/4 时，缩容为原来的 1/2。
 * 
 * Ⅱ 索引越界检查
 * 
 */
class MyArrayList{
    constructor(initCapacity) {
        this.data = []
        this.size = 0
        this.INIT_CAP = 0

        this.init(initCapacity)
    }

    init(initCapacity) {
        const capacity = initCapacity || this.INIT_CAP
        this.data = new Array(capacity)
        this.size = 0
    }

    // 查
    get(index) {
        this.checkElementIndex(index)

        return this.data[index]
    }

    // 增
    add(index, ele) {
        this.checkPositionIndex(index)
        this.AutoResize()
        
        for (let i = this.size; i > index; i--){
            this.data[i] = this.data[i - 1]
        }
        this.data[index] = ele
        this.size++
    }

    addFirst(ele) {
        this.add(0, ele)
    }

    addLast(ele) {
        this.AutoResize()

        this.data[this.size++] = ele
    }

    // 删
    remove(index) {
        this.checkElementIndex(index)
        this.AutoResize()

        const DeletedVal = this.data[index]

        for (let i = index + 1; i < this.size; i++){
            this.data[i - 1] = this.data[i]
        }
        this.data[this.size - 1] = null
        this.size--

        return DeletedVal
    }

    removeFirst() {
        return this.remove(0)
    }

    removeLast() {
        return this.remove(this.size - 1)
    }

    // 扩缩容
    resize(capacity) {
        const newArray = new Array(capacity)
        for (let i = 0; i < this.size; i++){
            newArray[i] = this.data[i]
        }

        this.data = newArray
    }

    // 自动扩缩容
    AutoResize() {
        const capacity = this.data.length
        if (this.size) {
            if (this.size == capacity) {
                this.resize(capacity * 2)
            } else if (this.size == Math.floor(capacity / 4)) {
                this.resize(Math.floor(capacity / 2))
            }
        }
    }

    // 是否合法元素索引
    isValidElementIndex(index) {
        return index >= 0 && index < this.size
    }

    // 是否合法位置索引
    isValidPositionIndex(index) {
        return index >= 0 && index <= this.size
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
}

/* TEST CODE */
function test() {
    // 初始容量设置为 3
    const arr = new MyArrayList(3);

    // 添加 5 个元素
    for (let i = 1; i <= 5; i++) {
        arr.addLast(i);
    }

    arr.remove(3);
    arr.add(1, 9);
    arr.addFirst(100);
    arr.removeLast();

    // 100 1 9 2 3
    for (let i = 0; i < arr.size; i++) {
        console.log(arr.get(i));
    }
}
test()