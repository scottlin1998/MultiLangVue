import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue'
Vue.use(VueRouter);
const routes = [
    // 首页四大模块
    {
        path: '/',
        name: 'TabbarView',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Tabbar/Index.vue'),
        children: [
            {
                path: '',
                name: "FileView",
                component: () => import(/* webpackChunkName: "about" */ '@/views/Tabbar/FileView/Index.vue'),
            },
            // 播放器
            {
                path: '/audioPlayer',
                name: 'AudioPlayer',
                component: () => import(/* webpackChunkName: "about" */ '@/views/Tabbar/AudioPlayer/Index.vue'),
            }
        ]
    },
    // 设置界面
    {
        path: '/fileSetting',
        name: 'FileSetting',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Setting/FileSetting/Index.vue'),
    },
    // 收藏夹
    {
        path: '/fileCollection',
        name: 'FileCollection',
        component: () => import(/* webpackChunkName: "about" */ '@/views/FileCollection/Index.vue'),
    }
];
const router = new VueRouter({
    routes
});
export default router;
//# sourceMappingURL=index.js.map