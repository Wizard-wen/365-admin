<template>
    <el-form :model="adPositionForm" :rules="adPositionRules" ref="adPositionForm" label-width="100px" class="adPositionForm">
        <el-form-item label="广告位名称" prop="name">
            <el-input type="text" v-model="adPositionForm.name" disabled></el-input>
        </el-form-item>
        
        <el-form-item label="广告位编号" prop="key">
            <el-input type="text" v-model="adPositionForm.key" disabled></el-input>
        </el-form-item>

        <el-form-item label="展现形式" prop="display">
            <select-tag-component
                :propTagList="displayList"
                v-model="adPositionForm.display"
                :isSingle="true"></select-tag-component>
        </el-form-item>
        
        <el-form-item label="图片列表" prop="resource">
            <resource-component v-model="adPositionForm.resource"></resource-component>
        </el-form-item>
    </el-form>
</template>

<script>

import {customService} from '../../../../common'
import {selectTagComponent} from '@/pages/components/index.js'
import {resourceComponent} from './adPositionItem/index.js'


export default {
    components: {
        selectTagComponent,
        resourceComponent,
    },
    data(){
        return {
            adPositionForm: {
                id: 0,
                display: 1,//展现形式
                key: '',//广告位编号
                name: '',//广告位名称
                resource: [],//资源数组
            },
            adPositionRules: {

            },
            displayList: [{id:1, name: '轮播图'}, {id: 2, name: '图片'}]
        }
    },
    async mounted(){
        try{
            let adId = this.$route.query.id
            await customService.getAdPosition(1, adId).then(data =>{
                this.adPositionForm = data.data
            }).catch(error =>{

            }).finally(() =>{

            })
        } catch(error){
            
        }
    }
}
</script>

<style lang="scss" scoped>
.adPositionForm{
    width: 860px;
    margin: 24px;
}
</style>




