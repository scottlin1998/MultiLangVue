export default class PathManager {
    private _defaultPath = "";
    private _currentPath = "";
    private _rootPath: string | undefined;
    private _pathArray: { name: string; fullPath: string }[] = [];
    private _history: string[] = [];
    private _currentIndex = 0;
    // constructor()
    // constructor(defaultPath: string)
    constructor(x?: string) {
        // 设置默认路径
        if (typeof x === "string")
            this.defaultPath = x;

    }

    set defaultPath(path: string) {
        // 转化\字符并赋值
        this._currentPath = this._defaultPath = path.replace(/\\+/g, "/");
        // 将路径转为对象
        const tempPaths = path.split(/\/+/);
        // 记录每个path的详细路径
        let fullPath = "";
        // 清空路径对象
        this._pathArray = [];
        // 重新添加路径信息
        tempPaths.forEach((name) => {
            fullPath += name + "/";
            this._pathArray.push({ name: name || "/", fullPath });
        });
        this._history.push(path);
    }
    // set currentPath(path: string) {
    //     this._currentPath = path;
    // }
    get defaultPath() {
        if (!this._defaultPath) return "";
        return this._defaultPath;
    }
    get currentPath() {
        if (!this._currentPath) return "";
        return this._currentPath;
    }
    // push(path: string) { }
    // go(index: number): void
    // go(path: string): void
    go(x: number | string): void {
        if (typeof x === "number") {
            switch (x) {
                case -1: break;
                case 1: break;
            }
        }
        else if (typeof x === "string") this.defaultPath = x;

    }
    back() {
        const preIndex = this._history.indexOf(this.currentPath) - 1;
        this.defaultPath = this._history[preIndex]
    }
}