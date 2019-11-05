<template>
    <div :class="['picture-box', isEdit? 'dashed-style' : '']">
        <div 
            class="image-box"
            :style="{height: `${height}`,}"
            v-for="(item,index) in photo_fileList" 
            :key="index"  
            @mouseover="showPhotoblack(item, index, '0')" 
            @mouseout="showPhotoblack(item, index, '1')">
            <img :src="'./resource/'+item.url" class="image-item" :style="{height: `${height}`,width:`${width}`}">
            <div 
                class="image-item-back" 
                :style="{height: `${height}`, width: `${width? width:'100%'}`}"
                v-if="item.isBack && isEdit">
                <i 
                    class="el-icon-delete image-edit-deal-icon" 
                    :style="{lineHeight: `${height}`}" 
                    @click="deletePhoto(index)"></i>
                <i 
                    class="el-icon-zoom-in image-edit-deal-icon" 
                    :style="{lineHeight: `${height}`}" 
                    @click="openPictureDetailDialog(item)"></i>
            </div>
            <div 
                class="image-item-back" 
                :style="{height: `${height}`, width: `${width? width:'100%'}`}"
                v-if="item.isBack && !isEdit">
                <i 
                    class="el-icon-zoom-in image-deal-icon" 
                    :style="{lineHeight: `${height}`}" 
                    @click="openPictureDetailDialog(item)"></i>
            </div>
        </div>
        <div :style="{height: `${height}`, width: `${width? width:'100%'}`}" v-if="isEdit">
            <el-upload
                accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                class="image-uploader"
                action="/admin/common/uploadImage"
                :show-file-list="false"
                :on-success="photoUploadSuccess"
                :before-upload="beforeAvatarUpload"
                :headers="uploadHeader">
                <i  
                    class="el-icon-plus image-uploader-icon"
                :style="{height: `${height}`, lineHeight: `${height}`,width: `${width? width:'100%'}`}"></i>
            </el-upload>
        </div>
        
        <picture-detail-dialog
            :pictureDetailDialogVisible="pictureDetailDialogVisible"
            v-if="pictureDetailDialogVisible"
            :imageUrl="pictureDetailUrl"
            @closePictureDetailDialog="pictureDetailDialogVisible = false"></picture-detail-dialog>
    </div>
</template>
<script>
export default {
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
        },
        /**
         * 图片的高度
         */
        height: {
            type: String,
            default: '150px',
        },
        /**
         * 图片的宽度
         */
        width: {
            type: String,
            default: '',
        },
        /**
         * 图片对象中，url字段键名
         */
        pictureUrlArrtibute: {
            type: String,
            default: 'path'
        }
    },
    watch: {
        value: {
            handler(newVal, oldVal){
                if(newVal!= oldVal){
                    //包装图片数组，url 展示图片url  isBack 是否显示遮罩
                    this.photo_fileList =  newVal.map((item, index) =>{
                        return {
                            ...item,
                            url: item[this.pictureUrlArrtibute],
                            isBack: false,
                        }
                    })
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
                    url: item.path,
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
                this.photo_fileList[index].isBack = true
            } else {
                this.photo_fileList[index].isBack = false
            }
        },
        /**
         * 打开图片详情弹窗
         */
        openPictureDetailDialog(item){
            this.pictureDetailUrl = `./resource/${item.url}`
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
    padding: 10px;
    //图片盒子
    .image-box{
        margin-right: 10px;
        position: relative;
        //图片
        .image-item {
            display: block;
        }
        //遮罩
        .image-item-back{
            position: absolute;        
            top: 0;
            z-index: 4;
            cursor: pointer;
            background: rgba(0,0,0,.5);
            display: flex;
            //编辑
            .image-edit-deal-icon{
                width: 50%;
                text-align: center;
                color: #fff;
                font-size: 20px;
            }
            //查看
            .image-deal-icon{
                width: 100%;
                text-align: center;
                color: #fff;
                font-size: 20px;
            }
        }
    }
    //图片上传组件
    .image-uploader /deep/ .el-upload {
        display: block;
        height: 100%;
        width: 100%;
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
        line-height: 150px;
        text-align: center;
    }
}
//组件外边框虚线
.dashed-style{
    border: 1px dashed #ccc;
}
</style>

