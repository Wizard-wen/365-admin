<template>
    <el-card class="box-card">
        <div slot="header" class="card-header">
            <h3>合同详情</h3>
            <div class="control">
                <el-button 
                    type="text" 
                    :icon="isShow? 'el-icon-arrow-up' : 'el-icon-arrow-down'" 
                    circle size="small" 
                    @click="changeLogState">{{isShow?`收起`:`展开`}}</el-button>
            </div>
        </div>
        <div v-if="isShow">
            <el-row>
                <el-col :span="6" v-for="(item, index) in fileList" :key="index" style="padding: 0 10px">
                    <el-card :body-style="{ padding: '0px' }">
                        <img :src="`./resource/${item.path}`" class="file-image">
                        <div class="bottom">
                            <el-button type="text" class="button" @click="showDetialPic(item.path)">查看大图</el-button>
                        </div>
                    </el-card>
              </el-col>
            </el-row>
        </div>
        <picture-detail-dialog
            :imageUrl="imageUrl"
            :title="'合同详情'"
            :openPictureDetailDialog="openPictureDetailDialog"
            @closePictureDetailDialog="openPictureDetailDialog=false"></picture-detail-dialog>
    </el-card>  
</template>
<script>
import pictureDetailDialog from './pictureDetailDialog.vue'
export default {
    components: {
        pictureDetailDialog
    },
    data(){
        return {
            //是否展示日志
            isShow:true,
            openPictureDetailDialog: false,
            imageUrl: '',
        }
    },
    computed: {
        /**
         * 合同列表
         */
        fileList(){
            return this.$store.state.orderModule.order_files
        }
    },
    methods: {
        //改变表单的显示隐藏状态
        changeLogState(){
            this.isShow = !this.isShow
        },
        /**
         * 图片详情
         */
        showDetialPic(path){
            this.imageUrl = './resource/'+path
            this.openPictureDetailDialog = true
        }
    }
}
</script>
<style lang="scss" scoped>
    .line-bottom-1px{
        &:after{
            position: absolute;
            content: '';
            display: block;
            height: 1px;
            width: 100%;
            background: #ccc; 
            bottom: 0;
        }
    }
    .box-card{
        margin: 10px 0 10px 10px;
        & /deep/ .el-card__header{
            padding: 0 30px;
        }
        & /deep/ .el-card__body{
            padding: 20px;
        }
        .card-header{
            height:50px;
            width:100%;
            padding-right: 30px;
            display: flex;
            justify-content: space-between;
            & h3{
                line-height: 50px;
            }
            .control{
                padding: 9px 0;
            }
        }
        .service-box{

        }
    }
    .file-image{
        width: 100%;
        display: block;
    }
  .bottom {
    line-height: 15px;
    height: 35px;
    padding:10px;
  }

  .button {
    padding: 0;
    float: right;
  }
</style>


