<template>
    <card-box-component
        :title="'备选服务人员'">
        <el-table 
            slot="contains"
            :data="order_staff" 
            class="person-table" 
            :header-cell-style="{height: '48px',background: '#fafafa'}">
            <el-table-column label="工号" prop="staff_code" align="center"></el-table-column>

            <el-table-column label="姓名" prop="staff_name" align="center"></el-table-column>

            <el-table-column label="电话" prop="staff_phone" align="center"></el-table-column>

            <el-table-column label="签约状态" prop="type" align="center">
                <template slot-scope="scope">
                    <table-tag-component :propList="matchStaffSignList" :tableOriginData="scope.row.type"></table-tag-component>
                </template>
            </el-table-column>

            <el-table-column label="添加人" prop="created_manager_name" align="center"></el-table-column>

            <el-table-column label="操作" align="center" width="300">
                <template slot-scope="scope">
                    <el-button type="success" v-if="type == 'normal'" @click="goSignOrder(2,scope.row)" size="mini">签约</el-button>
                    <el-button type="danger" v-if="type == 'normal'" @click="openRefuseServiceDialog(scope.row)" size="mini">拒绝</el-button>
                    <el-button type="primary" @click="goStaffDetail(scope.row)" size="mini">详情</el-button>
                    <!-- 只有添加人才能删除 -->
                    <el-button 
                        type="danger" 
                        size="mini"
                        @click="deleteMatchStaff(scope.row)" 
                        v-if="presentUser.id == scope.row.created_manager_id">删除</el-button>
                </template>
            </el-table-column>
            
        </el-table>
        <refuse-service-dialog
            v-if="refuseServiceDialogVisible"
            :refuseServiceDialogVisible="refuseServiceDialogVisible"
            @closeRefuseDialog="closeRefuseDialog"
            :matched_staff="matched_staff"
            :order_id="order_id"></refuse-service-dialog>
    </card-box-component>
</template>

<script>
import {saleService} from '../../../../common'
import {refuseServiceDialog} from './orderStaffComponent/index.js'
export default {
    components: {
        refuseServiceDialog,
    },
    data(){
        return {
            order_id: this.$route.query.order_id,
            //已匹配劳动者签约状态
            matchStaffSignList: [
                {id: 1, name: '未签约'},
                {id: 2, name: '已签约'},
                {id: 3, name: '已拒绝'},
            ],
            refuseServiceDialogVisible: false,//拒绝服务人员显示隐藏
            matched_staff: null,//备选服务人员信息对象
        }
    },
    props: {
        type: {
            default: 'normal',
            type: String,
        }
    },
    computed: {
        /**
         * 当前用户信息
         */
        presentUser(){
            return this.$store.state.loginModule.user
        },
        /**
         * 订单基本信息
         */
        orderBase(){
            return this.$store.state.saleModule.order
        },
        /**
         * 备选服务人员列表
         */
        order_staff(){
            return this.$store.state.saleModule.order_staff
        },
    },
    methods: {
        /**
         * 跳转至签约页面
         * @param type 是签约还是续约 1 续约 2 首次签约
         * @param paramObj 匹配服务人员信息对象
         */
        goSignOrder(type, paramObj){
            this.$router.push({
                path: `/sale/saleSignPage`,
                query: {
                    order_id: this.order_id,
                    type: this.orderBase.type,//订单状态
                    sign_staff_id: type == 1 ? this.orderBase.sign_staff_id : paramObj.staff_id,
                    sign_staff_name: type == 1 ? this.orderBase.sign_staff_name : paramObj.staff_name,
                    sign_user_name: this.orderBase.type == 3 ? this.orderBase.sign_user_name : '',
                    sign_user_id: this.orderBase.type == 3 ? this.orderBase.sign_user_id : '',
                    sign_user_identify: this.orderBase.type == 3 ? this.orderBase.sign_user_identify : '',
                }
            })
        },
        /**
         * 打开拒绝劳动者弹窗
         * @param paramObj 匹配服务人员信息对象
         */
        openRefuseServiceDialog(paramObj){
            this.matched_staff = paramObj
            this.refuseServiceDialogVisible = true
        },
        /**
         * 关闭拒绝劳动者弹窗
         */
        closeRefuseDialog(){
            this.refuseServiceDialogVisible = false
            this.$emit('updateOrderConfig')
        },
        /**
         * 跳转至服务人员详情
         * @param paramObj 匹配服务人员信息对象
         */
        goStaffDetail(paramObj){
            this.$router.push({
                path: "/sale/saleNewWorkerShow",
                query: {
                    id: paramObj.id,
                    from: this.$route.query.order_type,
                    order_id: this.$route.query.order_id
                }
            })
        },
        /**
         * 删除备选服务人员
         */
        async deleteMatchStaff(item){
            //要删除的备选劳动者
            let deleteStaffObj = {
                order_id: this.$route.query.order_id,
                order_staff_id: item.id
            }

            await this.$confirm(`确定删除该备选服务人员吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () =>{
                await this.deleteOrderStaff(deleteStaffObj)
                this.$emit('updateOrderConfig')
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: `已取消删除`
                });
            });
        },
        /**
         * 删除备选劳动者接口
         * @param order_staff_id 候选人员信息id
         * @param order_id 订单id
         */
        async deleteOrderStaff(deleteStaffObj){
            try{
                this.is_loading = true
                await saleService.deleteOrderStaff(deleteStaffObj)
                    .then(async data =>{
                        if(data.code == "0"){
                            this.$message({
                                type:'success',
                                message: data.message
                            })
                            this.is_loading = false
                        }
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
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
    }
}
</script>

<style>

</style>