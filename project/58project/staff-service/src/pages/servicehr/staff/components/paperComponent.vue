<template>
    <div class="paper-box">
        <el-button style="margin-bottom:15px;" icon="el-icon-plus"  @click="openPaperDialog('new', {})">添加证书</el-button>
        <el-row>
            <el-col :span="24" v-for="(item, index) in paperList" :key="index">
                <el-card :body-style="{ padding: '0px' }">
                    <div class="paper-imgs">
                        <img 
                            class="paper-item-img" 
                            v-for="(it, inds) in item.images" 
                            :key="inds" 
                            :src="it.url"
                            @click="showDetialPic(it.url)">
                    </div>
                    <div class="image-messsage">
                        <p>{{item.paper_category_name}}</p>
                        <div>
                            <el-button @click="deleteFormPaper(item)" class="el-icon-delete" type="text" size="small">删除</el-button>
                            <el-button @click="openPaperDialog('edit', item)" class="el-icon-edit" type="text" size="small">编辑</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <paper-dialog 
            :isEditPaper="paperDialog.isEditPaper"
            :paperDialogVisible="paperDialog.paperDialogVisible"
            v-if="paperDialog.paperDialogVisible"
            :paperProps="paperDialog.paperAddModel"
            :selectedPapers="paperList"
            @changePaper="changePaper"
            @closePaper="cancelPaperFn"></paper-dialog>
        <picture-detail-dialog
            :imageUrl="imageUrl"
            :title="'证书详情'"
            v-if="openPictureDetailDialog"
            :openPictureDetailDialog="openPictureDetailDialog"
            @closePictureDetailDialog="openPictureDetailDialog=false"></picture-detail-dialog>
    </div>
</template>
<script>

import {paperDialog} from './dialogs'
import {pictureDetailDialog} from '@/pages/components'


export default {
    props: {
        /**
         * v-model字段---证书数组
         */
        value: {
            type: Array,
            default: function(){return []}
        }
    },
    watch:{
        //v-model字段
        value: function(val){
            this.paperList = val
        }
    },
    components: {
        paperDialog,
        pictureDetailDialog
    },
    data(){
        return {
            paperList: [],//证书显示列表
            //证书弹出框
            paperDialog: {
                isEditPaper: false,//是编辑证书还是新建证书
                paperDialogVisible: false,//控制证书编辑的显示隐藏
                //给证书弹出框传入的字段
                paperAddModel:{
                    id:0,//
                    paper_category_name: null,//证书的名字
                    paper_category_id: null,//证书的id
                    images: [],//这个证书绑定的图片
                }
            },
            openPictureDetailDialog: false, //控制证书详情的显示隐藏
            imageUrl: '',//展示证书详情的url
        }
    },
    methods: {

        /**
         * 新建 或 编辑 证书信息----打开弹窗
         */
        openPaperDialog(state, paperItem){
            if(state == 'edit'){
                //现在在编辑证书
                this.paperDialog.isEditPaper = true
                //给要编辑的证书赋值
                this.paperDialog.paperAddModel = {
                    id: paperItem.id,
                    paper_category_name: paperItem.paper_category_name,
                    paper_category_id: paperItem.paper_category_id,
                    images: [...paperItem.images],
                }
            } else {
                //现在在新建证书
                this.paperDialog.isEditPaper = false
                //新建一个证书，所有值给空
                this.paperDialog.paperAddModel = {
                    id: null,
                    paper_category_name: '', //证书类型名
                    paper_category_id:  null, //证书类型id
                    images: [], //证书图片
                }
            }
            //打开弹出框
            this.paperDialog.paperDialogVisible = true
        },
        /**
         * 删除一条证书数据
         * @param deleteParam 证书信息
         */
        deleteFormPaper(deleteParam){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.paperList.forEach((item, index) =>{
                    //判断证书分类字段
                    if(item.paper_category_id == deleteParam.paper_category_id){
                        //删除证书
                        this.paperList.splice(index, 1)
                    }
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });

        },
        /**
         * 证书编辑弹窗回调事件
         * @param addParam 被添加/编辑的证书信息
         * @param isEdit 刚刚执行的是编辑还是新建操作 true 编辑 false 新建
         */
        changePaper(addParam, isEdit){
            //若是编辑，替换证书
            if(isEdit){
                this.paperList.forEach((item, index) =>{
                    //判断证书分类字段
                    if(addParam.paper_category_id == item.paper_category_id){
                        //替换原有证书
                        this.paperList.splice(index, 1, addParam)
                    }
                })
            } else {
                //新建证书，直接插入
                this.paperList.push(addParam)
            }

            //v-model
            this.$emit('input',this.paperList)
            
            //关闭弹窗
            this.paperDialog.paperDialogVisible = false
        },
        /**
         * 关闭证书编辑弹窗
         */
        cancelPaperFn(){
            this.paperDialog.paperDialogVisible = false
        },
        /**
         * 查看大图
         * @param pathParam 展示图片的url
         */
        showDetialPic(pathParam){
            this.imageUrl = pathParam
            this.openPictureDetailDialog = true
        }
    },
    mounted(){
        console.log(this.$children)
    }
}
</script>
<style lang="scss" scoped>
    .paper-box{
        width: 100%;
        min-width: 600px;
    }
    .paper-imgs{
        height: 110px!important;
        padding: 5px 0;
        .paper-item-img{
            display: inline-block;
            height:100px;
            width: 100px;
            margin : 0 10px;
            cursor: pointer;
        }
    }
    .image-messsage{
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
    }
</style>


