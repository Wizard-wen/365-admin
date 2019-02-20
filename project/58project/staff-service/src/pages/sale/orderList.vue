<template>
    <div class="order">
        
        <div class="container-box">
            <el-form :inline="true" :model="authSearch" class="order-form">
            
                
                
                
                <el-form-item label="订单类型">
                    <el-select v-model="authSearch.region" placeholder="订单类型">
                        <el-option label="待处理" value="shanghai"></el-option>
                        <el-option label="处理中" value="beijing"></el-option>
                        <el-option label="已完成" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单来源">
                    <el-select v-model="authSearch.origin" placeholder="订单来源">
                        <el-option label="线上" value="shanghai"></el-option>
                        <el-option label="线下" value="beijing"></el-option>
                        <el-option label="渠道" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="搜索途径">
                    <el-select v-model="authSearch.type" placeholder="搜索途径">
                        <el-option label="按订单号搜索" value="shanghai"></el-option>
                        <el-option label="按手机号搜索" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="authSearch.phone" placeholder="请输入订单号或客户手机号"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="create">创建订单</el-button>
                </el-form-item>

            </el-form>





            <el-table
                :data="orderTable" 
                class="order-table">
                <el-table-column
                    label="订单号"
                    prop="id"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="手机号"
                    prop="phone"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="订单状态"
                    prop="state"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="订单来源"
                    prop="origin"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    prop="time"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="服务类型"
                    prop="type"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="viewUser(scope.$index, scope.row)">处理订单</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        
    </div>
</template>
<script>
    export default {
        data() {
            return {
                //丁丹列表
                orderTable: [
                    {
                        id: '1',
                        phone: '15001279361',//手机号
                        state: '已匹配',
                        origin: '线上',
                        time: '2019-2-17',
                        type: '月嫂',
                    }
                ],
                //用户列表搜索条件
                authSearch: {
                    phone: '',
                    region: '',
                    type: '',
                    origin: ''
                }
            }
        },
        methods: {
            /**
             * 查找用户
             */
            search(){

            },
            /**
             * 创建订单
             * 
             */
            create(){
                this.$router.push({
                    path: "/sale/orderCreate",
                })
            },
            /**
             * 编辑用户权限
             */
            editUser(index, row){
                this.$router.push({
                    path: "/superAdmin/editAccount",
                    query: {
                        type: 1, //编辑为1
                        id: row.id
                    }
                })
            },
            /**
             * 查看用户权限
             */
            viewUser(index, row) {
                this.$router.push({
                    path: "/sale/orderEdit",
                })
            },
        },
        async mounted(){
            this.orderTable = await orderService.getOrderList()
        }
    }
</script>
<style lang="scss" scoped>
    .order{
        
        
        .container-box{
            padding: 30px;
            .order-form{
                width:80%;
                min-width:1100px;
                margin: 0 auto;
            }
            .order-table{
                width: 80%;
                min-width: 1100px;
                margin: 0 auto;
            }
        }
    }
</style>