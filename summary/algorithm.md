### 两数和
```js
/*
    输入：nums = [2,7,11,15], target = 9
    输出：[0,1]
    解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

    输入：nums = [3,2,4], target = 6
    输出：[1,2]

    输入：nums = [3,3], target = 6
    输出：[0,1]
    */
// 暴力循环
function sum(nums, target) {
    var result = [];
    for (var i = 0; i < nums.length; i++) {
        var z = nums[i];
        for (var j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                result = [i, j];
            }
        }
    }
    return result;
};
// 用map结构
function sum1(nums, target){
    var map = new Map();
    for(var i = 0; i < nums.length; i++){
        if (map.has(target - nums[i])) {
            return [map.get(target - nums[i]), i]
        }
        map.set(nums[i], i);
    }
}

// 用数组保存
function sum2(nums, target) {
    var list = [];
    for (var i = 0; i < nums.length; i++) {
        var diff = target - nums[i];
        if (list.includes(diff)) {
            var index = nums.findIndex(item => item === diff)
            return [index, i]
        }
        list.push(nums[i]);
    }
}

var nums = [2,7,11,15];
var target = 26;
sum1(nums, target);
```

### 有效的括号
```js
/*
    给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
    有效字符串需满足：
    左括号必须用相同类型的右括号闭合。
    左括号必须以正确的顺序闭合。
    每个右括号都有一个对应的相同类型的左括号。
    示例 1：

    输入：s = "()"
    输出：true
    示例 2：

    输入：s = "()[]{}"
    输出：true
    示例 3：

    输入：s = "(]"
    输出：false
    */
/*
    解题思路：
    1.既然是左右括号都是一一对应的，那么字符串肯定是偶数，基数肯定不是成对的存在，所以直接返回false
    2.有了上述的结论后，那么使用while循环，不停的将成对的括号清空，直至''，就是true
    3.如果是[)这样的字符串，while循环就需要即使阻止。方法是声明一个temp变量，如果和str一致说明字符串已经不可能被清空了，返回false即可
    */
function validBrackets(str) {
    if (typeof str !== 'string') {
        return false
    };
    if (str.length % 2 === 1) {
        return false;
    }
    while (str.length) {
        var temp = str;
        str = str.replace('[]', '');
        str = str.replace('{}', '');
        str = str.replace('()', '');
        if (str === temp) {
            return false;
        }
    }
    if (str === '') {
        return true;
    }
}

var str = '()[]{}[';
validBrackets(str);
```

### 请找出一串字符串里最长的回文串
核心思想：
1. 双循环，拿到某一个字符串，比如abc，然后进行倒序变成cba，判断这2个字符串是否相等
2. 事先设置一个变量记录最大的回文串，并返回

```js
/*
    找出最长回文字符串，比如
    abcdca => cdc
    asdsa => asdsa
    abba => abba
    */
function findTargetStr(str) {
    if(str.length <=1) {
        return str;
    }
    var result = '';
    var maxLength = 0;
    for(var i = 0;i < str.length;i++){
        for(var j = i;j <= str.length;j++){
            var p = str.substring(i,j);
            var reverseP = p.split('').reverse().join('');
            if (p === reverseP) {
                if (p.length >= maxLength) {
                    maxLength = p.length;
                    result = p;
                }
            }
        }
    }
    return result;
}
var str = 'aaac';
findTargetStr(str);
```

### 找到最大公共前缀
一个数组内有N个字符串，请找到最大的公共前缀并返回，例如：`['aabc', 'aabcd', 'aabcder'] => 'aabc'`

