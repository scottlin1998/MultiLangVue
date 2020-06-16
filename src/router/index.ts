import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'TabbarView',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Tabbar/Index.vue'),
    children: [
      {
        path: '',
        name: "FileView",
        component: () => import(/* webpackChunkName: "about" */ '@/views/Tabbar/FileView/Index.vue'),
      }
    ]
  },
  {
    path:'/fileSetting',
    name: 'FileSetting',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Setting/FileSetting/Index.vue'),
  },
  {
    path:'/fileCollection',
    name: 'FileCollection',
    component: () => import(/* webpackChunkName: "about" */ '@/views/FileCollection/Index.vue'),
  }
]

const router = new VueRouter({
  routes
})

export default router
