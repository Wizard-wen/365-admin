<template>
    <div class="search-box">
        <el-form :inline="true" size="mini" label-width="90px" :model="queryedFrom" class="account-form">
                <el-form-item label="姓名">
                    <el-input class="input" style="width: 173px" v-model="queryedFrom.name" placeholder="请输入服务人员姓名" :maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input class="input" style="width: 173px" v-model="queryedFrom.phone" placeholder="请输入服务人员姓名" :maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input class="input" style="width: 173px" v-model="queryedFrom.identify" placeholder="请输入服务人员姓名" :maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="员工号">
                    <el-input class="input" style="width: 173px" v-model="queryedFrom.staff_code" placeholder="请输入服务人员姓名" :maxlength="20"></el-input>
                </el-form-item>
               
                <el-form-item label="职业类型">
                    <el-cascader
                        v-model="queryedFrom.service_category"
                        :options="queryForm.serviceConfig"
                        :props="cascaderProps"
                        :show-all-levels="false"
                        filterable
                        clearable></el-cascader>
                </el-form-item>

                <el-form-item label="参加培训">
                    <el-cascader
                        v-model="queryedFrom.service_category"
                        :options="queryForm.serviceConfig"
                        :props="cascaderProps"
                        :show-all-levels="false"
                        filterable
                        clearable></el-cascader>
                </el-form-item>
                <el-form-item label="创建人">
                    <el-cascader
                        v-model="queryedFrom.service_category"
                        :options="queryForm.serviceConfig"
                        :props="cascaderProps"
                        :show-all-levels="false"
                        filterable
                        clearable></el-cascader>
                </el-form-item>
            
                <el-form-item label="接单状态">
                    <el-select v-model="queryedFrom.working_status" placeholder="请选择接单状态">
                        <el-option 
                            v-for="(item, index) in queryForm.working_status" 
                            :key="index" 
                            :label="item.name" 
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工龄">
                    <el-select v-model="queryedFrom.working_status" placeholder="请选择接单状态">
                        <el-option 
                            v-for="(item, index) in queryForm.working_status" 
                            :key="index" 
                            :label="item.name" 
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="民族">
                    <el-select v-model="queryedFrom.working_status" placeholder="请选择接单状态">
                        <el-option 
                            v-for="(item, index) in queryForm.working_status" 
                            :key="index" 
                            :label="item.name" 
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            
                <el-form-item label="教育程度">
                    <el-select v-model="queryedFrom.working_status" placeholder="请选择接单状态">
                        <el-option 
                            v-for="(item, index) in queryForm.working_status" 
                            :key="index" 
                            :label="item.name" 
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="技能证书">
                    <el-select v-model="queryedFrom.working_status" placeholder="请选择接单状态">
                        <el-option 
                            v-for="(item, index) in queryForm.working_status" 
                            :key="index" 
                            :label="item.name" 
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item >
                    <div style="width: 263px;display: flex;justify-content: flex-end">
                        <el-button type="primary" >查询</el-button>
                        <el-button type="primary" >重置</el-button>
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
        /**
         * 已选中的标签
         */
        queryedFrom: {
            type: Object,
            default: function(){
                return {}
            }
        }
    },
    methods: {
        /**
         * 搜索
         */
        search(){

        },
        /**
         * 重置
         */
        reset(){

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