```js
/*
    例子 ['aabc', 'aabcd', 'aabcder'] => 'aabc'
    */ 
/*
    核心思想：
    1.查找最大公共前缀，那么可以把第一个当成基准点
    2.然后去遍历数组的每一项，和基准点进行比较，如果匹配上了就++，并存到一个map里，最终这个map是{1: 个数, 2: 个数, 3: 个数}
    3.因为是找公共的，那么个数最少的就是我们需要拿到的值
    4.拿到值后对第一个字符串进行切割，并返回
    */
function findLargestCommonLetters(arr) {
    if (!(Array.isArray(arr) && arr.length)) {
        return '';
    }
    if (arr.length === 1) {
        return arr[0];
    }
    var first = arr[0];
    var tag = {};
    var result = 0;
    for (var index = 1; index < arr.length; index++) {
        var z = arr[index];
        var inx = 0;
        tag[index] = 0;
        while (inx < first.length) {
            // charAt是字符串的方法，主要是判断第N位是什么字符
            var p = first.charAt(inx);
            var p1 = z.charAt(inx);
            if (p === p1) {
                inx++;
                tag[index] = inx;
            } else {
                break;
            }
        }
    };
    result = Object.values(tag)
    if (Array.isArray(result) && result.length) {
        result = result.sort()[0] || 0;
    }
    return first.substr(0, result);
};
findLargestCommonLetters(['1a2bcdefg', 'a2bcdef']); // empty
findLargestCommonLetters(['a', 'aa']); // a
findLargestCommonLetters(['abc', 'ab']); // ab
findLargestCommonLetters(['abc', 'abc']); // abc
findLargestCommonLetters(['a', 'ab', 'abc', 'abcd']); // a
```

### 搜索插入元素位置
```js
/*
    给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。
    如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

    请必须使用时间复杂度为 O(log n) 的算法。

    示例 1:
    输入: nums = [1,3,5,6], target = 5
    输出: 2
    示例 2:
    输入: nums = [1,3,5,6], target = 2
    输出: 1
    示例 3:
    输入: nums = [1,3,5,6], target = 7
    输出: 4
    */
function searchPosition(list, target) {
    if (!Array.isArray(list)) {
        return -1
    }
    var pos = -1;
    while (pos < list.length) {
        if (list[pos] === target) {
            return pos;
        }
        if (target > list[pos] && target < list[pos+1]) {
            return pos+1;
        }
        pos++;
    }
    return pos
}
var list = [1,3,5,6];
var target = 7;
searchPosition(list, target);
```

### 查找一串单词中最后一个单词的长度
```js
/*
    给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中 最后一个 单词的长度。
    单词 是指仅由字母组成、不包含任何空格字符的最大子字符串。

    示例 1：
    输入：s = "Hello World"
    输出：5
    解释：最后一个单词是“World”，长度为5。

    示例 2：
    输入：s = "   fly me   to   the moon  "
    输出：4
    解释：最后一个单词是“moon”，长度为4。
    示例 3：

    输入：s = "luffy is still joyboy"
    输出：6
    解释：最后一个单词是长度为6的“joyboy”。
    */
function findLargest(str) {
    str = str.trim();
    var arr = str.split(/\s+/);
    return (arr.pop()).length;
}
function findLargest1(str) {
    while (str.length) {
        var temp = str;
        str = str.replace(/\s*\w+\s*/, '');
        if (str === '' && temp) {
            return (temp.trim()).length
        }
    }
}
var str = 'luffy    is still joyboy';
var str1 = '   fly me   to   the moon  ';
var str2 = 'hello world';
console.log(findLargest1(str)) // 6
console.log(findLargest1(str1)) // 4
console.log(findLargest1(str2)) // 5
```

### 寻找平方根
```js
/*
    给你一个非负整数 x ，计算并返回 x 的 算术平方根 。
    由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。
    注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。

    示例 1：

    输入：x = 4
    输出：2
    示例 2：

    输入：x = 8
    输出：2
    解释：8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。
    */
// 暴力法
function sqrt(n) {
    if (n === 0 || n === 1) {
        return n;
    }
    var half = Math.ceil(n/2);
    for(var i = 0; i <= half; i++){
        if (i * i <= n && (i+1)*(i+1) > n) {
            return i
        }
    }
}
// 二分法
function sqrt1(n) {
    var left = 0;
    var right = n;
    while (left <= right) {
        var mid = left + (right - left) / 2;
        mid = Math.ceil(mid)
        var val = mid * mid;
        if (val === n) {
            return mid;
        } else if (val < n) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return Math.floor(right)
}
var num = 168;
sqrt1(num);
```

