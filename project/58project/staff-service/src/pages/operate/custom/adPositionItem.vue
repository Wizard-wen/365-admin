<template>
    <el-form  
        v-loading="is_loading"
        :model="adPositionForm" 
        :rules="adPositionRules" 
        ref="adPositionForm" 
        label-width="100px" 
        class="adPositionForm">
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
            <resource-component 
                :adType="adPositionForm.display"
                v-model="adPositionForm.resource"></resource-component>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="commitAdPosition('adPositionForm')">提交</el-button>
            <el-button @click="goback">返回</el-button>
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
            is_loading: false,
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
    methods: {
        /**
         * 获取广告位信息
         */
        async getAdPosition(){
            try{
                let adId = this.$route.query.position_id
                this.is_loading = true
                await customService.getAdPosition(1, adId).then(data =>{
                    if(data.code == '0'){
                        this.adPositionForm = data.data
                        this.is_loading = false
                    }
                }).catch(error =>{
                    this.$message({
                        type: 'error',
                        message: error.message
                    })
                    this.is_loading = false
                }).finally(() =>{
                    this.is_loading = false
                })
            } catch(error){
                this.$message({
                    type: 'error',
                    message: error.message
                })
                this.is_loading = false
            }
        },
        /**
         * 提交广告位
         */
        async commitAdPosition(formName){
            let _this = this;

            await this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try{
                        this.is_loading = true
                        await customService.editAdPosition(this.adPositionForm).then(data =>{
                            if(data.code == '0'){
                                this.$message({
                                    type:'success',
                                    message: data.message
                                })
                                this.is_loading = false
                                //返回列表
                                this.goback()
                            }
                        }).catch(error =>{
                            this.$message({
                                type:'error',
                                message: error.message
                            })
                            this.is_loading = false
                        }).finally(() =>{
                            this.is_loading = false
                        })
                    } catch(error){
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                        this.is_loading = false
                    }
                } else {
                    return false;
                }
            });
        },
        /**
         * 返回
         */
        goback(){
            this.$router.push({
                path: this.$route.query.from == 1?`/operate/customAdList` : `/operate/workerAdList`,
            })
        }
    },
    async mounted(){
        await this.getAdPosition()
    }
}
</script>

<style lang="scss" scoped>
.adPositionForm{
    width: 860px;
    margin: 24px;
}
</style>




