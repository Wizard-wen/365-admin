<template>
    <card-box-component 
        :title="'技能信息'">
        <div slot="contains" class="contains-form">
            <detail-form-component>
                <detail-form-item-component
                    :type="'template'"
                    :label="'职业类型'"
                    :size="1"
                    :value="workerForm.skill">
                    <table-tag-component 
                        slot="template"
                        v-if="workerConfigForm.skill" 
                        :propList="workerConfigForm.skill" 
                        :tableOriginData="workerForm.skill"></table-tag-component>
                </detail-form-item-component>
                <detail-form-item-component
                    :type="'template'"
                    :label="'参加培训'"
                    :size="1"
                    :value="workerForm.course">
                    <table-tag-component 
                        slot="template"
                        v-if="workerConfigForm.course" 
                        :propList="workerConfigForm.course" 
                        :tableOriginData="workerForm.course"></table-tag-component>
                </detail-form-item-component>
                <detail-form-item-component
                    :type="'template'"
                    :label="'技能证书'"
                    :size="1"
                    :value="workerForm.paper">
                    <table-tag-component 
                        slot="template"
                        v-if="workerConfigForm.paper_category" 
                        :propList="workerConfigForm.paper_category" 
                        :tableOriginData="workerForm.paper"></table-tag-component>
                </detail-form-item-component>
                <detail-form-item-component :label="'参加工作年份'" :size="3" :value="workerForm.worked_at?`${workerForm.worked_at}年`:''"></detail-form-item-component>
                <detail-form-item-component
                    :type="'template'"
                    :label="'照片'"
                    :size="1"
                    :value="workerForm.photo">
                    <multiple-picture-upload
                        slot="template"
                        :isEdit="false"
                        v-model="workerForm.photo"
                        :title="'照片'"
                        :maxCount="10"
                        :height="150"
                        :width="237"></multiple-picture-upload>
                </detail-form-item-component>
            </detail-form-component>
        </div>
    </card-box-component>
</template>

<script>
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
}
</script>

<style lang="scss" scoped>
    .contains-form{
        display: flex;
        flex-wrap:wrap;
    }  
</style>