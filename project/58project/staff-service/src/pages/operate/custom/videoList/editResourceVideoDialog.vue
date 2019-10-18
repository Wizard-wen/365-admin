<template>
    <!-- 订单申请 -->
    <el-dialog
        v-loading="is_loading"
        :title="'创建视频'"
        :visible.sync="editResourceVideoVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="editResourceVideoForm" label-width="120px" ref="editResourceVideoForm" :rules="editResourceVideoRules">
            <el-form-item label="视频名称" prop="name">
                <el-input type="primary" v-model="editResourceVideoForm.name"></el-input>
            </el-form-item>

            <el-form-item label="主讲人" prop="teacher">
                <el-input type="primary" v-model="editResourceVideoForm.teacher"></el-input>
            </el-form-item>

            <el-form-item label="视频url" prop="video_url">
                <el-input type="textarea" v-model="editResourceVideoForm.video_url"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelEditResourceVideo">取 消</el-button>
            <el-button type="primary" @click="onSubmit('editResourceVideoForm')">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>

import {customService} from '../../../../../common'
import {selectTagComponent} from '@/pages/components/index.js'

export default {
    components: {
        selectTagComponent,
    },
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
                video_url: '', //视频链接
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
                        await customService.editVideo(this.editResourceVideoForm).then(data =>{
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


