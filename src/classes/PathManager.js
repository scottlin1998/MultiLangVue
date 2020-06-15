"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PathManager = /** @class */ (function () {
    function PathManager(x) {
        this._pathArray = [];
        this._history = [];
        this._currentIndex = 0;
        // 设置默认路径
        if (typeof x == "string")
            this.defaultPath = x;
    }
    Object.defineProperty(PathManager.prototype, "defaultPath", {
        // set currentPath(path: string) {
        //     this._currentPath = path;
        // }
        get: function () {
            if (!this._defaultPath)
                throw "\u8FD8\u672A\u8BBE\u7F6E defaultPath";
            return this._defaultPath;
        },
        set: function (path) {
            var _this = this;
            // 转化\字符并赋值
            this._currentPath = this._defaultPath = path.replace(/\\+/g, "/");
            // 将路径转为对象
            var tempPaths = path.split(/\/+/);
            // 记录每个path的详细路径
            var fullPath = "";
            // 清空路径对象
            this._pathArray = [];
            // 重新添加路径信息
            tempPaths.forEach(function (name) {
                fullPath += name + "/";
                _this._pathArray.push({ name: name || "/", fullPath: fullPath });
            });
            this._history.push(path);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PathManager.prototype, "currentPath", {
        get: function () {
            if (!this._currentPath)
                throw "\u8FD8\u672A\u8BBE\u7F6E currentPath";
            return this._currentPath;
        },
        enumerable: false,
        configurable: true
    });
    PathManager.prototype.push = function (path) { };
    PathManager.prototype.go = function (x) {
        if (typeof x == "number") {
            switch (x) {
                case -1: break;
                case 1: break;
            }
        }
        else if (typeof x == "string") {
            this.defaultPath = x;
        }
    };
    PathManager.prototype.back = function () {
        var preIndex = this._history.indexOf(this.currentPath) - 1;
        this.defaultPath = this._history[preIndex];
    };
    return PathManager;
}());
exports.default = PathManager;
