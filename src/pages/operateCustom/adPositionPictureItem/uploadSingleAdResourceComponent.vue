<template>
    <div>
        <el-form :model="pictureObject" label-width="140px" ref="pictureObject">
            <el-form-item :label="`${label}展示`">
                <div 
                    class="icon-box" 
                    v-if="pictureObject.url" 
                    @click="openResourceListDialog('1')">
                    <!-- @mouseover="showblack('0')"
                    @mouseout="showblack('1')" -->
                    <img v-if="!isImageError" class="icon-item" :src="pictureObject.url" alt=""  >
                    <div v-else class="icon-item">图片有误</div>
                    <div class="icon-item-back">
                        <i class="el-icon-edit icon-uploader-edit-icon" style="color: #fff;font-size: 20px;"></i>
                    </div>
                </div>
                
                <i class="el-icon-plus adPicture-plus" v-else @click="openResourceListDialog('0')"></i>
                <div class="picture-message">
                    <el-tag size="small" v-if="pictureObject.type">{{resourceType}}</el-tag>
                    <el-tag size="small" v-if="pictureObject.name" style="margin-left: 20px;">{{pictureObject.name}}</el-tag>
                </div>
            </el-form-item>
            <el-form-item :label="`${label}url`">
                <el-input v-model="pictureObject.url" disabled></el-input>
            </el-form-item>
        </el-form>
        
        
        <resource-list-dialog
            :selectedAdPicture="pictureObject"
            :isEdit="isEdit"
            :resourceListDialogVisible="resourceListDialogVisible"
            v-if="resourceListDialogVisible"
            @closeResourceListDialog="closeResourceListDialog"></resource-list-dialog>
    </div>
</template>

<script>
import resourceListDialog from './uploadSingleAdResourceComponent/resourceListDialog.vue'
import {resourceTypeList} from '../pictureResourceList/IresourcePicture'
export default {
    components: {
        resourceListDialog,
    },
    props: {
        value: {
            type: Object,
            default: function(){return {}}
        },
        label: {
            type: String,
            default: ''
        }
    },
    watch: {
        value: function(newVal, oldVal){
            if(newVal!=oldVal){
                this.pictureObject = newVal
            }
        }
    },
    computed: {
        resourceType(){
            return this.resourceTypeList.find(item =>item.id == this.pictureObject.type).name
        }
    },
    data(){
        return {
            isImageError: false,
            //资源图片弹窗
            resourceListDialogVisible: false,
            //是否编辑
            isEdit: false,
            //是否有遮罩
            isShowBlack: false,
            //选中的图片对象
            pictureObject: {},
            //资源图片类型
            resourceTypeList,
        }
    },
    methods: {
        /**
         * 打开资源列表弹窗
         */
        openResourceListDialog(type){
            if(type == '1'){
                this.isEdit = true
            }
            this.resourceListDialogVisible = true
        },
        /**
         * 是否显示遮罩
         */
        showblack(type){
            if(type == '0'){
                this.isShowBlack = true
            } else {
                this.isShowBlack = false
            }
        },
        /**
         * 关闭资源列表弹窗
         */
        closeResourceListDialog(pictureObj){
            if(pictureObj){

                this.pictureObject.url = pictureObj.url
                this.pictureObject.id = pictureObj.id
                this.pictureObject.type = pictureObj.type
                this.pictureObject.name = pictureObj.name
            }
            this.resourceListDialogVisible = false
            this.$emit('input',this.pictureObject)
        },
    },
    created(){
        var img = new Image();  
        img.onload = function () {
            this.isImageError = false
        };  
        img.onerror = function () {
            this.isImageError = true
        };  
        img.src = this.pictureObject.url 
    }
}
</script>

<style lang="scss" scoped>
.icon-box{
    width:502px;
    height: 302px;
    border: 1px dashed #ccc;
    position: relative;
    .icon-item {
        width:500px;
        height: 300px;
        display: block;
    }
    .icon-item-back{
        position: absolute;
        width:500px;
        height: 300px;
        top: 0;
        z-index: 4;
        background: rgba(0,0,0,.2);
        text-align: center;
        line-height: 300px;
        cursor: pointer;
    }
}
.adPicture-plus{
    line-height: 300px;
    text-align: center;
    border: 1px dashed #ccc;
    border-radius: 6px;
    height: 300px;
    width: 500px;
}
.adPicture-plus:hover{
    border-color: blue;
    cursor: pointer;
}
.picture-message{
    display: flex;
    margin-top: 10px;
}
</style>