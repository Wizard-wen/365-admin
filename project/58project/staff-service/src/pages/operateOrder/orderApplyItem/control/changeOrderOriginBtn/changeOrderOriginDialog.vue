<template>
    <!-- 订单申请 -->
    <el-dialog
        v-loading="is_loading"
        title="更改订单申请来源"
        :visible.sync="orderOriginVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="orderOriginForm" label-width="120px" ref="orderOriginForm">
            <el-form-item label="来源门店">
                <el-select @change="changeStoreManager" v-model="orderOriginForm.apply_store_id" placeholder="请选择门店">
                    <el-option
                        v-for="item in storeList"
                        :key="item.store_id"
                        :label="item.store_name"
                        :value="item.store_id"
                        ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="来源人">
                <el-select v-model="orderOriginForm.apply_manager_id" placeholder="请选择">
                    <el-option
                        v-for="item in apply_manager_list"
                        :key="item.manager_id"
                        :label="item.real_name"
                        :value="item.manager_id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelOriginChange">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>

/**
 * type 0 新建  1 编辑
 */
import {operateService} from '@common/index.js'

export default {
    props:{
        /**
         * 控制组件的显示隐藏
         */
        orderOriginVisible:{
            default:false,
            type: Boolean,
        },
        /**
         * 订单申请id
         */
        orderApplyId: {
            type: Number,
            default: 0
        },
        /**
         * 更改的字段
         */
        changeOrderOriginField: {
            default: function(){
                return {
                    apply_manager_id: '',
                    apply_store_id: '',
                }
            },
            type: Object,
        },
    },
    data() {
        return {
            is_loading :false,
            //改变的字段内容
            orderOriginForm: {
                id: this.$route.query.id,
                ...this.changeOrderOriginField,
            },
            storeList: [],//全部门店信息列表
            apply_manager_list: [],//门店全部员工列表
        }
    },
    methods: {
        cancelOriginChange(){
            this.orderOriginForm.apply_manager_id = ''
            this.orderOriginForm.apply_store_id = ''
            this.$emit('closeChangeOriginDialog')
        },
        /**
         * 更换门店后重新请求员工数据
         * @param id 新更换的id
         */
        async changeStoreManager(id){
            await operateService.getStoreManagerSelection(id).then(data =>{
                this.apply_manager_list = data.data
                this.orderOriginForm.apply_manager_id = 0
            }).catch(error =>{
                this.$message({
                    type:'error',
                    message: error.message
                })
            })
        },
        async onSubmit(formName){
            //校验并提交
            try{
                this.is_loading = true
                await operateService.editAppLySource(this.orderOriginForm).then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type:"success",
                            message: data.message,
                        })
                        this.is_loading = false
                        this.$emit('closeChangeOriginDialog')
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
            

        }
    },
    async mounted(){
        /**
         * 页面初始化，请求门店，员工数据
         */
        try{
            this.is_loading = true
            await Promise.all([
                operateService.getStoreSelection(),
                operateService.getStoreManagerSelection(this.orderOriginForm.apply_store_id)
            ]).then((data) =>{
                this.storeList = data[0].data
                this.apply_manager_list = data[1].data
                this.is_loading = false
            }).catch(error => {
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
    }
}
</script>


