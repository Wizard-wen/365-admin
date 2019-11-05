<template>
    <el-upload
        accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
        class="icon-uploader"
        action="/admin/common/uploadImage"
        :show-file-list="false"
        :disabled="disabled"
        :on-success="pictureUploadSuccess"
        :headers="uploadHeader">
        <div
            v-if="pictureUrl!=''"
            class="icon-box"
            :style="{height: height,width: width}"
            @mouseover="showblack('0')"
            @mouseout="showblack('1')">
            <img 
                class="icon-item" 
                :style="{height: height,width: width}"
                :src="pictureUrl == '' ? '' : `./resource/${pictureUrl}`" >
            <div 
                v-if="isShowBlack"
                class="icon-item-back" 
                @click="changePic"
                :style="{height: height,width: width,lineHeight:height}">
                <i class="el-icon-edit icon-uploader-icon" style="color: #fff;font-size: 20px;"></i>
            </div>

        </div>

        <i v-else class="el-icon-plus icon-uploader-icon"></i>
    </el-upload>
</template>

<script>
export default {
    props: {
        /**
         * 图片url
         */
        pictureUrl: {
            type: String,
            default: '',
        },
        height: {
            type: String,
            default: '178px'
        },
        width: {
            type: String,
            default: '178px',
        },
    },
    data(){
        return {
            //图片遮罩显示隐藏
            isShowBlack: false,
            //图片上传header
            uploadHeader:{
                accessToken: this.$store.state.loginModule.token.access_token
            },
            disabled:false
        }
    },
    methods: {
        //banner图上传成功
        pictureUploadSuccess(res, file) {
            this.$emit('singlePictureUploadSucess', res.data.path);
        },
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
        changePic(){
        }
    }
}
</script>

<style lang="scss" scoped>
    //图片上传
    .icon-uploader{
        & /deep/ .el-upload {
            border: 1px dashed #d9d9d9;
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