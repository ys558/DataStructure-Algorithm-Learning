// ### 13.1.5 快速排序

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
};
function defaultCompare(a, b) {
    if (a === b) {
        return Compare.EQUALS;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function swap(array, a, b) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
    // - ES6 的方式
    // [array[a], array[b]] = [array[b], array[a]]
}

function quickSort(array, compareFn = defaultCompare) {
    return quick(array, 0, array.length - 1, compareFn);
}

// - 就像归并算法那样, 开始声明一个主方法来调用递归函数, 传递待排序数组, 以及索引
//   0 及其最末的位置(因为我们要排整个数组, 而不是一个子数组) 作为参数.
// - left: 指向数组第一个值的索引. right: 指向数组最后一个值的索引.

// - 首先声明 index({1}), 该变量能帮助我们将子数组分离为较小值数组和较大值数组.
//   这样就能再次递归地调用 quick 函数了. partition 函数返回值将赋值给
//   index({3}).
// - 如果数组的长度比 1 大(因为只有一个元素的数组必然是已排序了的 -- {2}), 我们
//   将对给定子数组执行 partition 操作(第一次调用时针对整个数组) 以得到 index
//   ({3}). 如果子数组存在较小值得元素({4}), 则对该数组重复这个过程({5}). 同理
//   , 对存在较大值得子数组也是如此, 如果有子数组存在较大值({6}), 我们也将重复
//   快速排序过程({7}).
function quick(array, left, right, compareFn) {
    let index;  // {1}
    if (array.length > 1) { // {2}
        index = partition(array, left, right, compareFn);   // {3}
        if (left < index - 1) {  // {4}
            quick(array, left, index - 1, compareFn);    // {5}
        }
        if (index < right) {    // {6}
            quick(array, index, right, compareFn);  // {7}
        }
    }
    return array;
}

// - (1) 划分过程: 第一件要做的事情是选择主元，有好几种方式。最简单的一种是选择
//   数组的第一个值（最左边的值）。然而，研究表明对于几乎已排序的数组，这不是一个
//   好的选择，它将导致该算法的最差表现。另外一种方式是随机选择数组的一个值或是选择
//   中间的值。
// - 在本实现中, 我们选择中间值作为主元({8}). 我们初始化 2 个指针, left({9})
//   和 right({10}).
// - 只要 left 和 right 指针没有相互交错({11}), 就执行划分操作. 首先, 移动
//   left 指针直到找到一个比主元大的元素({12}). 对 right 指针, 我们做同样的事情
//   , 移动 right 指针直到我们找到一个比主元小的元素({13}).
// - 当左指针指向的元素比主元大且右指针指向的元素比主元小, 并且此时左指针索引没有
//   右指针索引大时({14}), 意思是左项比右项大(值比较), 我们交换它们({15}), 然后
//   移动 2 个指针, 并重复此过程(从行{11} 再次开始).
// - 在划分操作结束后, 返回左指针的索引, 用来在行{3}处创建子数组.
function partition(array, left, right, compareFn) {
    const pivot = array[Math.floor((right + left) / 2)];    // {8}
    let i = left;   // {9}
    console.log('i:', i);
    let j = right;  // {10}
    console.log('j:', j);
    while (i <= j) {    // {11}
        while (compareFn(array[i], pivot) === Compare.LESS_THAN) {  // {12}
            i++;
        }
        while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) { // {13}
            j--;
        }
        if (i <= j) {   // {14}
            swap(array, i, j);  // {15}
            i++;
            j--;
        }
    }
    return i;   // {16}
}

const array = [3, 5, 1, 6, 4, 7, 2];
const arr = quickSort(array);
console.log('arr:', arr);  // arr: [1, 2, 3, 4, 5, 6, 7]