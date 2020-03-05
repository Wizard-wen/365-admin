<template>
    <div style="width: 1100px;">
        <detail-form-component>
            <detail-form-item-component 
                :type="'template'"
                :label="'照片'" 
                :size="2" 
                :value="currentWorker.icon">
                <icon-component
                    slot="template"
                    :iconUrl="currentWorker.icon"
                    :height="140"
                    :width="100"></icon-component>
            </detail-form-item-component>
            <detail-form-item-component :label="'身份证号'" :size="2" :value="currentWorker.identify"></detail-form-item-component>
            <detail-form-item-component :label="'现住址'" :size="2" :value="currentWorker.address"></detail-form-item-component>
            <detail-form-item-component :label="'紧急联系人'" :size="2" :value="currentWorker.urgent_phone"></detail-form-item-component>
            <detail-form-item-component :type="'template'" :label="'民族'" :size="2" :value="currentWorker.nation">
                <table-tag-component 
                    slot="template"
                    v-if="workerFormConfig.nation" 
                    :propList="workerFormConfig.nation" 
                    :tableOriginData="currentWorker.nation"></table-tag-component>
            </detail-form-item-component>
            <detail-form-item-component :label="'教育程度'" :size="2" :value="currentWorker.education"></detail-form-item-component>
            <detail-form-item-component :label="'创建时间'" :size="2" :value="currentWorker.created_at"></detail-form-item-component>
            <detail-form-item-component :label="'出生日期'" :size="2" :value="currentWorker.birthday"></detail-form-item-component>
            <!-- <detail-form-item-component :label="'工龄'" :size="2" :value="currentWorker.worked_at"></detail-form-item-component> -->
            <detail-form-item-component :label="'身高'" :size="2" :value="currentWorker.body_height"></detail-form-item-component>
            <detail-form-item-component :label="'属相'" :size="2" :value="currentWorker.zodiac_ign"></detail-form-item-component>
            <detail-form-item-component :label="'体重'" :size="2" :value="currentWorker.body_weight"></detail-form-item-component>
            <detail-form-item-component :label="'更新时间'" :size="2" :value="currentWorker.updated_at"></detail-form-item-component>
            <detail-form-item-component :label="'创建人'" :size="2" :value="currentWorker.manager_name"></detail-form-item-component>
        </detail-form-component>
        <div>
            <show-btn :currentPage="currentPage" :currentWorkerItem="currentWorker"></show-btn>
            <edit-by-operate-btn :currentPage="currentPage" :currentWorker="currentWorker"></edit-by-operate-btn>
            <change-status-btn @updateTable="$emit('updateTable')" :currentWorker="currentWorker"></change-status-btn>
        </div>
    </div>
</template>

<script>

import showBtn from './control/showBtn.vue'
import changeStatusBtn from './control/changeStatusBtn.vue'
import createByOperateBtn from './control/createByOperateBtn.vue'
import editByOperateBtn from './control/editByOperateBtn.vue'
import {
    iconComponent
} from '@/public/components/index.js'

export default {
    components: {
        showBtn,
        changeStatusBtn,
        createByOperateBtn,
        editByOperateBtn,
        iconComponent,
    },
    props: {
        /**
         * 当前服务人员
         */
        currentWorker: {
            type: Object,
            default: function(){return {}}
        },
        /**
         * 当前页
         */
        currentPage: {
            type: Number | String,
            default: 1,
        },
        /**
         * 字段配置
         */
        workerFormConfig: {
            type: Object,
            default(){return {}}
       
       }
    }
}
</script>

<style lang="scss" scoped>
.demo-table-expand {
    font-size: 0;
    width: 1000px;
}
.demo-table-expand label {
    width: 120px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}  
</style>