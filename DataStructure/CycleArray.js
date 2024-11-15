/*
 * 环形数组
 *
 * ①区间左开右闭[start, end]
 * 
 * ②在数组头部添加或删除元素时，只需要移动 start 索引，
 *  而在数组尾部添加或删除元素时，只需要移动 end 索引。
 * 
 * ③当 start, end 移动超出数组边界（< 0 或 >= arr.length）时，
 *  我们可以通过求模运算 % 让它们转一圈到数组头部或尾部继续工作
 * 
 * ④自动扩缩容
 */
class CycleArray{
    constructor(size = 1) {
        this.size = size
        this.arr = new Array(size)
        this.start = 0
        this.end = 0
        this.count = 0
    }

    resize(newSize) {
        const newArray = new Array(newSize)
        for (let i = 0; i < this.count; i++){
            // start类似偏移量，取模运算保证索引不越界
            newArray[i] = this.arr[(this.start + i) % this.size]
        }
        this.arr = newArray
        // 重置start，end指针
        this.start = 0
        this.end = this.count
        this.size = newSize
    }

    // 查
    // get(index) } { 先判断index是否合法，再根据start指针进行偏移和模运算获得真实顺序索引 }

    getFirst() {
        this.checkEmpty()

        return this.arr[this.start]
    }
    
    getLast() {
        this.checkEmpty()

        // +this.size 防止出现索引为负 [_, _, _, _, 5] start = 4, end = 0
        return this.arr[(this.end - 1 + this.size) % this.size]
    }

    // 增
    addFirst(e) {
        if (this.isFull()) { this.resize(this.size * 2) }

        this.start = (this.start - 1 + this.size) % this.size
        this.arr[this.start] = e
        this.count++
    }

    addLast(e) {
        if (this.isFull()) { this.resize(this.size * 2) }

        this.arr[this.end] = e
        this.end = (this.end + 1) % this.size
        this.count++
    }

    // 删
    removeFirst() {
        this.checkEmpty()

        const DeletedVal = this.arr[this.start]
        this.arr[this.start] = null
        this.start = (this.start + 1) % this.size
        this.count--

        if (this.count > 0 && this.count == Math.floor(this.size / 4)) {
            this.resize(Math.floor(this.size / 2));
        }

        return DeletedVal
    }

    removeLast() {
        this.checkEmpty()

        const DeletedIndex = (this.end - 1 + this.size) % this.size
        const DeletedVal = this.arr[DeletedIndex]
        this.arr[DeletedIndex] = null
        this.end = DeletedIndex
        this.count--

        if (this.count > 0 && this.count == Math.floor(this.size / 4)) {
            this.resize(Math.floor(this.size / 2));
        }

        return DeletedVal
    }   

    isFull() {
        return this.count === this.arr.length    
    }

    checkEmpty() {
        if (this.count === 0) {
            throw new Error("Array is empty!")
        }
    }
}

/* TEST CODE */
function test() {
    const arr = new CycleArray(6)
    arr.addLast(1)
    arr.addLast(2)
    arr.addFirst(3)
    arr.addFirst(4)
    arr.addFirst(5)
    arr.removeLast()
    arr.removeFirst()
    arr.getFirst()
    arr.getLast()
    arr.removeLast()
    arr.removeLast()
}
test()