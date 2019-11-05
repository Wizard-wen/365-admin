<template>
    <div class="table-box">
        <!-- 模糊搜索插槽 -->
        <slot name="searchList"></slot>

        <div class="right-contains">

            <!-- 快速操作栏 -->
            <div class="searched-form">
                <slot name="searchedForm"></slot>
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

                <el-table-column  label="姓名" prop="name" align="center" width="" ></el-table-column>
                
                <el-table-column  label="电话" prop="phone" align="center" width="" ></el-table-column>

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
    export default {
        props: {
            //列表数据
            tableData: {
                type: Array,
                default:function(){return []}
            },
            //表格最大宽度
            maxLength: {
                type:Object,
                default:function(){
                    return {}
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
                return this.$store.state.operateModule.workerConfigForm
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
            //登记时间字段转换
            register_atFormatter(row, column){
                if(row.register_at == 0){
                    return '0000-00-00'
                }
                return $utils.formatDate(new Date(row.register_at), 'yyyy-MM-dd')
            },
            //更新时间字段转换
            updated_atFormatter(row, column){
                if(row.updated_at == 0){
                    return '0000-00-00'
                }
                return $utils.formatDate(new Date(row.updated_at), 'yyyy-MM-dd')
            },
            //出生日期字段转换
            birthdayFormatter(row, column){
                if(row.birthday == 0){
                    return ''
                }
                return $utils.formatDate(new Date(row.birthday), 'yyyy-MM-dd')
            },
            //教育背景字段转换
            educationFomatter(row, column){
                let a =  this.$store.state.operateModule.educationList.filter(item => item.id == row.education)
                return a.length? a[0].name : ''
            },
            //计算单元格宽度
            computeStringLength(array, listKey, configKey){
                let string = 0
                if(Array.isArray(array)){
                    array.forEach((it, inds) =>{
                        if(this.workerConfigList[configKey].find(i => i.id == it)){
                            let baseLength = parseInt(this.workerConfigList[configKey].filter(i => i.id == it)[0].name.length *12 )
                            string += (baseLength + 27)
                        }
                    })
                } else {
                    if(this.workerConfigList[configKey].find(i => i.id == array)){
                        string = parseInt(this.workerConfigList[configKey].filter(i => i.id == array)[0].name.length * 12) + 27
                    } else {
                        string = 0
                    }

                }

                if(string > this.maxLength[listKey]){
                    this.maxLength[listKey] = (string + 20) > 80 ? (string + 20) : 80
                }
            },
        },
    }
</script>
<style lang="scss" scoped>
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
