<template>
    <el-card class="box-card">
        <div slot="header" class="card-header">
            <h3>备选日志</h3>
            <div class="control">
                <el-button type="text" size="small" @click="showRefusePage">添加日志</el-button>
                <el-button 
                    type="text" 
                    :icon="isShow? 'el-icon-arrow-up' : 'el-icon-arrow-down'" 
                    circle size="small" 
                    @click="changeFormState">{{isShow?`收起`:`展开`}}</el-button>
            </div>
        </div>
        <div class="service-box" v-if="isShow">
            <div v-if="matchList.length">
                <div class="service-line line-bottom-1px"
                    v-for="(item, index) in matchList"
                    :key="index">
                    <div class="service-name">{{item.staff_name}}</div>
                    <div class="service-message">{{item.message}}</div>
                </div>
            </div>
            <div v-else>暂无内容</div>
        </div>
        

        <el-dialog title="日志" :visible.sync="refuseDialogVisible">
            <el-form :model="refuseForm">
                <el-form-item label="日志" :label-width="formLabelWidth">
                    <el-input v-model="refuseForm.message" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="refuseDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="refuseStaff">提交</el-button>
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
            //拒绝对话框
            refuseDialogVisible: false,
            //拒绝表单
            refuseForm : {
                order_id: this.$route.query.id,// 订单id
                staff_id: 0,// 服务人员id
                staff_name: "",//服务人员姓名
                message: '',//拒签日志
            },
            
            formLabelWidth: '120px'
        }
    },
    computed:{
        matchList(){
            return store.state.orderModule.order_sign_logs
        }
    },
    methods: {
        //改变表单的显示隐藏状态
        changeFormState(){
            this.isShow = !this.isShow
        },
        /**
         * 打开拒绝对话框
         */
        showRefusePage(){
            this.refuseForm = {
                ...this.refuseForm,
                message: "",
            }
            this.refuseDialogVisible = true
        },
        /**
         * 提交拒绝日志
         */
        async refuseStaff(){  
            store.commit('setLoading',true)

            await orderService.refuse(this.refuseForm) 
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
            
            await orderService.getOrder(this.$route.query.id)
            
            store.commit('setLoading',false)
            this.refuseDialogVisible = false
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
                    width: 150px;
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


