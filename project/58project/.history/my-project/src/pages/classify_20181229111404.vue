<template>
    <div>
        分类
        <div @click="goPage">
            二级分类列表
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    methods: {
        goPage(){
            this.$router.push('/classify/serviceList')
        }
    }
}
</script>

