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
                    :iconUrl="currentWorker.icon?`${currentWorker.icon}`:''"
                    :height="140"
                    :width="100"></icon-component>
            </detail-form-item-component>
            <detail-form-item-component :label="'身份证号'" :size="2" :value="currentWorker.identify"></detail-form-item-component>
            <detail-form-item-component :label="'现住址'" :size="2" :value="currentWorker.address"></detail-form-item-component>
            <detail-form-item-component :label="'紧急联系人'" :size="2" :value="currentWorker.urgent_phone"></detail-form-item-component>
            <detail-form-item-component :type="'template'" :label="'民族'" :size="2" :value="currentWorker.nation">
                <table-tag-component 
                    slot="template"
                    v-if="workerConfigForm.nation" 
                    :propList="workerConfigForm.nation" 
                    :tableOriginData="currentWorker.nation"></table-tag-component>
            </detail-form-item-component>
            <detail-form-item-component :type="'template'" :label="'教育程度'" :size="2" :value="currentWorker.education">
                <table-tag-component 
                    slot="template"
                    v-if="educationList" 
                    :propList="educationList" 
                    :tableOriginData="currentWorker.education"></table-tag-component>
            </detail-form-item-component>
            <detail-form-item-component :type="'template'" :label="'创建时间'" :size="2" :value="currentWorker.created_at">
                <p slot="template">{{currentWorker.created_at | timeToSecondFomatter}}</p>
            </detail-form-item-component>
            <detail-form-item-component :type="'template'" :label="'出生日期'" :size="2" :value="currentWorker.birthday">
                <p slot="template">{{currentWorker.birthday | timeToDayFomatter}}</p>
            </detail-form-item-component>
            <detail-form-item-component :label="'参加工作时间'" :size="2" :value="currentWorker.worked_at">

            </detail-form-item-component>
            <detail-form-item-component :label="'身高'" :size="2" :value="currentWorker.body_height?`${currentWorker.body_height}cm`:''"></detail-form-item-component>
            <detail-form-item-component :type="'template'" :label="'属相'" :size="2" :value="currentWorker.zodiac_sign">
                <table-tag-component 
                    slot="template"
                    v-if="zodiac_signList" 
                    :propList="zodiac_signList" 
                    :tableOriginData="currentWorker.zodiac_sign"></table-tag-component>
            </detail-form-item-component>
            <detail-form-item-component :label="'体重'" :size="2" :value="currentWorker.body_weight?`${currentWorker.body_weight}kg`:''"></detail-form-item-component>
            <detail-form-item-component :type="'template'" :label="'更新时间'" :size="2" :value="currentWorker.updated_at">
                <p slot="template">{{currentWorker.updated_at | timeToSecondFomatter}}</p>
            </detail-form-item-component>
            <detail-form-item-component :label="'创建人'" :size="2" :value="currentWorker.manager_name"></detail-form-item-component>
        </detail-form-component>
        <div>
            <!-- 查看服务人员 -->
            <go-worker-show-item-btn
                v-if="workerListType !='apply'"
                :currentPage="currentPage"
                :workerListType="workerListType" 
                :currentWorker="currentWorker"></go-worker-show-item-btn>
            <!-- 运营人员编辑 -->
            <edit-worker-by-operate-btn
                :workerListType="workerListType" 
                v-if="workerListType!='publicMatch' && workerListType!='match'&& workerListType!='seller'"
                :currentPage="currentPage" 
                :currentWorker="currentWorker"></edit-worker-by-operate-btn>
            <!-- 停用、启用 -->
            <change-worker-status-btn
                :workerListType="workerListType" 
                v-if="workerListType == 'total'"
                @updateTable="$emit('updateTable')" 
                :currentWorker="currentWorker"></change-worker-status-btn>
            <!-- 添加服务人员至异常服务人员 -->
            <error-worker-by-sale-btn
                :workerListType="workerListType"
                v-if="workerListType == 'seller'"
                :workerForm="currentWorker"
                @updateTable="$emit('updateTable')" ></error-worker-by-sale-btn>
            <!-- 将服务人员添加至备选 -->
            <add-worker-to-order-matched-worker-list
                v-if="workerListType == 'match' || workerListType == 'publicMatch'"
                :workerForm="currentWorker"
                @updateTable="$emit('updateTable')"></add-worker-to-order-matched-worker-list>
            <!-- 恢复服务人员 -->
            <!-- <recover-error-worker-btn
                v-if="workerListType == 'warning'"
                :workerListType="workerListType" 
                :currentWorker="currentWorker"
                @updateTable="$emit('updateTable')"></recover-error-worker-btn> -->
            <!-- 提交新服务人员 -->
            <!-- <submit-new-worker-btn
                v-if="workerListType == 'apply'"
                :workerListType="workerListType" 
                :currentWorker="currentWorker"
                @updateTable="$emit('updateTable')"></submit-new-worker-btn> -->
        </div>
    </div>
</template>

<script>
import {
    addWorkerToOrderMatchedWorkerList,
    changeWorkerStatusBtn,
    editWorkerByOperateBtn,
    errorWorkerBySaleBtn,
    goWorkerShowItemBtn,
} from '../control/index.js'

// import submitNewWorkerBtn from '../control/submitNewWorkerBtn.vue'
// import recoverErrorWorkerBtn from '../control/recoverErrorWorkerBtn.vue'

import {
    iconComponent
} from '@/public/components/index.js'

import {educationList,zodiac_signList}from '../IworkerList.ts'

export default {
    components: {
        goWorkerShowItemBtn,
        changeWorkerStatusBtn,
        editWorkerByOperateBtn,
        iconComponent,
        errorWorkerBySaleBtn,
        addWorkerToOrderMatchedWorkerList,
        // submitNewWorkerBtn,
        // recoverErrorWorkerBtn,
    },
    data(){
        return {
            educationList,
            zodiac_signList,
        }
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
        workerConfigForm: {
            type: Object,
            default(){return {}}
        },
        workerListType: {
            type: String,
            default: 'total'
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