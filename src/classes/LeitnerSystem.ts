import moment from "moment";
import lowdb from "lowdb";
// 单例模式
class Leitner {
    public static leitnerSystem: LeitnerSystem;
    public static getInstance() {
        if (!this.leitnerSystem) {
            this.leitnerSystem = new LeitnerSystem();
        }
        return this.leitnerSystem;
    }
}
enum LeitnerCardOperate {
    toNextBox,
    toFirstBox,
    toF
    // toMaster
}

// 莱特纳系统
class LeitnerSystem {
    startDate: string = moment().format("YYYY-MM-DD HH:mm:ss");
    // 五个复习盒子
    boxes: LeitnerBox[] = [];
    // 今天需要复习的卡牌
    cards: LeitnerCard[] = [];
    // 每次学习数量
    amountPerTime: number = 20;
    // 学习记录
    history: LeitnerCard[] = [];
    constructor() {
        // 添加五个常用的盒子
        for (let i = 1; i < 10; i++) {
            const daysInterval = Math.pow(2, i) - 1;
            const leitnerBox = new LeitnerBox(daysInterval);
            // 第一个盒子每天都检查
            if (i === 1) leitnerBox.everydayMode = true;
            this.addBox(leitnerBox);
        }
        // 添加回收箱
        this.addBox(new LeitnerCollectionBox());
    }
    // 添加盒子
    addBox(box: LeitnerBox) {
        const len = this.boxes.length;
        // 最后一个盒子
        const lastBox = this.boxes[len - 1];
        // 设置当前 新盒子 的 兄弟盒子
        box.prevBox = lastBox;
        // 如果有的话
        if (lastBox) lastBox.nextBox = box;
        this.boxes.push(box);
    }
    // ############################################按照每次学习数量修改############################################
    getTodayCards() {
        let todayCards: LeitnerCard[] = [];
        // 每次只从有卡牌的盒子拿卡牌，如果没有才到下一个拿
        // 反向取卡牌
        for (let i = this.boxes.length - 1; i >= 0; i--) {
            todayCards = todayCards.concat(this.boxes[i].getTodayCards());
            // 拿到相应数量的卡牌就跳出循环
            if (todayCards.length >= this.amountPerTime) break;
        }
        // 指定学习条数的卡牌
        return todayCards.slice(0, this.amountPerTime);
    }
    // ############################################按照每次学习数量修改############################################
    // rollback() {
    //     const card = this.history.pop();
    //     card?.rollback();
    //     return card;
    // }
    // 添加卡牌 并 设置卡牌 在 第一个盒子
    addCard(card: LeitnerCard) {
        const box1 = this.boxes[0];
        card.box = box1;
        box1.addCard(card);
    }
    // 保存数据
    save() {

    }
    // 恢复数据
    restore() {

    }
}
// 盒子类
class LeitnerBox {
    name: string | undefined;
    prevBox: LeitnerBox | undefined;
    nextBox: LeitnerBox | undefined;
    cards: LeitnerCard[] = [];
    everydayMode: boolean = false;
    // 检测盒子的天数间隔
    private _daysInterval: number = 1;
    get daysInterval() {
        return this._daysInterval;
    }
    set daysInterval(days: number) {
        this._daysInterval = days < 0 ? 0 : days;
    }
    reviewDate: string = moment().format("YYYY-MM-DD HH:mm:ss");
    constructor()
    constructor(days: number)
    constructor(name: string)
    constructor(x?: string | number) {
        if (typeof x === "string")
            this.name = name;
        else if (typeof x === "number") {
            this.daysInterval = x;
            this.toNextStage();
        }
    }
    getTodayCards(): LeitnerCard[] {
        // 只有当盒子为空，才会进行指定天数休眠
        if (this.cards.length === 0) this.toNextStage();
        // 如果在复习日期后面，则返回该盒子的所有复习卡牌
        if (this.everydayMode || moment().isAfter(this.reviewDate)) {
            // console.log(this.cards);
            return this.cards;
            // 否者返回空
        } else
            return [];

    }
    // 进入下一个休眠，等待下一次复习
    toNextStage() {
        this.reviewDate = moment().add(this.daysInterval, 'd').format("YYYY-MM-DD HH:mm:ss");;
    }
    // 添加卡牌
    addCard(card: LeitnerCard) {
        const len = this.cards.length;
        // 最后一个盒子
        const lastCard = this.cards[len - 1];
        // 盒子间的关系链
        card.prevCard = lastCard;
        if (lastCard) lastCard.nextCard = card;
        this.cards.push(card);
    }
    // 删除卡牌
    removeCard(index: number): void
    removeCard(card: LeitnerCard): void
    removeCard(x: LeitnerCard | number) {
        let index = -1;
        const len = this.cards.length;
        // 根据不同的传入值 获取 下标 和 卡牌
        if (x instanceof LeitnerCard)
            index = this.cards.indexOf(x);
        else
            index = x;
        // 处理兄弟卡牌的关系 和 删除指定位置的 卡牌
        if (index > -1 && index < len) {
            // 修复兄弟卡牌间的关系
            const prevCard = this.cards[index - 1];
            const nextCard = this.cards[index + 1];
            // 兄弟卡牌可能为空
            if (prevCard) prevCard.nextCard = nextCard;
            if (nextCard) nextCard.prevCard = prevCard;
            // 清空该卡牌与兄弟卡牌间的关系
            this.cards[index].prevCard = undefined;
            this.cards[index].nextCard = undefined;
            // 移除该卡牌
            this.cards.splice(index, 1);
        }
    }
    // 保存数据
    save() {

    }
    // 恢复数据
    restore() {

    }
}

