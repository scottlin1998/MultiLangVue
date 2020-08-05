"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 播放模式
var PlayMode;
(function (PlayMode) {
    PlayMode[PlayMode["followUp"] = 0] = "followUp";
    PlayMode[PlayMode["allRepeat"] = 1] = "allRepeat";
    PlayMode[PlayMode["order"] = 2] = "order";
    PlayMode[PlayMode["shuffle"] = 3] = "shuffle";
    PlayMode[PlayMode["once"] = 4] = "once";
})(PlayMode || (PlayMode = {}));
// 播放速度
var PlaySpeed;
(function (PlaySpeed) {
    PlaySpeed[PlaySpeed["x05"] = 0.5] = "x05";
    PlaySpeed[PlaySpeed["x08"] = 0.8] = "x08";
    PlaySpeed[PlaySpeed["x10"] = 1] = "x10";
    PlaySpeed[PlaySpeed["x12"] = 1.2] = "x12";
    PlaySpeed[PlaySpeed["x15"] = 1.5] = "x15";
    PlaySpeed[PlaySpeed["x18"] = 1.8] = "x18";
    PlaySpeed[PlaySpeed["x20"] = 2] = "x20";
})(PlaySpeed || (PlaySpeed = {}));
// 睡眠模式
var SleepMode;
(function (SleepMode) {
    SleepMode[SleepMode["none"] = 0] = "none";
    // afterThisAudio,     // 当前音频结束时
    // afterThisSong,      // 当前背景音乐结束时
    SleepMode[SleepMode["tenMinutes"] = 1] = "tenMinutes";
    SleepMode[SleepMode["twentyMinutes"] = 2] = "twentyMinutes";
    SleepMode[SleepMode["thirtyMinutes"] = 3] = "thirtyMinutes";
    SleepMode[SleepMode["fortyFiveMinutes"] = 4] = "fortyFiveMinutes";
    SleepMode[SleepMode["oneHour"] = 5] = "oneHour"; // 1小时
})(SleepMode || (SleepMode = {}));
// 多功能音频播放器
var AudioPlayer = /** @class */ (function () {
    function AudioPlayer() {
        var _this = this;
        // 播放列表
        this._playList = [];
        // 随机播放列表
        this._randomList = [];
        // 现在位置
        this.currentIndex = -1;
        // 播放模式
        this.playMode = PlayMode.order;
        // 睡眠模式
        this.sleepMode = SleepMode.none;
        // 播放速度
        this.playSpeed = PlaySpeed.x10;
        // 跳过已经掌握的
        this.skipMode = false;
        // 自动播放
        this.autoPlay = true;
        this._audio = new Audio();
        // 播放结束事件
        this._audio.onended = function () {
            // 各种模式的播放结束事件
            switch (_this.playMode) {
                case PlayMode.allRepeat:
                    break;
                case PlayMode.followUp:
                    break;
                case PlayMode.once:
                    break;
                case PlayMode.order:
                    break;
                case PlayMode.shuffle:
                    break;
            }
        };
    }
    Object.defineProperty(AudioPlayer.prototype, "playList", {
        get: function () {
            return this._playList;
        },
        enumerable: false,
        configurable: true
    });
    // 播放
    AudioPlayer.prototype.play = function () {
        // 初次播放，调整 currentIndex 为0
        if (this.currentIndex === -1 && this.playList.length !== 0)
            this.currentIndex = 0;
        // 随机播放 或 其他播放
        var playList = this.playMode === PlayMode.shuffle ? this._playList : this._randomList;
        // 播放
        this._audio.src = playList[this.currentIndex].fullPath;
        // 播放结束事件
        this._audio.onended = function () {
        };
        this._audio.play();
    };
    // 暂停
    AudioPlayer.prototype.pause = function () {
        this._audio.pause();
    };
    // 停止
    AudioPlayer.prototype.stop = function () {
        this;
    };
    // 上一首
    AudioPlayer.prototype.prev = function () {
        this.currentIndex--;
        this.play();
    };
    // 下一首
    AudioPlayer.prototype.next = function () {
        this.currentIndex++;
        this.play();
    };
    // 跳转指定进度
    AudioPlayer.prototype.seek = function () {
        1;
    };
    // 添加到播放列表
    AudioPlayer.prototype.add = function (audio, addBehindCurrent) {
        if (addBehindCurrent === void 0) { addBehindCurrent = false; }
        if (addBehindCurrent)
            // 添加到下一个播放
            this.playList.splice(this.currentIndex + 1, 0, audio);
        else
            // 添加到播放列表中
            this.playList.push(audio);
    };
    // 设置播放模式
    AudioPlayer.prototype.setPlayMode = function (playMode) {
        this.playMode = playMode;
    };
    // 设置睡眠模式
    AudioPlayer.prototype.setSleepMode = function (sleepMode) {
        this.sleepMode = sleepMode;
    };
    // 设置播放速度
    AudioPlayer.prototype.setPlaySpeed = function (playSpeed) {
        this.playSpeed = playSpeed;
    };
    // 设置跳过已掌握模式
    AudioPlayer.prototype.setSkipMode = function (skipMode) {
        this.skipMode = skipMode;
    };
    return AudioPlayer;
}());
exports.default = {
    AudioPlayer: AudioPlayer,
    PlayMode: PlayMode,
    PlaySpeed: PlaySpeed,
    SleepMode: SleepMode
};
