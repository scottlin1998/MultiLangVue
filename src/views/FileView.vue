<template>
  <div class="fileView">
    <van-nav-bar title="文件浏览" left-text="返回" right-text="按钮" left-arrow fixed placeholder/>
    <van-pull-refresh class="refresh" v-model="isLoading" @refresh="onRefresh">
      <p>刷新次数: {{ count }}</p>
    </van-pull-refresh>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import axios from "axios";

@Component
export default class FileView extends Vue {
  private isLoading = false;
  private list: Array<{
    isFile: boolean;
    name: string;
    ok: boolean;
    size: number;
  }> = [];
  private onRefresh(){
    console.log();
  }
  private created() {
    axios("api/files", {
      params: {
        path: "../"
      }
    }).then((res) => {
      console.log(res);
      
    });
  }
}
</script>

<style lang="scss" scoped>
.fileView{
  display: flex;
  height:calc(100vh);
  flex-direction: column;
}
.refresh{
  height:100%;
}
</style>