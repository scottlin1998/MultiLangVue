<template>
  <div id="app">
    <FileView />
    <van-tabbar v-model="active" fixed placeholder>
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import FileView from "@/views/FileView.vue";
@Component({
  components: {
    FileView
  }
})
export default class App extends Vue {
  private active = 0;
  created() {
    console.log(12345);
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: calc(100vh);
  width: calc(100vw);
  display: flex;
  flex-direction: column;
  /* margin-top: 60px; */
}
</style>
