<template>
    <div style="display: inline-block">
        <el-button size="mini" type="primary" @click="makeImage" v-if="isShowImageButton">生成名片</el-button>
        <template>
            <make-image-component
                :makeImageDialogVisible="makeImageDialogVisible"
                v-if="makeImageDialogVisible"
                @closeMakeImageDialog="makeImageDialogVisible = false"
                :width="800"
                :height="565">
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
            this.makeImageDialogVisible = true
        },
    }
}
</script>

<style>

</style>