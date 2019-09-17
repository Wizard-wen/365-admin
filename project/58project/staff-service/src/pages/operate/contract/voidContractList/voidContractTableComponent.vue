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

                <el-table-column fixed="left"  label="空合同编号" prop="contract_number" align="center" width=""></el-table-column>

                <el-table-column  label="是否签约" prop="type" align="center"  width="">
                    <template slot-scope="scope">
                        <table-tag-component  :propList="voidContractTypeList" :tableOriginData="scope.row.type"></table-tag-component>
                    </template>
                </el-table-column>

                <el-table-column  label="创建时间" prop="sign_at" align="center" width="" :formatter="create_atFormatter"></el-table-column>
                
                <el-table-column  label="所属经纪人" prop="manager_name" align="center" width="" ></el-table-column>

                <el-table-column label="操作" align="center" fixed="right" width="">
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
                voidContractTypeList: [
                    {id: 1, name: '空合同'},
                    {id: 2, name: '未签约'},
                    {id: 3, name: '已签约'},
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
             * 创建时间
             */
            create_atFormatter(row, column){
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
