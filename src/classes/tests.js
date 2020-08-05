"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// for(let i=1;i<10;i++){
//    console.log(Math.pow(2,i)-1);
//    break;
// }
// let a = [1,2,3,4,5,6,7,8,9,0];
// console.log(a.slice(0,5));
var lowdb_1 = __importDefault(require("./lowdb"));
var db = new lowdb_1.default();
db.SetSomeonesName("test");
