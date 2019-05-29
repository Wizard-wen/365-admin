<template>
    <div class="picture-box">
        <div v-for="(item,index) in id_photo_fileList" :key="index" class="image-box" @mouseover="showIdPhotoblack(item, index, '0')" @mouseout="showIdPhotoblack(item, index, '1')">
            <img :src="item.url" class="image-item">
            <div class="image-item-back" v-if="item.isBack" @click="deleteIdPhoto">
                <i class="el-icon-delete image-uploader-icon" s></i>
            </div>
        </div>
        <el-upload
            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
            class="image-uploader"
            action="/admin/common/uploadImage"
            :show-file-list="false"
            :on-success="idPhotoUploadSuccess"
            :before-upload="beforeAvatarUpload"
            :headers="uploadHeader">
            <i  class="el-icon-plus image-uploader-icon"></i>
        </el-upload>
    </div>
</template>
<script>
export default {
    data(){
        return {
            //图片上传header
            uploadHeader:{
                accessToken: this.$store.state.loginModule.token.access_token
            },
            id_photo_fileList: []
        }
    },
    props: {
        /**
         * v-model数据
         */
        value: {
            type: Array,
            default: function(){return []}
        },
        /**
         * 图片标题
         */
        title: {
            type: String,
            default: ''
        }
    },
    watch: {
        value: function(val,oldVal){
            this.id_photo_fileList = val
        }
    },
    methods: {
        //证件照片上传成功
        idPhotoUploadSuccess(res, file) {
            this.id_photo_fileList.push(res.data);

            this.id_photo_fileList =  this.id_photo_fileList.map((item, index) =>{
                return {
                    ...item,
                    url: `./resource/${item.path}`,
                    isBack: false,
                }
            })
            this.$emit('input',this.id_photo_fileList)
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
        async deleteIdPhoto(index){
            let response = await this.$confirm(`确定删除该${this.title}吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: `已取消删除`
                });
            });
            if(response == "confirm"){
                this.id_photo_fileList.splice(index,1)
                this.$emit('input',this.id_photo_fileList)
            }
        },
        //展示证件照删除阴影
        showIdPhotoblack(item,index, state){
            if(state == '0'){
                this.id_photo_fileList[index].isBack = true
            } else {
                this.id_photo_fileList[index].isBack = false
            }
        },
    }
}
</script>
<style lang="scss" scoped>
//图片组件
.picture-box{
    height: 120px;
    border: 1px dashed #ccc;
    display: flex;
    flex-wrap: wrap;
    .image-box{
        margin: 10px;
        width:100px;
        height: 100px;
        position: relative;
        .image-item {
            width:100px;
            height: 100px;
            display: block;
        }
        .image-item-back{
            position: absolute;
            height: 100px;
            width: 100px;
            line-height: 100px;
            text-align: center;
            top: 0;
            z-index: 4;
            cursor: pointer;
            background: rgba(0,0,0,.5);
            .image-uploader-icon{
                color: #fff;
                font-size: 20px;
            }
        }
    }
    //图片上传
    .image-uploader{
        height: 100px!important;
    }
    .image-uploader /deep/ .el-upload {
        display: block;
        height: 100px;
        width: 100px;
        margin: 10px;
        
        cursor: pointer;
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
    }
    .image-uploader /deep/ .el-upload:hover {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        border-color: #409EFF;
    }
    .image-uploader-icon {
        font-size: 16px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
}
</style>

