import Vue from 'vue'
//级联选择器组件
import cascaderComponent from './cascaderComponent.vue'
//照片详情组件
import pictureDetailDialog from './pictureDetailDialog.vue'
//生成图片组件
import makeImageComponent from './makeImageComponent.vue'


/**
 * 和tag标签相关的组件
 */
//tag标签信息配置
import configTagComponent from './configTagComponent.vue'

//表单项，直接点击，单选或多选tag标签
import selectTagComponent from './selectTagComponent.vue'

//表单项，通过级联选择器添加、删除tag标签组件
import cascaderTagComponent from './cascaderTagComponent.vue'

//列表项内的标签组件
import tableTagComponent from './tableTagComponent.vue'
/****************** tag相关组件结束***************************************************/

import queryTagComponent from './queryTagComponent.vue'
//列表搜索组件
import {
    querySearchInput,
    querySearchList,
} from './queryComponent/index.js'

//表单页面组件
import pageEditComponent from './pageEditComponent.vue'


Vue.component('selectTagComponent', selectTagComponent);

export {
    cascaderComponent,
    pictureDetailDialog,
    makeImageComponent,
    configTagComponent,
    selectTagComponent,
    cascaderTagComponent,
    tableTagComponent,
    pageEditComponent,
    querySearchInput,
    querySearchList,
    queryTagComponent,
}