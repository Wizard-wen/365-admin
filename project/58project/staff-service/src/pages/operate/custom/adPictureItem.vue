<template>
    <el-form :model="adPictureForm" label-width="120px" :rules="adPictureRules" ref="adPictureForm">

        <el-form-item label="图片名称" prop="name">
            <el-input type="primary" v-model="adPictureForm.name"></el-input>
        </el-form-item>
        
        <el-form-item label="图片类别" prop="type">
            <select-tag-component
                :propTagList="resourceTypeList"
                v-model="adPictureForm.type"
                :isSingle="true"></select-tag-component>
        </el-form-item>

        <el-form-item label="图片地址" prop="url">
            <img :src="adPictureForm.url" alt="" @click="openResourceDialog" v-if="adPictureForm.url">
            <i class="el-icon-plus" v-else @click="openResourceDialog"></i>

            <el-input type="primary" v-model="adPictureForm.url" disabled></el-input>
        </el-form-item>

        <el-form-item label="跳转类别" prop="jump_type">
            <select-tag-component
                :propTagList="jump_typeList"
                v-model="adPictureForm.jump_type"
                :isSingle="true"></select-tag-component>
        </el-form-item>

        <el-form-item>
            <el-button @click="goback">返回</el-button>
            <el-button type="primary" @click="commitAdPicture('adPictureForm')">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>

/**
 * type 0 新建  1 编辑
 */
import {operateService} from '../../../../common'
import {selectTagComponent} from '@/pages/components/index.js'
export default {
    components: {
        selectTagComponent,
    },
    data() {
        return {
            is_loading: false,
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
                type: 1,//图片类型
                url: '',//广告图片url
                jump_type: 1,//跳转页面类别
                activity_url: '',//活动页长图url
                client_category_id: 0,//详情页id
            },
            //图片上传header
            uploadHeader:{
                accessToken: this.$store.state.loginModule.token.access_token
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
        openResourceDialog(){

        },
        /**
         * 关闭弹出框---单向数据
         */
        goback(){

        }
    },
    async mounted(){

    }
}
</script>