### 爬楼梯
```js
/*
    假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
    每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
    示例 1：

    输入：n = 2
    输出：2
    解释：有两种方法可以爬到楼顶。
    1. 1 阶 + 1 阶
    2. 2 阶
    示例 2：

    输入：n = 3
    输出：3
    解释：有三种方法可以爬到楼顶。
    1. 1 阶 + 1 阶 + 1 阶
    2. 1 阶 + 2 阶
    3. 2 阶 + 1 阶
    */
// 递归
function climb(n){
    if (n <= 2) {
        return n;
    }
    return climb(n-1) + climb(n-2);
}
// 缓存数据
function climb1(n) {
    if (n <= 2) {
        return n;
    }
    var arr = [1,1,2];
    for(var i = 3; i <= n; i++){
        arr[i] = arr[i-1] + arr[i-2];
    }
    return arr[n];
}
var n = 7;
climb(n);
```

### 查找出现一次的数字
```js
/*
    给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
    你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。

    示例 1 ：

    输入：nums = [2,2,1]
    输出：1
    示例 2 ：

    输入：nums = [4,1,2,1,2]
    输出：4
    示例 3 ：

    输入：nums = [1]
    输出：1
    */
function findOnce(list) {
    if (list.length === 1) {
        return list[0];
    }
    var result = '';
    list.forEach(item=>{
        if (result.includes(item)) {
            // 一直替换空，直到剩下的就是单一的那个
            result = result.replace(item, '');
        } else {
            result += item;
        }
    });
    return result
}
var list = [4,1,2,1,2,4,5,6,5];
findOnce(list); // 6
```

### 查找最小公共值
```js
/*
    给你两个整数数组 nums1 和 nums2 ，它们已经按非降序排序，请你返回两个数组的 最小公共整数 。
    如果两个数组 nums1 和 nums2 没有公共整数，请你返回 -1 。
    如果一个整数在两个数组中都 至少出现一次 ，那么这个整数是数组 nums1 和 nums2 公共 的。

    示例 1：

    输入：nums1 = [1,2,3], nums2 = [2,4]
    输出：2
    解释：两个数组的最小公共元素是 2 ，所以我们返回 2 。
    示例 2：

    输入：nums1 = [1,2,3,6], nums2 = [2,3,4,5]
    输出：2
    解释：两个数组中的公共元素是 2 和 3 ，2 是较小值，所以返回 2 。
    */
// 暴力循环
function findCommon(list1, list2) {
    var result = [];
    if (list1.length >= list2.length) {
        list1.forEach(item => {
            if(list2.includes(item)){
                result.push(item)
            }
        })
    } else {
        list2.forEach(item => {
            if(list1.includes(item)){
                result.push(item)
            }
        })
    }
    return result.pop() || -1;
}

// 双指针
function findCommon1(list1, list2) {
    var result = [];
    var left = list1.length;
    var right = list2.length;
    for(var i = 0, j = 0; i < left && j < right;){
        if (list1[i] === list2[j]) {
            result.push(list1[i]);
            i++;
            j++;
        } else if (list1[i] > list2[j]) {
            j++;
        } else {
            i++;
        }
    };
    return result.pop() || -1;
}

var list1 = [1,2,3,6];
var list2 = [2,3,4,5];
findCommon1(list1, list2)
```

