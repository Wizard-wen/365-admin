<template>
    <div class="product">
        <div class="product-tree-box">
            <div class="title">商品索引</div>
            <el-tree :data="treelist" accordion @node-click="nodeClick" :props="defaultProps"></el-tree>
        </div>
        <div class="product-form-box">
            <div class="control">
                <el-button type="primary">编辑</el-button>
                <el-button type="primary" @click="createProduct">创建商品</el-button>
            </div>
            <el-form class="productForm" ref="productForm" :model="productForm" label-width="120px">
                <el-form-item label="商品标题">
                    <el-input v-model="productForm.title"></el-input>
                </el-form-item>
                <el-form-item label="商品副标题">
                    <el-input v-model="productForm.subTitle"></el-input>
                </el-form-item>
                <el-form-item label="商品详情图片">
                    <el-input v-model="productForm.details"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <create-product-dialog
            v-if="createProductDialogVisible"
            :createProductDialogVisible="createProductDialogVisible"
            @closeCreateProductDialog="createProductDialogVisible = false"></create-product-dialog>
    </div>
</template>
<script>
import {productListData,createProductDialog} from './productList/index.js'

export default {
    data(){
        return {
            //树形商品列表
            treelist: productListData,
            defaultProps: {
                children: 'children',
                label: 'title'
            },
            /**
             * 商品表单
             */
            productForm: {
                title: '',//商品标题
                subTitle: '',//商品副标题
                details: '',//商品详情
            },
            //控制创建商品弹窗显示隐藏
            createProductDialogVisible:false,
        }
    },
    components:{
        createProductDialog,
    },
    methods: {
        /**
         * 创建商品
         */
        createProduct(){
            this.createProductDialogVisible = true
        },
        /**
         * 点击节点
         */
        nodeClick(clickObject,currentObject){
            if(clickObject.hasOwnProperty('children')){

            } else {
                alert(1)
            }
        }
    },
    async mounted(){
    }
}
</script>
<style lang="scss" scoped>
    .product{
        // padding-top: 30px;
        margin: 0 auto;
        display: flex;
        .product-form-box{
            width: calc(100% - 200px);
            .control{
                display: flex;
                justify-content: flex-end;
                margin: 15px 0;
            }
            .productForm{
                width: 80%;
            }
        }
        .product-tree-box{
            position: relative;
            width: 200px;
            height: calc(100vh - 50px);
            border-right:1px solid #ccc;
            .title{
                line-height: 40px;
                height: 40px;
                width: 100%;
                text-align:center;
                font-size: 16px;
            }
        }
    }
</style>


