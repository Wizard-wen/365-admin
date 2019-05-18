<template>
    <div class="">
        <search-list @changeQuery="changeAuthentication" :queryName="'认证状态'" :queryList="configForm.authentication"></search-list>
    </div>
</template>
<script>
import searchList from './queryComponent/searchList.vue'
export default {
    data(){
        return {
            setConfigForm: [],//本地接收的搜索config字段
        }
    },
    components: {
        searchList
    },
    computed:{
        configForm(){
            return this.$store.state.hrModule.configForm
        }
    },
    watch:{
        
    },
    methods: {
        changeAuthentication(){
            
        }
    },
    mounted(){

    }
}
</script>
<style lang="scss" scoped>

</style>


