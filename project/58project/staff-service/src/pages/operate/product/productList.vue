<template>
    <div class="product" v-loading="is_tree_loading">
        <div class="product-tree-box">
            <div class="title">服务索引</div>
            <el-tree
                ref="tree"
                :default-expanded-keys="defaultExpandKeys"
                highlight-current
                :data="productTreeList"
                :node-key="'id'"
                accordion
                @node-click="nodeClick"
                :props="defaultProps"></el-tree>
        </div>
        <div class="product-form-box" v-loading="is_contains_loading">
            <div class="control">
                <el-button type="primary" @click="createProduct">创建商品</el-button>
            </div>
            <el-form class="productForm" ref="productForm" :model="productForm" label-width="120px">
                <el-form-item label="服务标题">
                    <el-input v-model="productForm.name"></el-input>
                </el-form-item>
                <el-form-item label="商品父级id">
                    <el-select v-model="productForm.parent_id" placeholder="商品父级id" :disabled="!hasParentNode">
                        <el-option v-for="item in selectionList" :key="item.id" :label="item.names" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="是否展示">
                    <select-tag-component
                        :propTagList="typeList"
                        v-model="productForm.type"
                        :isSingle="true"></select-tag-component>
                </el-form-item>
                <el-form-item label="商品详情" prop="files" ref="files" v-if="hasParentNode">
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
                <el-form-item >
                    <el-button type="primary" @click="saveProduct">修改</el-button>
                    <el-button type="danger" @click="stopProduct">停用</el-button>
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

import {selectTagComponent} from '@/pages/components/index.js'

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
                id: 0,
                version: 0,
                name: '',//商品标题
                parent_id: '',//商品父级id
                type: '',//是否展示
                files: [],//商品详情
            },
            //当前点击节点是否是分类节点
            hasParentNode: false,
            typeList: [{id: 1, name: '展示'}, {id: 2, name: '不展示'}],
            selectionList: [],
            //控制创建商品弹窗显示隐藏
            createProductDialogVisible:false,
            //图片上传header
            uploadHeader:{
                accessToken: this.$store.state.loginModule.token.access_token
            },
            defaultExpandKeys: [],
            is_tree_loading: false,//商品树形结构loading
            is_contains_loading: false, //商品详情loading
        }
    },
    components:{
        createProductDialog,
        selectTagComponent,
    },
    methods: {
        /**
         * 保存商品
         */
        async saveProduct(){
            try{
                this.is_contains_loading = true
                await operateService.editService(this.productForm).then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type:'success',
                            message: data.message
                        })
                        this.is_contains_loading = false
                        
                    }
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                    this.is_contains_loading = false
                }).finally(() =>{
                    this.is_contains_loading = false
                })
                await //获取商品树形结构
        await this.getServiceTree()
                await this.setCurrentKey(this.productTreeList[0].children[0].id)
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_contains_loading = false
            }
        },
        /**
         * 停用商品
         */
        stopProduct(){

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
            this.hasParentNode = clickObject.parent_id == 0 ? false : true;
            try{
                this.is_contains_loading = true
                await operateService.getService(clickObject.id).then(data =>{
                    this.productForm = data.data
                    this.productForm.type = this.productForm.type == 'enable' ? 1 : 2
                    this.productForm.files.forEach((item, index) =>{
                            item.url = './resource/'+item.url
                    })
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                    this.is_contains_loading = false
                }).finally(() =>{
                    this.is_contains_loading = false
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_contains_loading = false
            }
        },
        /**
         * 设置高亮节点
         */
        setCurrentKey(key){
            const store = this.$refs.tree.store;
            const node = store.getNode(key);
            store.setCurrentNode(node);
            this.$refs.tree.currentNode = node;
            store.setCurrentNodeKey(key);
            store.currentNodeKey = key;
            // this.$refs.tree.$emit("node-click", node.data, node, this.$refs.tree);
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
            try{
                this.is_tree_loading = true
                await operateService.getServiceTree().then(data =>{

                    this.productTreeList = data.data
                    
                    this.defaultExpandKeys = [this.productTreeList[0].id]
                    
                    this.is_tree_loading = false
                
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                    this.is_tree_loading = false
                }).finally(() =>{
                    this.is_tree_loading = false
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_tree_loading = false
            }
            await this.nodeClick(this.productTreeList[0].children[0])
        }
    },
    async mounted(){
        //获取商品树形结构
        await this.getServiceTree()

        await this.setCurrentKey(this.productTreeList[0].children[0].id)

        //获取服务商品下拉菜单
        try{
            await operateService.getServiceSelection().then(data =>{
                this.selectionList = data.data
            }).catch(error =>{
                this.$message({
                    type:'error',
                    message: error.message
                })
            })
        } catch(error){
            this.$message({
                type:'error',
                message: error.message
            })
        }

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


