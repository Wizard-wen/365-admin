<template>
    <el-dialog 
        :title="returnStaffDialogTitle" 
        :visible.sync="openReturnStaffDialog"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="returnStaffForm" :label-width="'120px'" ref="returnStaffForm" >
            <el-form-item label="回访数量">
                <el-input-number v-model="returnStaffForm.number" :max="50"></el-input-number>
                <p style="color: red">备注：最多导出50条数据，按列表顺序导出</p>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeReturnStaffDialog">取 消</el-button>
            <el-button type="primary" @click="commitLog('returnStaffForm')">确认导出回访</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {hrService} from '../../../../../../common'

export default {
    props: {
        //是否打弹出框
        openReturnStaffDialog: {
            type: Boolean,
            default: false,
        },
        //弹窗title
        returnStaffDialogTitle: {
            type: String,
            default: "添加回访数据"
        },
    },
    data(){
        return {
            returnStaffForm : {
                number: 0,
            },
        }
    },
    methods: {
        /**
         * 提交回访
         */
        async commitLog(formName){ 
                    
            // store.commit('setLoading',true)
    
            // await hrService.logCommit(this.returnStaffForm,) 
            //     .then(data =>{
            //         if(data.code == "0"){
            //             this.$message({
            //                 type:'success',
            //                 message: data.message
            //             })
            //         }
            //     })
            //     .catch(e =>{
            //         this.$message({
            //             type:'error',
            //             message: e.message
            //         })
            //     })
            

            // store.commit('setLoading',false)

            //关闭日志弹出框
            this.$emit('closeReturnStaffDialog')
            
        },  
        //关闭日志弹框
        closeReturnStaffDialog(){
            //关闭日志弹出框
            this.$emit('closeReturnStaffDialog')
        }
    }
}
</script>
<style lang="scss" scoped>


</style>


