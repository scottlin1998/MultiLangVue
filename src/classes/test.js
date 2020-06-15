"use strict";
// import PathManager from "./PathManager";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var History_1 = __importDefault(require("./History"));
// let pathManager = new PathManager();
// pathManager.defaultPath = "/kind/of/ / / /shi  t/lols  fdf  ";
// console.log("----------前进");
// pathManager.go("/home");
// pathManager.back();
// console.log(pathManager);
var h = new History_1.default();
h.go("/sdfs/dfsdf");
h.go("/sdfs/dfsdf1");
h.go("/sdfs/dfsdf2");
h.back();
h.go("/");
h.go("/");
h.go("/");
// h.back()
// h.back()
// h.back()
// h.back()
// h.back()
// h.back()
h.go();
h.go("sssss");
h.go("sssss");
h.go("aaaaa");
// h.back()
// h.back()
// h.back()
// h.back()
// h.back()
// h.back()
// h.go("sssss");
// h.go("sssss");
// h.go(-456);
// h.go("aaaaa");
console.log(h);
