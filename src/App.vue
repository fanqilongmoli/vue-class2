<template>
    <div id="app">
        <mt-spinner class="g-loading" type="double-bounce" v-show="loading" :color="loadingColor"></mt-spinner>
        <app-header>
            <i class="iconfont icon-menu" @click="toggleShowMenu"></i>
        </app-header>
        <!-- 侧边栏 -->
        <my-menu :my-visible.sync="visible">

            <!-- slot="menu-title" 具名插槽 -->
            <template slot="menu-title">测试标题</template>

            <menu-item route='/'>
                <i slot='icon' class='iconfont icon-403010'></i>
                首页
            </menu-item>
            <menu-item route='/DatePlan'>
                <i slot='icon' class=' iconfont icon-403010'></i>
                DatePlan
            </menu-item>
            <menu-item route='/EatWhat'>
                <i slot='icon' class=' iconfont icon-chi'></i>
                今天吃什么
            </menu-item>
            <menu-item route='/memo'>
                <i slot='icon' class=' iconfont icon-beiwanglu'></i>
                备忘录
            </menu-item>
            <menu-item route='/when'>
                <i slot='icon' class=' iconfont icon-fangjia'></i>
                什么时候放假
            </menu-item>
            <menu-item route='/icon'>
                <i slot='icon' class=' iconfont icon-pinrenpinkongxin'></i>
                抛硬币
            </menu-item>
            <!-- <menu-item route='/mirror'><i slot='icon'  class=' iconfont icon-jingzi'></i>照镜子</menu-item>  -->
            <my-submenu>
                <i slot="icon" class=' iconfont icon-jizhang'></i>
                <template slot="submenu-title"><i>记记账</i></template>
                <menu-item route='/money'><i slot="icon" class=' fa fa-circle-o'></i>记账首页</menu-item>
                <menu-item route='/moneyRecord'><i slot="icon" class='fa fa-circle-o'></i>添加记账</menu-item>
                <my-submenu>
                    <i slot="icon" class='fa fa-circle-o'></i>
                    <template slot="submenu-title">这是有下拉菜单</template>
                    <menu-item><i slot="icon" class=' fa fa-circle-o'></i>我是第一个</menu-item>
                    <menu-item><i slot="icon" class=' fa fa-circle-o'></i>我是第二个</menu-item>
                </my-submenu>
                <my-submenu>
                    <i slot="icon" class='fa fa-circle-o'></i>
                    <template slot="submenu-title">这是有下拉菜单</template>
                    <menu-item><i slot="icon" class=' fa fa-circle-o'></i>我是第一个</menu-item>
                    <menu-item><i slot="icon" class='fa fa-circle-o'></i>我是第二个</menu-item>
                    <my-submenu>
                        <i slot="icon" class='fa fa-circle-o'></i>
                        <template slot="submenu-title">这是有下拉菜单</template>
                        <menu-item><i slot="icon" class=' fa fa-circle-o'></i>我是第一dddddd个</menu-item>
                        <menu-item><i slot="icon" class=' fa fa-circle-o'></i>我是第二ddddddddddddd个</menu-item>
                    </my-submenu>
                </my-submenu>
            </my-submenu>
        </my-menu>
        <router-view :userinfo="userinfo" @update-userinfo="updateUserinfo"></router-view>
    </div>
</template>

<script>
    import appHeader from './components/header.vue'

    export default {
        name: 'app',
        components: {
            appHeader: appHeader
        },
        data() {
            return {
                visible: false,  // 侧边栏是否打开
                loading: false,
                userinfo: {
                    headUrl: '/img/head.jpg',  // 头像链接
                    color: ''
                },
                loadingColor: '#26a2ff'  // loading 的颜色
            }
        },
        created() {
            //绑定设置主题事件 一旦触发修改主题 则将当前的字体颜色修改成对应的颜色
            this.$bus.$on('set-theme', (color) => {
                this.loadingColor = color;
                this.userinfo.color = color;
            })
        },
        mounted() {
            // 绑定loading事件
            this.getAllData()
            this.$bus.$on('loading', () => {
                this.loading = true
            })
            this.$bus.$on('unload', () => {
                this.loading = false
            })
        },
        methods: {
            toggleShowMenu() {
                console.log('点击打开侧边栏');
                this.visible = true;
            },
            setTheme() {
                this.loadingColor = this.userinfo.color
            },
            getAllData() {
                let color = localStorage.getItem('themeColor') || '#f04134';
                color && this.$bus.$emit('set-theme', color);
                this.userinfo.headUrl = localStorage.getItem('headImg') || this.userinfo.headUrl
            },
            updateUserinfo(obj) {
                this.userinfo = Object.assign(this.userinfo, obj)
            }
        }

    }
</script>

<style lang="scss" rel="stylesheet/scss">
    html {
        font-size: 62.5%;
    }

    body {
        position: absolute;
        margin: 0;
        padding: 0;
        width: 100%;
        min-height: 100%;
    }

    #app {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
        SimSun, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        .g-loading {
            position: fixed;
            top: 50%;
            left: 50%;
            margin-left: -14px;
            margin-top: -14px;
        }
    }
</style>
