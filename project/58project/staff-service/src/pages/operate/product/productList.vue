<template>
    <div class="product">
        <div class="product-tree-box">
            <div class="title">商品索引</div>
            <el-tree
                :default-expanded-keys="defaultExpandKeys"
                :highlight-current="true"
                :data="productTreeList"
                :node-key="'id'"
                accordion
                @node-click="nodeClick"
                :props="defaultProps"></el-tree>
        </div>
        <div class="product-form-box">
            <div class="control">
                <el-button type="primary" @click="saveProduct">保存</el-button>
                <el-button type="primary" @click="createProduct">创建商品</el-button>
            </div>
            <el-form class="productForm" ref="productForm" :model="productForm" label-width="120px">
                <el-form-item label="商品标题">
                    <el-input v-model="productForm.name"></el-input>
                </el-form-item>
                <el-form-item label="商品副标题">
                    <el-input v-model="productForm.subTitle"></el-input>
                </el-form-item>
                <el-form-item label="商品详情" prop="files" ref="files">
                    <el-upload
                        accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                        action="/admin/common/uploadImage"
                        :on-success="uploadSuccess"
                        :on-remove="removePic"
                        :file-list="productForm.files"
                        list-type="picture-card"
                        :headers="uploadHeader">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
        </div>
        <create-product-dialog
            v-if="createProductDialogVisible"
            :createProductDialogVisible="createProductDialogVisible"
            @closeCreateProductDialog="closeCreateProductDialog"></create-product-dialog>
    </div>
</template>
<script>
import {productListData,createProductDialog} from './productList/index.js'
import { operateService } from '../../../../common';
import { operateModule } from '../../../../common/store/operateModule';

export default {
    data(){
        return {
            //树形商品列表
            productTreeList: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            /**
             * 商品表单
             */
            productForm: {
                name: '',//商品标题
                subTitle: '',//商品副标题
                files: [],//商品详情
            },
            //控制创建商品弹窗显示隐藏
            createProductDialogVisible:false,
            //图片上传header
            uploadHeader:{
                accessToken: this.$store.state.loginModule.token.access_token
            },
            defaultExpandKeys: [2],
        }
    },
    components:{
        createProductDialog,
    },
    methods: {
        /**
         * 保存商品
         */
        saveProduct(){

        },
        /**
         * 创建商品
         */
        createProduct(){
            this.createProductDialogVisible = true
        },
        /**
         * 点击节点
         */
        async nodeClick(clickObject,currentObject){
            if(clickObject.hasOwnProperty('children')){

            } else {
                await operateService.getService(clickObject.id).then(data =>{
                    this.productForm = data.data
                    this.productForm.files.forEach((item, index) =>{
                            item.url = './resource/'+item.url
                    })
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                })
            }
        },
        /**
         * 上传成功后，接收图片数据，送入图片回显数组
         */
        uploadSuccess(response, file, fileList) {
            let picItem = {
                path: response.data.path,
                url: './resource/'+response.data.path,
                name: response.data.name
            }
            this.productForm.files.push(picItem)
            //消除表单验证
            if(this.productForm.files.length){
                this.$refs.files.clearValidate()
            }
        },
        /**
         * 移出图片
         */
        removePic(file, fileList){
            this.productForm.files.forEach((item, index) =>{
                if(item.name == file.name){
                    this.productForm.files.splice(index,1)
                }
            })
        },
        /**
         * 关闭创建商品弹窗
         */
        async closeCreateProductDialog(){
            this.createProductDialogVisible = false
            await this.getServiceTree()
        },
        /**
         * 获取服务商品树
         */
        async getServiceTree(){
            await operateService.getServiceTree().then(data =>{
                console.log(data)
                this.productTreeList = data.data
            }).catch(error =>{
                this.$message({
                    type:'error',
                    message: error.message
                })
            })
        }
    },
    async mounted(){
        // await operateService.getServiceTree().then(data =>{
        //     console.log(data)
        //     this.productTreeList = data.data
        // }).catch(error =>{
        //     this.$message({
        //         type:'error',
        //         message: error.message
        //     })
        // })
        await this.getServiceTree()
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


