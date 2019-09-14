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

                <el-table-column  label="订单编号" prop="order_code" align="center" width="150"></el-table-column>

                <el-table-column  label="订单状态" prop="order_status" align="center" width="120">
                    <template slot-scope="scope">
                        <table-tag-component 
                        v-if="orderStatusList" 
                        :propList="orderStatusList" 
                        :tableOriginData="scope.row.id"></table-tag-component>
                    </template>
                </el-table-column>

                <el-table-column  label="工种" prop="work_type" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.work_type }}</p>
                            <p slot="reference" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.work_type }}</p>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column  label="订单详情" prop="order_details" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.order_details }}</p>
                            <p slot="reference" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.order_details }}</p>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column  label="服务地址" prop="service_address" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.service_address }}</p>
                            <p slot="reference" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.service_address }}</p>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column  label="工作期间" prop="service_duration" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.service_duration }}</p>
                            <p slot="reference" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.service_duration }}</p>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column  label="工资" prop="wage" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.wage }}</p>
                            <p slot="reference" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.wage }}</p>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column  label="下单时间" prop="order_time" align="center" width="110"></el-table-column>

                <el-table-column  label="下单客户" prop="order_user" align="center" width="110"></el-table-column>

                <el-table-column  label="下单客户电话" prop="order_user_phone" align="center" width="110"></el-table-column>

                <el-table-column  label="来源门店" prop="order_source_store" align="center" width="110"></el-table-column>

                <el-table-column  label="来源人" prop="order_source_manager" align="center" width="110"></el-table-column>

                <el-table-column  label="签约客户" prop="sign_user" align="center" width="110"></el-table-column>

                <el-table-column  label="签约客户电话" prop="sign_user_phone" align="center" width="110"></el-table-column>

                <el-table-column  label="签约客户余额" prop="sign_user_figure" align="center" width="110"></el-table-column>
    
                <el-table-column  label="签约服务人员" prop="service_staff" align="center" width="110"></el-table-column>

                <el-table-column  label="签约服务人员编号" prop="service_staff_code" align="center" width="120"></el-table-column>

                <el-table-column  label="订单创建人" prop="created_staff" align="center" width="110"></el-table-column>

                <el-table-column  label="订单创建时间" prop="created_at" align="center" width="110"></el-table-column>

                <el-table-column  label="订单经纪人" prop="order_manager" align="center" width="110"></el-table-column>

                <el-table-column  label="订单经纪门店" prop="order_manage_store" align="center" width="110"></el-table-column>

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
    import {$utils} from '../../../../common'
    import {
        tableTagComponent} from '@/pages/components'
    
    export default {
        components: {
            tableTagComponent,
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
                        authentication: 80, //认证状态
                        working_status: 80,//接单状态
                        skill_ids: 80,// 职业类型
                        service_type: 80,//服务类型
                        service_crowd: 80,//可服务人群
                        working_age: 80,// 工龄
                        nation: 80,// 民族
                        region_ids: 80,//服务地区
                        course: 80,//参加培训
                        paper_ids: 80, //技能证书
                        source: 80,//信息来源
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
            //订单状态列表
            orderStatusList(){
                return this.$store.state.saleModule.order_status
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
