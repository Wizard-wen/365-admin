<template>
    <div class="order-box">
        <div class="order-edit">
            <div class="order-message-box" :style="{width: isSearch? 'calc(50% - 8px)' : '100%'}">
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
    </div>

</template>
<script>
import base from './components/base.vue'
import matchLog from './components/matchLog.vue'
import serviceList from './components/serviceList.vue'
import matchBox from './components/matchBox.vue'
export default {
    data(){
        return {
            input:'',
            options2: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶',
            }],
            /**
             * 订单查找字段
             */
            searchForm:{
                region:''
            },
            typeList: [
                {
                    name:'区域'
                },
                {
                    name:'标签'
                },
                {
                    name:'服务类型'
                },
                {
                    name:'区域'
                },
            ],
            showSearchBox:false,
            isSearch: true,

            
        }
    },
    methods:{   
        onSubmit(){

        },
        spread(){
            this.showSearchBox = !this.showSearchBox
        },
        pullSearch(){
            let state = this.isSearch
            this.isSearch = Boolean(!state);
        }
    },
    components:{
        baseComponent: base,
        serviceListComponent: serviceList,
        matchLogComponent: matchLog,
        matchBoxComponent: matchBox,
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
                    overflow-y: auto;
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
