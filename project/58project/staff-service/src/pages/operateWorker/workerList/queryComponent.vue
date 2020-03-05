<template>
    <div class="search-box">
        <el-form :inline="true" size="mini" ref="localQueryedForm" label-width="90px" :model="localQueryedForm" class="account-form">
            <el-form-item label="姓名" prop="name">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.name" placeholder="请输入服务人员姓名" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.phone" placeholder="请输入服务人员姓名" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item v-if="isWorkerList == 1" label="身份证号" prop="identify">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.identify" placeholder="请输入服务人员姓名" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item v-if="isWorkerList == 1" label="员工号" prop="staff_code">
                <el-input class="input" style="width: 173px" v-model="localQueryedForm.staff_code" placeholder="请输入服务人员姓名" :maxlength="20"></el-input>
            </el-form-item>
            
            <el-form-item v-if="isWorkerList == 1" label="职业类型" prop="skill">
                <el-cascader
                    v-model="localQueryedForm.skill"
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
                    :props="{
                        label: 'name',
                        value: 'id',
                    }"
                    :show-all-levels="false"
                    filterable
                    clearable></el-cascader>
            </el-form-item>
            <el-form-item label="创建人" prop="manager_id">
                <el-cascader
                    v-model="localQueryedForm.manager_id"
                    :options="queryForm.manager"
                    :props="{
                        label: 'title',
                        value: 'id',
                    }"
                    :show-all-levels="false"
                    filterable
                    clearable></el-cascader>
            </el-form-item>
        
            <el-form-item v-if="isWorkerList == 1" label="签约状态" prop="sign_status">
                <el-select v-model="localQueryedForm.sign_status" placeholder="请选择接单状态">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option label="未签约" :value="1"></el-option>
                    <el-option label="已签约" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工龄">
                <el-select v-model="localQueryedForm.working_age" placeholder="请选择接单状态">
                    <el-option 
                        v-for="(item, index) in work_age_list" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="isWorkerList == 1" label="民族" prop="nation">
                <el-select v-model="localQueryedForm.nation" placeholder="请选择民族">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option 
                        v-for="(item, index) in queryForm.nation" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        
            <el-form-item v-if="isWorkerList == 1" label="教育程度" prop="education">
                <el-select v-model="localQueryedForm.education" placeholder="请选择教育程度">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option 
                        v-for="(item, index) in queryForm.education" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="isWorkerList == 1" label="技能证书" prop="paper">
                <el-select v-model="localQueryedForm.paper" placeholder="请选择技能证书">
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
import {work_age_list} from './IworkerList.ts'
export default {
    data(){
        return {
            cascaderProps: {
                label:'name',
                value:'id'
            },
            work_age_list,
            localQueryedForm: {
                name: '', //姓名
                phone: '',//电话
                identify: '',//身份证号
                staff_code: '',//员工号
                skill: [],//技能标签
                // course: [],//课程
                sign_status: [],//签约状态
                working_age: 0,//工龄
                manager_id: [],//创建人
                nation: [],//民族
                education: [],//教育程度
                paper: [],//技能证书
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
        //是否是全部服务人员列表
        // 1 是 2 不是
        isWorkerList: {
            type: Number,
            default: 1,
        }
        // /**
        //  * 已选中的标签
        //  */
        // queryedForm: {
        //     type: Object,
        //     default: function(){
        //         return {}
        //     }
        // }
    },
    methods: {
        /**
         * 搜索
         */
        searchForm(){
            this.$emit('changeQueryedForm', this.localQueryedForm)
        },
        /**
         * 重置
         */
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.$emit('changeQueryedForm', this.localQueryedForm)
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