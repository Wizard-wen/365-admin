<template>
    <div class="orderConfig" v-loading="is_loading">
        <!-- 订单头部信息 -->
        <order-header-component
            @updateOrderConfig="getOrder"
            :currentOrder="orderBase"
            :publicOrderType="4"
            :orderModuleType="'public'"></order-header-component>
            
        <div class="order-down">
            <!-- 订单基本信息 -->
            <public-order-base-component
                :orderBaseDetail="orderBase"
                :publicOrderType="4"
                @updatePublicOrderBase="getOrder"></public-order-base-component>
            <!-- 服务人员匹配 -->
            <card-box-component
                v-if="orderBase.type == 1 || orderBase.type == 3"
                :title="'服务人员匹配'">
                <template slot="contains">
                    <match-service-list @updateOrderConfig="getOrder"></match-service-list>
                </template>    
            </card-box-component>
            <!-- 已匹配的服务人员 -->
            <order-matched-worker-list-component
                v-if="orderBase.type == 1 || orderBase.type == 3"
                :orderBase="orderBase"
                :order_staff="order_staff"
                :publicOrderType="4"
                @updateOrderConfig="getOrder"></order-matched-worker-list-component>

        </div>
    </div>
</template>
<script>
    import {operateService, $utils, saleService} from '@common/index.js'
    // 匹配劳动者
    import matchServiceList from './saleOrderConfig/matchServiceList.vue'

    import { 
        orderHeaderComponent,//订单头部信息
        // orderConfigLog,//
        orderMatchedWorkerListComponent,//已经匹配的劳动者
        // orderContractList,//
    } from '@/public/module/orderConfig/index.js'

    // import {
    //     signedServiceDetailComponent,
    //     signedUserDetailComponent,
    // } from '@/public/module/contractItem/index.js'
    
    import {
        publicOrderBaseComponent,//订单基本信息
    } from '@/public/module/orderPublic/index.js'
export default {
    components: {
        matchServiceList, 
        orderHeaderComponent,
        orderMatchedWorkerListComponent,
        // orderContractList,
        // orderConfigLog,
        publicOrderBaseComponent,
        // signedServiceDetailComponent,
        // signedUserDetailComponent,
    },
    data(){
        return {
            is_loading: false,
        }
    },
    computed:{
        /**
         * 订单基本信息
         */
        orderBase(){
            return this.$store.state.saleModule.order
        },
        /**
         * 备选服务人员列表
         */
        order_staff(){
            return this.$store.state.saleModule.order_staff
        }
    },
    methods: {
        /**
         * 获取订单信息
         */
        async getOrder(){
            try{
                this.is_loading = true
                await saleService.getOrder(this.$route.query.order_id).then((data) =>{
                    if(data.code == "0"){
                        store.commit('configOrderData',data.data)
                    }
                    this.is_loading = false
                }).catch(e =>{
                    this.$message({
                        type:'error',
                        message: e.message
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
        /**
         * 跳转至服务人员详情
         * @param paramObj 匹配服务人员信息对象
         */
        goStaffDetail(paramObj){
            this.$router.push({
                path: "/sale/saleWorkerShow",
                query: {
                    id: paramObj.id,
                    from: this.$route.query.order_type,
                    order_id: this.$route.query.order_id
                }
            })
        },
        /**
         * 删除备选服务人员
         */
        async deleteMatchStaff(item){
            //要删除的备选劳动者
            let deleteStaffObj = {
                order_id: this.$route.query.order_id,
                order_staff_id: item.id
            }

            await this.$confirm(`确定删除该备选服务人员吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () =>{
                await this.deleteOrderStaff(deleteStaffObj)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: `已取消删除`
                });
            });
        },
        /**
         * 删除备选劳动者接口
         * @param order_staff_id 候选人员信息id
         * @param order_id 订单id
         */
        async deleteOrderStaff(deleteStaffObj){
            try{
                this.is_loading = true
                await saleService.deleteOrderStaff(deleteStaffObj)
                    .then(async data =>{
                        if(data.code == "0"){
                            this.$message({
                                type:'success',
                                message: data.message
                            })
                            this.is_loading = false
                            await this.getTableList()
                        }
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
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

    },
    async mounted(){
        await this.getOrder()
    }    
}
</script>
<style lang="scss" scoped>
    .orderConfig{
        width: 100%;
        min-height: calc(100vh - 50px);
        background:#f0f2f5;
        .order-header{
            background: #fff;
            padding: 30px 24px 24px 24px;
            position: relative;
            .order-name{
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
            .order-detail{
                padding-top: 12px;
                display: flex;
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
                .detail-right{
                    min-width: 400px;
                    display: flex;
                    .right-box{
                        height: 80px;
                        width: 50%;
                        .title{
                            color: rgba(0,0,0,.45);
                            font-size: 14px;
                            line-height: 1.5;
                        }
                        .value{
                            font-size: 20px;
                            color: rgba(0,0,0,.85);
                            line-height: 1.5;
                        }
                    }
                }
            }
        }
        .order-down{
            padding: 24px;
        }
    }
</style>


