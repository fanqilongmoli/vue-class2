import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/home.vue'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/info',
            name: 'info',
            component: resolve => require(['../views/info.vue'], resolve)
        }
    ]
});


export default router;