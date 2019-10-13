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
                row-key="1233444"
                :header-cell-style="{height: '30px',padding: '0px',fontSize:'12px'}"
                :cell-style="{height: '30px',padding: 0,fontSize:'12px',}">

                <el-table-column  label="广告位编号" prop="key" align="center" ></el-table-column>

                <el-table-column  label="广告位名" prop="name" align="center"  ></el-table-column>
                
                <el-table-column  label="展现形式" prop="display" align="center"  >
                    <template slot-scope="scope">
                        <table-tag-component 
                            v-if="displayList" 
                            :propList="displayList" 
                            :tableOriginData="scope.row.display"></table-tag-component>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center">
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
        tableTagComponent
    } from '@/pages/components'
    
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
                default:function(){ return {}}
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
                displayList: [{id:1, name: '轮播图'}, {id: 2, name: '图片'}]
            }
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
