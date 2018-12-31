<template>
    <div>
        <div>
            <div 
                v-for="(item,index) in footerList"
                :key="index">
                <div class="footer-icon">

                </div>
                <div class="footer-text">

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

</style>
