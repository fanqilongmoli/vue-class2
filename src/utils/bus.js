/**
 * 这里作为事件中心，负责分发事件
 * @param Vue
 */
export default (Vue) => {
    let eventHub = new Vue();
    Vue.prototype.$bus = {
        $on(...args) {
            eventHub.$on(...args)
        },
        $off(...args) {
            eventHub.$off(...args)
        },
        $emit(...args) {
            eventHub.$emit(...args)
        }
    }
}