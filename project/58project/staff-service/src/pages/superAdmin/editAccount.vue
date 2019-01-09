<template>
    <div>
        <div v-if="isEdit == 0">
            查看
        </div>  
        <div v-else>
            编辑
        </div>     
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    computed: {
        isEdit(){
            return this.$route.query.type
        }
    },
    async mounted(){
        
    }
}
</script>
<style lang="scss" scoped>

</style>

