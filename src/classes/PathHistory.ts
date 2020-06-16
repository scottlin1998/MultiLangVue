export default class PathHistory {
    private history: string[] = [];
    private _currentIndex = 0;

    constructor(initialValue?: string) {
        if (initialValue) this.go(initialValue);
    }
    get currentIndex() {
        return this._currentIndex;
    }
    set currentIndex(index: number) {
        // 大于等于0
        if (index < 0) this._currentIndex = 0;
        // 小于等于历史长度-1
        else if (index > this.history.length - 1) this._currentIndex = this.history.length - 1;
        // 正常
        else this._currentIndex = index;
    }
    // 获取现在的路径
    get currentPath() {
        return this.history[this._currentIndex];
    }
    // 获取根目录
    get rootPath() {
        return this.history[0];
    }
    get currentPathDetail() {
        const result: { name: string; fullPath: string }[] = [];
        // 将路径转为对象/(?<=[^/]+)\/+(?=[^/]+)|(?<=^\/)/
        const tempPaths = this.currentPath.split(/(?<=[^/]+)\/+(?=[^/]+)|(?<=^\/)/);
        // 记录每个path的详细路径
        let fullPath = tempPaths.shift() || "";
        // 加入根目录
        result.push({ name: fullPath, fullPath });
        // 清空路径对象
        // 重新添加路径信息
        tempPaths.forEach((name) => {
            fullPath += (fullPath !== "/" ? "/" : "") + name;
            result.push({ name, fullPath });
        });
        // console.log(result);
        return result;
    }
    get currentNameIndex() {
        return this.currentPathDetail.length - 1;
    }
    set currentNameIndex(index: number) {
        // typeof index === "number";
    }
    // 前进
    // go(): string
    // go(index: number): string
    // // 跳转
    // go(path: string): string
    go(x?: string | number): string {
        if (typeof x === "string") {
            // 转化\字符
            x = x.replace(/[\\/]+/g, "/");
            // 当前位置在历史尾部 && 历史尾部的值不等于新插入的值
            if (this.history.length - 1 === this.currentIndex && this.history[this.currentIndex] !== x) {
                // 情况一：插入新历史
                this.history.push(x);
                this.currentIndex++;
            } else if (this.history[this.currentIndex] !== x) {
                // 情况二：删除旧历史 和 插入新历史
                this.history.splice(
                    this.currentIndex + 1,
                    this.history.length - this.currentIndex + 1,
                    x);
                this.currentIndex = this.history.length - 1;
            }
        } else if (typeof x === "number") {
            this.currentIndex = x;
        } else if (typeof x === "undefined") {
            this.currentIndex++;
        }
        // 返回当前路径
        return this.history[this.currentIndex];
    }
    // 添加
    push(name: string) {
        this.go(`${this.currentPath}/${name}`);
    }
    // 后退
    back(): string {
        // 返回当前路径
        return this.history[--this.currentIndex];
    }
    // 重置
    // reset(){}
}