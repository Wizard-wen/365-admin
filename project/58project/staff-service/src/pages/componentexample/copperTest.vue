<template>
    <div>
        <!-- 多图片上传 -->
        <el-upload 
            v-if="multiple" 
            :action='targetUrl' 
            list-type="picture-card" 
            accept="image/*" 
            :on-preview="handlePreview" 
            :auto-upload="false" 
            :on-remove="handleRemove" 
            :http-request="upload" 
            :on-change="consoleFL" 
            :file-list="uploadList">
            <i class="el-icon-plus"></i>
        </el-upload>
        <!-- 单图片上传 -->
        <el-upload 
            v-else 
            class="avatar-uploader" 
            :action="targetUrl" 
            :auto-upload="false" 
            :show-file-list="false" 
            :on-change="handleCrop" 
            :http-request="upload">
            <img 
                v-if="imageUrl" 
                :src="imageUrl" 
                class="avatar" 
                ref="singleImg" 
                @mouseenter="mouseEnter" 
                @mouseleave="mouseLeave" 
                :style="{width:width+'px',height:height+'px'}">
            <i 
                v-else 
                class="el-icon-plus avatar-uploader-icon" 
                :style="{width:width+'px',height:height+'px','line-height':height+'px','font-size':height/6+'px'}"></i>
            <!-- 单图片上传状态显示 -->
            <div 
                v-if="imageUrl" 
                class="reupload" 
                ref="reupload" 
                @click.stop="handlePreviewSingle" 
                @mouseenter="mouseEnter" 
                @mouseleave="mouseLeave" 
                :style="{width:reuploadWidth+'px',height:reuploadWidth+'px','line-height':reuploadWidth+'px','font-size':reuploadWidth/5+'px'}">重新上传</div>
            <div 
                id="uploadIcon" 
                v-if="imageUrl" 
                ref="reupload" 
                @mouseenter="mouseEnter" 
                @mouseleave="mouseLeave" 
                :style="{width:'100%'}">
                <i 
                    class="el-icon-zoom-in" 
                    @click.stop="handlePreviewSingle" 
                    :style="{color:'#2E2E2E',fontSize:'25px',display:'inline-block',paddingRight:'15px'}"></i>
                <i 
                    class="el-icon-upload" 
                    :style="{color:'#2E2E2E',fontSize:'25px',display:'inline-block'}"></i>
            </div>
            <div 
                class="reupload" 
                ref="uploading" 
                :style="{
                    width:reuploadWidth+'px',
                    height:reuploadWidth+'px',
                    'line-height':reuploadWidth+'px',
                    'font-size':reuploadWidth/5+'px'}">上传中..</div>
            <div 
                class="reupload" 
                ref="failUpload" 
                :style="{
                    width:reuploadWidth+'px',
                    height:reuploadWidth+'px',
                    'line-height':reuploadWidth+'px',
                    'font-size':reuploadWidth/5+'px'}">上传失败</div>
        </el-upload>
        <!-- 多图片预览弹窗 -->
        <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <!-- 剪裁组件弹窗 -->
        <el-dialog 
            v-if="cropperModel" 
            :visible.sync="cropperModel" 
            width="1100px" 
            :before-close="beforeClose">
            <Cropper 
                :img-file="file" 
                ref="vueCropper" 
                :fixedNumber="fixedNumber" 
                @upload="upload"></Cropper>
        </el-dialog>
    </div>
