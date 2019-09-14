<template>
    <div v-if="openMakeImageDialog" class="imageBoxMark" v-loading="isMakingImage">
      <div class="imageBox">
        <div class="imageBox-contains">
            <div ref="imageCutBox" class="imageCutBox canvasDiv" :style="{zIndex: isImage? '300': '200'}">
                <div class="picture-contains">
                    <div class="base">
                        <div class="item">
                            <div class="label">姓名：</div>
                            <div class="value">{{openMakeImage.name || ''}}</div>
                        </div>
                        <div class="item">
                            <div class="label">工龄：</div>
                            <div class="value">{{openMakeImage.working_age_val || ''}}</div>
                        </div>
                        <div class="item">
                            <div class="label">年龄</div>
                            <div class="value">{{openMakeImage.age || ''}}</div>
                        </div>
                        <div class="item">
                            <div class="label">学历：</div>
                            <div class="value">{{openMakeImage.education_val || ''}}</div>
                        </div>
                        <div class="item">
                            <div class="label">籍贯：</div>
                            <div class="value">{{openMakeImage.birthplace || ''}}</div>
                        </div>
                        <div class="item">
                            <div class="label">服务类型：</div>
                            <div class="value">{{openMakeImage.type || ''}}</div>
                        </div>
                        <div class="item maxitem">
                            <div class="label">联系地址：</div>
                            <div class="value maxvalue">{{openMakeImage.address || ''}}</div>
                        </div>

                        <div class="item maxitem">
                            <div class="label">职业类型：</div>
                            <div class="value maxvalue">{{openMakeImage.service_category || ''}}</div>
                        </div>
                        <div class="item maxitem">
                            <div class="label">服务区域：</div>
                            <div class="value maxvalue">{{openMakeImage.service_region || ''}}</div>
                        </div>
                        <div class="item maxitem">
                            <div class="label">技能证书：</div>
                            <div class="value maxvalue">{{openMakeImage.paper_category || ''}}</div>
                        </div>
                    </div>
                    <div class="icon">
                        <img v-if="openMakeImage.icon" style="height:100px;width:100px;" :src="'./resource/'+openMakeImage.icon" alt="">
                        <div v-else class="no-img">暂无头像</div>
                    </div>
                </div>


            </div>

            <div class="imageCutBox" :style="{zIndex: isImage? '200' : '-200'}">
                <img :src="canvasImage" alt="" class="canvas-img">
            </div>

            <div class="imageBox-footer">
                <el-button @click="closeMakeImageDialog">取 消</el-button>
                <a class="down" :href="canvasImage" download="card.png">下载图片</a>
            </div>
        </div>
      </div>
    </div>
</template>
<script>

import {operateService} from '../../../../../common'
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
            service_type:''
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
                if(_this.isImage){
                    _this.isMakingImage = false
                }

            }).catch((error)=>{
                _this.$message({
                    message: error.message,
                    type: 'error'
                })
                _this.isMakingImage = false
            }).finally(() => {
                _this.isMakingImage = false
            })
        });
    }
}
</script>
<style lang="scss" scoped>
    .imageBoxMark{
      position: fixed;
      z-index: 11;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(1, 1, 1, 0.8);
    }
    .imageBox{
        position: fixed;
        // z-index: -200;
        top:calc(50% - 200px);
        left: calc(50% - 400px);
        height: 460px;
        width: 800px;
        background: #fff;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        .imageBox-contains{
            height: 460px;
            width: 800px;
            position: relative;
            .imageCutBox{
                position: absolute;
                left: 0;
                top:0;
                height: 400px;
                width: 800px;
                .canvas-img{
                    height: 400px;
                    width: 800px;
                }
            }
            .canvasDiv{
                background: url(./makeImageComponent/images/backImage.jpeg) no-repeat;
                background-size: 800px 400px;
                padding: 60px;
                .picture-contains{
                    position: relative;
                    height: 100%;
                    width: 100%;
                    .base{
                        height: 200px;
                        width: 500px;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        .item{
                            height: 30px;
                            line-height: 30px;
                            width: 250px;
                            display: flex;
                            font-size: 16px;
                            font-weight: bold;
                            .label{
                                width: 80px;
                            }
                            .value{
                                width: 170px;
                            }
                        }
                        .maxitem {
                          width: 500px;
                          .maxvalue {
                            width: 420px;
                          }
                        }
                    }
                    .icon{
                        position:absolute;
                        right:50px;
                        top: 0;
                        height: 100px;
                        width: 100px;
                        // background:#185;
                        .no-img{
                            height: 100px;
                            width: 100px;
                            background: #dcdfe6;
                            line-height: 100px;
                            font-size: 16px;
                            text-align: center;

                        }
                    }
                }

            }
            .imageBox-footer{
                padding: 10px 0;
                position: absolute;
                right: 30px;
                bottom:0;
                height: 60px;
                width: 200px;
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
                }
            }
        }

    }
</style>


