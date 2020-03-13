<template>
    <div class="table-contains">
        <div class="btn-contains">
            <create-worker-by-operate-btn 
                :workerListType="workerListType"
                v-if="workerListType == 'total'"></create-worker-by-operate-btn>
            <create-worker-by-sale-btn 
                :workerListType="workerListType"
                @updateTable="$emit('updateTable')"  
                :workerConfigForm="workerConfigForm" 
                v-if="workerListType == 'seller'"></create-worker-by-sale-btn>
        </div>
        <el-table 
            :data="tableData" 
            class="table-list" 
            border
            :header-cell-style="{height: '54px',background: '#fafafa'}">
            <el-table-column type="expand" fixed>
                <template slot-scope="props">
                    <table-item-form 
                        @updateTable="$emit('updateTable')" 
                        :currentWorker="props.row"
                        :currentPage="currentPage"
                        :workerConfigForm="workerConfigForm"
                        :workerListType="workerListType"></table-item-form>
                </template>
            </el-table-column>

            <el-table-column label="签约状态"  align="center" width="100">
                <template slot-scope="{row}">
                    <el-tag size="small" :type="row.sign_status | signStatusFilter">
                        {{ row.sign_status == 1? '未签约' : '已签约' }}
                    </el-tag>
                </template>
            </el-table-column>
            
            <el-table-column  label="员工号" prop="staff_code" align="center" width="110"></el-table-column>

            <el-table-column  label="性别" prop="sex" align="center"  width="70">
                <template slot-scope="{row}">
                    <el-tag size="small" :type="row.sex==1?'primary':'danger'">
                        {{ row.sex==1? '男': '女' }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column  label="姓名" prop="name" align="center"  width="120"></el-table-column>
            
            <el-table-column  label="年龄" prop="age" align="center" width="60"></el-table-column>

            <el-table-column  label="电话" prop="phone" align="center" width="120"></el-table-column>
                
            <el-table-column  label="职业类型" prop="skill_ids" :min-width="150" align="center">
                <template slot-scope="scope">
                    <table-tag-component 
                    v-if="workerConfigForm.skill" 
                    :propList="workerConfigForm.skill" 
                    :tableOriginData="scope.row.skill_ids"></table-tag-component>
                </template>
            </el-table-column>

            <!-- <el-table-column  label="参加培训" prop="course" :min-width="150" align="center">
                <template slot-scope="scope">
                    <table-tag-component 
                        v-if="workerConfigForm.course" 
                        :propList="workerConfigForm.course" 
                        :tableOriginData="scope.row.course"></table-tag-component>
                </template>
            </el-table-column> -->

            <el-table-column  label="技能证书" prop="paper_ids" align="center" :min-width="150">
                <template slot-scope="scope">
                    <table-tag-component 
                        v-if="workerConfigForm.paper_category" 
                        :propList="workerConfigForm.paper_category" 
                        :tableOriginData="scope.row.paper_ids"></table-tag-component>
                </template>
            </el-table-column>
        </el-table>
    </div>
    
</template>
<script>
    import {operateService, $utils} from '@common/index.js'
    
    import createWorkerByOperateBtn from './control/createWorkerByOperateBtn.vue'
    import createWorkerBySaleBtn from './control/createWorkerBySaleBtn.vue'

    import tableItemForm from './workerTableComponent/tableItemForm.vue'
    
    export default {
        components: {
            tableItemForm,
            createWorkerByOperateBtn,
            createWorkerBySaleBtn,
        },  
        filters: {
            /**
             * 接单状态
             */
            signStatusFilter(status) {
                const statusMap = {
                    '1': 'success',
                    '2': 'danger',
                }
                return statusMap[status]
            },
        },
        props: {
            //列表数据
            tableData: {
                type: Array,
                default:function(){return []}
            },
            workerConfigForm: {
                type: Object,
                default: function(){return {}}
            },
            currentPage: {
                type: String | Number,
                default: 1,
            },
            workerListType: {
                type: String,
                default: 'total'  
            }
        },
        methods: {
            /**
             * 创建时间字段转换
             */
            created_atFormatter(row, column){
                if(row.created_at == 0){
                    return '0000-00-00'
                }
                return $utils.formatDate(new Date(row.created_at), 'yyyy-MM-dd')
            },
            //登记时间字段转换
            register_atFormatter(row, column){
                if(row.register_at == 0){
                    return '0000-00-00'
                }
                return $utils.formatDate(new Date(row.register_at), 'yyyy-MM-dd')
            },
            //更新时间字段转换
            updated_atFormatter(row, column){
                if(row.updated_at == 0){
                    return '0000-00-00'
                }
                return $utils.formatDate(new Date(row.updated_at), 'yyyy-MM-dd')
            },
            //出生日期字段转换
            birthdayFormatter(row, column){
                if(row.birthday == 0){
                    return ''
                }
                return $utils.formatDate(new Date(row.birthday), 'yyyy-MM-dd')
            },
            //教育背景字段转换
            educationFomatter(row, column){
                let a =  this.$store.state.operateModule.educationList.filter(item => item.id == row.education)
                return a.length? a[0].name : ''
            },
        },
    }
</script>
<style lang="scss" scoped>
.table-contains{
    background: #fff;
    .btn-contains{
        padding: 10px 50px;
        display: flex;
        justify-content: flex-end;
    }
    .table-list{
        min-height: 800px;
    }  
}  
          
        


</style>
