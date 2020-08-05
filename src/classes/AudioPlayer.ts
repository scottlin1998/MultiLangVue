// 播放模式
enum PlayMode {
    followUp,   // 跟读播放
    allRepeat,  // 循环播放
    order,      // 顺序播放
    shuffle,    // 随机播放
    once,       // 单曲播放
}
// 播放速度
enum PlaySpeed {
    x05 = 0.5,
    x08 = 0.8,
    x10 = 1.0,
    x12 = 1.2,
    x15 = 1.5,
    x18 = 1.8,
    x20 = 2.0
}
// 睡眠模式
enum SleepMode {
    none,               // 未设置
    // afterThisAudio,     // 当前音频结束时
    // afterThisSong,      // 当前背景音乐结束时
    tenMinutes,         // 10分钟
    twentyMinutes,      // 20分钟
    thirtyMinutes,      // 30分钟
    fortyFiveMinutes,   // 45分钟
    oneHour             // 1小时
}
// 多功能音频播放器
class AudioPlayer {
    // 网页音频播放对象
    private _audio!: HTMLAudioElement;
    // 播放列表
    private _playList: {
        name: string;
        fullPath: string;
        count?: number;
        goal?: number;
        // finish: boolean;
    }[] = [];
    // 随机播放列表
    private _randomList: {
        name: string;
        fullPath: string;
        count?: number;
        goal?: number;
        // finish: boolean;
    }[] = [];
    get playList() {
        return this._playList;
    }
    // 现在位置
    currentIndex = -1;
    // 播放模式
    playMode: PlayMode = PlayMode.order;
    // 睡眠模式
    sleepMode: SleepMode = SleepMode.none;
    // 播放速度
    playSpeed: PlaySpeed = PlaySpeed.x10;
    // 跳过已经掌握的
    skipMode = false;
    // 自动播放
    autoPlay = true;
    constructor() {
        this._audio = new Audio();
        // 播放结束事件
        this._audio.onended = () => {
            // 各种模式的播放结束事件
            switch (this.playMode) {
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
    // 播放
    play() {
        // 初次播放，调整 currentIndex 为0
        if (this.currentIndex === -1 && this.playList.length !== 0) this.currentIndex = 0;
        // 随机播放 或 其他播放
        const playList = this.playMode === PlayMode.shuffle ? this._playList : this._randomList;
        // 播放
        this._audio.src = playList[this.currentIndex].fullPath;
        // 播放结束事件
        this._audio.onended = () => {

        };
        this._audio.play();
    }
    // 暂停
    pause() {
        this._audio.pause();
    }
    // 停止
    stop() {
        this
    }
    // 上一首
    prev() {
        this.currentIndex--;
        this.play();
    }
    // 下一首
    next() {
        this.currentIndex++;
        this.play();
    }
    // 跳转指定进度
    seek() {
        1
    }
    // 添加到播放列表
    add(audio: {
        name: string;
        fullPath: string;
        count?: number;
        goal?: number;
        // finish: boolean;
    }, addBehindCurrent = false) {
        if (addBehindCurrent)
            // 添加到下一个播放
            this.playList.splice(this.currentIndex + 1, 0, audio);
        else
            // 添加到播放列表中
            this.playList.push(audio);
    }

    // 设置播放模式
    setPlayMode(playMode: PlayMode) {
        this.playMode = playMode;
    }
    // 设置睡眠模式
    setSleepMode(sleepMode: SleepMode) {
        this.sleepMode = sleepMode;
    }
    // 设置播放速度
    setPlaySpeed(playSpeed: PlaySpeed) {
        this.playSpeed = playSpeed;
    }
    // 设置跳过已掌握模式
    setSkipMode(skipMode: boolean) {
        this.skipMode = skipMode;
    }
}
export default {
    AudioPlayer,
    PlayMode,
    PlaySpeed,
    SleepMode
};