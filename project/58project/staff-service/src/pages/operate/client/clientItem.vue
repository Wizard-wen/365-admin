<template>
    <page-edit-component
        :title="userItem.name">

        <template slot="icon" >
            <div class="icon">
                <img style="height: 120px;width: 120px;" :src="`./resource/${userItem.icon}`" alt="" v-if="userItem.icon">
                <div class="no-icon-style" v-else>暂无头像</div>
            </div>
        </template>
        
        <template slot="detail" >
            <div class="detail-left">
                <div class="detail-left-box">
                    <div class="detail-left-line">手机号：{{userItem.phone}}</div>
                    <div class="detail-left-line">创建时间：{{userItem.created_at | formDate}}</div>
                    <div class="detail-left-line">更新时间：{{userItem.updated_at | formDate}}</div>
                </div>
            </div>
        </template>
        <template slot="control">
            <div class="control-contains">
                <el-button size="mini" @click="goback">返回</el-button>
            </div>
        </template>
    </page-edit-component>
</template>

<script>
import {
    pageEditComponent,
} from '@/pages/components/index.js'
import {operateService} from '../../../../common'
export default {
    components: {
        pageEditComponent,
    },
    data(){
        return {
            is_loading: false,
            userItem: {},

        }
    },
    methods: {
        async getData(){
            try{
                this.is_loading = true

                await operateService.getUser(this.$route.query.id).then((data) =>{

                    this.userItem = data.data
                    this.is_loading = false
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                    this.is_loading = false
                }).finally(() =>{
                    this.is_loading = false
                })

            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_loading = false
            }
        },
        goback(){

        }
    },
    async mounted(){
        await this.getData()
    }
}
</script>

<style lang="scss" scoped>
    .detail-left{
        flex:1;
        .detail-left-box{
            display: flex;
            flex-wrap: wrap;
            .detail-left-line{
                width: 50%;
                color: rgba(0,0,0,.65);
                line-height: 20px;
                padding-bottom: 8px;
            }
        }
    }
    // 没有头像
    .no-icon-style{
        height: 120px;
        width: 120px;
        line-height: 120px;
        text-align: center;
        color: #fff;
        background: rgba(0,0,0,0.3)
    }
</style>