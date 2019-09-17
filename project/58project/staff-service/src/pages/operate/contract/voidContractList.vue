<template>
    <div class="staff" v-loading="isLoaded">
        <void-contract-table-component
            :staffTable="contractList"
            :maxLength="maxLength"
            :controlScopeLength="100">
            
            <template slot="searchList">
                <div class="search-list">
                    <query-component @updateTable="updateTable"></query-component>
                </div>
            </template>

            <template slot="searchForm" >
                <query-tag-component @updateTable="updateTable"></query-tag-component>
                <el-button type="primary" size="mini" @click="openCreateVoidContractDialog">创建空合同</el-button>
            </template>
            
            <template slot="control" slot-scope="controler">
                <el-button type="text" size="mini" @click="openAssignVoidContractDialog( controler.scoper.row)">分派</el-button>
            </template>

            <template slot="pagination">
                <el-pagination
                    class="pagination"
                    @current-change="handleCurrentPage"
                    @prev-click="handleCurrentPage"
                    @next-click="handleCurrentPage"
                    :current-page.sync="pagination.currentPage"
                    :page-size="pagination.pageNumber"
                    layout="prev, pager, next, jumper"
                    :total="pagination.total"></el-pagination>
            </template>
        </void-contract-table-component>
        <assign-void-contract-dialog
            v-if="assignVoidContractDialogVisible"
            :assignVoidContractDialogVisible="assignVoidContractDialogVisible"
            @closeVoidContractAssignDialog="closeVoidContractAssignDialog"
            :voidContractId="voidContractId"></assign-void-contract-dialog>
        <create-void-contract-dialog
            v-if="createVoidContractDialogVisible"
            :createVoidContractDialogVisible="createVoidContractDialogVisible"
            @closeVoidContractCreateDialog="closeVoidContractCreateDialog"></create-void-contract-dialog>
    </div>
</template>
<script>
    import {operateService, saleService} from '../../../../common'

    import {
        voidContractTableComponent,
        queryComponent,
        queryTagComponent,
        assignVoidContractDialog,
        createVoidContractDialog,
    } from './voidContractList/index.js'
    export default {
        components: {
            voidContractTableComponent,
            queryComponent,
            queryTagComponent,
            assignVoidContractDialog,
            createVoidContractDialog,
        },
        data(){
            return {
                //合同列表
                contractList: [],
                isLoaded:false,
                /**
                 * 分页信息
                 */
                pagination: {
                    total: 0,
                    currentPage: 1,
                    pageNumber: 20,
                },
                //计算列表每一列的最大宽度
                maxLength: {
                    authentication: 80, //认证状态
                    working_status: 80,//接单状态
                    skill_ids: 80,// 职业类型
                    service_type: 80,//服务类型
                    service_crowd: 100,//可服务人群
                    working_age: 80,// 工龄
                    nation: 80,// 民族
                    region_ids:80,//服务地区
                    course: 80,//参加培训
                    paper_ids: 80, //技能证书
                    source: 80,//信息来源
                },
                voidContractId: '',//空合同id
                assignVoidContractDialogVisible: false,//分派空合同弹窗显示隐藏
                createVoidContractDialogVisible: false,//创建合同弹窗显示隐藏
            }
        },
        computed:{

        },
        methods: {
             /**
             * 请求表格数据
             */
            async getTableList(){
                try{

                    this.isLoaded = true

                    
                    await operateService.getVoidContractList().then((data) =>{

                        this.contractList = data.data.data
                        //分页信息
                        this.pagination.currentPage = data.data.current_page //当前页码
                        this.pagination.total = data.data.total //列表总条数
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    }).finally(() =>{
                        this.isLoaded = false
                    })

                } catch(error){
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                }
            },
            // 由查询组件触发的更新表格事件
            async updateTable(){
                await this.getTableList()
            },
            /**
             * 切换页码
             */
            async handleCurrentPage(val){
                //设置page查询参数
                this.$store.commit('setContractList', {
                    queryKey: 'page',
                    queryedList: val
                })
                await this.getTableList()
            },
            /**
             * 打开分派合同弹窗
             */
            openAssignVoidContractDialog(row){
                this.voidContractId = row.id
                this.assignVoidContractDialogVisible = true
            },
            /**
             * 
             */
            async closeVoidContractAssignDialog(){
                this.assignVoidContractDialogVisible = false
                await this.getTableList()
            },
            /**
             * 打开创建空合同弹窗
             */
            openCreateVoidContractDialog(){
                this.createVoidContractDialogVisible = true
            },
            /**
             * 关闭创建空合同弹窗
             */
            async closeVoidContractCreateDialog(){
                this.createVoidContractDialogVisible = false
                await this.getTableList()
            }


        },
        async mounted(){
            await this.getTableList()
        }
    }
</script>
<style lang="scss" scoped>
</style>
