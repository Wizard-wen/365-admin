<template>
    <div class="worker-config-box" 
    v-loading="is_loading">
        <el-form class="worker-config-form" ref="form" :model="workworkerConfigForm" label-width="140px">

            <!-- <el-form-item label="认证状态" prop="authentication" class="form-item-size" size="small">
                <config-tag-component  :tagList="workworkerConfigForm.authentication" :tagConfigKey="'authentication'"></config-tag-component>
            </el-form-item> -->

            <!-- <el-form-item label="参加培训" prop="course" class="form-item-size" size="small">
                <config-tag-component  :tagList="workworkerConfigForm.course" :tagConfigKey="'course'"></config-tag-component>
            </el-form-item> -->

            <el-form-item label="证书" prop="paper_category" class="form-item-size" size="small">
                <config-tag-component 
                    @editTag="editTag"
                    :tagList="workworkerConfigForm.paper_category" 
                    :tagConfigKey="'paper_category'"></config-tag-component>
            </el-form-item>

            <!-- <el-form-item label="职业类型" prop="service_category" class="form-item-size" size="small">
                <config-tag-component  
                    @editTag="editTag"
                    :tagList="workworkerConfigForm.service_category" 
                    :tagConfigKey="'service_category'"></config-tag-component>
            </el-form-item> -->

            <!-- <el-form-item label="可服务人群" prop="source" class="form-item-size" size="small">
                <config-tag-component  :tagList="workworkerConfigForm.service_crowd" :tagConfigKey="'service_crowd'"></config-tag-component>
            </el-form-item> -->

            <!-- <el-form-item label="服务类型" prop="source" class="form-item-size" size="small">
                <config-tag-component  :tagList="workworkerConfigForm.service_type" :tagConfigKey="'service_type'"></config-tag-component>
            </el-form-item> -->

            <!-- <el-form-item label="信息来源" prop="source" class="form-item-size" size="small">
                <config-tag-component  :tagList="workworkerConfigForm.source" :tagConfigKey="'source'"></config-tag-component>
            </el-form-item> -->

            <!-- <el-form-item label="工龄" prop="source" class="form-item-size" size="small">
                <config-tag-component  :tagList="workworkerConfigForm.working_age" :tagConfigKey="'working_age'"></config-tag-component>
            </el-form-item> -->

            <!-- <el-form-item label="服务区域" prop="source" class="form-item-size" size="small">
                <config-tag-component  :tagList="workworkerConfigForm.service_region" :tagConfigKey="'service_region'"></config-tag-component>
            </el-form-item> -->

            <!-- <el-form-item label="接单状态" prop="source" class="form-item-size" size="small">
                <config-tag-component  :tagList="workworkerConfigForm.working_status" :tagConfigKey="'working_status'"></config-tag-component>
            </el-form-item> -->

            <el-form-item label="民族" prop="nation" class="form-item-size" size="small">
                <config-tag-component 
                    @editTag="editTag"
                    :tagList="workworkerConfigForm.nation" 
                    :tagConfigKey="'nation'"></config-tag-component>
            </el-form-item>

            <!-- <el-form-item label="学历" prop="education" class="form-item-size" size="small">
                <config-tag-component 
                    @editTag="editTag"
                    :tagList="workworkerConfigForm.education" 
                    :tagConfigKey="'education'"></config-tag-component>
            </el-form-item> -->

            <!-- <el-form-item label="更新时间" prop="updated_types" class="form-item-size" size="small">
                <config-tag-component  :tagList="workworkerConfigForm.updated_types" :tagConfigKey="'updated_types'"></config-tag-component>
            </el-form-item> -->
        </el-form>
    </div>
</template>

<script>

import {operateService} from '@common/index.js'

export default {
    data() {

        return {
            is_loading: false,
            //员工信息表单
            workworkerConfigForm: {
                authentication: [],//认证状态
                course: [],//培训课程
                paper_category: [],//证书标签
                service_category: [],//职业类型
                service_crowd: [],//可服务人群
                service_type: [],//服务类型
                source: [],//信息来源
                working_age: [],//工龄
                service_region:[],//服务地区
                working_status:[],//接单状态
                education: [],//教育程度
            },
        }
    },
    methods: {
        /**
         * tag组件更改后通过reload方法刷新页面
         */
        async getWorkerFormConfig(){
            try{
                this.is_loading = true
                await operateService.getWorkerFormConfig('config').then(data =>{
                    if(data.code == "0"){
                        this.workworkerConfigForm = data.data
                    }
                    this.is_loading = false
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                    this.is_loading = false
                }).finally(() =>{
                    this.is_loading = false
                })
            }catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_loading = true
            }
        },
        /**
         * 新建&编辑标签弹窗
         */
        editTag(item){
            this.tagConfigForm = {}
            if(item){
                this.tagConfigForm = item
            } 
            this.tagDialogVisible = true
        },
    },
    async mounted(){
        await this.getWorkerFormConfig()
    }
}
</script>
<style lang="scss" scoped>
    .worker-config-box{
        width: 100%;
        padding-top: 30px;
        .worker-config-form{
            width: 100%;
            & /deep/ .el-form-item{
                margin-bottom: 15px;
            }
            .form-item-size{
                width: 900px;
                & /deep/ .el-input{
                    min-width: 260px;
                }
            }
        }
    }

</style>


