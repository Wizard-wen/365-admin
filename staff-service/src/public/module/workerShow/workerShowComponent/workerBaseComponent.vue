<template>
    <card-box-component 
        :title="'基本信息'">
        <div slot="contains" class="contains-form">
            <detail-form-component>
                <detail-form-item-component :label="'姓名'" :size="3" :value="workerForm.name"></detail-form-item-component>
                <detail-form-item-component :label="'电话'" :size="3" :value="workerForm.phone"></detail-form-item-component>
                <detail-form-item-component :type="'template'" :label="'性别'" :size="3" :value="workerForm.sex">
                    <p slot="template">{{workerForm.sex == 1? '男' : '女'}}</p>
                </detail-form-item-component>
                <detail-form-item-component :label="'身份证号'" :size="3" :value="workerForm.identify"></detail-form-item-component>
                <detail-form-item-component :label="'年龄'" :size="3" :value="workerForm.age"></detail-form-item-component>
                <detail-form-item-component :label="'出生日期'" :size="3" :value="workerForm.birthday | timeToDayFomatter"></detail-form-item-component>
                <detail-form-item-component :type="'template'" :label="'民族'" :size="3" :value="workerForm.nation">
                    <table-tag-component 
                        slot="template"
                        v-if="workerConfigForm.nation" 
                        :propList="workerConfigForm.nation" 
                        :tableOriginData="workerForm.nation"></table-tag-component>
                </detail-form-item-component>
                <detail-form-item-component :type="'template'" :label="'学历'" :size="3" :value="workerForm.education">
                    <p slot="template">{{workerForm.education | educationFormat}}</p>
                </detail-form-item-component>
                <detail-form-item-component :type="'template'" :label="'婚姻状况'" :size="3" :value="workerForm.is_married">
                    <p slot="template">{{workerForm.is_married == 1? '是': '否'}}</p>
                </detail-form-item-component>
                <detail-form-item-component :type="'template'" :label="'生肖'" :size="3" :value="workerForm.zodiac_sign">
                    <p slot="template">{{workerForm.zodiac_sign |zodiac_signFormat}}</p>
                </detail-form-item-component>
                <detail-form-item-component :label="'身高'" :size="3" :value="`${workerForm.body_height}cm`"></detail-form-item-component>
                <detail-form-item-component :label="'体重'" :size="3" :value="`${workerForm.body_weight}kg`"></detail-form-item-component>
                <detail-form-item-component :type="'template'" :label="'证件照'" :size="1" :value="workerForm.id_photo">
                    <multiple-picture-upload
                        slot="template"
                        :isEdit="false"
                        v-model="workerForm.id_photo"
                        :title="'证件照'"
                        :height="150"
                        :width="237"></multiple-picture-upload>
                </detail-form-item-component>
                <detail-form-item-component :label="'现住址'" :size="1" :value="workerForm.address"></detail-form-item-component>
                <detail-form-item-component :label="'紧急联系人'" :size="1" :value="workerForm.urgent_phone"></detail-form-item-component>
                <!-- <detail-form-item-component :label="'户籍地址'" :size="1" :value="workerForm.address_in_law"></detail-form-item-component> -->
            </detail-form-component>
        </div>
    </card-box-component>
</template>

<script>

import {
    zodiac_signList,
    educationList
} from '@/public/module/workerList/IworkerList.ts'
export default {
    props: {
        workerForm: {
            type: Object,
            default(){return {}}
        },
        workerConfigForm:{
            type: Object,
            default(){return {}}
        }
    },
    filters: {
        educationFormat(target){
            return educationList.find(item => item.id == target ).name
        },
        zodiac_signFormat(target){
            return zodiac_signList.find(item => item.id == target ).name
        },
    },
}
</script>

<style lang="scss" scoped>
    .contains-form{
        display: flex;
        flex-wrap:wrap;
    }  
</style>