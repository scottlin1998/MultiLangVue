<template>
  <div class="fileView">
    <!-- 地址栏 -->
    <van-sticky>
      <!-- <van-swipe-cell stop-propagation> -->
      <van-nav-bar
        title="文件浏览"
        left-text="收藏夹"
        right-text="设置"
        @click-right="$router.push({name:'FileSetting'})"
        @click-left="$router.push({name:'FileCollection'})"
        :border="false"
      />
      <!-- <template #right>
          <van-button icon="arrow-left" @click="onLoad(pathHistory.back())" />
          <van-button icon="arrow" @click="onLoad(pathHistory.go())" />
          <van-button icon="play" />
          <van-button icon="star-o" />
          <van-button icon="setting-o" />
        </template>
      </van-swipe-cell>-->
      <!-- {{tabPaths}} -->
      
      <van-swipe style="height: 44px;" :show-indicators="false" :loop="false" vertical>
        <van-swipe-item>
          <div style="display:flex;">
            <van-button icon="wap-home-o" @click="onLoad(defaultPath)" />
            <van-tabs
              v-model="pathHistory.currentNameIndex"
              color="#1989fa"
              line-height="1px"
              duration="0"
              title-active-color="#1989fa"
              @click="onTabClick"
              :swipe-threshold="0"
              style="display:grid;flex:1;"
            >
              <!-- <template slot="nav-left">
            <van-button icon="wap-home-o" @click="onLoad(defaultPath)" />
              </template>-->
              <!-- <div class="nav-left" slot="nav-right">
            <van-button icon="arrow-left" @click="onLoad(pathHistory.back())" />
            <van-button icon="arrow" @click="onLoad(pathHistory.go())" />
            <van-button icon="play" />
            <van-button icon="star-o" />
            <van-button icon="setting-o" />
              </div>-->
              <van-tab
                v-show="index!==0"
                v-for="(item,index) in pathHistory.currentPathDetail"
                :key="index"
                :title="item.name"
                @click.native="test(item.fullPath)"
              />
            </van-tabs>
            <van-button icon="arrow-left" @click="onLoad(pathHistory.back())" />
            <van-button icon="arrow" @click="onLoad(pathHistory.go())" />
          </div>
        </van-swipe-item>
        <van-swipe-item style="display: flex; justify-content: space-around;">
          <van-button icon="plus" />
          <van-button icon="arrow" @click="onLoad(pathHistory.go())" />
          <van-button icon="play" />
          <van-button icon="star-o" />
          <van-button icon="music" />
          <van-button icon="location" />
        </van-swipe-item>
      </van-swipe>
      <!-- <template #right></template> -->
    </van-sticky>
    <!-- 下列刷新 -->
    <VueInfinityList v-if="list.length" :list="list">
      <!-- <template > -->
      <!-- <van-swipe-cell slot-scope="{item}" border> -->
      <template #right>
        <template v-if="item.isFile">
          <van-button square type="info" text="播放" />
          <van-button square text="下一首" />
        </template>
        <template v-else></template>
      </template>
      <van-cell
        slot-scope="{item}"
        :title="item.name"
        :is-link="item.isDirectory"
        @click="item.isDirectory && onLoad(item.fullPath)"
        @touchstart.native="longClickStart(item)"
        @touchmove.native="longClickCancel"
        @touchend.native="longClickCancel"
        clickable
      >
        <div
          style="max-width:50px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;word-break:break-all;"
        >{{item.isDirectory ? item.amount : item.extension}}</div>
        <!-- <van-tag v-else type="danger">无权限</van-tag> -->
      </van-cell>

      <!-- </van-swipe-cell> -->
      <!-- </template> -->
    </VueInfinityList>
    <!-- 空白提示 -->
    <van-empty v-else :description="defaultPath?'没有文件在这里哦':'还没有设置默认路径'">
      <van-button v-if="defaultPath" type="info" class="bottom-button" block>点击刷新</van-button>
      <van-button v-else type="info" class="bottom-button" block>现在设置</van-button>
    </van-empty>
    <!-- </van-pull-refresh> -->
    <van-action-sheet
      v-model="actionSheetShow"
      cancel-text="取消"
      :description="`目标：${selectedName}`"
      close-on-click-action
      :round="false"
    >
      <van-cell icon="play-circle-o" value="播放听力" clickable />
      <van-cell icon="music-o" value="播放音乐" clickable />
      <van-cell icon="music-o" value="下一首听力" clickable />
      <van-cell icon="music-o" value="下一首音乐" clickable />
      <van-cell icon="todo-list-o" value="添加到播放列表" clickable />
      <van-cell icon="add-o" value="添加到音乐列表" clickable />
      <van-cell icon="star-o" value="收藏" clickable />
      <van-cell icon="location-o" value="设置默认路径" clickable />
    </van-action-sheet>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PathHistory from "@/classes/PathHistory.ts";
