"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PathHistory = /** @class */ (function () {
    function PathHistory(initialValue) {
        this.history = [];
        this._currentIndex = 0;
        if (initialValue)
            this.go(initialValue);
    }
    Object.defineProperty(PathHistory.prototype, "currentIndex", {
        get: function () {
            return this._currentIndex;
        },
        set: function (index) {
            // 大于等于0
            if (index < 0)
                this._currentIndex = 0;
            // 小于等于历史长度-1
            else if (index > this.history.length - 1)
                this._currentIndex = this.history.length - 1;
            // 正常
            else
                this._currentIndex = index;
            // console.log(this._currentIndex,index);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathHistory.prototype, "currentPath", {
        // 获取现在的路径
        get: function () {
            return this.history[this._currentIndex];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathHistory.prototype, "rootPath", {
        // 获取根目录
        get: function () {
            return this.history[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathHistory.prototype, "currentPathDetail", {
        get: function () {
            var result = [];
            // 将路径转为对象/(?<=[^/]+)\/+(?=[^/]+)|(?<=^\/)/
            var tempPaths = this.currentPath.split(/(?<=[^/]+)\/+(?=[^/]+)|(?<=^\/)/);
            // 记录每个path的详细路径
            var fullPath = tempPaths.shift() || "";
            // 加入根目录
            result.push({ name: fullPath, fullPath: fullPath });
            // 清空路径对象
            // 重新添加路径信息
            tempPaths.forEach(function (name) {
                fullPath += (fullPath !== "/" ? "/" : "") + name;
                result.push({ name: name, fullPath: fullPath });
            });
            // console.log(result);
            return result;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathHistory.prototype, "currentNameIndex", {
        get: function () {
            return this.currentPathDetail.length - 1;
        },
        set: function (index) {
            // typeof index === "number";
        },
        enumerable: false,
        configurable: true
    });
    // 前进
    // go(): string
    // go(index: number): string
    // // 跳转
    // go(path: string): string
    PathHistory.prototype.go = function (x) {
        if (typeof x === "string") {
            // 转化\字符
            x = x.replace(/[\\/]+/g, "/");
            // 当前位置在历史尾部 && 历史尾部的值不等于新插入的值
            if (this.history.length - 1 === this.currentIndex && this.history[this.currentIndex] !== x) {
                // 情况一：插入新历史
                this.history.push(x);
                this.currentIndex += 1;
            }
            else if (this.history[this.currentIndex] !== x) {
                // 情况二：删除旧历史 和 插入新历史
                this.history.splice(this.currentIndex + 1, this.history.length - this.currentIndex + 1, x);
                this.currentIndex = this.history.length - 1;
            }
        }
        else if (typeof x === "number") {
            this.currentIndex = x;
        }
        else if (typeof x === "undefined") {
            this.currentIndex += 1;
        }
        // 返回当前路径
        return this.history[this.currentIndex];
    };
    // 添加
    PathHistory.prototype.push = function (name) {
        this.go(this.currentPath + "/" + name);
    };
    // 后退
    PathHistory.prototype.back = function () {
        // 返回当前路径
        this.currentIndex -= 1;
        // const temp = --this.currentIndex;
        console.log(this.currentIndex);
        return this.history[this.currentIndex];
    };
    return PathHistory;
}());
exports.default = PathHistory;
