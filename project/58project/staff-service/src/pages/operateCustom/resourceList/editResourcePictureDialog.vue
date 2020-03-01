<template>
    <!-- 订单申请 -->
    <el-dialog
        v-loading="is_loading"
        :title="isEdit?'编辑图片': '创建图片'"
        :visible.sync="editResourcePictureVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="editResourcePictureForm" label-width="120px" ref="editResourcePictureForm" :rules="editResourcePictureRules">
            <el-form-item label="资源图片名" prop="name">
                <el-input type="primary" v-model="editResourcePictureForm.name"></el-input>
            </el-form-item>
            <el-form-item label="图片类型" prop="type">
                <select-tag-component
                    :propTagList="resourceTypeList"
                    v-model="editResourcePictureForm.type"
                    :isSingle="true"></select-tag-component>
            </el-form-item>
            <el-form-item label="图片" prop="url" class="form-item-size">
                <single-picture-upload
                    :uploadHeader="uploadHeader"
                    :height="150"
                    :width="237"
                    :initUrl="editResourcePictureForm.url?`./resource/${editResourcePictureForm.url}`: ''"
                    @onSinglePictureSuccess="onSinglePictureSuccess"></single-picture-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelEditResourcePicture">取 消</el-button>
            <el-button type="primary" @click="onSubmit('editResourcePictureForm')">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>

import {customService} from '@common/index.js'

export default {
    props:{
        /**
         * 控制组件的显示隐藏
         */
        editResourcePictureVisible:{
            default:false,
            type: Boolean,
        },
        /**
         * 是否编辑
         */
        isEdit: {
            default: false,
            type: Boolean,
        },
        /**
         * 编辑的图片资源
         */
        resourcePictureItem:{
            default: function(){return {}},
            type: Object
        }
    },
    data() {
        return {
            is_loading :false,
            //资源图片类型
            resourceTypeList: [
                {id: 1, name: '长图'},
                {id: 2, name: '全屏'},
                {id: 3, name: '半屏'},
            ],
            //分派订单字段
            editResourcePictureForm: {
                id: '',
                name: '',//图片名称
                type: 1,//图片类型
                icon: '',//新添加的图片
                url: '',//图片路径
            },
            editResourcePictureRules: {
                name: [
                    {required: true, message: '请填写资源图片名称', trigger: 'blur'}
                ],
                url: [
                    {required: true, message: '请添加图片', trigger: 'change' }
                ],
                type: [
                    {required: true, message: '请选择图片种类', trigger: 'change' }
                ]
            },
            isShowBlack: false,//头像阴影
            //图片上传header
            uploadHeader:{
                accessToken: this.$store.state.loginModule.token.access_token
            }
        }
    },
    methods: {
        cancelEditResourcePicture(){
            this.$emit('closeEditResourcePictureDialog')
        },
        //头像上传成功
        onSinglePictureSuccess(res, file) {
            this.editResourcePictureForm.icon = res.path;
            this.editResourcePictureForm.url = res.path;
        },
        async onSubmit(formName){
            await this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    //校验并提交
                    try{
                        this.is_loading = true

                        //传递的图片url
                        let sendPictureObject = {}
                        sendPictureObject = {
                            ...this.editResourcePictureForm,
                            url: this.editResourcePictureForm.icon
                        }

                        await customService.editAdResource(sendPictureObject).then(data =>{
                            if(data.code == '0'){
                                this.$message({
                                    type:"success",
                                    message: "更改成功"
                                })
                                this.is_loading = false
                                this.$emit('closeEditResourcePictureDialog')
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
        if(this.isEdit){
            this.editResourcePictureForm= this.resourcePictureItem
        }
    }
}
</script>
<style lang="scss" scoped>

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