</template>
<script>
import Cropper from '@/public/components/cropper.vue';
import axios from 'axios'
export default {
    // name: 'uploader',
    props: {
        targetUrl: {
            // 上传地址
            type: String,
            // default: '/storage/upload'
            default: `/admin/common/uploadImage`
        },
        multiple: {
            // 多图开关
            type: Boolean,
            default: false
        },
        initUrl: {
            // 初始图片链接
            default: ''
        },
        fixedNumber: {
            // 剪裁框比例设置
            default: function () {
                return [1.5, 1];
            }
        },
        width: {
            // 单图剪裁框宽度
            type: Number,
            default: 178
        },
        height: {
            // 单图剪裁框高度
            type: Number,
            default: 178
        }
    },
    data () {
        return {
            file: '', // 当前被选择的图片文件
            imageUrl: '', // 单图情况框内图片链接
            dialogImageUrl: '', // 多图情况弹窗内图片链接
            uploadList: [], // 上传图片列表
            reupload: true, // 控制"重新上传"开关
            dialogVisible: false, // 展示弹窗开关
            cropperModel: false, // 剪裁组件弹窗开关
            reuploadWidth: this.height * 0.7, // 动态改变”重新上传“大小
        };
    },
    updated () {
        if (this.$refs.vueCropper) {
            this.$refs.vueCropper.Update();
        }
    },
    watch: {
        initUrl: function (val) {
        // 监听传入初始化图片
        // console.info('watch');
            if (val) {
                if (typeof this.initUrl === 'string') {
                    this.imageUrl = val;
                } else {
                    this.uploadList = this.formatImgArr(val);
                    // this.$emit('imgupload', this.uploadList);
                }
            }
        }
    },
    mounted () {
        if (typeof this.initUrl === 'string') {
            this.imageUrl = this.initUrl;
        } else {
            this.uploadList = this.formatImgArr(this.initUrl);
        }
    },
    methods: {
        /** **************************** multiple多图情况 **************************************/
        handlePreview (file) {
            // 点击进行图片展示
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }, 
        handleRemove (file, fileList) {
            // 删除图片后更新图片文件列表并通知父级变化
            this.uploadList = fileList;
            this.$emit('imgupload', this.uploadList);
            // this.$emit('imgupload', this.formatImgArr(this.uploadList));
        },
        consoleFL (file, fileList) {
            debugger
            // 弹出剪裁框，将当前文件设置为文件
            this.cropperModel = true;
            this.file = file;
            // this.uploadList = fileList;
        },
        /************************************************************************************/

        /** **************************** single单图情况 **************************************/
        handlePreviewSingle (file) { // 点击进行图片展示
            console.log(file)
            debugger
            this.dialogImageUrl = this.imageUrl;
            this.dialogVisible = true;
        },
        mouseEnter () { // 鼠标划入显示“重新上传”
            this.$refs.reupload.style.display = 'block';
            if (this.$refs.failUpload.style.display === 'block') {
                this.$refs.failUpload.style.display = 'none';
            }
            this.$refs.singleImg.style.opacity = '0.6';
        },
        mouseLeave () {
            // 鼠标划出隐藏“重新上传”
            this.$refs.reupload.style.display = 'none';
            this.$refs.singleImg.style.opacity = '1';
        },
        handleCrop (file, files) {
            // debugger
            console.log(file,files);
            // 点击弹出剪裁框
            this.cropperModel = true;
            this.file = file;
            // this.imageUrl = file.url
        },
        /************************************************************************************/

        async upload (data) {
            // 自定义upload事件
            if (!this.multiple) {
                // 如果单图，则显示正在上传
                this.$refs.uploading.style.display = 'block';
            }
            // let img = new Image();
            // img.src = data;
            // img.onload = async () => {
                // let _data = this.compress(img);

                let blob = this.dataURItoBlob(data);
                let formData = new FormData(); 
                formData.append('file', blob, this.file.name); // 有的后台需要传文件名，不然会报错
                await this.imgUpload(formData);
            // };
        },
        async imgUpload(formData) {

            const res = await axios.post('./admin/common/uploadImage',formData,{ 
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (!this.multiple) {
                // 上传完成后隐藏正在上传
                this.$refs.uploading.style.display = 'none';
            }

            if (res.code == 0) {
                // 上传成功将照片传回父组件
                const currentPic = res.data.path;
                if (this.multiple) {
                    this.uploadList.push({
                        url: currentPic,
                        uid: '111'
                    });
                    this.$emit('imgupload', this.uploadList);// 根据自己实际项目需要将照片返回给父组件
                    // this.uploadList.pop();
                    // this.$emit('imgupload', this.formatImgArr(this.uploadList));
                } else {
                    this.$emit('imgupload', currentPic);
                }
                this.$refs.vueCropper.isDisabled = false;
            } else {
                // 上传失败则显示上传失败，如多图则从图片列表删除图片
                if (!this.multiple) {
                    this.$refs.failUpload.style.display = 'block';
                } else {
                    this.uploadList.pop();
                }
                this.$refs.vueCropper.isDisabled = false;
            }
            this.cropperModel = false;
        },
        /**
         * 初始化改变图片格式
         */
        formatImgArr (arr) {
            const result = arr.map((item, index) => {
                if (typeof item === 'string') {
                    return {
                        url: item,
                        uid: `index${index}`
                    };
                } else {
                    return item.url;
                }
            });
            return result;
        },
        beforeClose () {
            // this.uploadList.pop();
            console.log(this.uploadList);
            this.cropperModel = false;
        },
        // 压缩图片
        compress(img) {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            // let initSize = img.src.length;
            let width = img.width;
            let height = img.height;
            canvas.width = width;
            canvas.height = height;
            // 铺底色
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, width, height);
            // 进行压缩
            let ndata = canvas.toDataURL('image/jpeg', 0.8);
            return ndata;
        },
        // base64转成bolb对象
        dataURItoBlob(base64Data) {
            let byteString;
            if (base64Data.split(',')[0].indexOf('base64') >= 0) { byteString = atob(base64Data.split(',')[1]); } else { byteString = unescape(base64Data.split(',')[1]); }
            let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
            let ia = new Uint8Array(byteString.length);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ia], { type: mimeString });
        }
    },
    components: {
        Cropper
    }
};
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    color: #8c939d;
    text-align: center;
  }
  .avatar {
    display: block;
  }
  .reupload {
    border-radius: 50%;
    position: absolute;
    color: #fff;
    background-color: #000000;
    opacity: 0.6;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
  }
  #uploadIcon{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
  }
</style>
