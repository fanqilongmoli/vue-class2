import Vue from 'vue'
import App from './App.vue'
import Bus from './utils/bus'
import Directives from './directives'
import Api from './services/api'
import GlobalUI from './components'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/fontIcon/iconfont.css'
import router from './router'

// 挂载 Bus
Bus(Vue);
// 注册指令插件
Directives(Vue);
// 给axios添加拦截器并添加到全局
Api(Vue);
// 全局组件
Vue.use(MintUI);
Vue.use(GlobalUI);
//vue-assistant

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
