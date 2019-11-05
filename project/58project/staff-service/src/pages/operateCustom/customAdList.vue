<template>
    <div class="custom">
        <custom-ad-table-component
            v-loading="is_loading"
            :tableData="customAdPositionList">
            <template slot="searchForm">
                <div class="search-left">
                    <el-input placeholder="请输入key值" v-model="queryForm.key" :maxlength="20"></el-input>
                    <el-input placeholder="请输入广告位名" v-model="queryForm.name" :maxlength="20"></el-input>
                    <el-button type="primary" @click="queryAdPosition">查询</el-button>
                    <el-button type="primary" @click="reset">重置</el-button>
                </div>
                <div class="search-right">
                    <el-button type="primary" @click="openCreateAdPositionDialog">创建</el-button>
                </div>
            </template>

            <template slot="control" slot-scope="controler">
                <el-button size="mini" type="text" @click="goAdDetailPage(controler.scoper.row)">查看</el-button>
                <el-button size="mini" type="text" @click="deleteAdPositionConfirm(controler.scoper.row)" style="color:#f56c6c">删除</el-button>
            </template>

            <template slot="pagination">
                <el-pagination
                    class="pagination"
                    @current-change="handleCurrentPage"
                    @prev-click="prevAndNextClick"
                    @next-click="prevAndNextClick"
                    :current-page.sync="pagination.currentPage"
                    :page-size="pagination.pageNumber"
                    layout="prev, pager, next, jumper"
                    :total="pagination.total"></el-pagination>
            </template>
        </custom-ad-table-component>
        <create-ad-position-dialog
            v-if="createAdPositionDialogVisible"
            :createAdPositionDialogVisible="createAdPositionDialogVisible"
            @closeCreateAdPositionDialog="closeCreateAdPositionDialog"></create-ad-position-dialog>
    </div>
     
</template>

<script>
import {customService} from '@common/index.js'
import {
    createAdPositionDialog,
    customAdTableComponent
} from './customAdList/index.js'
export default {
    components: {
        customAdTableComponent,
        createAdPositionDialog,
    },
    data(){
        return {
            is_loading: false,
            //客户端广告位列表
            customAdPositionList: [],
            //查询参数
            queryForm: {
                client: 1,
                key: '',
                name: '',
                page: 1,
                pageNumber: 15,
            },
            /**
             * 分页信息
             */
            pagination: {
                total: 0,
                currentPage: 1,
                pageNumber: 20,
            },
            //控制创建广告位弹出框显示隐藏
            createAdPositionDialogVisible: false,
        }
    },
    methods: {
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
            await this.getTableList()
        },
        /**
         * 点击查询广告位按钮
         */
        async queryAdPosition(){
            await this.getTableList()
        },
        reset(){
            this.queryForm.key = ''
            this.queryForm.name = ''
        },
        /**
         * 请求表格数据
         */
        async getTableList(){
            try{

                this.is_loading = true

                await customService.getAdPositionList(this.queryForm).then((data) =>{

                    this.customAdPositionList = data.data.data
                    //分页信息
                    this.pagination.currentPage = data.data.current_page //当前页码
                    this.pagination.total = data.data.total //列表总条数

                    this.is_loading = false
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                    this.is_loading = false
                }).finally(() =>{
                    this.is_loading = false
                })

            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_loading = false
            }
        },
        //下一页
        async prevAndNextClick(val){
            this,queryForm.page = val
            await this.getTableList()
        },
        /**
         * 切换页码
         */
        async handleCurrentPage(val){
            this,queryForm.page = val
            await this.getTableList()
        },
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
    async mounted(){
        await this.getTableList()
    }
}
</script>

<style lang="scss" scoped>

.search-left{
    display: flex;
    width: 800px;
}
</style>