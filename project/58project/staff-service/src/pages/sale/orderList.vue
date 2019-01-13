<template>
    <div class="order">
        
        <div class="container-box">
            <el-form :inline="true" :model="authSearch" class="order-form">
                <el-form-item label="订单号">
                    <el-input v-model="authSearch.user" placeholder="请输入订单号"></el-input>
                </el-form-item>
                <el-form-item label="订单类型">
                    <el-select v-model="authSearch.region" placeholder="订单类型">
                        <el-option label="待处理" value="shanghai"></el-option>
                        <el-option label="处理中" value="beijing"></el-option>
                        <el-option label="已完成" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table
                :data="userTable" 
                class="order-table">
                <el-table-column
                    label="订单号"
                    prop="id"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="订单状态"
                    prop="state"
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
                    label="服务区域"
                    prop="address"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="viewUser(scope.$index, scope.row)">查看</el-button>
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
                        
                    }
                ],
                //用户列表搜索条件
                authSearch: {
                    user:'',
                    region: ''
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
                    path: "/superAdmin/editAccount",
                    query: {
                        type: 0, //查看为0
                        id: row.id
                    }
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