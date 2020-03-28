<template>
    <div class="table-contains">
        <el-table 
            :data="tableData" 
            class="table-list" 
            border
            :header-cell-style="{height: '54px',background: '#fafafa'}">
            <el-table-column  label="姓名" prop="name" align="center" width="" ></el-table-column>
                
            <el-table-column  label="电话" prop="phone" align="center" width="" ></el-table-column>

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="goContractPage( scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    
</template>
<script>
    import {operateService} from '@common/index.js'

    export default {
        props: {
            //列表数据
            tableData: {
                type: Array,
                default:function(){return []}
            },
        },
        methods: {
            /**
             * 前往合同详情页
             */
            goContractPage(row){
                // return
                this.$router.push({
                    path: "/operate/clientItem",
                    query: {
                        id: row.id,
                    }
                })
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
