<template>
    <div class="worker-config-box">
        <el-form class="worker-config-form" ref="form" :model="workConfigForm" label-width="140px">
        
            <el-form-item label="认证状态字段" prop="source" class="form-item-size" size="small">
                <config-tag @reload="getWorkFormConfig" v-model="workConfigForm.authentication" :tableConfig="'authentication'"></config-tag>
            </el-form-item>

            <el-form-item label="课程字段" prop="source" class="form-item-size" size="small">
                <config-tag @reload="getWorkFormConfig" v-model="workConfigForm.course" :tableConfig="'course'"></config-tag>
            </el-form-item>
            
            <el-form-item label="证书字段" prop="source" class="form-item-size" size="small">
                <config-tag @reload="getWorkFormConfig" v-model="workConfigForm.paper_category" :tableConfig="'paper_category'"></config-tag>
            </el-form-item>
            
            <el-form-item label="技能字段" prop="source" class="form-item-size" size="small">
                <config-tag @reload="getWorkFormConfig" v-model="workConfigForm.service_category" :tableConfig="'service_category'"></config-tag>
            </el-form-item>
            
            <el-form-item label="可服务人群字段" prop="source" class="form-item-size" size="small">
                <config-tag @reload="getWorkFormConfig" v-model="workConfigForm.service_crowd" :tableConfig="'service_crowd'"></config-tag>
            </el-form-item>
            
            <el-form-item label="服务类型字段" prop="source" class="form-item-size" size="small">
                <config-tag @reload="getWorkFormConfig" v-model="workConfigForm.service_type" :tableConfig="'service_type'"></config-tag>
            </el-form-item>
            
            <el-form-item label="信息来源字段" prop="source" class="form-item-size" size="small">
                <config-tag @reload="getWorkFormConfig" v-model="workConfigForm.source" :tableConfig="'source'"></config-tag>
            </el-form-item>
            
            <el-form-item label="工龄字段" prop="source" class="form-item-size" size="small">
                <config-tag @reload="getWorkFormConfig" v-model="workConfigForm.working_age" :tableConfig="'working_age'"></config-tag>
            </el-form-item>

            <el-form-item label="服务区域" prop="source" class="form-item-size" size="small">
                <config-tag @reload="getWorkFormConfig" v-model="workConfigForm.service_region" :tableConfig="'service_region'"></config-tag>
            </el-form-item>

            <el-form-item label="接单状态" prop="source" class="form-item-size" size="small">
                <config-tag @reload="getWorkFormConfig" v-model="workConfigForm.working_status" :tableConfig="'working_status'"></config-tag>
            </el-form-item>

            <el-form-item label="民族" prop="nation" class="form-item-size" size="small">
                <config-tag @reload="getWorkFormConfig" v-model="workConfigForm.nation" :tableConfig="'nation'"></config-tag>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

/**
 * type 0 新建  1 编辑
 */
import {hrService} from '../../../../common'

import {configTag} from './components'

export default {
    components: {
        configTag,
    },
    data() {

        return {
            //员工信息表单
            workConfigForm: {
                authentication: [],//认证状态字段
                course: [],//课程字段
                paper_category: [],//证书字段
                service_category: [],//技能字段
                service_crowd: [],//可服务人群字段
                service_type: [],//服务类型字段
                source: [],//信息来源字段
                working_age: [],//工龄字段
                service_region:[],//服务区域
                working_status:[],//接单状态
            },
        }
    },
    methods: {
        /**
         * tag组件更改后通过reload方法刷新页面
         */
        async getWorkFormConfig(){
            store.commit('setLoading',true)
            try{
                await hrService.getFormConfig().then(data =>{
                    if(data.code == "0"){
                        this.workConfigForm = data.data
                    }
                }).catch(err =>{
                    this.$message({
                        type:'error',
                        message: err.message
                    })
                }).finally(() =>{
                    store.commit('setLoading',false)
                })
            }catch(e){
                this.$message({
                    type:'error',
                    message: e.message
                })
            }

        },
    },
    async mounted(){
        await this.getWorkFormConfig()
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


