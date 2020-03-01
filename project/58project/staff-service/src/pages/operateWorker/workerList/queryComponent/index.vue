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
                    :options="queryForm.serviceConfig"
                    :props="cascaderProps"
                    :show-all-levels="false"
                    filterable
                    clearable></el-cascader>
            </el-form-item>

            <!-- <el-form-item label="参加培训">
                <el-cascader
                    v-model="localQueryedForm.source"
                    :options="queryForm.serviceConfig"
                    :props="cascaderProps"
                    :show-all-levels="false"
                    filterable
                    clearable></el-cascader>
            </el-form-item> -->
            <!-- <el-form-item label="创建人">
                <el-cascader
                    v-model="localQueryedForm.service_category"
                    :options="queryForm.serviceConfig"
                    :props="cascaderProps"
                    :show-all-levels="false"
                    filterable
                    clearable></el-cascader>
            </el-form-item> -->
        
            <el-form-item v-if="isWorkerList == 1" label="签约状态" prop="sign_status">
                <el-select v-model="localQueryedForm.sign_status" placeholder="请选择接单状态">
                    <el-option 
                        v-for="(item, index) in queryForm.working_status" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="工龄">
                <el-select v-model="localQueryedForm.working_status" placeholder="请选择接单状态">
                    <el-option 
                        v-for="(item, index) in queryForm.working_status" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item v-if="isWorkerList == 1" label="民族" prop="nation">
                <el-select v-model="localQueryedForm.nation" placeholder="请选择接单状态">
                    <el-option 
                        v-for="(item, index) in queryForm.working_status" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        
            <el-form-item v-if="isWorkerList == 1" label="教育程度" prop="education">
                <el-select v-model="localQueryedForm.education" placeholder="请选择接单状态">
                    <el-option 
                        v-for="(item, index) in queryForm.working_status" 
                        :key="index" 
                        :label="item.name" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="isWorkerList == 1" label="技能证书" prop="paper">
                <el-select v-model="localQueryedForm.paper" placeholder="请选择接单状态">
                    <el-option 
                        v-for="(item, index) in queryForm.working_status" 
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
export default {
    data(){
        return {
            cascaderProps: {
                label:'name',
                value:'id'
            },
            localQueryedForm: {
                name: '',
                phone: '',
                identify: '',
                staff_code: '',
                skill: '',
                sign_status: '',
                nation: '',
                education: '',
                paper: '',
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