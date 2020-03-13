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
                        :currentOrderApply="props.row"
                        :currentPage="currentPage"
                        :orderApplyConfigForm="orderApplyConfigForm"
                        :orderApplyModuleType="orderApplyModuleType"></table-item-form>
                </template>
            </el-table-column>

            <el-table-column  
                v-if="orderApplyModuleType=='apply'" 
                label="订单申请编号" prop="apply_code" align="center" width="150"></el-table-column>

            <el-table-column  
                v-if="orderApplyModuleType=='require'" 
                label="需求申请编号" prop="require_code" align="center" ></el-table-column>
            <el-table-column  
                label="申请时间" prop="created_at" align="center" width="130"
                :formatter="created_atFormatter"></el-table-column>

            <el-table-column  label="申请状态" prop="type" align="center" width="100">
                <template slot-scope="scope">
                    <table-tag-component 
                    v-if="order_apply_typeList" 
                    :propList="order_apply_typeList" 
                    :tableOriginData="scope.row.type"></table-tag-component>
                </template>
            </el-table-column>

            <el-table-column  label="工种" prop="work_type" align="center" width="120">
                <template slot-scope="scope">
                    <el-popover trigger="click" placement="top">
                        <p>{{ scope.row.work_type }}</p>
                        <p slot="reference" class="overCellText">{{ scope.row.work_type }}</p>
                    </el-popover>
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

            <el-table-column  label="服务地址" prop="service_address" align="center" width="300">
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

            <el-table-column  label="工资" prop="wage" align="center" width="120">
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
    import {operateService, $utils} from '@common/index.js'

    import tableItemForm from './orderApplyTableComponent/tableItemForm.vue'
    
    import {order_apply_typeList} from '@/public/module/orderApplyList/IorderApplyList.ts'
    
    
    
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
            orderApplyConfigForm: {
                type: Object,
                default: function(){return {}}
            },
            currentPage: {
                type: String | Number,
                default: 1,
            },
            orderApplyModuleType: {
                type: String,
                default: 'apply',
            }
        },
        data(){
            return {
                order_apply_typeList,
            }
        },
        methods: {
            created_atFormatter(row, column){
                if(row.created_at == 0){
                    return '-'
                }
                return $utils.formatDate(new Date(row.created_at), 'yyyy-MM-dd')
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
