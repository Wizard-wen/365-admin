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
                                <p>{{`id：${item.staff_id}`}}</p>
                                <div class="bottom clearfix">
                                    <el-button type="text" size="mini" @click="showSignPage(item)">签约</el-button>
                                    <el-button type="text" size="mini" @click="showRefusePage(item)">拒绝</el-button>
                                    <el-button type="text" size="mini" @click="deleteOrderStaff(item.id)">删除</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <div v-else>暂无内容</div>
        </div>



        <el-dialog title="签约" :visible.sync="signDialogVisible">
            <el-form :model="signForm">
                <el-form-item label="服务周期单位" :label-width="formLabelWidth">
                    <el-select v-model="signForm.unit" placeholder="请选择活动区域">
                        <el-option label="全部" :value="0"></el-option>
                        <el-option label="按月" value="month"></el-option>
                        <el-option label="按日" value="day"></el-option>
                        <el-option label="按时" value="hour"></el-option>
                        <el-option label="按次" value="time"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="服务次数" :label-width="formLabelWidth">
                     <el-input-number v-model="signForm.service_count"></el-input-number>
                </el-form-item>

                <el-form-item label="服务期间" :label-width="formLabelWidth">
                     <el-date-picker
                        v-model="service_period"
                        type="datetimerange"
                        @change="changeServicePeriod"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
               
                <el-form-item label="单价" :label-width="formLabelWidth">
                    <el-input v-model="signForm.unit_price" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="总价" :label-width="formLabelWidth">
                    <el-input v-model="signForm.total_price" autocomplete="off" disabled=""></el-input>
                </el-form-item>

                <el-form-item label="是否代发工资" :label-width="formLabelWidth">
                   <el-select v-model="signForm.pay_wage" placeholder="请选择活动区域">
                        <el-option label="是" :value="2"></el-option>
                        <el-option label="否" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <div v-if="signForm.pay_wage == 2">
                    <el-form-item label="代发工资周期" :label-width="formLabelWidth">
                        <el-input v-model="signForm.wage_count" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="代发金额" :label-width="formLabelWidth">
                        <el-input v-model="signForm.wage_price" autocomplete="off"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="signDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="signOrder">签 约</el-button>
            </div>
        </el-dialog>

        <el-dialog title="拒签" :visible.sync="refuseDialogVisible">
            <el-form :model="refuseForm">
                <el-form-item label="服务人员姓名" :label-width="formLabelWidth">
                    <el-input v-model="refuseForm.staff_name" disabled></el-input>
                </el-form-item>
                <el-form-item label="拒签事由" :label-width="formLabelWidth">
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
            //签约对话框
            signDialogVisible: false,
            //拒绝对话框
            refuseDialogVisible: false,
            //签约表单
            signForm: {
                id: this.$route.query.id,// 订单id
                staff_id:'',// 服务人员id
                unit: 0,// 服务周期单位
                service_count: 0,// 服务次数
                unit_price: 0,// 单价
                total_price: 0,// 总价
                pay_wage: 1,// 是否代发工资
                wage_count: 0,// 代发工资次数
                wage_price: 0,// 代发工资金额
                version: store.state.orderModule.order.version,
            },
            //拒绝表单
            refuseForm : {
                order_id: this.$route.query.id,// 订单id
                staff_id:'',// 服务人员id
                staff_name: "",//服务人员姓名
                message: '',//拒签日志
            },
            service_period:[],//服务起止时间段
            formLabelWidth: '120px'
        }
    },
    computed:{
        matchList(){
            return store.state.orderModule.order_staff
        },
        total_price(){
            return Number(this.signForm.service_count) * Number(this.signForm.unit_price)
        }
    },
    watch: {
        total_price:function(val){
            this.signForm.total_price = val
        }
    },
    methods: {
        /**
         * 删除备选服务人员
         */
        async deleteOrderStaff(id){
            store.commit('setLoading',1)

            await orderService.deleteOrderStaff(id) 
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
            
            await orderService.getOrder(this.$route.query.id)

            // await store.dispatch('setData', {id: this.$route.query.id})
            store.commit('setLoading',false)
        },
        //改变表单的显示隐藏状态
        changeFormState(){
            this.isShow = !this.isShow
        },
        changeServicePeriod(){

        },
        /**
         * 打开拒绝对话框
         */
        showRefusePage(item){
            this.refuseForm = {
                order_id: this.$route.query.id,// 订单id
                staff_id:item.staff_id,// 服务人员id
                staff_name: item.staff_name,//服务人员姓名
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
            
            //关闭拒绝弹窗
            this.refuseDialogVisible = false
        },  
        /**
         * 打开签约对话框
         */
        showSignPage(item){
            this.signForm = {
                id: this.$route.query.id,// 订单id
                staff_id:item.staff_id,// 服务人员id
                unit: 0,// 服务周期单位
                service_count: 0,// 服务次数
                unit_price: 0,// 单价
                total_price: 0,// 总价
                pay_wage: 1,// 是否代发工资
                wage_count: 0,// 代发工资次数
                wage_price: 0,// 代发工资金额
                version: store.state.orderModule.order.version,
            }
            //打开签约弹窗
            this.signDialogVisible = true
        },
        /**
         * 提交签约表单
         */
        async signOrder(){

            store.commit('setLoading',true)

            await orderService.sign(this.signForm) 
                .then(data =>{
                    if(data.code == "0"){
                        this.$message({
                            type:'success',
                            message: `签约成功`
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

            //关闭签约弹出框
            this.signDialogVisible = false
        }
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