### 查找独一无二的数
```js
/*
    给你一个整数数组 arr，请你帮忙统计数组中每个数的出现次数。
    如果每个数的出现次数都是独一无二的，
    就返回 true；否则返回 false。

    示例 1：
    输入：arr = [1,2,2,1,1,3]
    输出：true
    解释：在该数组中，1 出现了 3 次，2 出现了 2 次，3 只出现了 1 次。没有两个数的出现次数相同。
    示例 2：

    输入：arr = [1,2]
    输出：false
    示例 3：

    输入：arr = [-3,0,1,-3,1,1,1,-3,10,0]
    输出：true
    */
function unique(arr) {
    var result = {};
    arr.forEach(item => {
        result[item] = (result[item] || 0) + 1;
    });
    var res = Object.values(result);
    var diff = [...new Set(res)];
    return res.length === diff.length
}

var arr = [-3,0,1,-3,1,1,1,-3,10,0]
unique(arr);
```

### 查找幸运数
```js
/*
    在整数数组中，如果一个整数的出现频次和它的数值大小相等，我们就称这个整数为「幸运数」。
    给你一个整数数组 arr，请你从中找出并返回一个幸运数。
    如果数组中存在多个幸运数，只需返回 最大 的那个。
    如果数组中不含幸运数，则返回 -1 。

    示例 1：

    输入：arr = [2,2,3,4]
    输出：2
    解释：数组中唯一的幸运数是 2 ，因为数值 2 的出现频次也是 2 。
    示例 2：

    输入：arr = [1,2,2,3,3,3]
    输出：3
    解释：1、2 以及 3 都是幸运数，只需要返回其中最大的 3 。
    示例 3：

    输入：arr = [2,2,2,3,3]
    输出：-1
    解释：数组中不存在幸运数。
    示例 4：

    输入：arr = [5]
    输出：-1
    示例 5：

    输入：arr = [7,7,7,7,7,7,7]
    输出：7
    */
function lucky(arr) {
    var result = {};
    var num = -1;
    arr.forEach(item => {
        result[item] = (result[item] || 0) + 1;
    });
    for(var i in result){
        if (i == result[i]) {
            num = i
        }
    }
    return num;
}
var arr = [7,7,7,7,7,7,7]
lucky(arr);
```

### 二进制计算
二进制转换成十进制其实就是：`101 => 1*2**2+1*2**0`
```js
/*
请写一个函数，输入任意十进制的数，返回二进制的数
比如：输入2，输出10，输入10，输出1010
*/
function format(num) {
    if (num == 1) {
        return '01';
    }
    var result = [];
    while (num >= 1) {
        if (num === 1) {
            result.unshift(1)
            return result.join('');
        }
        if (num % 2 === 1) {
            num -= 1;
            num /= 2;
            result.unshift(1)
        }
        if (num % 2 === 0) {
            num /= 2;
            result.unshift(0)
        }
    }
}
var num = 12;
format(num); // 1100
```

### 交替数字和
核心思路：将数字变成字符串，然后循环相加/减即可
```js
/*
给你一个正整数 n 。n 中的每一位数字都会按下述规则分配一个符号：
最高有效位 上的数字分配到 正 号。
剩余每位上数字的符号都与其相邻数字相反。
返回所有数字及其对应符号的和。

示例 1：
输入：n = 521
输出：4
解释：(+5) + (-2) + (+1) = 4

示例 2：
输入：n = 111
输出：1
解释：(+1) + (-1) + (+1) = 1

示例 3：
输入：n = 886996
输出：0
解释：(+8) + (-8) + (+6) + (-9) + (+9) + (-6) = 0
*/
function addNum(num) {
    if (!num) {
        return null;
    }
    var strNum = num + '';
    if (strNum.length === 1) {
        return strNum - 0;
    }
    var result = 0;
    for(var i = 0; i < strNum.length; i++){
        if (i % 2 === 0) {
            result += (strNum[i] - 0);
        } else {
            result -= strNum[i];
        }
    }
    return result
}
console.log(addNum(521)); // 4
console.log(addNum(111)); // 1
console.log(addNum(886996)); // 0
```

