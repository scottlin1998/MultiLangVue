<template>
  <div>
    <van-nav-bar title="文件设置" left-text="返回" @click-left="$router.go(-1)" :border="false" placeholder left-arrow fixed />
  </div>
</template>

<script lang="ts">
import {Component,Vue} from "vue-property-decorator";
import {AudioPlayer} from "@/classes/AudioPlayer.ts"
@Component
export default class FileCollection extends Vue{
    private created(){
        // const audio = new Audio();
        // audio.src="https://m10.music.126.net/20200706171607/48b42306534e784452a51453a7cba41a/ymusic/ed8b/33b9/5d0c/3be89b635040b903bf1e7b74bd161036.mp3";
        
        // audio.play();
        const audioPlayer = new AudioPlayer();
    }
}
</script>