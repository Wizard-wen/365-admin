<template>

    <el-dialog
        title="创建新商品"
        :visible.sync="createProductDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form class="productTree-form" ref="form" :model="productTreeForm" label-width="120px" >

            <el-form-item label="商品名字" prop="title">
                <el-input v-model="productTreeForm.title" :maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="商品排序顺序" prop="sort_order">
                <el-input-number v-model="productTreeForm.sort_order"></el-input-number>
            </el-form-item>

            <el-form-item label="商品父级id">
                <el-select v-model="productTreeForm.parent_id" placeholder="商品父级id">
                    <el-option v-for="(item, index) in selectionList" :key="index" :label="item.titles" :value="item.id"></el-option>
                </el-select>
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
import {authService} from '../../../../../common'

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
                id: 0,//id
                title: '',//权限名字
                sort_order: 0,//权限排序顺序
                parent_id: 0,//权限父级id
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

        },
        /**
         * 关闭弹窗
         */
        closeDialog(){
            this.$emit('closeCreateProductDialog')
        }
    },
    async mounted(){
    }
}
</script>
<style lang="scss" scoped>

</style>

