<template>
    <el-card class="box-card">
        <div slot="header" class="card-header">
            <h3>售后日志</h3>
            <div class="control">
                <el-button type="text" size="small" @click="showMaintainPage" v-if="isSigned ==3">添加日志</el-button>
                <el-button 
                    type="text" 
                    :icon="isShow? 'el-icon-arrow-up' : 'el-icon-arrow-down'" 
                    circle size="small" 
                    @click="changeFormState">{{isShow?`收起`:`展开`}}</el-button>
            </div>
        </div>
        <div class="service-box" v-if="isShow">
            <div v-if="maintainLogList.length">
                <el-table
                    :data="maintainLogList"
                    style="width: 100%">
                    <el-table-column
                        prop="created_at"
                        label="创建日期">
                    </el-table-column>
                    <el-table-column
                        prop="manager_name"
                        label="操作人">
                    </el-table-column>
                    <el-table-column
                        prop="message"
                        label="售后日志">
                    </el-table-column>
                    </el-table>
            </div>
            <div v-else>暂无内容</div>
        </div>
        
        <el-dialog title="售后日志" :visible.sync="maintainDialogVisible">
            <el-form :model="maintainForm">
                <el-form-item label="日志" :label-width="formLabelWidth">
                    <el-input v-model="maintainForm.message" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="maintainDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="maintainStaff">提交</el-button>
            </div>
        </el-dialog>
    </el-card>  
</template>
<script>
import {orderService} from '../../../../common'
export default {
    data(){
        return {
            //是否展示表单
            isShow:true,
            //售后对话框
            maintainDialogVisible: false,
            //售后表单
            maintainForm : {
                order_id: this.$route.query.order_id,// 订单id
                message: '',//售后日志
            },
            
            formLabelWidth: '120px'
        }
    },
    computed:{
        maintainLogList(){
            return store.state.orderModule.order_maintain_logs
        },
        /**
         * 该订单是否已经签约
         * des 根据vuex 中orderModule.order.type判断
         *  1 待匹配 2 已匹配 3 已签约 4 已取消 5 订单完成
         */
        isSigned(){
            return store.state.orderModule.order.type
        }
    },
    methods: {
        //改变表单的显示隐藏状态
        changeFormState(){
            this.isShow = !this.isShow
        },
        /**
         * 打开售后日志对话框
         */
        showMaintainPage(){
            this.maintainForm = {
                ...this.maintainForm,
                message: "",
            }
            this.maintainDialogVisible = true
        },
        /**
         * 售后日志
         */
        async maintainStaff(){  
            store.commit('setLoading',true)

            await orderService.writeMaintainLog(this.maintainForm) 
                .then(data =>{
                    if(data.code == "0"){
                        this.$message({
                            type:'success',
                            message: data.message
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

            this.maintainDialogVisible = false
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
                .service-name{
                    float:left;
                    width: 150px;
                }
                .service-message{
                    float:left;
                    width: 100%;
                }
                .control{
                    float:right;
                    width: 200px;
                    padding-left: 100px;
                    
                }
            }
        }

    }

</style>


