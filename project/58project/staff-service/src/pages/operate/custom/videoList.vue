<template>
    <div class="resource" v-loading="is_loading">  
        <div class="resource-header">
            <div class="resource-name">
                <h4>视频资源库</h4>
            </div>
            <div class="btn-group">
                <el-button size="mini" type="primary" @click="openEditResourceVideoDialog(2)">添加视频</el-button>
            </div>
        </div>
        <edit-resource-video-dialog
            :resourceVideoItem="resourceVideoItem"
            v-if="editResourceVideoVisible"
            :editResourceVideoVisible="editResourceVideoVisible"
            @closeEditResourcePictureDialog="closeEditResourcePictureDialog"></edit-resource-video-dialog>
        <div class="resource-down">
            <el-row>
                <el-col :span="6" v-for="(item, index) in videoResourceList" :key="index" style="margin-bottom:20px;">
                    <div style="padding: 0 10px;">
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="resource-box">
                                <img :src="`./resource/${item.picture_url}`" class="general-image">
                                <div class="resource-message">
                                    <div class="header">
                                        <p class="title">{{item.name}}</p>
                                        <div class="created_at">上传于{{item.created_at | timeFomatter}}</div>
                                    </div>
                                    <div class="bottom">
                                        <div class="bottom-left">
                                            <el-tag size="small">{{item.teacher}}</el-tag>
                                        </div>
                                        <div class="bottom-right">
                                            <el-button type="text" class="button" @click="goVideoResourceItemPage(item)">编辑</el-button>
                                            <el-button type="text" class="button" @click="deleteResource(item)">删除</el-button>
                                        </div>
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
</template>

<script>
import {customService, $utils} from '../../../../common'
import {selectTagComponent} from '@/pages/components/index.js'
import {editResourceVideoDialog} from './videoList/index.js'
export default {
    components: {
        selectTagComponent,
        editResourceVideoDialog,
    },
    data(){
        return {
            is_loading: false,
            //广告资源
            videoResourceList: [],
            /**
             * 分页信息
             */
            pagination: {
                total: 0,
                currentPage: 1,
                pageNumber: 8,
            },
            getResourceForm: {
                page: 1, 
                pageNumber: 8,
                teacher: '',
                name: '',
            },
            //创建资源图片弹窗
            editResourceVideoVisible: false,
            //当前编辑的资源图片
            resourceVideoItem:{},
        }
    },
    filters: {
        timeFomatter(value){
            if(value == 0){
                return '-'
            }
            return $utils.formatDate(new Date(value), 'yyyy-MM-dd')
        },
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
            await this.$confirm('确定要删除该资源视频吗, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(async () => {
                await this.deleteVideoResource(item.id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                });          
            });
        },
        /**
         * 删除视频资源
         */
        async deleteVideoResource(id){
            try{
                this.is_loading = true
                await customService.deleteVideo(id).then( async data =>{
                    if(data.code == '0'){
                        this.$message({
                            type: 'success',
                            message: data.message
                        });
                        this.getResourcePictureList()
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
        openEditResourceVideoDialog(item){
            this.resourceVideoItem =  item
            this.editResourceVideoVisible = true
        },
        /**
         * 进入视频编辑页
         */
        goVideoResourceItemPage(paramObj){
            this.$router.push({
                path: '/operate/resourceVideoItem',
                query: {
                    id: paramObj.id
                }
            })
        },
        /**
         * 关闭创建新资源图片弹窗
         */
        async closeEditResourcePictureDialog(){
            this.editResourceVideoVisible = false
            await this.getResourcePictureList(this.resourceType)
        },
        /**
         * 请求图片资源列表
         */
        async getResourcePictureList(type){
            try{
                this.is_loading = true

                await customService.getVideoList(this.getResourceForm).then(data =>{
                    this.videoResourceList = data.data.data
                    //分页信息
                    this.pagination.currentPage = data.data.current_page //当前页码
                    this.pagination.total = data.data.total //列表总条数
                    this.videoResourceList = this.videoResourceList.map((item, index) =>{
                        let typeText = ''
                        if(item.type == 1){
                            typeText = '长图'
                        } else if(item.type == 2){
                            typeText = '全屏'
                        } else {
                            typeText = '半屏'
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
        await this.getResourcePictureList(0)
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
    }
}

    .resource-box{
        .general-image{
            height: 210px;
            width: 100%;
            display: block;
        }
        .resource-message{
            padding: 14px;
            .header{
                height: 20px;
                width: 100%;
                display: flex;
                .title{
                    flex: 1;
                }
                .created_at{
                    width: 120px;
                    color: #ccc;
                }
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
        }
    }





</style>