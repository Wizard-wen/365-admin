<template>
    <div class="table-contains">
        <el-table 
            :data="tableData" 
            class="table-list" 
            border
            :header-cell-style="{height: '54px',background: '#fafafa'}">
            <el-table-column type="expand" fixed>
                <template slot-scope="props">
                    <table-item-form 
                        @updateTable="$emit('updateTable')" 
                        :currentOrder="props.row"
                        :currentPage="currentPage"
                        :orderConfigForm="orderConfigForm"
                        :orderModuleType="orderModuleType"></table-item-form>
                </template>
            </el-table-column>

            <el-table-column  label="订单编号" prop="order_code" align="center" width="150"></el-table-column>

            <el-table-column  v-if="orderModuleType=='operate' || orderModuleType=='sale'" label="订单状态" prop="type" align="center" width="100">
                <template slot-scope="scope">
                    <table-tag-component 
                    v-if="order_typeList" 
                    :propList="order_typeList" 
                    :tableOriginData="scope.row.type"></table-tag-component>
                </template>
            </el-table-column>

            <el-table-column  label="工种" prop="work_type" align="center" >
                <template slot-scope="scope">
                    <table-tag-component 
                        v-if="orderConfigForm.skill" 
                        :propList="orderConfigForm.skill" 
                        :tableOriginData="scope.row.work_type"></table-tag-component>
                </template>
            </el-table-column>

            <el-table-column  label="订单详情" prop="order_details" align="center" width="450">
                <template slot-scope="scope">
                    <el-popover trigger="click" placement="top">
                        <p>{{ scope.row.order_details }}</p>
                        <p slot="reference" class="overCellText">{{ scope.row.order_details }}</p>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column  label="服务地址" prop="service_address" align="center" >
                <template slot-scope="scope">
                    <el-popover trigger="click" placement="top">
                        <p>{{ scope.row.service_address }}</p>
                        <p slot="reference" class="overCellText">{{ scope.row.service_address }}</p>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column  label="工作时间" prop="service_duration" align="center" >
                <template slot-scope="scope">
                    <el-popover trigger="click" placement="top">
                        <p>{{ scope.row.service_duration }}</p>
                        <p slot="reference" class="overCellText">{{ scope.row.service_duration }}</p>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column  label="工资" prop="wage" align="center" >
                <template slot-scope="scope">
                    <el-popover trigger="click" placement="top">
                        <p>{{ scope.row.wage }}</p>
                        <p slot="reference" class="overCellText">{{ scope.row.wage }}</p>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
    </div>
    
</template>
<script>


    import tableItemForm from './orderTableComponent/tableItemForm.vue'
    
    import {order_typeList} from '@/public/module/orderList/IorderList.ts'
    
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
            orderConfigForm: {
                type: Object,
                default: function(){return {}}
            },
            currentPage: {
                type: String | Number,
                default: 1,
            },
            orderModuleType: {
                type: String,
                default: 'operate',
            }
        },
        data(){
            return {
                order_typeList,
            }
        },
        methods: {
            /**
             * 客户下单时间字段转换
             */
            orderAtFormatter(row, column){
                if(row.order_at == 0){
                    return '-'
                }
                return this.$utils.formatDate(new Date(row.order_at), 'yyyy-MM-dd')
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
