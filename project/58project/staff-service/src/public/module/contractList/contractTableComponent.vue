<template>
    <div class="table-contains">
        <div class="btn-contains">

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
                        :currentContract="props.row"
                        :currentPage="currentPage"
                        :contractModuleType="contractModuleType"></table-item-form>
                </template>
            </el-table-column>
            
            <el-table-column label="合同流水号" prop="contract_code" align="center"></el-table-column>
                
            <el-table-column label="合同编号" prop="contract_number" align="center"></el-table-column>
            
            <el-table-column  label="合同状态" prop="type" align="center">
                <template slot-scope="scope">
                    <table-tag-component :propList="contract_typeList" :tableOriginData="scope.row.type"></table-tag-component>
                </template>
            </el-table-column>

            <el-table-column  label="签约时间" prop="sign_at" align="center"  :formatter="sign_atFormatter"></el-table-column>
            
            <el-table-column  label="服务开始时间" prop="service_start" align="center"  :formatter="service_startFormatter"></el-table-column>

            <el-table-column  label="服务终止时间" prop="service_end" align="center" :formatter="service_endFormatter"></el-table-column>

        </el-table>
    </div>
    
</template>
<script>
    import {operateService} from '@common/index.js'

    import {contract_typeList} from '@/public/module/contractList/IcontractList.ts'
    import tableItemForm from './contractTableComponent/tableItemForm.vue'
    export default {
        components: {
            tableItemForm,
        },  
        props: {
            //列表数据
            tableData: {
                type: Array,
                default:function(){return []}
            },
            currentPage: {
                type: String | Number,
                default: 1,
            },
            contractModuleType: {
                type: String,
                default: 'operateContractList',
            },
            currentContract: {
                type: Object,
                default(){return {}}
            },
        },
        data(){
            return {
                contract_typeList,
            }
        },
        methods: {
            // 签约时间
            sign_atFormatter(row, column){
                if(row.sign_at == 0){
                    return '-'
                }
                return this.$utils.formatDate(new Date(row.sign_at), 'yyyy-MM-dd')
            },
            // 服务开始时间
            service_startFormatter(row, column){
                if(row.service_start == 0){
                    return '-'
                }
                return this.$utils.formatDate(new Date(row.service_start), 'yyyy-MM-dd')
            },
            // 服务截止时间
            service_endFormatter(row, column){
                if(row.service_end == 0){
                    return '-'
                }
                return this.$utils.formatDate(new Date(row.service_end), 'yyyy-MM-dd')
            },
            
        }
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
