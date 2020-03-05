<template>
    <div>
        <el-upload
            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
            class="icon-uploader"
            :style="{height: `${height+2}px`, width: `${width+2}px`}"
            action="/admin/common/uploadImage"
            :show-file-list="false"
            :disabled="disabled"
            :auto-upload="false" 
            :on-change="openCropperDialog" 
            :headers="uploadHeader">
            <div
                v-if="initUrl!=''"
                class="icon-box"
                :style="{height: `${height}px`,width: `${width}px`}"
                @mouseover="showblack('0')"
                @mouseout="showblack('1')">
                <img 
                    class="icon-item" 
                    :style="{height: `${height}px`,width: `${width}px`}"
                    :src="initUrl == '' ? '' : initUrl" >
                <div 
                    v-if="isShowBlack"
                    class="icon-item-back" 
                    :style="{height: `${height}px`,width: `${width}px`,lineHeight:`${height}px`}">
                    <i class="el-icon-edit icon-uploader-icon" style="color: #fff;font-size: 20px;"></i>
                </div>

            </div>
            <div v-else :style="{height: `${height}px`, width: `${width}px`}">
                <i  class="el-icon-plus icon-uploader-icon" :style="{fontSize: `${iconFontSize}px`,lineHeight: `${height}px`,textAlign: 'center'}"></i>
            </div>
            
        </el-upload>
        <!-- 剪裁组件弹窗 -->
        <cropper-dialog 
            v-if="cropperDialogVisible"
            :cropperDialogVisible="cropperDialogVisible" 
            @closeCropperDialog="closeCropperDialog"
            :currentFileObject="currentFileObject"
            :fixedNumber="fixedNumber" 
            :uploadHeader="uploadHeader"
            :targetUrl="targetUrl"
            :height="height"
            :width="width"></cropper-dialog>
    </div>
    
</template>

<script>
import utils from './utils.js'
import cropperDialog from './cropperDialog.vue'
export default {
    components: {
        cropperDialog,
    },
    props: {
        // 上传地址
        targetUrl: {
            type: String,
            default: `./admin/common/uploadImage`
        },
        // 初始图片链接
        initUrl: {
            default: '',
            type: String,
        },
        /**
         * 图片高
         */
        height: {
            type: String | Number,
            default: 178
        },
        /**
         * 图片宽
         */
        width: {
            type: String | Number,
            default: 178,
        },
        /**
         * 客户自定义的header
         */
        uploadHeader: {
            type: Object,
            default: {
                accessToken: ''
            }
        }
    },
    computed: {
        /**
         * 上传图片加号字体大小
         */
        iconFontSize(){
            let maxLength = this.height >= this.width? this.height : this.width
            return maxLength/5 > 20 ? 20 : maxLength/5  
        },
        // 剪裁框比例设置
        fixedNumber(){ 
            const num = this.width/this.height
            return [Number(num.toFixed(1)), 1]
        },
    },
    data(){
        return {
            //图片遮罩显示隐藏
            isShowBlack: false,
            disabled:false,
            currentFileObject: null, // 当前被选择的图片文件
            cropperDialogVisible: false,//
        }
    },
    methods: {
        /**
         * 上传banner图，显示阴影
         */
        showblack(type){
            if(type == '0'){
                this.isShowBlack = true
            } else {
                this.isShowBlack = false
            }
        },
        /**
         * 打开裁剪弹窗
         */
        openCropperDialog (file, fileList) {
            // 点击弹出剪裁框
            this.cropperDialogVisible = true;
            this.currentFileObject = {
                ...file
            };
        },
        /**
         * 关闭截图弹窗
         */
        closeCropperDialog(res){
            this.cropperDialogVisible = false
            if(res){
                this.$emit('onSinglePictureSuccess', res);
            }
            
        },
    },
}
</script>

<style lang="scss" scoped>
    //图片上传
    .icon-uploader{
        & /deep/ .el-upload {
            border: 1px dashed #d9d9d9;
            // box-sizing: border-box;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        & /deep/ .el-upload:hover {
            border-color: #409EFF;
        }
    }
    //图片盒子样式
    .icon-box{
        position: relative;
        .icon-item {
            display: block;
        }
        .icon-item-back{
            position: absolute;
            top: 0;
            z-index: 4;
            background: rgba(0,0,0,.5)
        }
    }
</style>