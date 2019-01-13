
import Vue from 'vue'

import Layout from './Layout/SystemLayout.vue'

import sliderSpread from './menu/menuSpread/sliderSpread.vue'
import sliderVertical from './menu/menuVertical/sliderVertical.vue'

export {
    Layout,
    sliderSpread
}

/**
 * 全局注册组件，为了递归组件
 */
Vue.component('sliderSpread',sliderSpread);
Vue.component('sliderVertical',sliderVertical);