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
import HogLayout from '../../common/components/Layout/SystemLayout.vue'


export default {
    data(){
        return {
            closeAble: true,
        }
    },
    methods:{

    },
    computed:{
        menuList(){
            return store.state.loginModule.user.menuList        
        }
    },
    components: {
        HogLayout,
    },
    async mounted(){
        // this.menuList = await menuService.getMenuList()
    }
}
</script>

<style scoped lang="scss">

</style>

