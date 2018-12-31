<template>
    <div>
        <div class="footer-box">
            <div 
                class="footer-item"
                v-for="(item,index) in footerList"
                :key="index"
                @click="changeMenu(item)">
                <div class="footer-icon">

                </div>
                <div class="footer-text">
                    {{item.name}}
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
        padding: .1rem;
    }

</style>
