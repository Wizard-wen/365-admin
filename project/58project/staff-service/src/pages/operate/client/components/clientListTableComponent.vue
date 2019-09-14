<template>
    <div class="list-table">
        <!-- 模糊搜索插槽 -->
        <slot name="searchList"></slot>

        <div class="table-list">
            <div class="search-form">
                <slot name="searchForm"></slot>
            </div>
            <el-table
                :data="staffTable"
                class="staff-table"
                :stripe="true"
                border
                :fit="true"
                height="calc(100vh-90px)"
                row-key="1233444"
                :header-cell-style="{height: '30px',padding: '0px',fontSize:'12px'}"
                :cell-style="{height: '30px',padding: 0,fontSize:'12px',}">

                <el-table-column  label="申请编号" prop="apply_code" align="center" fixed="left" width="160"></el-table-column>
                <el-table-column  label="申请状态" prop="type" align="center" width="120">
                    <template slot-scope="scope">
                        <table-tag-component
                        v-if="orderApplyFormConfig.type"
                        :propList="orderApplyFormConfig.type"
                        :tableOriginData="scope.row.type"></table-tag-component>
                    </template>
                </el-table-column>
                <el-table-column  label="工种" prop="work_type" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.work_type }}</p>
                            <div slot="reference" >
                                <p class="overCellText">{{ scope.row.work_type }}</p>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column  label="服务地址" prop="service_address" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.service_address }}</p>
                            <div slot="reference" >
                                <p class="overCellText">{{ scope.row.service_address }}</p>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column  label="工作时间" prop="service_duration" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.service_duration }}</p>
                            <div slot="reference" >
                                <p class="overCellText">{{ scope.row.service_duration }}</p>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column  label="工资" prop="wage" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.wage }}</p>
                            <div slot="reference" >
                                <p class="overCellText">{{ scope.row.wage }}</p>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column  label="订单详情" prop="order_details" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.order_details }}</p>
                            <div slot="reference" >
                                <p class="overCellText">{{ scope.row.order_details }}</p>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column  label="客户联系电话" prop="user_phone" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.user_phone }}</p>
                            <div slot="reference" >
                                <p class="overCellText">{{ scope.row.user_phone }}</p>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column  label="客户姓名" prop="user_name" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.user_name }}</p>
                            <div slot="reference" >
                                <p class="overCellText">{{ scope.row.user_name }}</p>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column  label="下单时间" prop="created_at" align="center" :formatter="created_atFormatter" width="150"></el-table-column>

                <el-table-column label="操作" align="center" fixed="right" :width="controlScopeLength">
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
    import {operateService, $utils} from '../../../../../common'
    import {
        cascaderComponent,
        tableTagComponent} from '@/pages/components'

    export default {
        components: {
            // cascaderComponent,
            tableTagComponent,
        },
        filters: {
            /**
             * 订单申请类型过滤器
             */
            formatType(value){
                if(value == ''){
                    return 0
                } else if(value == 'pass'){
                    return 1
                } else {
                    return 2
                }
            }
        },
        props: {
            //员工信息列表
            staffTable: {
                type: Array,
                default:function(){return []}
            },
            maxLength: {
                type:Object,
                default:function(){
                    return {
                        type: 100, //订单申请状态
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
            //订单相关字段配置
            orderApplyFormConfig(){
                return this.$store.state.operateModule.orderApplyFormConfig
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
    .staff{
        .list-table{
            height: calc(100vh - 50px);
            width:100%;
            display: flex;
            .search-list{
                width: 200px;
                height: 100%;
                overflow-y: auto;
                background: #fff;
                margin-right: 5px;
                margin-left: 5px;
            }
            .table-list{
                overflow: auto;
                flex:1;
                width: calc(100% - 180px);
                height: calc(100vh - 50px);
                .search-form{
                    height: 40px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    .search-tag-list{
                        flex: 1;
                    }
                }
                .staff-table{
                    height: calc(100% - 72px);
                    width: 100%;
                    margin: 0 auto;
                }
                .pagination-box{
                    height:32px;
                }
            }
        }





    }
</style>
