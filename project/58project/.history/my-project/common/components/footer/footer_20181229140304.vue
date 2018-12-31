<template>
    <div>
        <div class="footer-box">
            <div 
                class="footer-item"
                v-for="(item,index) in footerList"
                :key="index"
                @click="changeMenu(item)">
                <div class="footer-item-menu">
                    <div class="footer-icon">
                        <img :src="item.icon" alt="">
                    </div>
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
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
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
    }
    .footer-icon{
        margin: 0 auto;
        height: .3rem;
        width: .3rem;
        background: #ccc;
    }
    .footer-icon img{
        display: inline-block;
        height: .3rem;
        width:.3rem;
    }
    .footer-text{
        margin: 0 auto;
        height: .2rem;
        line-height: .2rem;
        font-size: .16rem;
        width:100%;
    }

</style>
