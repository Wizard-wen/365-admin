<template>
    <el-form :model="adPictureForm" class="form-style" label-width="120px" :rules="adPictureRules" ref="adPictureForm">

        

        <el-form-item label="广告图片展示" prop="url">
            <div 
                class="icon-box" 
                v-if="adPictureForm.url" 
                @mouseover="showblack('0')"
                @mouseout="showblack('1')"
                @click="openResourceListDialog('1')">
                <img class="icon-item" :src="'./resource/'+adPictureForm.url" alt=""  >
                <div class="icon-item-back" v-if="isShowBlack">
                    <i class="el-icon-edit icon-uploader-edit-icon" style="color: #fff;font-size: 20px;"></i>
                </div>
            </div>
            
            <i class="el-icon-plus adPicture-plus" v-else @click="openResourceListDialog('0')"></i>
            <div class="picture-message">
                <select-tag-component
                    :propTagList="resourceTypeList"
                    v-model="adPictureForm.type"
                    :isSingle="true"
                    :isEdit="false"></select-tag-component>
                <el-tag v-if="adPictureForm.name" style="margin-left: 20px;">{{adPictureForm.name}}</el-tag>
            </div>
        </el-form-item>

        <el-form-item label="广告图片地址" prop="url">
            <el-input type="primary" v-model="adPictureForm.url" disabled></el-input>
        </el-form-item>

        <el-form-item label="跳转类别" prop="jump_type">
            <select-tag-component
                :propTagList="jump_typeList"
                v-model="adPictureForm.jump_type"
                :isSingle="true"></select-tag-component>
        </el-form-item>

        <el-form-item label="服务详情" prop="client_category_id" v-if="adPictureForm.jump_type == 2">
            <el-cascader
                :props="prop"
                v-model="clientCategoryIds"
                :options="serviceList"
                @change="clientCategoryChange"></el-cascader>
        </el-form-item>

        <upload-single-picture v-else v-model="activityPictureObject" :label="'跳转页详情图片'"></upload-single-picture>
        
        <el-form-item>
            <el-button type="primary" @click="commitAdPicture('adPictureForm')">提交</el-button>
            <el-button @click="goback">返回</el-button>
        </el-form-item>
        <resource-list-dialog
            :selectedAdPicture="adPictureForm"
            :isEdit="isEdit"
            :resourceListDialogVisible="resourceListDialogVisible"
            v-if="resourceListDialogVisible"
            @closeResourceListDialog="closeResourceListDialog"></resource-list-dialog>
    </el-form>
</template>

<script>

/**
 * type 0 新建  1 编辑
 */
import {operateService} from '../../../../common'
import {selectTagComponent} from '@/pages/components/index.js'
import {resourceListDialog} from './adPictureItem/index.js'

import {uploadSinglePicture} from './adPictureItem/index.js'


export default {
    components: {
        selectTagComponent,
        resourceListDialog,
        uploadSinglePicture,
    },
    data() {
        return {
            is_loading: false,
            //资源图片弹窗
            resourceListDialogVisible: false,
            //资源图片类型
            resourceTypeList: [
                {id: 1, name: '长图'},
                {id: 2, name: '全屏'},
                {id: 3, name: '半屏'},
            ],
            jump_typeList: [{id: 1, name: '活动页'}, {id: 2, name: '详情页'}],
            //表单校验
            adPictureRules: {

            },
            //广告位图片表单
            adPictureForm: {
                id: 0,
                name: '',
                type: 0,//图片类型
                url: '',//广告图片url
                jump_type: 1,//跳转页面类别
                activity_url: '',//活动页长图url
                client_category_id: 0,//详情页id
            },
            
            
            activityPictureObject: {},




            isShowBlack: false,//头像阴影
            isShowActivityBlack: false,//


            //图片上传header
            uploadHeader:{
                accessToken: this.$store.state.loginModule.token.access_token
            },
            isEdit: false,
            serviceList: [],
            //级联选择器选中的
            clientCategoryIds: [],         
            prop: {
                label: 'name',
                value: 'id'
            }            
        }
    },
    methods: {
        /**
         * 上传成功后，接收图片数据，送入图片回显数组
         */
        uploadSuccess(response, file, fileList) {
            this.adPictureForm.url = './resource/'+response.data.path
        },
        /**
         * 移出图片
         */
        removePic(file, fileList){
            this.adPictureForm.url = ''
        },
        /**
         * 提交修改
         */
        commitAdPicture(formName){

            let _this = this;

            this.$refs[formName].validate((valid) => {
                if (valid) {

                } else {
                    return false;
                }
            });
        },
        /**
         * 打开资源
         */
        openResourceListDialog(type){
            if(type == '1'){
                this.isEdit = true
            }
            this.resourceListDialogVisible = true
        },
        /**
         * 关闭弹出框---单向数据
         */
        goback(){
            this.$route.go(-1)
        },
        closeResourceListDialog(pictureObj){
            if(pictureObj){

                this.adPictureForm.url = pictureObj.url
                this.adPictureForm.id = pictureObj.id
                this.adPictureForm.type = pictureObj.type
                this.adPictureForm.name = pictureObj.name
            }
            this.resourceListDialogVisible = false
        },
        /**
         * 上传头像，显示阴影
         */
        showblack(type){
            if(type == '0'){
                this.isShowBlack = true
            } else {
                this.isShowBlack = false
            }
        },
        
        /**
         * 上传头像，显示阴影
         */
        showActivityblack(type){
            if(type == '0'){
                this.isShowActivityBlack = true
            } else {
                this.isShowActivityBlack = false
            }
        },
        clientCategoryChange(item){
            this.adPictureForm.client_category_id = item[1]
        },
    },
    async mounted(){
        //获取服务商品下拉菜单
        try{
            await operateService.getServiceTree().then(data =>{
                this.serviceList = data.data
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
    .form-style{
        margin: 24px;
        width: 760px;
    }
    .adPictureBox{
        height: 300px;
        width: 500px;
        .adPicture{
            height: 300px;
            display: block;
            width: 500px;
        }
    }
    .adPicture-plus{
        line-height: 300px;
        text-align: center;
        border: 1px dashed #ccc;
        border-radius: 6px;
        height: 300px;
        width: 500px;
    }
    .adPicture-plus:hover{
        border-color: blue;
        cursor: pointer;
    }
    .icon-box{
        width:500px;
        height: 300px;
        position: relative;
        .icon-item {
            width:500px;
            height: 300px;
            display: block;
        }
        .icon-item-back{
            position: absolute;
            width:500px;
            height: 300px;
            top: 0;
            z-index: 4;
            background: rgba(0,0,0,.5);
            text-align: center;
            line-height: 300px;
            cursor: pointer;
        }
    }
    .picture-message{
        display: flex;
        margin-top: 10px;
    }
</style>


