<template>
    <page-edit-component
        :title="userItem.name">

        <template slot="icon" >
            <icon-component
                :iconUrl="userItem.icon?`${userItem.icon}`:''"
                :height="140"
                :width="100"></icon-component>
        </template>
        
        <template slot="detail" >
            <div class="detail-left">
                <div class="detail-left-box">
                    <div class="detail-left-line">手机号：{{userItem.phone}}</div>
                </div>
            </div>
        </template>
        <template slot="control">
            <div class="control-contains">
                <el-button size="mini" @click="goback">返回</el-button>
            </div>
        </template>
        <template slot="form">
            <card-box-component 
                :title="'客户订单'">
                <order-table-component
                    :orderModuleType="'client'"
                    :tableData="orderTable"
                    :orderConfigForm="orderConfigForm"></order-table-component>
            </card-box-component>
            
        </template>
    </page-edit-component>
</template>

<script>
import {clientService} from '@/service/operateClient.ts'
import orderTableComponent from './clientItem/orderTableComponent.vue'
export default {
    components: {
        orderTableComponent,
    },
    data(){
        return {
            is_loading: false,
            userItem: {},
            orderConfigForm: {},
            orderTable: [],

        }
    },
    methods: {
        async getData(){
            try{
                this.is_loading = true

                await clientService.getUser(this.$route.query.id).then((data) =>{

                    this.userItem = data[0].data
                    this.orderTable = data[0].data.orders
                    this.orderConfigForm = data[1].data
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
            this.$router.push('/operate/clientList')
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