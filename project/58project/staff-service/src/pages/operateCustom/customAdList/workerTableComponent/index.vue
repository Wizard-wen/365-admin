<template>
    <div class="table-contains">
        <div class="btn-contains">
            <el-button type="primary" @click="openCreateAdPositionDialog">创建广告位</el-button>
        </div>
        <el-table 
            :data="tableData" 
            class="table-list" 
            border
            :header-cell-style="{height: '54px',background: '#fafafa'}">
            <el-table-column  label="广告位编号" prop="key" align="center" ></el-table-column>

            <el-table-column  label="广告位名" prop="name" align="center"  ></el-table-column>
            
            <el-table-column  label="展现形式" prop="display" align="center"  >
                <template slot-scope="scope">
                    <el-tag :type="scope.display == 1? 'success':'danger'">
                        {{scope.display == 1? '轮播图': '图片'}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="success" @click="goAdDetailPage(scope.row)">查看</el-button>
                <el-button size="mini" type="danger" @click="deleteAdPositionConfirm(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <create-ad-position-dialog
            v-if="createAdPositionDialogVisible"
            :createAdPositionDialogVisible="createAdPositionDialogVisible"
            @closeCreateAdPositionDialog="closeCreateAdPositionDialog"></create-ad-position-dialog>
    </div>
    
</template>
<script>
    import {operateService, $utils} from '@common/index.js'

    import {
        tableTagComponent
    } from '@/public/components/index.js'
    import createAdPositionDialog from '../createAdPositionDialog.vue'
    export default {
        components: {
            tableTagComponent,
            createAdPositionDialog,
        },
        filters: {
            /**
             * 接单状态
             */
            signStatusFilter(status) {
                const statusMap = {
                    '1': 'success',
                    '2': 'danger',
                }
                return statusMap[status]
            },
        },
        data(){
            return {
                //控制创建广告位弹出框显示隐藏
                createAdPositionDialogVisible: false,
            }
        },
        props: {
            //列表数据
            tableData: {
                type: Array,
                default:function(){return []}
            },
            workerConfigList: {
                type: Object,
                default: function(){return {}}
            },
        },
        methods: {
            /**
             * 进入广告位详情页
             */
            goAdDetailPage(row){
                this.$router.push({
                    path: '/operate/adPositionItem',
                    query: {
                        from: 1,
                        position_id: row.id
                    }
                })
            },
            /**
             * 打开创建广告位弹窗
             */
            openCreateAdPositionDialog(){
                this.createAdPositionDialogVisible = true
            },
            /**
             * 关闭创建广告位弹窗
             */
            async closeCreateAdPositionDialog(){
                this.createAdPositionDialogVisible = false
                this.$emit('updateTable')
            },
            /**
             * 删除广告位
             */
            async deleteAdPositionConfirm(row){
                await this.$confirm('确定要删除该广告位吗, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(async () => {
                    await this.deleteAdPosition(row.id)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    });          
                });
            },
            /**
             * 删除广告位接口
             */
            async deleteAdPosition(id){
                try{
                    this.is_loading = true
                    await customService.deleteAdPosition(id).then( async data =>{
                        if(data.code == '0'){
                            this.$message({
                                type: 'success',
                                message: data.message
                            });
                            this.getTableList()
                            this.is_loading = false
                        }
                    }).catch(error =>{
                        this.$message({
                            type: 'error',
                            message: error.message
                        });
                        this.is_loading = false
                    }).finally(() =>{
                        this.is_loading = false
                    })
                } catch(error){
                    this.$message({
                        type: 'error',
                        message: error.message
                    });
                    this.is_loading = false
                }
            }
        },
    }
</script>
<style lang="scss" scoped>
.table-contains{
    background: #fff;
    .btn-contains{
        padding: 10px 50px;
        display: flex;
        justify-content: flex-end;
    }
    .table-list{
        min-height: 800px;
    }  
}  
          
        


</style>
