<template>
    <div class="resource" v-loading="is_loading">  
        <div class="resource-header">
            <div class="resource-name">
                <h4>图片素材库</h4>
            </div>
            <div class="btn-group">
                <el-button size="mini" type="primary" @click="openEditResourcePictureDialog(2)">添加图片</el-button>
            </div>
            <select-tag-component
                :hasBorder="false"
                :propTagList="selectResourceTypeList"
                v-model="resourceType"
                :isSingle="true"></select-tag-component>
        </div>
        <edit-resource-picture-dialog
            :resourcePictureItem="resourcePictureItem"
            :resourceTypeList="resourceTypeList"
            :isEdit="isEdit"
            v-if="editResourcePictureVisible"
            :editResourcePictureVisible="editResourcePictureVisible"
            @closeEditResourcePictureDialog="closeEditResourcePictureDialog"></edit-resource-picture-dialog>
        <div class="resource-down">
            <div class="resource-contains">
                <el-row>
                    <el-col :span="6" v-for="(item, index) in adResourceList" :key="index" style="margin-bottom:20px;">
                        <div style="padding: 0 10px;">
                            <el-card :body-style="{ padding: '0px' }">
                                <div class="resource-image-box">
                                    <el-image
                                        class="resource-image"
                                        :src="item.url"
                                        :preview-src-list="[item.url]"
                                        :fit="'contain'">
                                        <div slot="error" class="resource-image-slot">
                                            <i class="el-icon-picture-outline"></i>
                                        </div>
                                    </el-image>
                                </div>
                               

                                <div class="image-des">
                                    <span>{{item.name}}</span>
                                    <div class="bottom">
                                        <div class="bottom-left">
                                            <el-tag size="small">{{item.typeName}}</el-tag>
                                        </div>
                                        <div class="bottom-right">
                                            <el-button type="text" class="button" @click="openEditResourcePictureDialog(1,item)">编辑</el-button>
                                            <el-button type="text" class="button" @click="deleteResource(item)">删除</el-button>
                                        </div>
                                    </div>
                                </div>
                            </el-card>
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
            </div>
        </div>
    </div>
</template>

<script>
import {operateCustomService} from '@/service/operateCustom'
import editResourcePictureDialog from './pictureResourceList/editResourcePictureDialog.vue'

import {resourceTypeList} from './pictureResourceList/IresourcePicture'
export default {
    components: {
        editResourcePictureDialog,
    },
    data(){
        return {
            is_loading: false,
            //广告资源
            adResourceList: [],
            //资源种类
            resourceType: 0,
            resourceTypeList,
            /**
             * 分页信息
             */
            pagination: {
                total: 0,
                currentPage: 1,
                pageNumber: 8,
            },
            //查询图片列表
            getResourceForm: {
                page: 1, 
                pageNumber: 8,
                type: 0,
            },
            //创建资源图片弹窗
            editResourcePictureVisible: false,
            //当前编辑的资源图片
            resourcePictureItem:{},
            //当前是编辑还是新建资源图片
            isEdit: false,
        }
    },
    computed: {
        selectResourceTypeList(){
            return [
                {id: 0, name: '全部',},
                ...this.resourceTypeList
            ]
        }
    },
    watch: {
        async resourceType(val){
            this.getResourceForm.type = val
            await this.getResourcePictureList()
        }
    },
    methods: {
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
         * 删除广告资源
         * @param item 
         */
        async deleteResource(item){
            await this.$confirm('确定要删除该资源图片吗, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(async () => {
                await this.deleteAdResourceRequest(item.id)
                await this.getResourcePictureList()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                });          
            });
        },
        async deleteAdResourceRequest(id){
            try{
                this.is_loading = true
                await operateCustomService.deleteAdResource(id).then( data =>{
                    if(data.code == '0'){
                        this.$message({
                            type: 'success',
                            message: data.message
                        });
                        this.is_loading = false
                    }
                }).catch(error =>{
                    this.$message({
                        type: 'error',
                        message: error.message
                    });
                    this.is_loading = false
                }).finally(() =>{
                    this.is_loading = false
                })
            } catch(error){
                this.$message({
                    type: 'error',
                    message: error.message
                });
                this.is_loading = false
            }
            
        },
        /**
         * 打开创建新资源图片弹窗
         */
        openEditResourcePictureDialog(type, item){

            this.resourcePictureItem = type == 1 ? {...item,} : null

            this.isEdit = type == 1? true: false
            this.editResourcePictureVisible = true

        },
        /**
         * 关闭创建新资源图片弹窗
         */
        async closeEditResourcePictureDialog(){
            this.editResourcePictureVisible = false
            await this.getResourcePictureList()
        },
        /**
         * 请求图片资源列表
         */
        async getResourcePictureList(){
            try{
                this.is_loading = true

                await operateCustomService.getAdResourceList(this.getResourceForm).then(data =>{
                    this.adResourceList = data.data.data
                    //分页信息
                    this.pagination.currentPage = data.data.current_page //当前页码
                    this.pagination.total = data.data.total //列表总条数
                    this.adResourceList = this.adResourceList.map((item, index) =>{
                        return {
                            ...item,
                            typeName: this.resourceTypeList.find(it => it.id == item.type).name,
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
    }
}
</script>

<style lang="scss" scoped>
.resource{
    width: 100%;
    min-height: calc(100vh - 50px);
    background:#f0f2f5;
    .resource-header{
        background: #fff;
        padding: 30px 24px 0px 24px;
        position: relative;
        .resource-name{
            line-height: 28px;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 20px;
        }
        .btn-group{
            & /deep/ .el-button{
                margin-left: 0px;
            }
            position: absolute;
            right: 24px;
            top: 20px;
        }
    }
    .resource-down{
        margin: 24px;
        
        .resource-contains{
            padding: 20px;
            background: #fff;
        }
    }
}
.resource-image-box{
    width: 100%;
    height: 211px;
    border-bottom: 1px dashed #ccc;
    .resource-image {
        height: 210px;
        width: 300px;
        margin: 0 auto;
        display: block;
        /deep/ .resource-image-slot{
            width: 300px;
            height: 210px;
            font-size: 30px;
            text-align: center;
            line-height: 210px;
            // background: #f5f7fa;
        }
    }
}
.image-des{
    padding: 14px;
    height: 75px;
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
}
    
    




</style>