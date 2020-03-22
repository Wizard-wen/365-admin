<template>
    <div class="main">
        <Hog-layout
        :closeAble="closeAble"
        :menuNav="menuList"
        :menuState="2">
        </Hog-layout>
    </div>
</template>

<script>
import {Layout} from '@/public/components/index.js'


export default {
    data(){
        return {
            closeAble: false,
        }
    },
    computed:{
        menuList(){
            return this.$store.state.loginModule.user.menuList        
        }
    },
    components: {
        HogLayout: Layout,
    },
}
</script>

<style scoped lang="scss">

</style>

