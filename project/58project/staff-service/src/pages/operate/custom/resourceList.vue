<template>
    <div class="resource">  
        <div class="resource-header">
            <div class="resource-name">
                <h4>广告资源库</h4>
            </div>
            <div class="btn-group">
                <el-button size="mini" type="primary" >添加图片</el-button>
            </div>
        </div>
        <div class="resource-down">
            <el-row>
                <el-col :span="6" v-for="o in 4" :key="o">
                    <div style="padding: 0 10px;">
                        <el-card :body-style="{ padding: '0px' }">
                            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                            <div style="padding: 14px;">
                                <span>好吃的汉堡</span>
                                <div class="bottom clearfix">
                                    <el-button type="text" class="button">操作按钮</el-button>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import {customService} from '../../../../common'
export default {
    data(){
        return {
            is_loading: false,
            //广告资源
            adResourceList: [],
        }
    },
    async mounted(){
        try{
            this.is_loading = true
            await customService.getAdResourceList().then(data =>{
                console.log(data)
                this.adResourceList = data.data.data
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
}
</script>

<style lang="scss" scoped>
.resource{
    width: 100%;
    min-height: calc(100vh - 50px);
    background:#f0f2f5;
    .resource-header{
        background: #fff;
        padding: 30px 24px 24px 24px;
        position: relative;
        .resource-name{
            line-height: 28px;
            font-size: 20px;
            font-weight: 700;
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

  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>