import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
// import VirtualList from 'vue-virtual-scroll-list'
const VirtualList = require('vue-virtual-scroll-list');
Vue.component('virtual-list', VirtualList)
const { RecycleScroller }  = require('vue-virtual-scroller');
Vue.component('RecycleScroller', RecycleScroller)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
