<template>
    <Menu active-name="/Demo4" theme="light" width="auto" @on-select="selectMenuItem" @on-open-change="openMenu">
        <Submenu name="1" v-for="(item, index) in menuNav" :key="item.id" v-if="item.children">
            <template slot="title">
                {{ item.title }}
            </template>
            <div v-for="(val, i) in item.children" :key="val.id">
                <MenuItem v-if="!val.children" :name='val.router'>{{ val.title }}</MenuItem>
                <!-- 递归 -->
                <menuNav v-else :menuNav="item.children" :selectMenuItem="selectMenuItem"></menuNav>
            </div>
        </Submenu>
    </Menu>
</template>
<script>
    export default {
        name: 'menuNav',
        props: {
            //菜单导航
            menuNav: {
                type: Array,
                required: true
            },
            //选择子菜单
            selectMenuItem: {
                type: Function,
                required: true,
            },
            //选择父菜单
            openMenu: {
                type: Function,
                default: ()=>{
                    return
                }
            }
        },
        computed: {
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
