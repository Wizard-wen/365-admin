<template>
    <!-- 订单申请 -->
    <el-dialog
        title="添加店员"
        :visible.sync="addStoreStaffDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="addStoreStaffForm" label-width="120px" ref="addStoreStaffForm">
            <el-form-item label="选择新店员">
                <el-select v-model="addStoreStaffForm.staff_id" placeholder="请选择新店员">
                    <el-option
                        v-for="item in storeStaffList"
                        :key="item.store_id"
                        :label="item.store_name"
                        :value="item.store_id"
                        ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelAddStoreStaff">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>

/**
 * type 0 新建  1 编辑
 */
import {operateService} from '../../../../common'

export default {
    props:{
        /**
         * 控制组件的显示隐藏
         */
        addStoreStaffDialogVisible:{
            default:false,
            type: Boolean,
        },
        /**
         * 门店id
         */
        storeId: {
            type: Number,
            default: 0
        },
    },
    data() {
        return {
            //改变的字段内容
            addStoreStaffForm: {
                store_id: this.$route.query.id,
                staff_id: '',//员工id
            },
            storeStaffList: [],//全部待选店员信息
        }
    },
    methods: {
        cancelAddStoreStaff(){
            this.addStoreStaffForm.staff_id = ''
            this.addStoreStaffForm.store_id = ''
            this.$emit('closeAddStoreStaffDialog')
        },
        async onSubmit(formName){
            //校验并提交
            // await operateService.editAppLySource(this.addStoreStaffForm).then(data =>{
            //     if(data.code == '0'){
            //         this.$message({
            //             type:"success",
            //             message: "更改成功"
            //         })
            //         this.$emit('closeAddStoreStaffDialog')
            //     }
            // }).catch(error =>{
            //     this.$message({
            //         type:'error',
            //         message: error.message
            //     })
            // })

        }
    },
    async mounted(){
        await Promise.all([

        ]).then((data) =>{

        })
    }
}
</script>


