"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PathHistory = /** @class */ (function () {
    function PathHistory() {
        this.history = [];
        this._currentIndex = 0;
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
        },
        enumerable: false,
        configurable: true
    });
    PathHistory.prototype.go = function (x) {
        if (typeof x == "string") {
            // 当前位置在历史尾部 && 历史尾部的值不等于新插入的值
            if (this.history.length - 1 == this.currentIndex && this.history[this.currentIndex] != x) {
                // 情况一：插入新历史
                this.history.push(x);
                this.currentIndex++;
            }
            else if (this.history[this.currentIndex] != x) {
                // 情况二：删除旧历史 和 插入新历史
                this.history.splice(this.currentIndex + 1, this.history.length - this.currentIndex + 1, x);
                this.currentIndex = this.history.length - 1;
            }
        }
        else if (typeof x == "number") {
            this.currentIndex = x;
        }
        else if (typeof x == "undefined") {
            this.currentIndex++;
        }
        // 返回当前路径
        return this.history[this.currentIndex];
    };
    // 后退
    PathHistory.prototype.back = function () {
        // 返回当前路径
        return this.history[this.currentIndex--];
    };
    return PathHistory;
}());
exports.default = PathHistory;
