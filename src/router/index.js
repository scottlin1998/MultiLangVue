import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue'
Vue.use(VueRouter);
const routes = [
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
    }
];
const router = new VueRouter({
    routes
});
export default router;
//# sourceMappingURL=index.js.map