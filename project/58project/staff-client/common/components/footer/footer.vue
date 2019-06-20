<template>
    <div class="footer">
        <div class="footer-box">
            <div 
                class="footer-item"
                v-for="(item,index) in footerConfig"
                :key="index">
                <div 
                    class="footer-item-menu" 
                    @click="changeActive(index,item)">
                    <img v-if="activeIndex!=index" class="footer-icon" :src="item.icon" alt="">
                    <img v-else class="footer-icon" :src="item.highIcon" alt="">
                    <div 
                        class="footer-text" 
                        :style="{color:activeIndex==index?'#d81e06':'#333' }">
                        {{item.name}}
                    </div>
                </div>
            </div>

        </div>
    </div>
    
</template>
<script>
import footerConfig from './index.js'
export default {
    data(){
        return{
            activeIndex: 0
        }
    },
    methods: {
        /**
         * 切换footer
         * 控制高亮，路由跳转
         */
        changeActive(index,item){
            this.activeIndex = index
            this.$router.push(item.router)
        }
    },
    props: {
        footerConfig: {
            type: Array,
            default: function(){
                return footerConfig
            }
        }
    },
    mounted(){
        this.footerConfig.forEach((item, index) =>{
            if(item.router == this.$route.path){
                this.activeIndex = index
            }
        })
    }
}
</script>
<style scoped>
    .footer{
        height: .5rem;
        width: 100%;
        /* position: fixed;
        bottom: 0; */
    }
    .footer-box{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 99;
        background: #fff;
        /* background: red; */
        height: .5rem;
        width:100%;
        display: flex;
        justify-content: space-around;
        padding:.05rem 0;
        box-shadow: 0 -2px 2px 0 rgba(0, 0, 0, 0.03)
    }
    .footer-item{
        width: 25%;
        height: .4rem;
    }
    .footer-item-menu{
        margin: 0 auto;
        height: .4rem;
        width: .5rem;
        cursor: pointer;
    }
    .footer-icon{
        display: inline-block;
        height: .22rem;
        width: .22rem;
        margin-left: .14rem;
    }
    .footer-text{
        height: .18rem;
        line-height: .18rem;
        font-size: .14rem;
        text-align: center;
        width:100%;
    }

</style>
