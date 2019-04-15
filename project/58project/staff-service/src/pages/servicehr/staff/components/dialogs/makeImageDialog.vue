<template>
    <!-- <el-dialog 
        :title="makeImageDialogTitle" 
        :visible.sync="openMakeImageDialog"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <div class="makedImage" ref="makedImage">
            <div>{{openMakeImage.name}}</div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeMakeImageDialog">取 消</el-button>
            <el-button type="primary" >下载</el-button>
        </div>
    </el-dialog> -->
    <div v-if="openMakeImageDialog" class="makedImage" ref="makedImage">
        <div  >
            <div>{{openMakeImage.name}}</div>
        </div>
        <div  class="dialog-footer">
            <el-button @click="closeMakeImageDialog">取 消</el-button>
            <a :href="img" download="logo.png">下载图片</a>
        </div>
        <img :src="img" alt="" class="img">
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
            canvasImg:'',
            img: ''
        }
    },
    methods: {
        //关闭弹框
        closeMakeImageDialog(){
            this.$emit('closeMakeImageDialog')
        },
        async changeImage(){
            let _this = this
            await html2canvas(_this.$refs.makedImage).then(function(canvas){
                console.log(canvas.toDataURL("image/png"))
                _this.canvasImg = canvas.toDataURL("image/png");
            });
        }
    },
     mounted(){
        //  debugger
        let _this = this
             html2canvas(_this.$refs.makedImage).then(function(canvas){
                console.log(canvas.toDataURL("image/png"))
                _this.canvasImg = canvas.toDataURL("image/png");
                var bytes = window.atob(_this.canvasImg.split(',')[1]);
                var array = [];
                for(var i = 0; i < bytes.length; i++){
                    array.push(bytes.charCodeAt(i));
                }
                var blob = new Blob([new Uint8Array(array)], {type: 'image/png'});
                // var fd = new FormData();
                // fd.append('file',blob, Date.now() + '.jpg');
                let data = new FormData()
                data.append("file", blob)

                // data.file = _this.canvasImg
                console.log(data)
                axios.post("/admin/common/uploadImage",data).then(data =>{
                    console.log(data)
                    _this.img = './resource/'+data.data.path
                }).catch((error)=>{
                    throw error
                })
            });
    }
}
</script>
<style lang="scss" scoped>

.makedImage{
    position: fixed;
    top:50%;
    right: 50%;
    height: 500px;
    width: 500px;
    background: #185;
}
.img{
    position: fixed;
    z-index: 100;
    top:60%;
    right: 70%;
    height: 500px;
    width: 500px;
    background: #185;
}
</style>


