<template>
    <div :class="['picture-box', isEdit? 'dashed-style' : '']">
        <div 
            class="image-box"
            v-for="(item,index) in photo_fileList" 
            :key="index"  
            @mouseover="showPhotoblack(item, index, '0')" 
            @mouseout="showPhotoblack(item, index, '1')">
            <img :src="item.url" class="image-item">
            <div class="image-item-back" v-if="item.isBack && isEdit">
                <i class="el-icon-delete image-edit-deal-icon" @click="deletePhoto(index)"></i>
                <i class="el-icon-zoom-in image-edit-deal-icon" @click="openPictureDetailDialog(item)"></i>
            </div>
            <div class="image-item-back" v-if="item.isBack && !isEdit">
                <i class="el-icon-zoom-in image-deal-icon" @click="openPictureDetailDialog(item)"></i>
            </div>
        </div>
        <el-upload
            v-if="isEdit"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
            class="image-uploader"
            action="/admin/common/uploadImage"
            :show-file-list="false"
            :on-success="photoUploadSuccess"
            :before-upload="beforeAvatarUpload"
            :headers="uploadHeader">
            <i  class="el-icon-plus image-uploader-icon"></i>
        </el-upload>
        <picture-detail-dialog
            :pictureDetailDialogVisible="pictureDetailDialogVisible"
            v-if="pictureDetailDialogVisible"
            :imageUrl="pictureDetailUrl"
            @closePictureDetailDialog="pictureDetailDialogVisible = false"></picture-detail-dialog>
    </div>
</template>
<script>
import {
    pictureDetailDialog,
} from '@/pages/components/index.js'
export default {
    components: {
        pictureDetailDialog,
    },
    data(){
        return {
            //控制图片详情弹窗显示隐藏
            pictureDetailDialogVisible: false,
            //图片详情url
            pictureDetailUrl: '',
            //图片上传header
            uploadHeader:{
                accessToken: this.$store.state.loginModule.token.access_token
            },
            photo_fileList: []
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
        },
        /**
         * 是否是编辑
         */
        isEdit: {
            type: Boolean,
            default: true,
        }
    },
    watch: {
        // value: function(newVal,oldVal){
        //     // debugger
        //     console.log(1)
        //     console.log(newVal, oldVal)
        //     this.photo_fileList = newVal
        // },
        value: {
            handler(newVal, oldVal){
                // console.log(11)
                if(newVal!= oldVal){
                    this.photo_fileList = newVal
                }
            },
            immediate: true,
            deep: true,
        }
    },
    methods: {
        /**
         * 照片上传成功钩子函数
         */
        photoUploadSuccess(res, file) {
            //将回传的图片url存入数组中
            this.photo_fileList.push(res.data);
            //包装图片数组，url 展示图片url  isBack 是否显示遮罩
            this.photo_fileList =  this.photo_fileList.map((item, index) =>{
                return {
                    ...item,
                    url: `./resource/${item.path}`,
                    isBack: false,
                }
            })
            //触发上层v-model
            this.$emit('input',this.photo_fileList)
        },
        /**
         * 
         */
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
        /**
         * 删除图片
         */
        async deletePhoto(index){
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
                this.photo_fileList.splice(index,1)
                this.$emit('input',this.photo_fileList)
            }
        },
        //展示证件照删除阴影
        showPhotoblack(item,index, state){
            
            if(state == '0'){
                console.log(1)
                this.photo_fileList[index].isBack = true
            } else {
                this.photo_fileList[index].isBack = false
            }
        },
        /**
         * 打开图片详情弹窗
         */
        openPictureDetailDialog(item){
            this.pictureDetailUrl = `./resource/${item.path}`
            this.pictureDetailDialogVisible = true;
        }
    }
}
</script>
<style lang="scss" scoped>
//图片组件
.picture-box{
    display: flex;
    flex-wrap: wrap;
    .image-box{
        margin: 10px;
        height: 150px;
        position: relative;
        .image-item {
            height: 150px;
            display: block;
        }
        .image-item-back{
            position: absolute;
            height: 150px;
            width: 100%;
            
            top: 0;
            z-index: 4;
            cursor: pointer;
            background: rgba(0,0,0,.5);
            display: flex;
            .image-edit-deal-icon{
                width: 50%;
                line-height: 150px;
                text-align: center;
                color: #fff;
                font-size: 20px;
            }
            .image-deal-icon{
                width: 100%;
                line-height: 150px;
                text-align: center;
                color: #fff;
                font-size: 20px;
            }
        }
    }
    //图片上传组件
    .image-uploader /deep/ .el-upload {
        display: block;
        height: 150px;
        width: 150px;
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
        width: 150px;
        height: 150px;
        line-height: 150px;
        text-align: center;
    }
}
.dashed-style{
    border: 1px dashed #ccc;
}
</style>

