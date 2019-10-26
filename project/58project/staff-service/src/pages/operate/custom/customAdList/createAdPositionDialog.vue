<template>
    <el-dialog
        title="创建广告位"
        :visible.sync="createAdPositionDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form  ref="createAdPositionForm" :model="createAdPositionForm" label-width="120px" :rules="createAdPositionRules">

            <el-form-item label="广告位名称" prop="name">
                <el-input type="text" v-model="createAdPositionForm.name" ></el-input>
            </el-form-item>
            
            <el-form-item label="广告位编号" prop="key">
                <el-input type="text" v-model="createAdPositionForm.key" ></el-input>
            </el-form-item>

            <el-form-item label="展现形式" prop="display">
                <select-tag-component
                    :propTagList="displayList"
                    v-model="createAdPositionForm.display"
                    :isSingle="true"></select-tag-component>
            </el-form-item>

            <el-form-item label="所属项目" prop="client">
                <select-tag-component
                    :propTagList="clientList"
                    v-model="createAdPositionForm.client"
                    :isSingle="true"></select-tag-component>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('createAdPositionForm')">立即创建</el-button>
                <el-button @click="closeDialog">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>

import {
    customService
} from '../../../../../common'

export default {
    props: {
        /**
         * 控制组件的显示隐藏
         */
        createAdPositionDialogVisible:{
            default:false,
            type: Boolean,
        },
    },
    data() {
        return {
            is_loading: false,
            //商品树表单
            createAdPositionForm: {
                display: 1,//展现形式
                key: '',//广告位编号
                name: '',//广告位名称
                client: 1,//所属项目
            },
            createAdPositionRules: {
                name: [
                    { required: true, message: '请输入广告位名称', trigger: 'blur' },
                ],
                key: [
                    { required: true, message: '请选择广告位编号', trigger: 'blur' },
                ],
                display: [
                    { required: true,  },
                ],
                client: [
                    { required: true,  },
                ],
            },
            displayList: [{id:1, name: '轮播图'}, {id: 2, name: '图片'}],
            clientList: [{id: 1, name: '客户端'},{id: 2, name: '服务端'}]
        }
    },
    methods: {
        /**
         * 提交表单
         * 区分新建和编辑
         */
        async onSubmit(formName) {
            await this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try{
                        this.is_loading = true
                        await customService.createAdPosition(this.createAdPositionForm).then(data =>{
                            if(data.code == '0'){
                                this.$message({
                                    type:"success",
                                    message: data.message
                                })
                                this.is_loading = false
                                this.$emit('closeCreateAdPositionDialog')
                            }
                        }).catch(error =>{
                            this.$message({
                                type:"success",
                                message: data.message
                            })
                            this.is_loading = false
                        }).finally(() =>{
                            this.is_loading = false
                        })
                    } catch(error) {
                        this.$message({
                            type:"success",
                            message: data.message
                        })
                        this.is_loading = false
                    }
                } else {
                    return false;
                }
            });
        },
        /**
         * 关闭弹窗
         */
        closeDialog(){
            this.$emit('closeCreateAdPositionDialog')
        }
    },
}
</script>
<style lang="scss" scoped>

</style>

