<template>
    <el-card class="box-card">
        <div slot="header" class="card-header">
            <h3>备选服务人员</h3>
            <div class="control">
                <el-button 
                    type="text" 
                    :icon="isShow? 'el-icon-arrow-up' : 'el-icon-arrow-down'" 
                    circle size="small" 
                    @click="changeFormState">{{isShow?`收起`:`展开`}}</el-button>
            </div>
        </div>
        <div class="service-box" v-if="isShow">
            <div v-if="matchList.length">
                <el-row>
                    <el-col :span="6" v-for="(item, index) in matchList" :key="index" :offset="index%3 == 0 ? 0 : 2">
                        <el-card 
                            :style="{marginBottom: index < 3? '10px' : '0' }" 
                            :body-style="{padding: 0 }">
                            <div style="padding: 7px;">
                                <p>{{`姓名：${item.staff_name}`}}</p>
                                <p>{{`员工id：${item.staff_id}`}}</p>
                                <div class="bottom clearfix">
                                    <el-button type="text" size="mini" @click="showSignPage(item)">签约</el-button>
                                    <el-button type="text" size="mini" @click="showRefusePage(item)">拒绝</el-button>
                                    <el-button type="text" size="mini" @click="deleteOrderStaff(item.order_staff_id, item.order_id)">删除</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <div v-else>暂无内容</div>
        </div>
        <!-- 签约弹出框 -->
        <sign-dialog
            v-if="signDialogVisible"
            :openSignDialog="signDialogVisible"
            @closeSignDialog="signDialogVisible=false"
            :order_staff_id="sign_order_staff_id"
            :staffId="selectedStaffId"
            :staffName="selectedStaffName"></sign-dialog>
        <!-- 拒绝日志弹出框 -->
        <log-dialog
            v-if="refuseDialogVisible"
            :openLogDialog="refuseDialogVisible"
            @closeLogDialog="refuseDialogVisible=false"
            :logType="'refuse'"
            :order_staff_id="sign_order_staff_id"
            :staffId="selectedStaffId"
            :staffName="selectedStaffName"></log-dialog>

    </el-card>  
</template>
<script>

import {orderService} from '../../../../common'

import signDialog from './signDialog.vue'
import logDialog from './logDialog.vue'

export default {
    components: {
        signDialog,
        logDialog
    },
    data(){
        return {
            //是否展示表单
            isShow:true,
            
            //打开签约对话框
            signDialogVisible: false,

            //拒绝对话框
            refuseDialogVisible: false,

            //被选中服务人员id
            selectedStaffId: 0,

            //被选中服务人员姓名
            selectedStaffName: "",
            
            //候选人员信息id
            sign_order_staff_id: 0
        }
    },
    computed:{
        matchList(){
            return store.state.orderModule.order_staff
        },
    },
    methods: {
        /**
         * 删除备选服务人员
         * @param order_staff_id 候选人员信息id
         * @param order_id 订单id
         */
        async deleteOrderStaff(order_staff_id, order_id){
            
            this.$confirm('确定删除该备选服务人员吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                store.commit('setLoading',1)

                await orderService.deleteOrderStaff(order_staff_id, order_id) 
                    .then(data =>{
                        if(data.code == "0"){
                            this.$message({
                                type:'success',
                                message: `删除成功`
                            })
                        }
                    })
                    .catch(e =>{
                        this.$message({
                            type:'error',
                            message: e.message
                        })
                    })
                
                await orderService.getOrder(this.$route.query.order_id)

                store.commit('setLoading',false)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //改变表单的显示隐藏状态
        changeFormState(){
            this.isShow = !this.isShow
        },
        /**
         * 打开拒绝对话框
         */
        showRefusePage(item){
            
            this.sign_order_staff_id = item.order_staff_id
            this.selectedStaffId = item.staff_id
            this.selectedStaffName = item.staff_name
            //打开拒绝弹窗
            this.refuseDialogVisible = true
        }, 
        /**
         * 打开签约对话框
         */
        showSignPage(item){
            
            this.sign_order_staff_id = item.order_staff_id
            this.selectedStaffId = item.staff_id
            this.selectedStaffName = item.staff_name
            //打开签约弹窗
            this.signDialogVisible = true
        },
    }
}
</script>
<style lang="scss" scoped>
    .line-bottom-1px{
        &:after{
            position: absolute;
            content: '';
            display: block;
            height: 1px;
            width: 100%;
            background: #ccc; 
            bottom: 0;
        }
    }
    .box-card{
        margin: 10px 0;
        & /deep/ .el-card__header{
            padding: 0 30px;
        }
        & /deep/ .el-card__body{
            padding: 20px;
        }
        .card-header{
            height:50px;
            width:100%;
            padding-right: 30px;
            display: flex;
            justify-content: space-between;
            & h3{
                line-height: 50px;
            }
            .control{
                padding: 9px 0;
            }
        }
        .service-box{

            .service-line{
                position: relative;
                height: 40px;
                line-height: 40px;
                width: 80%;
                min-width: 500px;
                margin: 10px 0;
                text-indent: 10px;
                margin: 0;
                &:hover{
                    background: #f5f7fa;
                    cursor: pointer;
                }
                .service-id{
                    float:left;
                    width: 150px;
                }
                .service-name{
                    float:left;
                    width: 150px;
                }
                .control{
                    float:right;
                    width: 200px;
                    padding-left: 50px;
                    
                }
            }
        }

    }

</style>


