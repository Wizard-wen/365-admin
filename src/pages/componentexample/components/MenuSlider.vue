<template>
    <MenuNav :menuNav="menuNav" :selectMenuItem="selectMenuItem"></MenuNav>
</template>
<script>
    import MenuNav from './MenuNav.vue'
    export default {
        data() {
            return {}
        },
        components: {
            MenuNav: MenuNav
        },
        props: {
            //菜单导航
            menuNav: {
                type: Array,
                required: true
            },
            //选择菜单
            selectMenuItem: {
                type: Function,
                required: true,
            },

        },
        methods: {

        }
    }

</script>
<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-logo {
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }

    .layout-nav {
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }

    .menuTitle {
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 26px;
        position: relative;
    }

</style>
