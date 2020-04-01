<template>
    <div :class="['picture-box', isEdit? 'dashed-style' : '']">
        <div 
            class="image-box"
            :style="{height: `${height}px`,width: `${width}px`}"
            v-for="(item,index) in photo_fileList" 
            :key="index"  >
            <!-- @mouseover.stop="showPhotoblack(item, index, '0')" 
            @mouseout.stop="showPhotoblack(item, index, '1')"> -->
            <!-- <img 
                :src="item.showUrl" 
                class="image-item" :style="{height: `${height}px`,width:`${width}px`}"> -->
            <el-image 
                class="image-item"
                :style="{height: `${height}px`,width:`${width}px`}"
                :src="item.showUrl" 
                :preview-src-list="isEdit?[]: [item.showUrl]">
            </el-image>
            <div 
                class="image-item-back" 
                :style="{height: `${height}px`, width: `${width}px`}"
                v-if="isEdit">
                <i 
                    class="el-icon-delete image-edit-deal-icon" 
                    :style="{lineHeight: `${height}px`}" 
                    @click="deletePhoto(index)"></i>
                <i 
                    class="el-icon-zoom-in image-edit-deal-icon" 
                    :style="{lineHeight: `${height}px`}" 
                    @click="openPictureDetailDialog(item)"></i>
            </div>
            <!-- <div 
                class="image-item-back" 
                :style="{height: `${height}px`, width: `${width}px`}"
                v-if="item.isBack && !isEdit">
                <i 
                    class="el-icon-zoom-in image-deal-icon" 
                    :style="{lineHeight: `${height}px`}" 
                    @click="openPictureDetailDialog(item)"></i>
            </div> -->
        </div>
        <div :style="{height: `${height}px`, width: `${width? width:'100%'}`}" v-if="isShowEdit">
            <singlePictureUpload
                :initUrl="''"
                :uploadHeader="uploadHeader"
                @onSinglePictureSuccess="onSinglePictureSuccess"
                :height="height"
                :width="width"></singlePictureUpload>
        </div>
        <picture-detail-dialog
            :pictureDetailDialogVisible="pictureDetailDialogVisible"
            v-if="pictureDetailDialogVisible"
            :imageUrl="pictureDetailUrl"
            @closePictureDetailDialog="pictureDetailDialogVisible = false"></picture-detail-dialog>
    </div>
</template>
<script>
import singlePictureUpload from './singlePictureUpload.vue' 
export default {
    components: {
        singlePictureUpload,
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
            //本地展示的图片数组
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
            type: String | Number,
            default: 178,
        },
        /**
         * 图片的宽度
         */
        width: {
            type: String | Number,
            default: 178,
        },
        /**
         * 图片对象中，url字段键名
         */
        pictureUrlArrtibute: {
            type: String,
            default: 'url'
        },
        /**
         * 最多可以上传几个图片
         */
        maxCount: {
            type: Number | String,
            default: 10, 
        },
        /**
         * 完整url路径
         */
        showCompleteUrl: {
            type: String,
            default: '',
        }
    },
    watch: {
        value: {
            handler(newVal, oldVal){
                if(newVal!= oldVal){
                    console.log('触发更新')
                    //包装图片数组，url 展示图片url  isBack 是否显示遮罩
                    this.photo_fileList =  newVal.map((item, index) =>{
                        let hasShowUrl = item.hasOwnProperty('showUrl')
                        return {
                            ...item,
                            // url: item[this.pictureUrlArrtibute],
                            // url: item[this.pictureUrlArrtibute].includes('https://oss.sy365.cn/service/')? 
                            // item[this.pictureUrlArrtibute] : 
                            // 'https://oss.sy365.cn/service/'+item[this.pictureUrlArrtibute],
                            showUrl: hasShowUrl? item.showUrl: item.url,
                            isBack: false,
                        }
                    })
                }
            },
            immediate: true,
            deep: true,
        }
    },
    filters: {
        addPictureDomain(value){
            return value.includes('https://oss.sy365.cn/service/')? value : 'https://oss.sy365.cn/service/'+value
        }
    },
    computed: {
        /**
         * 是否展示添加图片框
         */
        isShowEdit(){
            return this.isEdit && this.photo_fileList.length<this.maxCount
        }
    },
    methods: {
        /**
         * 照片上传成功钩子函数
         * 回调函数参数
         * des 新上传时，传相对路径；若是回显后未改变，直接上传回显回来的绝对路径  
         * @param name 图片名字
         * @param path 相对路径
         * @param url 绝对路径
         */
        onSinglePictureSuccess(res, file) {
            console.log('上传成功',res)
            let showUrl = res.url
            let newPic = {
                ...res,
                showUrl: showUrl,//展示的url
                url: res.path,//后台根据这个值判断要不要更新图片资源
            }

            //将回传的图片url存入数组中
            this.photo_fileList.push(newPic);


            //包装图片数组，url 展示图片url  isBack 是否显示遮罩
            // this.photo_fileList =  this.photo_fileList.map((item, index) =>{
            //     console.log('单图片上传',item)
            //     return {
            //         ...item,
            //         url: item.path,
            //         isBack: false,
            //     }
            // })

            let newArr = this.photo_fileList
            
            this.$set(this.photo_fileList, newArr)
            
            //触发上层v-model
            this.$emit('input',this.photo_fileList)
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
                let newArr = this.photo_fileList.splice(index,1)
                this.$set(this.photo_fileList, newArr)
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
            this.pictureDetailUrl =item.showUrl
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
            background: rgba(0,0,0,.2);
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