import axios from "axios";
import Item from "./Item.vue";
import VueInfinityList from "@/components/vue-Infinity-list.vue";
@Component({
  components: {
    VueInfinityList
  }
})
export default class FileView extends Vue {
  private itemComponent = Item;
  private items = [
    {
      id: 1,
      label: "Title"
    },
    {
      id: 2,
      label: "Foo",
      size: 1000
    },
    {
      id: 3,
      label: "Bar"
    }
  ];
  // 刷新加载
  private isLoading = false;
  private finished = false;
  private loading = false;
  // 地址
  private defaultPath = "/";
  // private currentPath = this.defaultPath;
  private actionSheetShow = false;
  private selectedName = "";
  private pathHistory = new PathHistory(this.defaultPath);
  private actions = [
    { name: "马上播放" },
    { name: "加入播放列表" },
    { name: "收藏" },
    { name: "设置默认路径" },
    { name: "重命名" },
    { name: "选项三", subname: "描述信息" }
  ];
  private activedTab = 0;
  private get tabPaths() {
    // let tabPaths = this.pathHistory.currentPath.split(/[\\/]+/);
    // tabPaths = tabPaths.filter(item => item);
    // if(this.currentPath.indexOf(/[\\/]+/)){}
    // this.activedTab = tabPaths.length - 1;
    // this.DefaultPath = "sdfsdfs";
    return [];
  }
  private(defaultPath: string) {
    // let paths = defaultPath.split(/[\\/]+/);
    // paths = paths.filter(item => item);
    // console.log(defaultPath);
  }
  private list: {
    isFile: boolean;
    name: string;
    ok: boolean;
    size: number;
  }[] = [];
  private onRefresh() {
    // console.log();
  }
  private created() {
    if (this.defaultPath) this.onLoad(this.defaultPath);
    setTimeout(() => {
      // console.log("+++++++++++++++++");
      // this.onLoad("/");
    }, 5000);
  }
  private onLoad(path?: string) {
    console.log(path);
    axios("api/files", {
      params: {
        path,
        filter: ".(mp3|m4a|gz|xz)$"
      }
    }).then(res => {
      const { data } = res;
      // console.log(data);
      this.list = data;
      this.finished = true;
      console.log(this.pathHistory);
      // 当传入path时，记录现在位置
      if (path) this.pathHistory.go(path);
      // path && (this.currentPath = path);
    });
  }
  private onTabClick(index: number, title: string) {
    // let tempPath = this.tabPaths[0];
    // for(let i=0;i<=index;i++){
    //   tempPath+="/"+this.tabPaths[i];
    // }
    const fullPath = this.pathHistory.currentPathDetail[index].fullPath;
    console.log(fullPath);
    this.onLoad(fullPath);
    // console.log(index, title, this.pathHistory.currentPathDetail[index]);
  }
  // 长按事件
  private longClickTimer: number | undefined;
  private longClickStart(item: { name: string; isFile: boolean; ok: boolean }) {
    this.longClickTimer = setTimeout(() => {
      // 处理长按事件
      this.selectedName = item.name;
      this.actionSheetShow = true;
    }, 500);
  }
  // 长按取消事件
  private longClickCancel() {
    clearTimeout(this.longClickTimer);
  }
  // 长按滑动取消事件
  // private longClickMove() {
  //   clearTimeout(this.longClickTimer);
  // }
  // private test(s: string) {
  //   console.log(s);
  // }
}
</script>

<style lang="scss" scoped>
.fileView {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto; // 显示加载更多
}

.nav-left {
  display: flex;
  // position: fixed;
  // background: white;
  z-index: 1;
}
.van-action-sheet__description {
  text-align: left;
}
.scroller {
  height: 100%;
}
.user {
  height: 32px;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
.van-cell__title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  word-break: break-all;
}
.van-cell__value {
  flex: 0;
  display: contents;
}
</style>