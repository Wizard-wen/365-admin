<template>
    <div style="display: inline-block;margin-left:10px;s">
        <el-button size="mini" type="primary" @click="makeImage" v-if="isShowImageButton">生成名片</el-button>
        <template>
            <make-image-component
                :makeImageDialogVisible="makeImageDialogVisible"
                v-if="makeImageDialogVisible"
                @closeMakeImageDialog="makeImageDialogVisible = false"
                :width="600"
                :height="424">
                <template slot="pictureContains">
                    <worker-picture-component
                        :workerConfigForm="workerConfigForm"
                        :pictureForm="workerForm"></worker-picture-component>
                </template>
            </make-image-component>
        </template>
    </div>
    
</template>

<script>
import workerPictureComponent from './makeImageBtn/workerPictureComponent.vue'
export default {
    components: {
        workerPictureComponent,
    },
    data(){
        return {
            makeImageDialogVisible:false,

        }
    },
    props: {
        /**
         * 服务人员字段
         */
        workerForm: {
            type: Object,
            default(){return {}}
        },
        /**是否展示上传生成图片按钮 */
        isShowImageButton:{
            type: Boolean,
            default: true
        },
        /**
         * 服务人员信息配置项
         */
        workerConfigForm: {
            type: Object,
            default(){return {}}
        }
    },
    methods: {
        /**
         * 生成图片
         */
        makeImage(){
            let message = ''
            if( this.workerForm.icon == '' ||
                this.workerForm.sex == '' ||
                this.workerForm.age == '' ||
                this.workerForm.zodiac_sign == '' ||
                this.workerForm.body_height == '' ||
                this.workerForm.body_weight == '' ||
                this.workerForm.is_married == '' ||
                this.workerForm.education == '' ||
                this.workerForm.address == '' ||
                this.workerForm.working_experience == '' ||
                this.workerForm.paper == ''){
                this.$confirm(`该服务人员名片所需信息不全，是否确定要生成图片?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() =>{
                    this.makeImageDialogVisible = true
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: `已取消生成图片操作`
                    });
                });
            } else {
                this.makeImageDialogVisible = true
            }  
        },
    }
}
</script>

<style>

</style>