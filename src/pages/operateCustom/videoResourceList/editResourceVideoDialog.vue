<template>
    <!-- 订单申请 -->
    <el-dialog
        v-loading="is_loading"
        :title="'创建视频素材'"
        :visible.sync="editResourceVideoVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="editResourceVideoForm" label-width="120px" style="max-width: 750px;" ref="editResourceVideoForm" :rules="editResourceVideoRules">
            <el-form-item label="视频名称" prop="name">
                <el-tooltip slot="label" class="item" effect="dark" content="视频名称将展示在客户端，请尽量保持精简。推荐格式为：分类+主题，如，母婴护理课-婴幼儿疾病护理" placement="top-start">
                    <span>视频名称<i class="el-icon-info"></i></span>
                </el-tooltip>
                <el-input type="primary" v-model="editResourceVideoForm.name" placeholder="请填写视频名称，推荐格式为：分类+主题，如，母婴护理课-婴幼儿疾病护理"></el-input>
            </el-form-item>

            <el-form-item label="主讲人" prop="teacher">
                <el-tooltip slot="label" class="item" effect="dark" content="主讲人将展示在客户端，推荐填写 真实姓名 或 x老师" placement="top-start">
                    <span>主讲人<i class="el-icon-info"></i></span>
                </el-tooltip>
                <el-input type="primary" v-model="editResourceVideoForm.teacher" placeholder="请填写主讲人，推荐填写真实姓名或x老师"></el-input>
            </el-form-item>

            <el-form-item prop="video_url" style="margin-bottom: 0;">
                <el-tooltip slot="label" class="item" effect="dark" content="请将视频素材上传至腾讯视频，然后复制视频url" placement="top-start">
                    <span>视频url<i class="el-icon-info"></i></span>
                </el-tooltip>
                <el-input type="textarea" v-model="editResourceVideoForm.video_url" placeholder="请将腾讯视频页面url复制下来即可。"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 0;">
                <p style="color:#67C23A;">视频链接格式类似，https://v.qq.com/x/page/e30157yc9nn.html</p>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelEditResourceVideo">取 消</el-button>
            <el-button type="primary" @click="onSubmit('editResourceVideoForm')">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>

import {operateCustomService} from '@/service/operateCustom'
export default {
    props:{
        /**
         * 控制组件的显示隐藏
         */
        editResourceVideoVisible:{
            default:false,
            type: Boolean,
        },
        /**
         * 编辑的视频资源
         */
        resourceVideoItem:{
            default: function(){return {}},
            type: Object
        }
    },
    data() {
        return {
            is_loading :false,
            //分派订单字段
            editResourceVideoForm: {
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
                video_url: [
                    {required: true, message: '请填写视频链接名称', trigger: 'blur'}
                ],
            },
        }
    },
    methods: {
        cancelEditResourceVideo(){
            this.$emit('closeEditResourcePictureDialog')
        },
        async onSubmit(formName){
            await this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    //校验并提交
                    try{
                        this.is_loading = true
                        await operateCustomService.editVideo(this.editResourceVideoForm).then(data =>{
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
}
</script>
<style lang="scss" scoped>


</style>


