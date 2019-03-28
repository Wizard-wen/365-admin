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
                <el-col :span="8" v-for="(item, index) in fileList" :key="index" :offset="index > 0 ? 2 : 0">
                    <el-card >
                        <img :src="`./api/resource/${item.path}`" class="file-image">
                        <!-- <div style="padding: 14px;">
                            <div class="bottom clearfix">
                                <el-button type="text" class="button">查看大图</el-button>
                            </div>
                        </div> -->
                    </el-card>
              </el-col>
            </el-row>
        </div>
    </el-card>  
</template>
<script>
export default {
    components: {
    },
    data(){
        return {
            //是否展示日志
            isShow:true,
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
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }
</style>


