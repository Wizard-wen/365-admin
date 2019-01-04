<template>
    <div class="main">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data(){
        return {
        }
    },
    mounted(){
        console.log(this.$store.state.loginModule.isLogin)
    }
}
</script>

<style scoped lang="scss">
    .main{
        background: #f5f5f5;
        height: 100vh;
        padding-bottom: .5rem;
        width: 100%;
    }
</style>
