<template>
    <div class="order">
        <div class="order-match-box">
            <el-form :inline="true" :model="orderSearch" class="order-form">
                <div class="search-input-box">
                    <div>
                        <el-form-item class="order-select" label="订单号">
                            <el-input v-model="orderSearch.code" placeholder="请输入订单号"></el-input>
                        </el-form-item>

                        <el-form-item class="order-select" label="手机号">
                            <el-input v-model="orderSearch.phone" placeholder="请输入手机号"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="searchOrder">查询</el-button>
                            <el-button type="primary" @click="resetOrder">重置</el-button>
                        </el-form-item>
                    </div>
                    
                </div>
                <div class="search-select-box">
                    <el-form-item label="技能分类">
                        <cascader-component
                            v-model="orderSearch.service_category_id"
                            :cascaderName="'技能分类'"
                            :modelType="'int'"
                            :setProps="setProps"
                            :requestUrl="'./admin/common/getServiceTree'"></cascader-component>
                    </el-form-item>

                    <el-form-item label="订单类型">
                        <el-select v-model="orderSearch.type" placeholder="订单类型">
                            <el-option v-for="(item, index) in order_type" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="订单来源">
                        <el-select v-model="orderSearch.source" placeholder="订单来源">
                            <el-option v-for="(item, index) in order_source" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </div>

            </el-form>
        </div>

        <el-table :data="orderTable" class="order-table">
            
            <el-table-column label="订单号" prop="code" align="center" width="170px"></el-table-column>
            <el-table-column label="手机号" prop="phone" align="center"></el-table-column>
            <el-table-column label="订单状态" prop="type" align="center" :formatter="formatterType"></el-table-column>
            <el-table-column label="订单来源" prop="source" align="center" :formatter="formatterSource"></el-table-column>
            <el-table-column label="创建时间" prop="created_at" align="center" :formatter="formatterCreated_at"></el-table-column>
            <el-table-column label="服务类型" prop="name" align="center"></el-table-column>

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="assignOrder(scope.$index, scope.row)">分配订单</el-button>
                </template>
            </el-table-column>

        </el-table>
        <!-- 分页 -->
        <el-pagination
            class="pagination"
            @current-change="handleCurrentPage"
            @prev-click="handleCurrentPage"
            @next-click="handleCurrentPage"
            :current-page.sync="pagination.currentPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="pagination.total"></el-pagination>

                <!-- 签约弹出框 -->
        <assign-dialog
            v-if="assignDialogVisible"
            :openAssignDialog="assignDialogVisible"
            @closeAssignDialog="assignDialogVisible=false"
            :assignOrderId="assignOrderId"></assign-dialog>
    </div>
</template>
<script>
    import {
        operateService, 
        saleService, 
        $utils
    } from '../../../common'
    
    import {cascaderComponent} from '@/pages/components'
    import {assignDialog} from './components/assignList'
    
    export default {
        components: {
            cascaderComponent,
            assignDialog
        },
        data() {
            return {
                //订单列表
                orderTable: [],
                //用户列表搜索条件
                orderSearch: {
                    code: '', //订单号
                    phone: '',
                    service_category_id: 0,//服务分类id
                    source: 0,//线上线下渠道
                    type: 0,//订单类型
                },
                /**
                 * 分页信息
                 */
                pagination: {
                    total: 0,
                    currentPage: 1,
                    pageNumber: 10,
                },
                //技能级联选择字段
                setProps: {
                    label: 'name',
                    value: 'id'
                },
                //分配弹出框显示
                assignDialogVisible:false,
                //待分配订单id
                assignOrderId: 0,
            }
        },
        computed:{
            /**
             * 全部已添加搜索字段
             */
            searchArray(){
                let arr = [],
                _this = this;

                Object.keys(this.orderSearch).forEach((item, index) =>{
                    if(_this.orderSearch[item] != ''){
                        let obj = {}
                        obj[item] = _this.orderSearch[item]
                        obj = {
                            ...obj,
                            key: item
                        }
                        arr.push(obj)
                    }
                })
                return arr
            },
            /**
             * 订单类型 from vuex
             */
            order_type(){
                return this.$store.state.orderModule.order_type
            },
            /**
             * 订单来源 from vuex
             */
            order_source(){
                return this.$store.state.orderModule.order_source
            }
        },
        methods: {
            /**
             * 请求表格数据
             * @param tableOption 表格配置项
             * @param tableOption.currentPage 当前页
             * @param tableOption.searchSelect Array 页面筛选项
             * [{searchkey: '', searchValue: ''}]
             */
            async getTableList(){

                let tableOption = {
                    currentPage: this.pagination.currentPage,
                    pageNumber: this.pagination.pageNumber,
                    purpose: "assign",
                    searchSelect: this.searchArray,
                }

                store.commit('setLoading',true)
                
                try{
                    await saleService.getOrderList(tableOption).then(data =>{
                            if(data.code == "0"){
                                this.orderTable = data.data.data

                                //分页信息
                                this.pagination.currentPage = data.data.current_page //当前页码
                                this.pagination.total = data.data.total //列表总条数
                            }
                        }).catch(error =>{
                            this.$message({
                                type:'error',
                                message: error.message
                            })
                        }).finally(() =>{
                            store.commit('setLoading',false)
                        })
                } catch(error){
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                }
            },
            /**
             * 切换页码
             */
            async handleCurrentPage(val){
                this.pagination.currentPage = val
                await this.getTableList()
            },
            /**
             * 搜索
             */
            async searchOrder(){
                await this.getTableList()
            },
            /**
             * 重置搜索项
             */
            async resetOrder(){

                this.orderSearch.code= '' //订单号
                this.orderSearch.phone= ''
                this.orderSearch.service_category_id= 0//服务分类id
                this.orderSearch.source= 0//线上线下渠道
                this.orderSearch.type= 0//订单类型

                await this.getTableList()
            }, 
            /**
             * 分配订单
             */
            assignOrder(index, row){
                this.assignOrderId = row.order_id
                this.assignDialogVisible = true
            },
            /**
             * 订单状态匹配字段
             */
            formatterType(row, column){
                return this.order_type.find((item, index) =>{
                    return row.type == item.value
                }).label
            },
            /**
             * 订单来源匹配字段
             */
            formatterSource(row, column){
                return this.order_source.find((item, index) =>{
                    return row.source == item.value
                }).label
            },
            /**
             * 创建时间
             */
            formatterCreated_at(row, column){
                return $utils.formatDate(new Date(row.created_at * 1000), 'yyyy-MM-dd hh:mm:ss')
            }
        },
        async mounted(){
            await this.getTableList()
        }
    }
</script>
<style lang="scss" scoped>
    .order{
        .order-match-box{
            width:80%;
            min-width:1100px;
            margin: 20px auto;
            .order-form{
                .search-input-box{
                    display: flex;
                    justify-content: space-between;
                }
                .search-select-box{
                    display: flex;
                }
                .order-select{
                    & /deep/ .el-select .el-input {
                        width: 130px;
                    }
                }
            }
        }

        .order-table{
            width: 80%;
            min-width: 1100px;
            margin: 0 auto;
        }
        .pagination{
            width:80%;
            min-width:1100px;
            margin: 30px auto 0 auto;;
        }
    }
</style>
