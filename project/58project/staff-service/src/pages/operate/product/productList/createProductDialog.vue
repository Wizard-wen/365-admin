<template>

    <el-dialog
        title="创建新商品"
        :visible.sync="createProductDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form class="productTree-form" ref="form" :model="productTreeForm" label-width="120px" >

            <el-form-item label="商品名字" prop="name">
                <el-input v-model="productTreeForm.name" :maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="商品父级id">
                <el-select v-model="productTreeForm.parent_id" placeholder="商品父级id">
                    <el-option v-for="item in selectionList" :key="item.id" :label="item.names" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否展示">
                <el-switch v-model="productTreeForm.type"></el-switch>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                <el-button @click="closeDialog">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>

/**
 * type 0 新建  1 编辑
 */
import {authService, operateService} from '../../../../../common'
import { operateModule } from '../../../../../common/store/operateModule';

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
            //商品树表单
            productTreeForm: {
                name: '',//商品名
                type: true,// enable 允许 disable 禁止
                parent_id: 0,//权限父级id
                version: 0,//新建version
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
            if(this.productTreeForm.type){
                this.productTreeForm.type = 'enable'
            } else {
                this.productTreeForm.type = 'disable'
            }
            await operateService.editService(this.productTreeForm).then(data =>{
                if(data.code == '0'){
                    this.$message({
                        type:"success",
                        message: data.message
                    })
                    this.$emit('closeCreateProductDialog')
                }
            })
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

