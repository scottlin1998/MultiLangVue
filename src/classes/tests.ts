// for(let i=1;i<10;i++){
//    console.log(Math.pow(2,i)-1);
//    break;
// }
// let a = [1,2,3,4,5,6,7,8,9,0];
// console.log(a.slice(0,5));
import lowdb from "./lowdb";
let db = new lowdb();
db.SetSomeonesName("test");