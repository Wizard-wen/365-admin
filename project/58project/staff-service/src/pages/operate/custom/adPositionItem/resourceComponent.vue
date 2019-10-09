<template>
    <div class="ad-box">
        <el-button 
            v-if="!isShow" 
            style="margin-bottom:15px;" 
            icon="el-icon-plus"  
            @click="openAdResourceDialog('new', {})">添加图片</el-button>
        
        <div class="ad-imgs-box" v-for="(item, index) in adPositionList" :key="index">
            <div class="ad-imgs">
                <img 
                    class="ad-item-img" 
                    :src="'./resource/'+item.url"
                    @click="showDetialPic(it.url)">
            </div>
            <div class="image-messsage">
                <p>{{item.name}}</p>
                <div v-if="!isShow">
                    <el-button @click="deleteFormPaper(item)" class="el-icon-delete" type="text" size="small">删除</el-button>
                    <el-button @click="openAdResourceDialog('edit', item)" class="el-icon-edit" type="text" size="small">编辑</el-button>
                </div>
            </div>
        </div>


        <ad-resource-dialog 
            :isEditAdItem="adResourceDialogForm.isEditAdItem"
            :adItemDialogVisible="adResourceDialogForm.adItemDialogVisible"
            v-if="adResourceDialogForm.adItemDialogVisible"
            :paperProps="adResourceDialogForm.adItemForm"
            :selectedPapers="adPositionList"
            @changePaper="changePaper"
            @closePaper="cancelPaperFn"></ad-resource-dialog>
        <picture-detail-dialog
            :imageUrl="imageUrl"
            :title="'证书详情'"
            v-if="pictureDetailDialogVisible"
            :pictureDetailDialogVisible="pictureDetailDialogVisible"
            @closePictureDetailDialog="pictureDetailDialogVisible=false"></picture-detail-dialog>
    </div>
</template>
<script>

import {adResourceDialog} from './resourceComponent/index.js'
import {pictureDetailDialog} from '@/pages/components'


export default {
    props: {
        /**
         * v-model字段---证书数组
         */
        value: {
            type: Array,
            default: function(){return []}
        },
        /**
         * 是展示还是编辑操作
         */
        isShow: {
            type: Boolean,
            default: false,
        }
    },
    watch:{
        //v-model字段
        value: {
            handler(newVal, oldVal){
                if(newVal!= oldVal){
                    this.adPositionList = newVal
                }
            },
            immediate: true,
            deep: true,
        }
    },
    components: {
        adResourceDialog,
        pictureDetailDialog
    },
    data(){
        return {
            adPositionList: [],//证书显示列表

            //证书弹出框
            adResourceDialogForm: {
                isEditAdItem: false,//是编辑广告位还是新建广告位
                adItemDialogVisible: false,//控制广告位编辑的显示隐藏
                //给广告位单个图片弹出框传入的字段
                adItemForm:{
                    id:0,//
                    name: null,//图片的名字
                    type:1,//图片类型
                    url: '',//图片url
                    jump_type: 1,//跳转至什么页面
                    activity_url: '',//活动页长图url
                    client_category_id: 0,//详情页id
                }
            },
            pictureDetailDialogVisible: false, //控制图片详情的显示隐藏
            imageUrl: '',//展示证书详情的url
        }
    },
    methods: {

        /**
         * 新建 或 编辑 证书信息----打开弹窗
         */
        openAdResourceDialog(state, paperItem){
            if(state == 'edit'){
                //现在在编辑证书
                this.adResourceDialogForm.isEditAdItem = true
                //给要编辑的证书赋值
                this.adResourceDialogForm.adItemForm = {
                    id: paperItem.id,
                    name: paperItem.name,
                    resource: [...paperItem.resource],
                }
            } else {
                //现在在新建证书
                this.adResourceDialogForm.isEditAdItem = false
                //新建一个证书，所有值给空
                this.adResourceDialogForm.adItemForm = {
                    id: null,
                    name: '', //证书类型名
                    resource: [], //证书图片
                }
            }
            //打开弹出框
            this.adResourceDialogForm.adItemDialogVisible = true
        },
        /**
         * 删除一条图片数据
         * @param param 图片信息
         */
        deleteFormPaper(param){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.adPositionList.forEach((item, index) =>{
                    //判断证书分类字段
                    if(item.id == param.id){
                        //删除证书
                        this.adPositionList.splice(index, 1)
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
                this.adPositionList.forEach((item, index) =>{
                    //判断证书分类字段
                    if(addParam.id == item.id){
                        //替换原有证书
                        this.adPositionList.splice(index, 1, addParam)
                    }
                })
            } else {
                //新建证书，直接插入
                this.adPositionList.push(addParam)
            }

            //v-model
            this.$emit('input',this.adPositionList)
            
            //关闭弹窗
            this.adResourceDialogForm.adItemDialogVisible = false
        },
        /**
         * 关闭证书编辑弹窗
         */
        cancelPaperFn(){
            this.adResourceDialogForm.adItemDialogVisible = false
        },
        /**
         * 查看大图
         * @param pathParam 展示图片的url
         */
        showDetialPic(pathParam){
            this.imageUrl = pathParam
            this.pictureDetailDialogVisible = true
        },
    },
    mounted(){

    }
}
</script>
<style lang="scss" scoped>
    .ad-box{
        width: 760px;
    }
    .ad-imgs-box{
        margin-bottom: 15px;
        border: 1px solid #ebeef5;
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        &:last-child{
            margin-bottom: 0;
        }
        .ad-imgs{
            display: flex;
            flex-wrap: wrap;
            .ad-item-img{
                display: block;
                height:150px;
                // width: 100px;
                margin-left : 10px;
                margin-top: 10px;
                cursor: pointer;
            }
        }
        .image-messsage{
            line-height: 30px;
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
        }
    }


</style>


