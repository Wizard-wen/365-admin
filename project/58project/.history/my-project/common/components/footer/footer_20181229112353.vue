<template>
    <div>
        <div>
            <div 
                v-for="(item,index) in footerList"
                :key="index"></div>
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
