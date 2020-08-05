<template>
  <div>
    <van-nav-bar title="播放器" left-text="返回" @click-left="$router.go(-1)" placeholder left-arrow fixed />
    <van-cell>累积时常</van-cell>
    <van-cell>今日时长</van-cell>
    <van-cell>当前路径</van-cell>
    <van-cell>正在播放</van-cell>
    <van-cell>目标</van-cell>
    <van-cell>循环</van-cell>
  </div>
</template>
