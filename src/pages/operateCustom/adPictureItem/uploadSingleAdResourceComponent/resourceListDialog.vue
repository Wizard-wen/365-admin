<template>

    <el-dialog
        v-loading="is_loading"
        width="1000px"
        :visible.sync="resourceListDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <div class="header" slot="title">
            <p>选择广告图片</p>
            <el-tag 
                class="" :closable="true"  @close="closeTag"   
                v-if="currentSelectedObj.id">{{currentSelectedObj.name}}-{{currentSelectedObj.typeName}}</el-tag>
        </div>
        <el-row>
            <el-col :span="8" v-for="(item, index) in adResourceList" :key="index" style="margin-bottom:20px;">
                <div style="padding: 0 10px;">
                    <picture-card :pictureItem="item" @changeSelectedTag="changeSelectedTag"></picture-card>
                </div>
            </el-col>
        </el-row>

        <el-pagination
            class="pagination"
            @current-change="handleCurrentPage"
            @prev-click="prevAndNextClick"
            @next-click="prevAndNextClick"
            :current-page.sync="pagination.currentPage"
            :page-size="pagination.pageNumber"
            layout="prev, pager, next, jumper"
            :total="pagination.total"></el-pagination>
        <div slot="footer">
            <el-button type="primary" @click="setAdPicture">确定</el-button>
            <el-button @click="closeDialog">取消</el-button>
        </div>
    </el-dialog>
</template>
<script>

import { operateCustomService} from '@/service/operateCustom'
import pictureCard from '../../resourceList/pictureCard.vue'

import {resourceTypeList} from '../../resourceList/IresourcePicture'
export default {
    components: {
        pictureCard,
    },
    props: {
        /**
         * 控制组件的显示隐藏
         */
        resourceListDialogVisible:{
            default:false,
            type: Boolean,
        },
        /**
         * 是否编辑
         */
        isEdit: {
            type: Boolean,
            default: false,
        },
        /**
         * 编辑字段
         */
        selectedAdPicture: {
            default: function(){return {}},
            type: Object
        },
        resourceType: {
            type: Number,
            default: 0,
        }
    },
    data() {
        return {
            is_loading: false,
            //广告资源
            adResourceList: [],
            resourceTypeList,
            /**
             * 分页信息
             */
            pagination: {
                total: 0,
                currentPage: 1,
                pageNumber: 6,
            },
            getResourceForm: {
                page: 1, 
                pageNumber: 6,
                type: this.resourceType,
            },
            //当前选中的id
            currentSelectedObj: {},
        }
    },
    methods: {
        /**
         * 关闭弹窗
         */
        closeDialog(){
            this.$emit('closeResourceListDialog')
        },
        setAdPicture(){
            this.$emit('closeResourceListDialog',this.currentSelectedObj)
        },
        closeTag(item){
            this.changeSelectedTag(item)
        },
        /**
         * 
         */
        changeSelectedTag(itemObj){
            if(itemObj.isSelected){
                this.currentSelectedObj = itemObj
                this.adResourceList = this.adResourceList.map((item, index) =>{
                    return {
                        ...item,
                        isSelected: false
                    }
                })
                this.adResourceList.find(item => item.id == itemObj.id).isSelected = true
            } else {
                this.adResourceList = this.adResourceList.map((item, index) =>{
                    return {
                        ...item,
                        isSelected: false
                    }
                })
                this.currentSelectedObj = {}
            }
            
        },
        async prevAndNextClick(val){
            this.getResourceForm.page = val
            await this.getResourcePictureList()
        },
        /**
         * 切换页码
         */
        async handleCurrentPage(val){
            this.getResourceForm.page = val
            await this.getResourcePictureList()
        },
        /**
         * 请求图片资源列表
         */
        async getResourcePictureList(type){
            try{
                this.is_loading = true

                await operateCustomService.getAdResourceList(this.getResourceForm).then(data =>{
                    this.adResourceList = data.data.data
                    this.adResourceList = this.adResourceList.map((item, index) =>{
                        return {
                            ...item,
                            isSelected: false,
                        }
                    })
                    //分页信息
                    this.pagination.currentPage = data.data.current_page //当前页码
                    this.pagination.total = data.data.total //列表总条数
                    this.adResourceList = this.adResourceList.map((item, index) =>{
                        let typeText = ''
                        if(item.type == 1){
                            typeText = '长图'
                        } else if(item.type == 2){
                            typeText = '全屏'
                        } else if(item.type == 3){
                            typeText = '半屏'
                        } else {
                            typeText = '广告'
                        }
                        return {
                            ...item,
                            typeName: typeText,
                        }
                    })
                    this.is_loading = false
                }).catch(error =>{
                    this.$message({
                        type: 'error',
                        message: error.message
                    })
                    this.is_loading = false
                }).finally(() =>{
                    this.is_loading = false
                })
            }catch(error){
                this.$message({
                    type: 'error',
                    message: error.message
                })
                this.is_loading = false
            }
        }
    },
    async mounted(){
        await this.getResourcePictureList()
        if(this.isEdit){
            
            this.currentSelectedObj.url = this.selectedAdPicture.url
            this.currentSelectedObj.id = this.selectedAdPicture.id
            this.currentSelectedObj.name = this.selectedAdPicture.name
            this.currentSelectedObj.type = this.selectedAdPicture.type
            this.currentSelectedObj.isSelected = true
            
            let typeText = ''
            if(this.currentSelectedObj.type == 1){
                typeText = '长图'
            } else if(this.currentSelectedObj.type == 2){
                typeText = '全屏'
            } else {
                typeText = '半屏'
            }
            //渲染字段
            this.currentSelectedObj.typeName = typeText
            //筛选当前选中的图片
            this.adResourceList = this.adResourceList.map((item, index) =>{
                return item.id == this.currentSelectedObj.id? {
                    ...item,
                    isSelected: true
                } : {
                    ...item,
                    isSelected: false
                }
            })

            // this.adResourceList.find(item => item.id == this.currentSelectedObj.id).isSelected = true
        }
    }
}
</script>
<style lang="scss" scoped>
    .header{
        display: flex;
        justify-content: space-between;
        line-height: 30px;
        & p{
            font-weight: bold;
        }
    }
    .image {
        height: 210px;
        width: 100%;
        display: block;
    }
    .bottom {
        width: 100%;
        margin-top: 7px;
        height: 24px;
        line-height: 24px;
        display: flex;
        justify-content: space-between;
        .bottom-left{
            width: 90px;
        }
        .bottom-right{
            width: 90px;
            .button{
                padding: 0;
            }
        }
    }
</style>

