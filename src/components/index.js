import BackTop from './global/backtop'

import dropdown from './global/dropdown'
import item from './global/dropdown/item.vue'

import mymenu from './global/sidebar/src/my-menu.vue'
import menuitem from './global/sidebar/src/menu-item.vue'
import mysubmenu from './global/sidebar/src/my-submenu.vue'


const components = [
    BackTop,
    dropdown,
    item,
    mymenu,
    menuitem,
    mysubmenu,
];

const install = (Vue, ops) => {
    if (install.installed) {
        return;
    }
    components.map(component => {
        Vue.component(component.name, component)
    })
};
export default {
    version: '0.0.1',
    author: 'fanqilong',
    install,
    BackTop,
    dropdown,
    item,
    mymenu,
    menuitem,
    mysubmenu,
}
