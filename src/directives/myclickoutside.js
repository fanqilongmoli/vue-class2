/**
 *  鼠标点击外部事件，用于收起下拉框等操作 示例： v-myclickoutside = 'handler'
 */
export default {
    install(Vue) {
        let myNode = [];
        document.body.addEventListener('mousedown', (e) => {
            for (let i = myNode.length; i--;) {
                myNode[i].handlerfn(e, myNode[i])
            }
        });
        Vue.directive('myclickoutside', {
            bind(el, binding, vnode) {
                //id这里的长度加随机数，防止删除一些组件后，再次生成的id 重复
                el.id = myNode.push(el) - 1 + Math.round(Math.random() * 100).toString()
                const handlerfn = (e) => {
                    //是否是内部组件
                    if (el.contains(e.target)) {
                        return false;
                    } else {
                        // 执行处理
                        vnode.context[binding.expression]();
                    }
                };
                el.handlerfn = handlerfn
            },
            unbind(el) {
                let len = myNode.length;
                for (let i = 0; i < len; i++) {
                    if (myNode[i].id === el.id) {
                        myNode.splice(i, 1);
                        break;
                    }
                }
            }
        })
    }
}