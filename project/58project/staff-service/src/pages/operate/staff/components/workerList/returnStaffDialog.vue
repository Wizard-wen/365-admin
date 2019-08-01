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
                <p style="color: red">{{`备注：共有${staffCount}数据，最多可以导入50条数据，按列表顺序导入`}}</p>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeReturnStaffDialog">取 消</el-button>
            <el-button type="primary" @click="commitRetrunStaff">确认导入回访</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {operateService} from '../../../../../../common'

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
                number: 50,
            },
            staffCount: 0,
        }
    },
    methods: {
        /**
         * 提交回访
         */
        async commitRetrunStaff(formName){ 
            let _this = this
            //设置回访count查询参数
            this.$store.commit('setQueryList', {
                queryKey: 'count', 
                queryedList: this.returnStaffForm.number
            })
            store.commit('setLoading',true)
    
            await operateService.addReturnStaff() 
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
            

            store.commit('setLoading',false)

            //关闭日志弹出框
            this.$emit('closeReturnStaffDialog')
            
        },  
        //关闭日志弹框
        closeReturnStaffDialog(){
            //关闭日志弹出框
            this.$emit('closeReturnStaffDialog')
        }
    },
    async mounted(){
        store.commit('setLoading',true)

        await operateService.getReturnStaff() 
            .then(data =>{
                if(data.code == "0"){
                    this.staffCount = data.data.count
                }
            })
            .catch(e =>{
                this.$message({
                    type:'error',
                    message: e.message
                })
            })
        

        store.commit('setLoading',false)
    }
}
</script>
<style lang="scss" scoped>


</style>


