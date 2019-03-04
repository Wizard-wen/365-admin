<template>
    <div class="order-box">
        <!-- 未签约 -->
        <div class="order-edit" v-if="isSigned < 3">
            <div class="order-message-box" :style="{width: isSearch? 'calc(50% - 8px)' : '100%'}" >
                <div class="order-in-box">
                    <base-component></base-component>
                    <service-list-component></service-list-component>
                    <match-log-component></match-log-component>
                </div>
                
                <div class="order-pull" @click="pullSearch" :style="{right: isSearch? '-16px':'0px'}">
                    <i class="el-icon-arrow-left pull-icon"></i>
                </div>
            </div>

            <match-box-component v-if="isSearch" :style="{width: isSearch? 'calc(50% - 8px)' : 0}"></match-box-component>
        </div>

        <!-- 已签约 -->
        <div class="order-edit" v-if="isSigned >= 3">
            <div class="order-message-box">
                <div class="order-in-box">
                    <base-component></base-component>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import base from './components/base.vue'
import matchLog from './components/matchLog.vue'
import serviceList from './components/serviceList.vue'
import matchBox from './components/matchBox.vue'

import {orderService} from '../../../common'
export default {
    data(){
        return {
            isSearch: true, 
        }
    },
    methods:{   
        pullSearch(){
            let state = this.isSearch
            this.isSearch = Boolean(!state);
        }
    },
    computed:{
        /**
         * 该订单是否已经签约
         * des 根据vuex 中orderModule.order.type判断
         *  1 待匹配 2 已匹配 3 已签约 4 已取消 5 订单完成
         */
        isSigned(){
            return store.state.orderModule.order.type
        }
    },
    components:{
        baseComponent: base,
        serviceListComponent: serviceList,
        matchLogComponent: matchLog,
        matchBoxComponent: matchBox,
    },
    async mounted(){
        store.commit('setLoading',true)
        try{
            await orderService.getOrder(this.$route.query.id)
        }catch(e){
            this.$message({
                type:'error',
                message: e.message
            })
        }
        
        store.commit('setLoading',false)
    }
}
</script>
<style lang="scss" scoped>
    .line-bottom-1px{
        &:after{
            content: '';
            display: block;
            height: 1px;
            width: 100%;
            background: #ccc; 
        }
    }
    .order-box{
        height: calc(100vh - 50px);
        width: calc(100vw - 180px);
        width: 100%;
        overflow-y: hidden;
        .order-edit{
            background: #eaedf1;
            height:100%;
            width:100%;
            display: flex;
            justify-content: space-between;
            .order-message-box{
                height:calc(100vh - 50px);
                position: relative;
                // background: #fff;
                .order-in-box{
                    height: 100%;
                    width: 100%;
                    overflow-y: scroll;
                }
                .order-pull{
                    position: absolute;
                    right: 0px;
                    top:calc(50% - 60px);
                    height: 100px;
                    line-height: 100px;
                    width: 16px;
                    text-align: center;
                    background: #409EFF;
                    border-top-left-radius: 6px;
                    border-bottom-left-radius: 6px;
                    cursor: pointer;
                    .pull-icon{
                        color: #fff;
                        font-size: 14px;
                    }
                }
                
            }

            
        }
    }


</style>
