<template>
    <div class="table-box">
        <!-- 模糊搜索插槽 -->
        <slot name="searchList"></slot>

        <div class="right-contains">
            <!-- 快速操作栏 -->
            <div class="search-form">
                <slot name="searchForm"></slot>
            </div>  
            
            <el-table 
                :data="tableData" 
                class="table-list" 
                :stripe="true" 
                border 
                :fit="true"
                height="calc(100vh-90px)"
                row-key="1233444"
                :header-cell-style="{height: '30px',padding: '0px',fontSize:'12px'}"
                :cell-style="{height: '30px',padding: 0,fontSize:'12px',}">

                <el-table-column  label="订单编号" prop="order_code" align="center" fixed="left" width="150"></el-table-column>

                <el-table-column  label="工种" prop="work_type" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.work_type }}</p>
                            <p slot="reference" class="overCellText">{{ scope.row.work_type }}</p>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column  label="订单详情" prop="order_details" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.order_details }}</p>
                            <p slot="reference" class="overCellText">{{ scope.row.order_details }}</p>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column  label="服务地址" prop="service_address" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.service_address }}</p>
                            <p slot="reference" class="overCellText">{{ scope.row.service_address }}</p>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column  label="工作时间" prop="service_duration" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.service_duration }}</p>
                            <p slot="reference" class="overCellText">{{ scope.row.service_duration }}</p>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column  label="工资" prop="wage" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.wage }}</p>
                            <p slot="reference" class="overCellText">{{ scope.row.wage }}</p>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column  label="下单时间" prop="order_at" align="center" width="150" :formatter="orderAtFormatter"></el-table-column>

                <el-table-column  label="订单经纪人" prop="agent_manager_name" align="center" width="150"></el-table-column>

                <el-table-column  label="订单经纪门店" prop="agent_store_name" align="center" width="150"></el-table-column>

                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <slot name="control" v-bind:scoper="scope"></slot>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="pagination-box">
                <slot name="pagination"></slot>
            </div>
        </div>
    </div>
</template>
<script>
    import {$utils} from '../../../../common'
    import {
        tableTagComponent} from '@/pages/components'
    
    export default {
        components: {
            tableTagComponent,
        },
        props: {
            //员工信息列表
            tableData: {
                type: Array,
                default:function(){return []}
            },
            maxLength: {
                type:Object,
                default:function(){
                    return {

                    }
                }
            },
            /**
             * 表格操作栏插槽宽度
             */
            controlScopeLength: {
                default: 0,
                type: Number
            }
        },
        computed:{
            //订单筛选字段
            orderFormConfig(){
                return this.$store.state.operateModule.orderFormConfig
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
                return $utils.formatDate(new Date(row.order_at), 'yyyy-MM-dd')
            },
            /**
             * 订单创建时间字段转换
             */
            createdAtFormatter(row, column){
                if(row.created_at == 0){
                    return '-'
                }
                return $utils.formatDate(new Date(row.created_at), 'yyyy-MM-dd')
            },
            /**
             * 签约服务起始时间
             */
            sign_service_startFormatter(row, column){
                if(row.sign_service_start == 0){
                    return '-'
                }
                return $utils.formatDate(new Date(row.sign_service_start), 'yyyy-MM-dd')
            },
            /**
             * 签约服务截止时间
             */
            sign_service_endFormatter(row, column){
                if(row.sign_service_end == 0){
                    return '-'
                }
                return $utils.formatDate(new Date(row.sign_service_end), 'yyyy-MM-dd')
            }
            
        },
    }
</script>
<style lang="scss" scoped>
    .tag-style{
        height:24px;
        line-height: 24px;
    }
    .overCellText{
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        width: 129px;
    }
//表格
.table-box{
    height: calc(100vh - 50px);
    width:100%;
    display: flex;
    //左侧搜索模块
    .left-search-module{
        width: 200px;
        height: 100%;
        overflow-y: auto;
        background: #fff;
        margin-right: 5px;
        margin-left: 5px;
    }
    .right-contains{
        overflow: auto;
        flex:1;
        width: calc(100% - 180px);
        height: calc(100vh - 50px);
        .searched-form{
            width: 100%;
            display: flex;
            justify-content: space-between;
            .search-tag-list{
                flex: 1;
            }
        }
        .table-list{
            height: calc(100% - 72px);
            width: 100%;
            margin: 0 auto;
        }
        .pagination-box{
            height:32px;
        }
    }
}
            
        
</style>
