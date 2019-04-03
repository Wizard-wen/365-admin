<template>
    <div class="paper-box">
        <el-button style="margin-bottom:15px;" icon="el-icon-plus"  @click="openPaperDialog('new', {})">添加证书</el-button>
        <el-row>
            <el-col :span="24" v-for="(item, index) in paperList" :key="index">
                <el-card :body-style="{ padding: '0px' }">
                    <div class="paper-imgs">
                        <img 
                            class="paper-item-img" 
                            v-for="(it, inds) in item.images" 
                            :key="inds" 
                            :src="it.url"
                            @click="showDetialPic(it.url)">
                    </div>
                    <div class="image-messsage">
                        <p>{{item.paper_category_name}}</p>
                        <div>
                            <el-button @click="deleteFormPaper(item)" class="el-icon-delete" type="text" size="small">删除</el-button>
                            <el-button @click="openPaperDialog('edit', item)" class="el-icon-edit" type="text" size="small">编辑</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <paper-dialog 
            :isEditPaper="paperDialog.isEditPaper"
            :paperDialogVisible="paperDialog.paperDialogVisible"
            v-if="paperDialog.paperDialogVisible"
            :paperProps="paperDialog.paperAddModel"
            :selectedPapers="paperList"
            @changePaper="changePaper"
            @closePaper="cancelPaperFn"></paper-dialog>
        <picture-detail-dialog
            :imageUrl="imageUrl"
            :title="'证书详情'"
            :openPictureDetailDialog="openPictureDetailDialog"
            @closePictureDetailDialog="openPictureDetailDialog=false"></picture-detail-dialog>
    </div>
</template>
<script>
import paperDialog from './paperDialog.vue'
import pictureDetailDialog from '../../sale/components/pictureDetailDialog.vue'
export default {
    props: {
        value: {
            type: Array,
            default: function(){
                return []
            }
        }
    },
    watch:{
        value: function(val){
            this.paperList = val
        }
    },
    components: {
        paperDialog,
        pictureDetailDialog
    },
    data(){
        return {
            paperList: [],//证书显示列表
            //证书弹出框
            paperDialog: {
                isEditPaper: false,
                paperDialogVisible: false,
                paperAddModel:{
                    paper_category_name: null,
                    paper_category_id: null,
                    images: [],
                }
            },
            openPictureDetailDialog: false,
            imageUrl: '',
        }
    },
    methods: {

        /**
         * 新建 或 编辑 证书信息----打开弹窗
         */
        openPaperDialog(state, paperItem){
            if(state == 'edit'){
                this.paperDialog.isEditPaper = true
                this.paperDialog.paperAddModel = {
                    paper_category_name: paperItem.paper_category_name,
                    paper_category_id: paperItem.paper_category_id,
                    images: [...paperItem.images],
                }
            } else {
                this.paperDialog.isEditPaper = false
                this.paperDialog.paperAddModel = {
                    paper_category_name: '',
                    paper_category_id: '',
                    images: [],
                }
            }
            this.paperDialog.paperDialogVisible = true
        },
        /**
         * 删除一条证书数据
         */
        deleteFormPaper(paperItem){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.paperList.forEach((item, index) =>{
                    if(item.paper_category_id == paperItem.paper_category_id){
                        this.paperList.splice(index, 1)
                    }
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });

        },
        /**
         * 添加证书，改变证书信息
         */
        changePaper(paperItem, isEdit){
            //若是编辑，替换证书
            if(isEdit){
                this.paperList.forEach((item, index) =>{
                    if(paperItem.paper_category_id == item.paper_category_id){
                        this.paperList.splice(index, 1, paperItem)
                    }
                })
            } else {
                //新建证书，直接插入
                this.paperList.push(paperItem)
            }

            //v-model
            this.$emit('input',this.paperList)
            
            //关闭弹窗
            this.paperDialog.paperDialogVisible = false
        },
        /**
         * 关闭证书编辑弹窗
         */
        cancelPaperFn(item){
            this.paperDialog.paperDialogVisible = false
        },
        /**
         * 查看大图
         */
        showDetialPic(path){
            this.imageUrl = path
            this.openPictureDetailDialog = true
        }
    },
    async mounted(){
    }
}
</script>
<style lang="scss" scoped>
.paper-box{
    width: 100%;
    min-width: 600px;
}
        .paper-imgs{
            height: 110px!important;
            padding: 5px 0;
            .paper-item-img{
                display: inline-block;
                height:100px;
                width: 100px;
                margin : 0 10px;
                cursor: pointer;
            }
        }
        .image-messsage{
            line-height: 40px;
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
        }
</style>


