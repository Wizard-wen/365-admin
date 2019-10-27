<template>
    <div>
        <el-form 
            :model="pictureObject" 
            label-width="140px" 
            ref="pictureObject">
            <el-form-item :label="`${label}展示`">
                <div 
                    class="icon-box" 
                    v-if="pictureObject.url" 
                    @mouseover="showblack('0')"
                    @mouseout="showblack('1')"
                    @click="openResourceListDialog('1')">
                    <img class="icon-item" :src="'./resource/'+pictureObject.url" alt=""  >
                    <div class="icon-item-back" v-if="isShowBlack">
                        <i class="el-icon-edit icon-uploader-edit-icon" style="color: #fff;font-size: 20px;"></i>
                    </div>
                </div>
                
                <i class="el-icon-plus adPicture-plus" v-else @click="openResourceListDialog('0')"></i>
                <div class="picture-message">
                    <select-tag-component
                        :propTagList="resourceTypeList"
                        v-model="pictureObject.type"
                        :isSingle="true"
                        :isEdit="false"></select-tag-component>
                    <el-tag v-if="pictureObject.name" style="margin-left: 20px;">{{pictureObject.name}}</el-tag>
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
import resourceListDialog from './resourceListDialog.vue'
import {selectTagComponent} from '@/pages/components/index.js'
export default {
    components: {
        resourceListDialog,
        selectTagComponent,
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
    data(){
        return {
            //资源图片弹窗
            resourceListDialogVisible: false,
            //是否编辑
            isEdit: false,
            //是否有遮罩
            isShowBlack: false,
            //选中的图片对象
            pictureObject: {},
            //资源图片类型
            resourceTypeList: [
                {id: 1, name: '长图'},
                {id: 2, name: '全屏'},
                {id: 3, name: '半屏'},
            ],
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
    mounted(){

    }
}
</script>

<style lang="scss" scoped>
.icon-box{
    width:500px;
    height: 300px;
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
        background: rgba(0,0,0,.5);
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