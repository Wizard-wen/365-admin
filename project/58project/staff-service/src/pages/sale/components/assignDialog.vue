<template>

    <el-dialog 
    v-loading="loading"
        title="分配订单" 
        :visible.sync="openAssignDialog"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <div class="base-form-box" :style="{height: `${(sizeLong / 2)*40}px`}">
            <div 
                class="base-line"
                :style="{
                    width: item.size == 2? '100%' : '50%',
                    marginBottom: index == baseList.length - 1? '20px': '0'}"
                v-for="(item, index) in baseList"
                :key="index">
                <div class="base-word" v-if="item.key">
                    <div class="base-key">{{item.key+'：'}}</div>
                    <div class="base-value" v-if="item.value">{{item.value}}</div>
                    <div class="base-value" style="color: #F56C6C" v-else>暂无数据</div>
                </div>
                <div class="base-word" v-else>
                    <div class="base-key"></div>
                    <div class="base-value"></div>
                </div>
            </div>
        </div>
        <el-form ref="assignOrderForm" class="assign-form" :model="assignOrderForm" :rules="assignOrderRules" label-width="120px">
            <el-form-item label="选择销售人员" prop="manager_id">
                <el-select v-model="assignOrderForm.manager_id" placeholder="销售人员">
                    <el-option
                        v-for="(item, index) in selectionList"
                        :key="index"
                        :label="item.manager_name"
                        :value="item.manager_id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="assignOrder('assignOrderForm')">分 配</el-button>
        </div>
    </el-dialog>
        
</template>
<script>

import {orderService, $utils} from '../../../../common'
export default {
    props: {
        //是否打弹出框
        openAssignDialog: {
            type: Boolean,
            default: false,
        },
        //待分配订单id
        assignOrderId: {
            type: Number,
            default: 0
        }
    },
    data(){
        const managerNameValidator = function(rule, value, callback){
            if (value == 0) {
                callback(new Error('请选择销售人员'));
            } else {
                callback()
            }
        }
        return {
            orderKeyName: {
                manager_name: "创建人", //创建人
                user_name: '客户名',//客户名
                phone: '客户手机号',//客户手机号
                name: '服务名称',//服务名称
                service_address: '服务地址',//服务地址
                service_start_time: '服务开始时间',//服务开始时间
                service_end_time: '服务终止时间',//服务终止时间
                source: '订单来源',//订单来源
                remark: '备注信息',//备注信息
                create_manager_name: '创建人',
                hold_manager_name: "拥有人",
                // maintain_manager_name: "维护人",
                sign_manager_name: "签约人",
            },
            assignOrderForm: {
                order_id: this.assignOrderId,
                manager_name: '',
                manager_id: 0,
            },
            selectionList: [],
            assignOrderRules: {
                manager_id: [
                    { validator: managerNameValidator, trigger: 'change'}
                ]
            },
            sizeLong: 0, //表单渲染的行数
            baseList:[],
            loading: false
        }
    },
    computed: {
        /**
         * 订单来源 from vuex
         */
        order_source(){
            return this.$store.state.orderModule.order_source
        },
        /**
         * 订单表单字段
         */
        orderDetail(){
            return this.$store.state.orderModule.order
        },
    },
    methods: {
        /**
         * 关闭弹窗
         */
        closeDialog(){
            //关闭签约弹出框
            this.$emit('closeAssignDialog')
        },
        /**
         * 分配订单
         */
        async assignOrder(formName){
            let _this = this
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let selectedObject = _this.selectionList.find((item, index) =>{
                        return item.manager_id == _this.assignOrderForm.manager_id
                    })
                    this.assignOrderForm.manager_name = selectedObject.manager_name
                    this.assignOrderForm.version = this.$store.state.orderModule.order.version
                    try{
                        this.loading = true
                        await orderService.assignOrder(this.assignOrderForm).then((data) =>{
                            if(data.code == "0"){
                                this.$message({
                                    type:'success',
                                    message: data.message
                                })
                                //关闭签约弹出框
                                this.$emit('closeAssignDialog')
                            }
                        }).catch(error =>{
                            this.$message({
                                type:'error',
                                message: error.message
                            })
                        }).finally(() =>{
                            this.loading = false
                        })
                    } catch(error){
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    }
                } else {
                    return false;
                }
            });
        },
        setList(){
            let _this = this,
                formArray = [],//渲染的数组
                sizeLong1 = 0;//所占行数
            
            /**
             * key 为渲染字段的属性名
             * value 为某个属性名的值
             * size 该条信息所占位数
             */
            Object.keys(_this.orderDetail).forEach((item, index) =>{
                if(_this.orderKeyName.hasOwnProperty(item)){
                    
                    let itemObj = {
                            key: _this.orderKeyName[item], //属性名
                            value: _this.orderDetail[item],//属性值
                            size: 1,//该条信息所占位数  1 代表只占半行 2 代表占一行 
                        }, //原始对象
                        realValue = itemObj.value; //包装后的value值
                    
                    //转化订单来源字段格式
                    if(item == "source"){
                        
                        realValue = this.order_source.find((item, index) =>{
                            return realValue == item.value
                        }).label
                    } 

                    //转化时间格式
                    if(item == "service_start_time" || item == "service_end_time"){

                        realValue = $utils.formatDate(new Date(realValue * 1000), 'yyyy-MM-dd hh:mm:ss')

                    }
                    
                    //判断处理后的值的长度，决定占半行还是一行
                    if($utils.getByteLen(realValue) > 20){
                        itemObj.size = 2 //长字段，独占一行
                    } else {
                        itemObj.size = 1//短字段，占半行
                    }

                    itemObj.value =  realValue //将处理后的value重新赋值

                    formArray.push(itemObj)
                }
            })

            this.sizeLong = 0;


            let sizeNumber = 0;
            for(let i = 0; i<formArray.length; i++){
                sizeNumber += formArray[i].size
                if(i < formArray.length -1){
                    let j = i+1,
                        nextObject = formArray[j]
                    if(sizeNumber%2 == 1 && nextObject.size == 2){
                        this.sizeLong += 2
                        formArray[i].size = 2
                        sizeNumber += 1
                    }
                    this.sizeLong += formArray[i].size
                } else {
                    this.sizeLong += formArray[i].size
                }
            }


            
            //size总数若为奇数个，添加一个元素占行
            if(this.sizeLong%2 == 1){
                formArray.push({
                    key:  "",
                    value: "",
                    size:1,
                })
                this.sizeLong++;
            }
            
            return formArray
        }
    },
    async mounted(){
        try{
            this.loading = true
            
            await Promise.all([
                orderService.getManagerSelection(),
                orderService.getOrder(this.assignOrderId),
            ]).then((data) =>{
                if(data[0].code == "0"){
                    this.selectionList = data[0].data
                    this.selectionList.push({
                        manager_name: '全部',
                        manager_id: 0,                   
                    })
                }
                this.baseList = this.setList()
            }).catch(error =>{
                this.$message({
                    type:'error',
                    message: error.message
                })
            }).finally(() =>{
                this.loading = false
            })

        } catch(error){
            this.$message({
                type:'error',
                message: error.message
            })
        }

    }
}
</script>
<style lang="scss" scoped>

        .base-form-box{
            .base-line{
                float: left;
                display: flex;
                line-height: 40px;
                height:40px;
                .base-word{
                    display: flex;
                    .base-key{
                        width: 120px;
                        padding-right: 10px;
                        text-align: right;
                    }
                    .base-value{
                        flex: 1;
                    }
                }
            }
        }
        .assign-form{
            width:100%;
        }

</style>


