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

                <el-table-column fixed="left" label="门店编号" prop="store_code" align="center" width="120"></el-table-column>

                <el-table-column label="门店名" prop="name" align="center" width="150"></el-table-column>

                <el-table-column label="店长" prop="store_manager_name" align="center" width="150"></el-table-column>

                <el-table-column label="门店类型" prop="is_third" align="center" width="120">
                    <template slot-scope="scope">
                        <table-tag-component 
                            v-if="storeFormConfig.is_third" 
                            :propList="storeFormConfig.is_third" 
                            :tableOriginData="scope.row.is_third"></table-tag-component>
                    </template>
                </el-table-column>

                <el-table-column label="员工数量" prop="agent_count" align="center" width="150"></el-table-column>

                <el-table-column label="经营状态" prop="type" align="center" width="120">
                    <template slot-scope="scope">
                        <table-tag-component 
                            v-if="storeFormConfig.type" 
                            :propList="storeFormConfig.type" 
                            :tableOriginData="typeFormatter(scope.row)"></table-tag-component>
                    </template>
                </el-table-column>

                <el-table-column label="地区" prop="address" align="center" width="300" ></el-table-column>
                
                <el-table-column label="成立时间" prop="created_at" align="center" :formatter="created_atFormatter" width="150"></el-table-column>

                <el-table-column label="创建人" prop="created_manager_name" align="center" width="150"></el-table-column>
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
    import {operateService, $utils} from '../../../../common'
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

            }
        },
        computed:{
            //门店配置字段对象
            storeFormConfig(){
                return this.$store.state.storeModule.storeFormConfig
            }
        },
        methods: {
            /**
             * 状态转换
             */
            typeFormatter(row, column){
                if(row.type == 'enable'){
                    return 1
                } else {
                    return 2
                }
            },
            /**
             * 门店成立时间字段转换
             */
            created_atFormatter(row, column){
                if(row.created_at == 0){
                    return '-'
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
    .store{
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
