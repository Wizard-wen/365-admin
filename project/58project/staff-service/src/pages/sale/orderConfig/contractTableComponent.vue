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

                <el-table-column  label="合同编号" prop="contact_code" align="center" width="110"></el-table-column>

                <el-table-column  label="印制时间" prop="created_at" align="center" :formatter="created_atFormatter" width="110"></el-table-column>

                <el-table-column  label="责任部门" prop="contractManageDepartment" align="center" width="110"></el-table-column>

                <el-table-column  label="责任人" prop="contractManager" align="center" width="110"></el-table-column>

                <el-table-column  label="合同状态" prop="contract_status" align="center" width="110"></el-table-column>

                <el-table-column  label="是否签约" prop="isSign" align="center" width="110"></el-table-column>

                <el-table-column  label="甲方签约人" prop="firstParty" align="center" width="110"></el-table-column>

                <el-table-column  label="甲方签约人id" prop="firstPartyId" align="center" width="110"></el-table-column>

                <el-table-column  label="乙方签约人" prop="secondParty" align="center" width="110"></el-table-column>

                <el-table-column  label="乙方签约人id" prop="secondPartyId" align="center" width="110"></el-table-column>

                <el-table-column  label="签约管家" prop="signManager" align="center" width="110"></el-table-column>

                <el-table-column  label="签约管家id" prop="signManagerId" align="center" width="110"></el-table-column>

                <el-table-column  label="签约时间" prop="signed_at" align="center" width="110"></el-table-column>

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
                        service_type_ids: 80,//服务类型
                        service_crowd_ids: 80,//可服务人群
                        working_age: 80,// 工龄
                        nation: 80,// 民族
                        region_ids: 80,//服务地区
                        course_ids: 80,//参加培训
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
            //服务人员配置字段对象
            workerConfigList(){
                return this.$store.state.operateModule.configForm
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
            height: 750px;
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
                height: 750px;
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
