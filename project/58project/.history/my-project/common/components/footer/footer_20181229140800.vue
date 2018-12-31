<template>
    <div>
        <div class="footer-box">
            <div 
                class="footer-item"
                v-for="(item,index) in footerList"
                :key="index"
                @click="changeMenu(item)">
                <div class="footer-item-menu">
                    <img class="footer-icon" :src="item.icon" alt="">
                    <div class="footer-text">
                        {{item.name}}
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods: {
        /**
         * 切换footer
         */
        changeMenu(item){

        }
    },
    props: {
        footerList: {
            type: Array,
            default: function(){
                return []
            }
        }
    }
}
</script>
<style scoped>
    .footer-box{
        /* position: fixed;
        left: 0;
        bottom: 0;
        right: 0; */
        height: .7rem;
        width:100%;
        display: flex;
        justify-content: space-around;
        padding: .1rem 0;
    }
    .footer-item{
        float:left;
        width: 25%;
        height: .5rem;
    }
    .footer-item-menu{
        margin: 0 auto;
        height: .5rem;
        width: .5rem;
    }
    .footer-icon{
        display: inline-block;
        height: .3rem;
        width: .3rem;
    }
    .footer-text{
        height: .2rem;
        line-height: .2rem;
        font-size: .14rem;
        width:.3rem;
    }

</style>
