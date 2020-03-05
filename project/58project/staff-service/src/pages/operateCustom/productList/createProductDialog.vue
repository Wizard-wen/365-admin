<template>

    <el-dialog
        title="创建新商品"
        :visible.sync="createProductDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form class="productTree-form" ref="productTreeForm" :model="productTreeForm" label-width="120px" :rules="productTreeRules">

            <el-form-item label="商品名字" prop="name">
                <el-input v-model="productTreeForm.name" :maxlength="6" placeholder="请输入商品名称，至多输入六个字"></el-input>
            </el-form-item>

            <el-form-item label="商品父级id" prop="parent_id">
                <el-select v-model="productTreeForm.parent_id" placeholder="商品父级id">
                    <el-option v-for="item in selectionList" :key="item.id" :label="item.names" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否展示" prop="status">
                <el-switch v-model="productTreeForm.status"></el-switch>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('productTreeForm')">立即创建</el-button>
                <el-button @click="closeDialog">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>


import {authService, operateService} from '@common/index.js'

export default {
    props: {
        /**
         * 控制组件的显示隐藏
         */
        createProductDialogVisible:{
            default:false,
            type: Boolean,
        },
    },
    data() {
        return {
            is_loading: false,
            //商品树表单
            productTreeForm: {
                name: '',//商品名
                status: true,// 1 允许 2 禁止
                parent_id: 0,//权限父级id
                version: 0,//新建version
            },
            productTreeRules: {
                name: [
                    { required: true, message: '请输入分类或商品名', trigger: 'blur' },
                ],
                parent_id: [
                    { required: true, message: '请选择父级id', trigger: 'change' },
                ],
                status: [
                    { required: true, message: '请选择状态', trigger: 'change' },
                ],
            },
            //商品父级id下拉列表
            selectionList: []
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
                    if(this.productTreeForm.status){
                        this.productTreeForm.status = '1'
                    } else {
                        this.productTreeForm.status = '2'
                    }
                    try{
                        this.is_loading = true
                        await operateService.editService(this.productTreeForm).then(data =>{
                            if(data.code == '0'){
                                this.$message({
                                    type:"success",
                                    message: data.message
                                })
                                this.is_loading = false
                                this.$emit('closeCreateProductDialog')
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
            this.$emit('closeCreateProductDialog')
        }
    },
    async mounted(){
        await operateService.getServiceSelection().then(data =>{
            console.log(data)
            this.selectionList = data.data
        }).catch(error =>{

        })
    }
}
</script>
<style lang="scss" scoped>

</style>

