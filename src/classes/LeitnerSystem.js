"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
// 单例模式
var Leitner = /** @class */ (function () {
    function Leitner() {
    }
    Leitner.getInstance = function () {
        if (!this.leitnerSystem) {
            this.leitnerSystem = new LeitnerSystem();
        }
        return this.leitnerSystem;
    };
    return Leitner;
}());
var LeitnerCardOperate;
(function (LeitnerCardOperate) {
    LeitnerCardOperate[LeitnerCardOperate["toNextBox"] = 0] = "toNextBox";
    LeitnerCardOperate[LeitnerCardOperate["toFirstBox"] = 1] = "toFirstBox";
    LeitnerCardOperate[LeitnerCardOperate["toF"] = 2] = "toF";
    // toMaster
})(LeitnerCardOperate || (LeitnerCardOperate = {}));
// 莱特纳系统
var LeitnerSystem = /** @class */ (function () {
    function LeitnerSystem() {
        this.startDate = moment_1.default().format("YYYY-MM-DD HH:mm:ss");
        // 五个复习盒子
        this.boxes = [];
        // 今天需要复习的卡牌
        this.cards = [];
        // 每次学习数量
        this.amountPerTime = 20;
        // 学习记录
        this.history = [];
        // 添加五个常用的盒子
        for (var i = 1; i < 10; i++) {
            var daysInterval = Math.pow(2, i) - 1;
            var leitnerBox = new LeitnerBox(daysInterval);
            // 第一个盒子每天都检查
            if (i === 1)
                leitnerBox.everydayMode = true;
            this.addBox(leitnerBox);
        }
        // 添加回收箱
        this.addBox(new LeitnerCollectionBox());
    }
    // 添加盒子
    LeitnerSystem.prototype.addBox = function (box) {
        var len = this.boxes.length;
        // 最后一个盒子
        var lastBox = this.boxes[len - 1];
        // 设置当前 新盒子 的 兄弟盒子
        box.prevBox = lastBox;
        // 如果有的话
        if (lastBox)
            lastBox.nextBox = box;
        this.boxes.push(box);
    };
    // ############################################按照每次学习数量修改############################################
    LeitnerSystem.prototype.getTodayCards = function () {
        var todayCards = [];
        // 每次只从有卡牌的盒子拿卡牌，如果没有才到下一个拿
        // 反向取卡牌
        for (var i = this.boxes.length - 1; i >= 0; i--) {
            todayCards = todayCards.concat(this.boxes[i].getTodayCards());
            // 拿到相应数量的卡牌就跳出循环
            if (todayCards.length >= this.amountPerTime)
                break;
        }
        // 指定学习条数的卡牌
        return todayCards.slice(0, this.amountPerTime);
    };
    // ############################################按照每次学习数量修改############################################
    // rollback() {
    //     const card = this.history.pop();
    //     card?.rollback();
    //     return card;
    // }
    // 添加卡牌 并 设置卡牌 在 第一个盒子
    LeitnerSystem.prototype.addCard = function (card) {
        var box1 = this.boxes[0];
        card.box = box1;
        box1.addCard(card);
    };
    // 保存数据
    LeitnerSystem.prototype.save = function () {
    };
    // 恢复数据
    LeitnerSystem.prototype.restore = function () {
    };
    return LeitnerSystem;
}());
// 盒子类
var LeitnerBox = /** @class */ (function () {
    function LeitnerBox(x) {
        this.cards = [];
        this.everydayMode = false;
        // 检测盒子的天数间隔
        this._daysInterval = 1;
        this.reviewDate = moment_1.default().format("YYYY-MM-DD HH:mm:ss");
        if (typeof x === "string")
            this.name = name;
        else if (typeof x === "number") {
            this.daysInterval = x;
            this.toNextStage();
        }
    }
    Object.defineProperty(LeitnerBox.prototype, "daysInterval", {
        get: function () {
            return this._daysInterval;
        },
        set: function (days) {
            this._daysInterval = days < 0 ? 0 : days;
        },
        enumerable: false,
        configurable: true
    });
    LeitnerBox.prototype.getTodayCards = function () {
        // 只有当盒子为空，才会进行指定天数休眠
        if (this.cards.length === 0)
            this.toNextStage();
        // 如果在复习日期后面，则返回该盒子的所有复习卡牌
        if (this.everydayMode || moment_1.default().isAfter(this.reviewDate)) {
            // console.log(this.cards);
            return this.cards;
            // 否者返回空
        }
        else
            return [];
    };
    // 进入下一个休眠，等待下一次复习
    LeitnerBox.prototype.toNextStage = function () {
        this.reviewDate = moment_1.default().add(this.daysInterval, 'd').format("YYYY-MM-DD HH:mm:ss");
        ;
    };
    // 添加卡牌
    LeitnerBox.prototype.addCard = function (card) {
        var len = this.cards.length;
        // 最后一个盒子
        var lastCard = this.cards[len - 1];
        // 盒子间的关系链
        card.prevCard = lastCard;
        if (lastCard)
            lastCard.nextCard = card;
        this.cards.push(card);
    };
    LeitnerBox.prototype.removeCard = function (x) {
        var index = -1;
        var len = this.cards.length;
        // 根据不同的传入值 获取 下标 和 卡牌
        if (x instanceof LeitnerCard)
            index = this.cards.indexOf(x);
        else
            index = x;
        // 处理兄弟卡牌的关系 和 删除指定位置的 卡牌
        if (index > -1 && index < len) {
            // 修复兄弟卡牌间的关系
            var prevCard = this.cards[index - 1];
            var nextCard = this.cards[index + 1];
            // 兄弟卡牌可能为空
            if (prevCard)
                prevCard.nextCard = nextCard;
            if (nextCard)
                nextCard.prevCard = prevCard;
            // 清空该卡牌与兄弟卡牌间的关系
            this.cards[index].prevCard = undefined;
            this.cards[index].nextCard = undefined;
            // 移除该卡牌
            this.cards.splice(index, 1);
        }
    };
    // 保存数据
    LeitnerBox.prototype.save = function () {
    };
    // 恢复数据
    LeitnerBox.prototype.restore = function () {
    };
    return LeitnerBox;
}());
var LeitnerCollectionBox = /** @class */ (function (_super) {
    __extends(LeitnerCollectionBox, _super);
    function LeitnerCollectionBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // 回收箱永远只返回空
    LeitnerCollectionBox.prototype.getTodayCards = function () {
        return [];
    };
    return LeitnerCollectionBox;
}(LeitnerBox));
var LeitnerCard = /** @class */ (function () {
    function LeitnerCard(name) {
        this.name = name;
    }
    // 将当前卡牌移动到下个盒子中
    LeitnerCard.prototype.toNextBox = function () {
        var _a, _b, _c;
        // 如果没有下一个盒子则放进回收箱
        // if () { }####################################################################
        // 删除当前盒子中的该卡牌
        (_a = this.box) === null || _a === void 0 ? void 0 : _a.removeCard(this);
        this.from = this.box;
        // if (this.box) this.history.push(this.box);
        this.box = (_b = this.box) === null || _b === void 0 ? void 0 : _b.nextBox;
        (_c = this.box) === null || _c === void 0 ? void 0 : _c.addCard(this);
    };
    // 将当前卡牌移动到上个盒子中
    LeitnerCard.prototype.toPrevBox = function () {
        var _a, _b, _c;
        // 删除当前盒子中的该卡牌
        (_a = this.box) === null || _a === void 0 ? void 0 : _a.removeCard(this);
        this.from = this.box;
        // if (this.box) this.history.push(this.box);
        this.box = (_b = this.box) === null || _b === void 0 ? void 0 : _b.prevBox;
        (_c = this.box) === null || _c === void 0 ? void 0 : _c.addCard(this);
    };
    // 将当前卡牌移动到第一个盒子中
    LeitnerCard.prototype.toFirstBox = function () {
        var _a, _b;
        // 删除当前盒子中的该卡牌
        (_a = this.box) === null || _a === void 0 ? void 0 : _a.removeCard(this);
        this.from = this.box;
        // if (this.box) this.history.push(this.box);
        this.box = Leitner.getInstance().boxes[0];
        (_b = this.box) === null || _b === void 0 ? void 0 : _b.addCard(this);
    };
    // 将当前卡牌移动到回收箱
    LeitnerCard.prototype.toCollectionBox = function () {
        var _a, _b;
        // 删除当前盒子中的该卡牌
        (_a = this.box) === null || _a === void 0 ? void 0 : _a.removeCard(this);
        this.from = this.box;
        // if (this.box) this.history.push(this.box);
        var len = Leitner.getInstance().boxes.length;
        this.box = Leitner.getInstance().boxes[len - 1];
        (_b = this.box) === null || _b === void 0 ? void 0 : _b.addCard(this);
    };
    // 撤销操作
    LeitnerCard.prototype.rollback = function () {
        var _a, _b;
        // 删除当前盒子中的该卡牌
        (_a = this.box) === null || _a === void 0 ? void 0 : _a.removeCard(this);
        // 从历史记录中移除盒子并设置为当前的盒子
        // this.box = this.history.pop();
        this.box = this.from;
        (_b = this.box) === null || _b === void 0 ? void 0 : _b.addCard(this);
    };
    // 保存数据
    LeitnerCard.prototype.save = function () {
    };
    // 恢复数据
    LeitnerCard.prototype.restore = function () {
    };
    return LeitnerCard;
}());
var leitner = Leitner.getInstance();
leitner.addCard(new LeitnerCard());
leitner.addCard(new LeitnerCard());
leitner.boxes[0].cards[0].toNextBox();
leitner.boxes[0].cards[0].toNextBox();
leitner.getTodayCards();
console.log(leitner.getTodayCards());
