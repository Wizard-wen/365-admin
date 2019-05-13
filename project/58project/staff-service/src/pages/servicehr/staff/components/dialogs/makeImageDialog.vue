<template>
    <div v-if="openMakeImageDialog" class="imageBox" v-loading="isMakingImage">
        <div class="imageBox-contains">
            <div ref="imageCutBox" class="imageCutBox canvasDiv" :style="{zIndex: isImage? '-200': '200'}">
                <div>{{openMakeImage.name}}</div>
            </div>

            <div class="imageCutBox" :style="{zIndex: isImage? '200' : '-200'}">
                <img :src="canvasImage" alt="" class="canvas-img">
            </div>

            <div class="imageBox-footer">
                <el-button @click="closeMakeImageDialog">取 消</el-button>
                <a :href="canvasImage" download="logo.png">下载图片</a>
            </div>
        </div>
    </div>
</template>
<script>

import {hrService} from '../../../../../../common'
import html2canvas from 'html2canvas';
import axios from 'axios'

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
        openMakeImage: {
            type: Object,
            default: function(){return {}}
        }
    },
    watch: {
        openMakeImage:async function(val){
            if(val.hasOwnProperty('name')){
                
            }
        }
    },
    data(){
        return {
            canvasBase64Img:'',//html2canvas生成的图片
            canvasImage: '',//已上传到后台的图片
            isImage:false,//是否已经生成图片
            isMakingImage: false,
        }
    },
    methods: {
        //关闭弹框
        closeMakeImageDialog(){
            this.$emit('closeMakeImageDialog')
        },
    },
    async mounted(){
        let _this = this
        this.isMakingImage = true
        await html2canvas(_this.$refs.imageCutBox).then(async function(canvas){
            //生成base64图片
            _this.canvasBase64Img = canvas.toDataURL("image/png");
            
            //base64 -> blob
            var bytes = window.atob(_this.canvasBase64Img.split(',')[1]);
            var array = [];
            for(var i = 0; i < bytes.length; i++){
                array.push(bytes.charCodeAt(i));
            }
            var blob = new Blob([new Uint8Array(array)], {type: 'image/png'});

            //formData对象
            let canvasFormData = new FormData()
            canvasFormData.append("file", blob)

            await axios.post("/admin/common/uploadImage",canvasFormData).then(data =>{
                _this.canvasImage = './resource/'+data.data.path
                _this.isImage = true
                // debugger
                if(_this.isImage){
                    _this.isMakingImage = false
                }
                
            }).catch((error)=>{
                _this.$message({
                    message: error.message,
                    type: 'error'
                })
                _this.isMakingImage = false
            })
            // await (_this.isMakingImage = false)()
        });
    }
}
</script>
<style lang="scss" scoped>

    .imageBox{
        position: fixed;
        // z-index: -200;
        top:calc(50% - 250px);
        left: calc(50% - 400px);
        height: 600px;
        width: 800px;
        .imageBox-contains{
            height: 600px;
            width: 800px;
            position: relative;
            .imageCutBox{
                position: absolute;
                left: 0;
                top:0;
                height: 500px;
                width: 800px;
                .canvas-img{
                    height: 500px;
                    width: 800px;
                }
            }
            .canvasDiv{
                background: #185;
            }
            .imageBox-footer{
                 position: absolute;
                left: 0;
                bottom:0;
                height: 100px;
                width: 100%;
            }
        }

    }
</style>


