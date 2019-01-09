<template>
    <div class="main">
        <Hog-layout
        :closeAble="closeAble"
        :menuNav="menuList"
        :menuState="1">
            <div slot="header" class="header"></div>
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
            return store.state.loginModule.user.menu
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
    .header{
        height: 50px;
        width:100%;
        background: #394043;
    }
</style>

