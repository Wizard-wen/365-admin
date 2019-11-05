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
                class="worker-table" 
                :stripe="true" 
                border 
                :fit="true"
                height="calc(100vh-90px)"
                row-key="1233444"
                :header-cell-style="{height: '30px',padding: '0px',fontSize:'12px'}"
                :cell-style="{height: '30px',padding: 0,fontSize:'12px',}">

                <el-table-column label="合同流水号" prop="contract_code" align="center" width="160"></el-table-column>
                
                <el-table-column fixed="left"  label="合同编号" prop="contract_number" align="center" width="160"></el-table-column>
                
                <el-table-column  label="合同状态" prop="type" align="center"  width="150">
                    <template slot-scope="scope">
                        <table-tag-component  :propList="contractTypeList" :tableOriginData="scope.row.type"></table-tag-component>
                    </template>
                </el-table-column>

                <el-table-column  label="签约时间" prop="sign_at" align="center" width="150" :formatter="sign_atFormatter"></el-table-column>
                
                <el-table-column  label="服务开始时间" prop="service_start" align="center" width="150" :formatter="service_startFormatter"></el-table-column>

                <el-table-column  label="服务终止时间" prop="service_end" align="center" width="150" :formatter="service_endFormatter"></el-table-column>

                <el-table-column  label="签约经纪人" prop="sign_manager_name" align="center" width="150"></el-table-column>

                <el-table-column  label="签约经纪门店" prop="sign_store_name" align="center" width="150"></el-table-column>

                <el-table-column  label="签约客户" prop="sign_user_name" align="center" width="150"></el-table-column>

                <el-table-column  label="签约客户电话" prop="sign_user_phone" align="center" width="150"></el-table-column>

                <el-table-column  label="家政服务员" prop="sign_staff_name" align="center" width="150"></el-table-column>

                <el-table-column  label="家政服务员编号" prop="sign_staff_code" align="center" width="150"></el-table-column>

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
    import {operateService, $utils} from '@common/index.js'
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
        data(){
            return {
                //合同状态列表
                contractTypeList: [
                    {id: 1, name: '待执行'},
                    {id: 2, name: '执行中'},
                    {id: 3, name: '已终止'}
                ]
            }
        },
        computed:{
            //服务人员配置字段对象
            workerConfigList(){
                return this.$store.state.operateModule.workerConfigForm
            }
        },
        methods: {
            /**
             * 签约时间
             */
            sign_atFormatter(row, column){
                if(row.sign_at == 0){
                    return '-'
                }
                return $utils.formatDate(new Date(row.sign_at), 'yyyy-MM-dd')
            },
            /**
             * 服务开始时间字段转换
             */
            service_startFormatter(row, column){
                if(row.service_start == 0){
                    return '-'
                }
                return $utils.formatDate(new Date(row.service_start), 'yyyy-MM-dd')
            },
            /**
             * 服务终止时间字段转换
             */
            service_endFormatter(row, column){
                if(row.service_end == 0){
                    return '-'
                }
                return $utils.formatDate(new Date(row.service_end), 'yyyy-MM-dd')
            },

        },
    }
</script>
<style lang="scss" scoped>
    .tag-style{
        height:24px;
        line-height: 24px;
    }
    .worker{
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
                .worker-table{
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
