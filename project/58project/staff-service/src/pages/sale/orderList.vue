<template>
    <div class="order">
            <div class="order-match-box">
                <el-form :inline="true" :model="orderSearch" class="order-form">
                    <div class="search-input-box">
                        <el-form-item class="order-select" label="订单号">
                            <el-input v-model="orderSearch.code" placeholder="请输入订单号"></el-input>
                        </el-form-item>

                        <el-form-item class="order-select" label="手机号">
                            <el-input v-model="orderSearch.phone" placeholder="请输入手机号"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="searchOrder">查询</el-button>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="createOrder">创建订单</el-button>
                        </el-form-item>
                    </div>
                    <div class="search-select-box">
                        <el-form-item label="技能分类">
                            <el-cascader
                                :options="skillList"
                                v-model="skill"
                                :props="skillProps"
                                @change="changeSkill"
                                clearable
                                placeholder="技能分类">
                            </el-cascader>
                        </el-form-item>

                        <el-form-item label="订单类型">
                            <el-select v-model="orderSearch.type" placeholder="订单类型">
                                <el-option label="全部" :value="0"></el-option>
                                <el-option label="待匹配" :value="1"></el-option>
                                <el-option label="已匹配" :value="2"></el-option>
                                <el-option label="已签约" :value="3"></el-option>
                                <el-option label="已取消" :value="4"></el-option>
                                <el-option label="订单完成" :value="5"></el-option>

                            </el-select>
                        </el-form-item>

                        <el-form-item label="订单来源">
                            <el-select v-model="orderSearch.source" placeholder="订单来源">
                                <el-option label="全部" :value="0"></el-option>
                                <el-option label="线下" :value="1"></el-option>
                                <el-option label="线上" :value="2"></el-option>
                                <el-option label="渠道" :value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>

                </el-form>
            </div>
            
            <el-table
                :data="orderTable" 
                class="order-table">
                <el-table-column
                    label="订单号"
                    prop="code"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="手机号"
                    prop="phone"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="订单状态"
                    prop="type"
                    :formatter="formatterType"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="订单来源"
                    prop="source"
                    :formatter="formatterSource"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    prop="created_at"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="服务类型"
                    prop="service_category_id"
                    :formatter="formatterCategory"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="configOrder(scope.$index, scope.row)">处理订单</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                style="margin-top:30px;"
                @current-change="handleCurrentPage"
                @prev-click="handleCurrentPage"
                @next-click="handleCurrentPage"
                :current-page.sync="pagination.currentPage"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="pagination.total"></el-pagination>

        
    </div>
</template>
<script>
    import {orderService} from '../../../common'
    import {hrService} from '../../../common'
    export default {
        data() {
            return {
                //丁丹列表
                orderTable: [{
                    code: '', //订单号
                    create_at: '', //创建时间
                    id: '',
                    phone: '',
                    service_category_id: '',//服务分类id
                    name: '',//服务名称
                    source: '',//线上线下渠道  
                    type: '',//订单类型
                }],
                //用户列表搜索条件
                orderSearch: {
                    code: '', //订单号
                    phone: '',
                    service_category_id: '',//服务分类id
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
                type: "1",
                //技能级联选择字段
                skillProps: {
                    label: 'name',
                    value: 'id'
                },
                skill: [],//技能级联选择器筛选信息
                skillList: [],//技能级联选择器渲染数组
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
                    searchSelect: this.searchArray
                }

                await orderService.getOrderList(tableOption)
                    .then(data =>{
                        this.orderTable = data.data.data
                        
                        //分页信息
                        this.pagination.currentPage = data.data.current_page //当前页码
                        this.pagination.total = data.data.total //列表总条数
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    })
            },
            /**
             * 切换页码
             */
            async handleCurrentPage(val){
                this.pagination.currentPage = val
                await this.getTableList()
            },
            /**
             * 查找用户
             */
            async searchOrder(){
                await this.getTableList()
            },
            /**
             * 创建订单
             * 
             */
            createOrder(){
                this.$router.push({
                    path: "/sale/orderEdit",
                })
            },
            /**
             * 技能级联选择器更改时
             */
            changeSkill(val){
                let length = val.length
                this.orderSearch.service_category_id = val[length - 1]
            },
            /**
             * 
             */
            configOrder(index, row){
                this.$router.push({
                    path: "/sale/orderConfig",
                    query: {
                        type: 1, //编辑为1
                        id: row.id?row.id: '2' 
                    }
                })
            },
            /**
             * 订单状态匹配字段
             */
            formatterType(row, column){
                if(row.type == 1){
                    return "待匹配"
                } else if(row.type == 2){
                    return "已匹配"
                } else if(row.type == 3){
                    return "已签约"
                }else if(row.type == 4){
                    return "已取消"
                }else if(row.type == 5){
                    return "订单完成"
                }
            },
            /**
             * 订单来源匹配字段
             */
            formatterSource(row, column){
                if(row.source == 1){
                    return "线下"
                } else if(row.source == 2){
                    return "线上"
                } else if(row.source == 3){
                    return "渠道"
                }
            },
            /**
             * 服务类型匹配字段
             */
            formatterCategory(row, column){

            }
        },
        async mounted(){

            store.commit('setLoading',true)
            try{
                let data = await Promise.all([
                    hrService.getSkillTree(), //获取技能树
                    this.getTableList()
                ])
                this.skillList = data[0].data
            }catch(e){
                this.$message({
                    type:'error',
                    message: e.message
                })
            }
            
            store.commit('setLoading',false)
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
            min-width: 1200px;
            margin: 0 auto;
        }
    }
</style>