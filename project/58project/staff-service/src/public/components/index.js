
import Vue from 'vue'


import Layout from './Layout/SystemLayout.vue'

import sliderSpread from './menu/menuSpread/sliderSpread.vue'
import sliderVertical from './menu/menuVertical/sliderVertical.vue'



Vue.component('sliderSpread',sliderSpread)
Vue.component('sliderVertical',sliderVertical)

//照片详情组件
import pictureDetailDialog from './pictureDetailDialog.vue'
//生成图片组件
import makeImageComponent from './makeImageComponent.vue'
// 上传单张图片
import singlePictureUpload from './singlePictureUpload.vue'
// 上传多张图片
import multiplePictureUpload from './multiplePictureUpload.vue'
//头像组件
import iconComponent from './iconComponent.vue'
//日志组件
import logComponent from './logComponent.vue'

/**
 * 和tag标签相关的组件
 */
//tag标签信息配置
import configTagComponent from './configTagComponent.vue'

//表单项，直接点击，单选或多选tag标签
import selectTagComponent from './selectTagComponent.vue'

//表单项，通过级联选择器添加、删除tag标签组件
import cascaderTagComponent from './cascaderTagComponent.vue'




//表单页面组件
import pageEditComponent from './page/pageEditComponent.vue'

//卡片展示块组价
import cardBoxComponent from './page/cardBoxComponent.vue'



//表单展示组件
import detailFormItemComponent from './form/detailFormItemComponent.vue'
import detailFormComponent from './form/detailFormComponent.vue'
//表单label提示组件
import formItemLabelTooltipComponent from './form/formItemLabelTooltipComponent.vue'




/*******************旧列表组件 */
//列表搜索组件
import {
    querySearchInput,
    querySearchList,
} from './oldtable/queryComponent/index.js'
//列表项内的标签组件
import tableTagComponent from './oldtable/tableTagComponent.vue'
// 已选中标签
import queryTagComponent from './oldtable/queryTagComponent.vue'


import pagination from './pagination.vue'
export {
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
    cardBoxComponent,
    logComponent,
    iconComponent,
    detailFormItemComponent,
    detailFormComponent,
    formItemLabelTooltipComponent,
    singlePictureUpload,
    pagination,

    Layout,
    sliderSpread,
}



//注册至全局
Vue.component('pictureDetailDialog', pictureDetailDialog);
Vue.component('makeImageComponent', makeImageComponent);
Vue.component('configTagComponent', configTagComponent);
Vue.component('selectTagComponent', selectTagComponent);
Vue.component('cascaderTagComponent', cascaderTagComponent);
Vue.component('tableTagComponent', tableTagComponent);
Vue.component('queryTagComponent', queryTagComponent);
Vue.component('querySearchInput', querySearchInput);
Vue.component('querySearchList', querySearchList);
Vue.component('pageEditComponent', pageEditComponent);
Vue.component('cardBoxComponent', cardBoxComponent);
Vue.component('logComponent', logComponent);
Vue.component('iconComponent', iconComponent);
Vue.component('detailFormItemComponent', detailFormItemComponent);
Vue.component('detailFormComponent', detailFormComponent);
Vue.component('formItemLabelTooltipComponent', formItemLabelTooltipComponent);

Vue.component('singlePictureUpload', singlePictureUpload);
Vue.component('multiplePictureUpload', multiplePictureUpload);

Vue.component('pagination', pagination);