class LeitnerCollectionBox extends LeitnerBox {
    // 回收箱永远只返回空
    getTodayCards(): LeitnerCard[] {
        return [];
    }
}
class LeitnerCard {
    name: string | undefined;
    prevCard: LeitnerCard | undefined;
    nextCard: LeitnerCard | undefined;
    box: LeitnerBox | undefined;
    from: LeitnerBox | undefined;
    // history: LeitnerBox[] = [];
    // 卡牌携带的数据
    data: any;
    constructor(name?: string) {
        this.name = name;
    }
    // 将当前卡牌移动到下个盒子中
    toNextBox() {
        // 如果没有下一个盒子则放进回收箱
        // if () { }####################################################################
        // 删除当前盒子中的该卡牌
        this.box?.removeCard(this);
        this.from = this.box;
        // if (this.box) this.history.push(this.box);
        this.box = this.box?.nextBox;
        this.box?.addCard(this);
    }
    // 将当前卡牌移动到上个盒子中
    toPrevBox() {
        // 删除当前盒子中的该卡牌
        this.box?.removeCard(this);
        this.from = this.box;
        // if (this.box) this.history.push(this.box);
        this.box = this.box?.prevBox;
        this.box?.addCard(this);
    }
    // 将当前卡牌移动到第一个盒子中
    toFirstBox() {
        // 删除当前盒子中的该卡牌
        this.box?.removeCard(this);
        this.from = this.box;
        // if (this.box) this.history.push(this.box);
        this.box = Leitner.getInstance().boxes[0];
        this.box?.addCard(this);
    }
    // 将当前卡牌移动到回收箱
    toCollectionBox() {
        // 删除当前盒子中的该卡牌
        this.box?.removeCard(this);
        this.from = this.box;
        // if (this.box) this.history.push(this.box);
        const len = Leitner.getInstance().boxes.length;
        this.box = Leitner.getInstance().boxes[len - 1];
        this.box?.addCard(this);
    }
    // 撤销操作
    rollback() {
        // 删除当前盒子中的该卡牌
        this.box?.removeCard(this);
        // 从历史记录中移除盒子并设置为当前的盒子
        // this.box = this.history.pop();
        this.box = this.from;
        this.box?.addCard(this);
    }
    // 保存数据
    save() {

    }
    // 恢复数据
    restore() {

    }
}

const leitner = Leitner.getInstance();

leitner.addCard(new LeitnerCard());
leitner.addCard(new LeitnerCard());
leitner.boxes[0].cards[0].toNextBox();
leitner.boxes[0].cards[0].toNextBox();
leitner.getTodayCards();
console.log(leitner.getTodayCards());