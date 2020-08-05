<template>
  <div style="position:relative;">
    <van-nav-bar
      title="播放器"
      left-text="文件管理"
      right-text="收藏夹"
      @click-left="$router.push({name:'FileView'})"
      placeholder
      fixed
    />
    <!-- <van-cell title="累计时长:1天" value="今日时长:2小时"/>
    <van-cell>今日时长</van-cell> -->
    <van-cell title="番茄计时" is-link center>
      <van-count-down :time="time" format="HH:mm:ss:SS" millisecond />
    </van-cell>
    <!-- <van-cell>当前路径</van-cell> -->
    <van-cell is-link>正在播放</van-cell>
    <van-cell is-link>当前背景音乐</van-cell>
    <van-cell title="单曲目标">
      <van-stepper v-model="value2" :min="0" step="5" disable-input />
    </van-cell>
    <van-cell title="单曲循环">
      <van-stepper v-model="value1" :min="0" disable-input />
    </van-cell>
    <van-cell title="跳过已掌握的">
      <template #right-icon>
        <van-switch v-model="checked" size="24" />
      </template>
    </van-cell>
    <div
      style="position:fixed;bottom:50px;right:0;left:0;box-shadow:0 0 5px rgba(0,0,0,0.5);z-index:1;background:white;"
    >
      <div style="padding:1rem;">
        <van-slider v-model="value" />
      </div>
      <div style="display:flex;justify-content:space-around;margin:.3rem 0;">
        <van-button icon="play" />
        <van-button icon="play" />
        <van-button icon="play" />
      </div>
      <van-dropdown-menu direction="up">
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value2" :options="option2" />
      </van-dropdown-menu>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class AudioPlayer extends Vue {
  private value = 0;
  private value1 = 0;
  private value2 = 0;
  private checked = false;
  private switch1 = false;
  private switch2 = false;
  private time = 30 * 60 * 60 * 1000;
  private option1 = [
    { text: "艾宾浩斯", value: 0 },
    { text: "莱特纳模式", value: 0 },
    { text: "跟读播放", value: 0 },
    { text: "跟读循环", value: 0 },
    { text: "顺序循环", value: 1 },
    { text: "顺序播放", value: 2 },
    { text: "随机播放", value: 1 },
    { text: "随机循环", value: 1 },
    { text: "单曲循环", value: 2 },
    { text: "单曲播放", value: 2 }
  ];
  private option2 = [
    { text: "倍速 2.0x", value: 0 },
    { text: "倍速 1.5x", value: 1 },
    { text: "倍速 1.25x", value: 2 },
    { text: "倍速 1.0x", value: 2 },
    { text: "倍速 0.75x", value: 2 },
    { text: "倍速 0.5x", value: 2 }
  ];
}
</script>
