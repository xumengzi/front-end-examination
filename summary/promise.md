### Promise
`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）
一个 `Promise` 必然处于以下几种状态之一 👇：

- 待定 (`pending`): 初始状态，既没有被兑现，也没有被拒绝。
- 已成功 (`fulfilled`): 意味着操作成功完成。
- 已拒绝 (`rejected`): 意味着操作失败。

当 `promise` 被调用后，它会以处理中状态 (`pending`) 开始。 这意味着调用的函数会继续执行，而 `promise` 仍处于处理中直到解决为止，从而为调用的函数提供所请求的任何数据。
被创建的 `promise` 最终会以被解决状态 (`fulfilled`) 或 被拒绝状态 (`rejected`) 结束，并在完成时调用相应的回调函数（传给 `then` 和 `catch`）。

![](../assets/promise.jpg)
```js
// var promise = new Promise((resolve, reject)=>{
//     resolve('done');
// });
// promise.then(res=> {
//     console.log(res);
// },reason => {
//     console.log(reason);
// })
/*
    promise 有3种状态：pending，fulfilled，rejected，
    pending可以转换成fulfilled或者rejected，但是不可逆
    */
class myPromise {
    // 先定义3个状态常量
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';
    // 构造函数，传入参数，参数是一个函数
    constructor(fn) {
        // 最开始是pending的状态
        this.promiseState = myPromise.PENDING;
        this.promiseResult = null;
        // 定义2个装回调函数的数组
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        // 执行fn函数，注意trycatch，以便于及时抛出错误
        try {
            // 注意bind一下this
            fn(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error)
        }
    }
    resolve(result) {
        // pending到fulfilled的变化
        if (this.promiseState === myPromise.PENDING) {
            this.promiseState = myPromise.FULFILLED;
            this.promiseResult = result;
            this.onFulfilledCallbacks.forEach(callback => {
                callback(result)
            })
        }
    }
    reject(reason) {
        // pending到rejected的变化
        if (this.promiseState === myPromise.PENDING) {
            this.promiseState = myPromise.REJECTED;
            this.promiseResult = reason;
            this.onRejectedCallbacks.forEach(callback => {
                callback(reason)
            })
        }
    }
    then(onFulfilled, onRejected) {
        // 判断then里的函数是不是函数，以及处理一些异常
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};
        if (this.promiseState === myPromise.PENDING) {
            this.onFulfilledCallbacks.push(onFulfilled);
            this.onRejectedCallbacks.push(onRejected);
        }
        // 根据状态来执行对应函数
        if (this.promiseState === myPromise.FULFILLED) {
            onFulfilled(this.promiseResult)
        }
        if (this.promiseState === myPromise.REJECTED) {
            onRejected(this.promiseResult)
        }
        
    }
}
console.log(1);
var test = new myPromise((resolve, reject) => {
    resolve('ok');
});
test.then(res=>{
    console.log('res:', res);
}, err => {
    console.log('err:', err);
});
```