<template>
    <div class="table-box">
        <!-- 模糊搜索插槽 -->
        <slot name="searchList"></slot>

        <div class="right-contains">
            
            <div class="searched-form">
                <slot name="searchForm"></slot>
            </div>  
            
            <el-table 
                :data="tableData" 
                class="table-list" 
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
    import {operateService, $utils} from '@common/index.js'
    export default {
        props: {
            //员工信息列表
            tableData: {
                type: Array,
                default:function(){return []}
            },
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