### 分割数字
核心思路：将多位数字变成字符串，然后转变成数组，concat，一位数字的话直接push即可完成
```js
/*
给你一个正整数数组 nums ，请你返回一个数组 answer ，你需要将 nums 中每个整数进行数位分割后，按照 nums 中出现的 相同顺序 放入答案数组中。

对一个整数进行数位分割，指的是将整数各个数位按原本出现的顺序排列成数组。

比方说，整数 10921 ，分割它的各个数位得到 [1,0,9,2,1] 。

示例 1：
输入：nums = [13,25,83,77]
输出：[1,3,2,5,8,3,7,7]
解释：
- 分割 13 得到 [1,3] 。
- 分割 25 得到 [2,5] 。
- 分割 83 得到 [8,3] 。
- 分割 77 得到 [7,7] 。
answer = [1,3,2,5,8,3,7,7] 。answer 中的数字分割结果按照原数字在数组中的相同顺序排列。

示例 2：
输入：nums = [7,1,3,9]
输出：[7,1,3,9]
解释：nums 中每个整数的分割是它自己。
answer = [7,1,3,9] 。
*/
function splitNums(list) {
    var result = [];
    list.forEach(item=>{
        if ((item + '').length > 1) {
            var r = (item + '')
                    .split('')
                    .map(item => Number(item));
            result = result.concat(r)
        } else {
            result.push(item)
        }
    });
    return result;
}
var list = [7,1,3,9]
splitNums(list);
```

### 唯一元素和
```js
/*
给你一个整数数组 nums 。数组中唯一元素是那些只出现 恰好一次 的元素。

请你返回 nums 中唯一元素的 和 。

示例 1：
输入：nums = [1,2,3,2]
输出：4
解释：唯一元素为 [1,3] ，和为 4 。

示例 2：
输入：nums = [1,1,1,1,1]
输出：0
解释：没有唯一元素，和为 0 。

示例 3 ：
输入：nums = [1,2,3,4,5]
输出：15
解释：唯一元素为 [1,2,3,4,5] ，和为 15 。
*/
function onlyNum(list) {
    var num = 0;
    var result = {};
    list.forEach(item => {
        result[item] = (result[item] || 0) + 1;
    });
    for(var i in result){
        if (result[i] === 1) {
            num += i - 0;
        }
    }
    return num;
}
console.log(onlyNum([1,2,3,2])); // 4
console.log(onlyNum([1,1,1,1])); // 0
console.log(onlyNum([1,2,3,4,5])); // 15
console.log(onlyNum([1,2,2,3,3])); // 1
```

### 查找最大值是否是其他数字的2倍
核心思路：将数组降序排列，只要比较第一，第二是否满足即可，不满足直接return -1，否则返回最大值的序号
```js
/*
在一个给定的数组nums中，总是存在一个最大元素 。
查找数组中的最大元素是否至少是数组中每个其他数字的两倍。
如果是，则返回最大元素的索引，否则返回-1。

示例 1:

输入: nums = [3, 6, 1, 0] 输出: 1 
解释: 6是最大的整数, 对于数组中的其他整数, 
6大于数组中其他元素的两倍。6的索引是1, 所以我们返回1.

示例 2:

输入: nums = [1, 2, 3, 4] 输出: -1 
解释: 4没有超过3的两倍大, 所以我们返回 -1.
*/
function isTwice(list) {
    if (!Array.isArray(list)) {
        return -1;
    }
    if (list.length === 1) {
        return -1;
    }
    var newArr = [...list].sort((a,b) => b-a);
    var max = newArr[0];
    var second = newArr[1];
    if (max / second >= 2) {
        return list.findIndex(item => item === max);
    } else {
        return -1;
    }
    return newArr
}
var nums = [3, 6, 11, 0, 12];
isTwice(nums);
```