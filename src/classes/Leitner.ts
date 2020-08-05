// // 单例模式
// class Leitner {
//     public static leitnerSystem: LeitnerSystem;
//     public static getInstance() {
//         if (!this.leitnerSystem) {
//             this.leitnerSystem = new LeitnerSystem();

//         }
//         return this.leitnerSystem;
//     }
// }
// enum LeitnerBox {
//     box1,
//     box2,
//     box3,
//     box4,
//     box5
// }
// // 莱特纳系统
// class LeitnerSystem {
//     // 五个复习盒子
//     private cards: LeitnerCard[] = [];
//     constructor() {
//     }
//     add(card: LeitnerCard) {
//         this.cards.push(card);
//     }
//     get() {
//         return this.cards.filter(card=>card.box===LeitnerBox.box1)[0];
//     }
//     remove() {

//     }
// }
// // 卡牌
// class LeitnerCard {
//     // 卡牌所在的盒子
//     box: LeitnerBox = LeitnerBox.box1;
//     // 复习时间
//     // reviewDate:
//     toNextBox() {
//         if (this.box !== LeitnerBox.box5) this.box++;
        
//     }
//     toFirstBox() {
//         this.box = LeitnerBox.box1;
//     }
// }

// const tests = Leitner.getInstance();
