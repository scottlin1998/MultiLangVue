<template>
  <div class="tabbarView">
    <keep-alive>
      <router-view />
    </keep-alive>
    <van-tabbar v-model="active" placeholder fixed route>
      <van-tabbar-item icon="home-o" to="/">任务</van-tabbar-item>
      <van-tabbar-item icon="music" to="/audioPlayer">mp3+bgm</van-tabbar-item>
      <van-tabbar-item icon="friends-o">收藏夹</van-tabbar-item>
      <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import FileView from "@/views/FileView.vue";
@Component({
  components: {
    // FileView
  }
})
export default class TabbarView extends Vue {
  private active = 0;
}
</script>