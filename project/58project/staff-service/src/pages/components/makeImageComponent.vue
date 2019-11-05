<template>
    <div v-if="makeImageDialogVisible" class="imageBoxMark" v-loading="isLoading">
        <div class="imageBox" 
            :style="{
                height: `${height+60}px`,
                width: `${width}px`,
                top: `calc(50% - ${height/2}px)`,
                left: `calc(50% - ${width/2}px)`,}">
            <div class="imageBox-contains" :style="{height: `${height+60}px`,width: `${width}px`}">
                <!-- 原始div -->
                <div ref="imageCutBox" class="imageCutBox" :style="{zIndex: isImageCompleted? '300': '200'}">
                    <slot name="pictureContains"></slot>
                </div>
                <!-- canvas形成的图片 -->
                <div class="imageCutBox" :style="{zIndex: isImageCompleted? '200' : '-200'}">
                    <img :src="canvasCompletedImage" :style="{height: `${height}px`,width: `${width}px`}" alt="" class="canvas-img">
                </div>
                <div class="footer" :style="{width: `${width}px`}">
                    <div class="imageBox-footer">
                        <a class="down" :href="canvasCompletedImage" download="image.png">下载图片</a>
                        <el-button @click="closeMakeImageDialog">取 消</el-button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>

import {operateService} from '@common/index.js'
import html2canvas from 'html2canvas';
import axios from 'axios'

export default {
    props: {
        //是否打弹出框
        makeImageDialogVisible: {
            type: Boolean,
            default: false,
        },
        //弹窗控制按钮title
        makeImageDialogControlTitle: {
            type: String,
            default: "下载图片"
        },
        height: {
            type: Number,
            default: 0, 
        },
        width: {
            type: Number,
            default: 0,
        }
    },
    data(){
        return {
            //html2canvas生成的图片
            canvasBase64Img:'',
            //已经由canvas生成，并已上传到后台的图片
            canvasCompletedImage: '',
            //是否已经生成图片
            isImageCompleted:false,
            //图片正在生成中
            isLoading: false, 
        }
    },
    methods: {
        //关闭弹框
        closeMakeImageDialog(){
            this.$emit('closeMakeImageDialog')
        },
    },
    async mounted(){
        try{
            this.isLoading = true
            await html2canvas(this.$refs.imageCutBox).then(async canvas =>{
                
                //生成base64图片
                this.canvasBase64Img = canvas.toDataURL("image/png");
                
                //base64 -> blob
                var bytes = window.atob(this.canvasBase64Img.split(',')[1]);
                
                var array = [];
                for(var i = 0; i < bytes.length; i++){
                    array.push(bytes.charCodeAt(i));
                }
                
                var blob = new Blob([new Uint8Array(array)], {type: 'image/png'});

                //formData对象
                let canvasFormData = new FormData()
                
                canvasFormData.append("file", blob)

                //上传至服务器
                await axios.post("/admin/common/uploadImage",canvasFormData).then(data =>{
                    
                    this.canvasCompletedImage = './resource/'+data.data.path
                    
                    this.isLoading = false
                    
                }).catch((error)=>{
                    this.$message({
                        message: error.message,
                        type: 'error'
                    })
                    this.isLoading = false
                }).finally(() => {
                    this.isLoading = false
                })

            }).catch(error =>{
                this.$message({
                    message: error.message,
                    type: 'error'
                })
                this.isLoading = false
            });
        } catch(error){
            this.$message({
                message: error.message,
                type: 'error'
            })
            this.isLoading = false
        }
        
    }
}
</script>
<style lang="scss" scoped>
    //外层遮罩
    .imageBoxMark{
        position: fixed;
        z-index: 11;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(1, 1, 1, 0.8);
        .imageBox{
            position: fixed;
            background: #fff;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            .imageBox-contains{
                position: relative;
                .imageCutBox{
                    position: absolute;
                    left: 0;
                    top:0;
                    .canvas-img{
                        // height: 400px;
                        // width: 800px;
                    }
                }
                .footer{
                    border-top: 1px solid #ccc;
                    height: 60px;
                    padding: 10px 0;
                    position: absolute;
                    right: 0px;
                    bottom:0;
                    .imageBox-footer{
                        padding: 0 20px;
                        height: 40px;
                        width: 100%;
                        .down{
                            color: #fff;
                            background-color: #409EFF;
                            border-color: #409EFF;
                            display: inline-block;
                            line-height: 1;
                            white-space: nowrap;
                            cursor: pointer;
                            border: 1px solid #dcdfe6;
                            -webkit-appearance: none;
                            text-align: center;
                            -webkit-box-sizing: border-box;
                            box-sizing: border-box;
                            outline: 0;
                            margin: 0;
                            -webkit-transition: .1s;
                            transition: .1s;
                            font-weight: 500;
                            padding: 12px 20px;
                            font-size: 14px;
                            border-radius: 4px;
                            margin-right: 20px;
                        }
                    }
                }
                
            }

        }
    }
    
</style>


