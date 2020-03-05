<template>
    <div>
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
        workerForm: {
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