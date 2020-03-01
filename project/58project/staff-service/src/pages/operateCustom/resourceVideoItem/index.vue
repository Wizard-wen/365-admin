<template>
    <el-form 
        class="videoForm"
        v-loading="is_loading"
        :model="editResourceVideoForm" 
        label-width="120px" 
        ref="editResourceVideoForm" 
        :rules="editResourceVideoRules">
        <el-form-item label="视频名称" prop="name">
            <el-input type="primary" v-model="editResourceVideoForm.name"></el-input>
        </el-form-item>

        <el-form-item label="主讲人" prop="teacher">
            <el-input type="primary" v-model="editResourceVideoForm.teacher"></el-input>
        </el-form-item>

        <el-form-item label="视频url" prop="video_url">
            <el-input type="textarea" v-model="editResourceVideoForm.video_url"></el-input>
        </el-form-item>

        <upload-single-ad-resource-component  v-model="editResourceVideoForm.picture_object" :label="'视频缩略图片'"></upload-single-ad-resource-component>

        <upload-single-ad-resource-component  v-model="editResourceVideoForm.video_detail_object" :label="'视频详情图片'"></upload-single-ad-resource-component>

        <el-form-item>
            <el-button type="primary" @click="onSubmit('editResourceVideoForm')">修改</el-button>
            <el-button @click="goback">返 回</el-button>
        </el-form-item>
    </el-form>
</template>

<script>

import {customService} from '@common/index.js'
import uploadSingleAdResourceComponent from '../adPictureItem/uploadSingleAdResourceComponent/index.vue'
export default {
    components: {
        uploadSingleAdResourceComponent,
    },
    data() {
        return {
            is_loading :false,
            videoIntroObject:{},
            videoDetailPictureObject: {},
            //分派订单字段
            editResourceVideoForm: {
                id: '',
                name: '',//图片名称
                teacher: '',//主讲人
                picture_object: {}, //视频缩略图
                video_url: '', //视频链接
                video_detail_object: {}, //资源列表
            },
            editResourceVideoRules: {
                name: [
                    {required: true, message: '请填写资源视频名称', trigger: 'blur'}
                ],
                teacher: [
                    {required: true, message: '请填写主讲人姓名', trigger: 'blur'}
                ],
                picture_url: [
                    {required: true, message: '请上传视频缩略图', trigger: 'change' }
                ],
                video_url: [
                    {required: true, message: '请填写视频链接名称', trigger: 'blur'}
                ],
            },
        }
    },
    methods: {
        /**
         * 返回
         */
        goback(){
            this.$router.push('/operate/videoList')
        },
        /**
         * 获取视频资源
         */
        async getVideo(){
            try{
                this.is_loading = true
                await customService.getVideo(this.$route.query.id).then(data =>{
                    this.editResourceVideoForm = data.data
                    this.is_loading = false
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                    this.is_loading = false
                }).finally(() =>{
                    this.is_loading = false
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_loading = false
            }
        },  
        /**
         * 提交数据
         */
        async onSubmit(formName){
            await this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    //校验并提交
                    try{
                        this.is_loading = true
                        await customService.editVideo(this.editResourceVideoForm).then(data =>{
                            if(data.code == '0'){
                                this.$message({
                                    type:"success",
                                    message: data.message
                                })
                                this.is_loading = false
                                this.goback()
                            }
                        }).catch(error =>{
                            this.$message({
                                type:'error',
                                message: error.message
                            })
                            this.is_loading = false
                        })
                    } catch(error){
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                        this.is_loading = false
                    }
                } else {
                    return false;
                }
            })

        }
    },
    async mounted(){
        await this.getVideo()
    }
}
</script>
<style lang="scss" scoped>
    .videoForm{
        margin: 24px;
        width: 760px;
    }
    //头像上传
    .icon-uploader{
        & /deep/ .el-upload {
            height: 178px;
            width: 350px;
            line-height: 178px;
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        & /deep/ .el-upload:hover {
            border-color: #409EFF;
        }
        .icon-box{
            width:350px;
            height: 178px;
            position: relative;
            .icon-item {
                width:350px;
                height: 178px;
                display: block;
            }
            .icon-item-back{
                position: absolute;
                height: 178px;
                width: 350px;
                top: 0;
                z-index: 4;
                background: rgba(0,0,0,.5)
            }
        }
    }
</style>


