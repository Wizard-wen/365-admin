<template>
    <el-dialog 
        :title="makeImageDialogTitle" 
        :visible.sync="openMakeImageDialog"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">

        <div slot="footer" class="dialog-footer">
            <el-button @click="closeMakeImageDialog">取 消</el-button>
            <el-button type="primary" >下载</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {hrService} from '../../../../../../common'

export default {
    props: {
        //是否打弹出框
        openMakeImageDialog: {
            type: Boolean,
            default: false,
        },
        //弹窗title
        makeImageDialogTitle: {
            type: String,
            default: "下载图片"
        },
    },
    watch: {

    },
    data(){
        return {

        }
    },
    methods: {
        //关闭弹框
        closeMakeImageDialog(){
            this.$emit('closeMakeImageDialog')
        }
    }
}
</script>
<style lang="scss" scoped>


</style>


