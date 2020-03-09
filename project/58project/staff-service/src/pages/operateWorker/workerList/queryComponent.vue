<template>
    <div class="search-box">
        <el-form :inline="true" size="mini" ref="localQueryedForm" label-width="90px" :model="localQueryedForm" class="account-form">
            <el-form-item label="姓名" prop="name">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.name" placeholder="请输入服务人员姓名" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.phone" placeholder="请输入服务人员姓名" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item  label="身份证号" prop="identify">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.identify" placeholder="请输入服务人员姓名" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item v-if="workerListType == 'total'" label="员工号" prop="staff_code">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.staff_code" placeholder="请输入服务人员姓名" :maxlength="20"></el-input>
            </el-form-item>
            
            <el-form-item v-if="workerListType == 'total'" label="职业类型" prop="service_category">
                <el-cascader
                    v-model="localQueryedForm.service_category"
                    :options="queryForm.skill"
                    :props="cascaderProps"
                    :show-all-levels="false"
                    filterable
                    clearable></el-cascader>
            </el-form-item>

            <el-form-item label="参加培训" prop="source">
                <el-cascader
                    v-model="localQueryedForm.source"
                    :options="queryForm.skill"
                    :props="cascaderProps"
                    :show-all-levels="false"
                    filterable
                    clearable></el-cascader>
            </el-form-item>
            <el-form-item label="创建人" prop="manager">
                <el-cascader
                    v-model="localQueryedForm.manager"
                    :options="queryForm.manager"
                    :props="{
                        label:'title',
                        value:'id'
                    }"
                    :show-all-levels="false"
                    filterable
                    clearable></el-cascader>
            </el-form-item>
            
            <el-form-item v-if="workerListType == 'total'" label="签约状态" prop="sign_status">
                <el-select 
                    v-model="localQueryedForm.sign_status" 
                    placeholder="请选择接单状态"
                    filterable
                    clearable>
                    <el-option label="全部" :value="0"></el-option>
                    <el-option label="未签约" :value="1"></el-option>
                    <el-option label="已签约" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工龄">
                <el-select 
                    v-model="localQueryedForm.working_age" 
                    placeholder="请选择工龄"
                    filterable
                    clearable>
                    <el-option 
                        v-for="(item, index) in work_age_list" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="workerListType == 'total'" label="民族" prop="nation">
                <el-select 
                    v-model="localQueryedForm.nation" 
                    placeholder="请选择民族"
                    filterable
                    clearable>
                    <el-option label="全部" :value="0"></el-option>
                    <el-option 
                        v-for="(item, index) in queryForm.nation" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        
            <el-form-item v-if="workerListType == 'total'" label="教育程度" prop="education">
                <el-select v-model="localQueryedForm.education" placeholder="请选择教育程度">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option 
                        v-for="(item, index) in educationList" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="workerListType == 'total'" label="技能证书" prop="paper_category">
                <el-select 
                    v-model="localQueryedForm.paper_category" 
                    placeholder="请选择技能证书"
                    filterable
                    clearable>
                    <el-option label="全部" :value="0"></el-option>
                    <el-option 
                        v-for="(item, index) in queryForm.paper_category" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item >
                <div style="width: 263px;display: flex;justify-content: flex-end">
                    <el-button type="primary" @click="searchForm">查询</el-button>
                    <el-button @click="resetForm('localQueryedForm')">重置</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {
    work_age_list,
    educationList
} from './IworkerList.ts'

import {operateWorkerService} from '@/service/operateWorker'
export default {
    data(){
        return {
            cascaderProps: {
                label:'name',
                value:'id'
            },
            work_age_list,
            educationList,
            localQueryedForm: {
                name: '', //姓名
                phone: '',//电话
                identify: '',//身份证号
                staff_code: '',//员工号
                service_category: [],//职业技能
                course: [],//课程
                sign_status: 0,//签约状态
                working_age: 0,//工龄
                manager: [],//创建人
                nation: [],//民族
                education: [],//教育程度
                paper_category: [],//技能证书
            }
        }
    },
    props: {
        /**
         * 待选择的数据
         */
        queryForm: {
            type: Object,
            default: function(){
                return {}
            }
        },
        workerListType: {
            type: String,
            default: 'total',
        }
    },
    methods: {
        /**
         * 搜索
         */
        searchForm(){
            let sendForm = {
                ...this.localQueryedForm,
            }
            sendForm.service_category = operateWorkerService.sendCascanderData(sendForm.service_category) 
            sendForm.manager = operateWorkerService.sendCascanderData(sendForm.manager) 
            // sendForm.source = operateWorkerService.sendCascanderData(sendForm.source) 

            sendForm.course = sendForm.course? [sendForm.course]: []
            sendForm.nation = sendForm.nation? [sendForm.nation]: []
            sendForm.education = sendForm.education? [sendForm.education]: []
            sendForm.paper_category = sendForm.paper_category? [sendForm.paper_category]: []
            this.$emit('changeQueryedForm', sendForm)
        },
        /**
         * 重置
         */
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.searchForm()
        }
    }
}
</script>

<style lang="scss" scoped>
    .search-box{
        background: #fff;
        padding: 18px 30px 18px 30px;
        margin-bottom: 18px;
        .account-form{
            background: #fff;
        }
    }
</style>