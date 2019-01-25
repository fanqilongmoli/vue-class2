import BackTop from './src/main'

BackTop.install = function (Vue) {
    Vue.componment(BackTop.name, BackTop);
}

export default BackTop;