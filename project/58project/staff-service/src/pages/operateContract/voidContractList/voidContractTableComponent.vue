<template>
    <div class="table-contains">
        <div class="btn-contains">
            <create-void-contract-btn></create-void-contract-btn>
        </div>
        <el-table 
            :data="tableData" 
            class="table-list" 
            border
            :header-cell-style="{height: '54px',background: '#fafafa'}">
            <el-table-column fixed="left"  label="空合同编号" prop="contract_number" align="center" width=""></el-table-column>

            <el-table-column  label="是否签约" prop="type" align="center"  width="">
                <template slot-scope="scope">
                    <table-tag-component  :propList="voidContractTypeList" :tableOriginData="scope.row.type"></table-tag-component>
                </template>
            </el-table-column>

            <el-table-column  label="创建时间" prop="sign_at" align="center" width="" :formatter="create_atFormatter"></el-table-column>
            
            <el-table-column  label="所属经纪人" prop="manager_name" align="center" width="" ></el-table-column>

            <el-table-column  label="分派时间" prop="assign_at" align="center" width="" :formatter="assign_atFormatter"></el-table-column>

            <el-table-column  label="合同录入者" prop="created_manager_name" align="center" width=""></el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <assign-void-contract-btn 
                        v-if="scope.row.type == 1"
                        @updateTable="$emit('updateTable')"
                        :currentVoidContract="scope.row"></assign-void-contract-btn>
                </template> 
            </el-table-column>
        </el-table>
    </div>
    
</template>
<script>
    import {$utils} from '@common/index.js'
    import {voidContractTypeList} from './IvoidContractList.ts'
    import assignVoidContractBtn from './control/assignVoidContractBtn.vue'
    import createVoidContractBtn from './control/createVoidContractBtn.vue'
    export default {  
        components: {
            assignVoidContractBtn,
            createVoidContractBtn,
        },
        props: {
            //列表数据
            tableData: {
                type: Array,
                default:function(){return []}
            },
        },
        data(){
            return {
                voidContractTypeList,
            }
        },
        methods: {
            /**
             * 创建时间
             */
            create_atFormatter(row, column){
                if(row.created_at == 0){
                    return '-'
                }
                return $utils.formatDate(new Date(row.created_at), 'yyyy-MM-dd')
            },
            /**
             * 空合同分派时间
             */
            assign_atFormatter(row, column){
                if(row.assign_at == 0){
                    return '-'
                }
                return $utils.formatDate(new Date(row.assign_at), 'yyyy-MM-dd')
            }
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
