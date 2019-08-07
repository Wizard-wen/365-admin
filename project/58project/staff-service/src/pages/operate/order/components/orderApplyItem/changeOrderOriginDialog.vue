<template>
    <!-- 订单申请 -->
    <el-dialog
        title="更改订单申请来源"
        :visible.sync="orderOriginVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="orderOriginForm" label-width="120px" ref="orderOriginForm">
            <el-form-item label="来源门店">
                <el-input v-model="orderOriginForm.value"></el-input>
            </el-form-item>
            <el-form-item label="来源人">
                <el-input v-model="orderOriginForm.value"></el-input>
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
import {operateService} from '../../../../../../common'

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
                    store_id: '',
                }
            },
            type: Object,
        },
    },
    data() {
        return {
            //改变的字段内容
            orderOriginForm: {
                id: this.$route.query.id,
                ...this.changeOrderOriginField,
            },
        }
    },
    methods: {
        cancelOriginChange(){
            this.orderOriginForm.apply_manager_id = ''
            this.orderOriginForm.store_id = ''
            this.$emit('closeChangeOriginDialog')
        },
        async onSubmit(formName){
            //校验并提交
            await operateService.editAppLySource(this.orderOriginForm).then(data =>{
                        if(data.code == '0'){
                            this.$message({
                                type:"success",
                                message: "更改成功"
                            })
                            this.$emit('closeChangeOriginDialog')
                        }
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    })

        }
    },
    async mounted(){
        await Promise.all([
            operateService.getStoreSelection(),
            operateService.getStoreManagerSelection()
        ]).then((data) =>{
            console.log(data)
        })
    }
}
</script>


