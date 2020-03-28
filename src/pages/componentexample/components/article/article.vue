<template>
    <div class="article">
        <div class="articleMenu">
            <el-checkbox v-model="openMenu" class="articleMenuBtn">
            </el-checkbox>
            <el-tree 
                v-if="menu.length && openMenu"
                :render-content="renderContent" 
                :data="menu"></el-tree>
        </div>
        <slot></slot>
    </div>
</template>
<script>
    function makeMenu(article){
        var nodeArr = []
        var nodePath = [{tagName: 'H0', children: nodeArr}]

        function add(subEl){
            if(nodePath[0].tagName < subEl.tagName){
                var node = {
                    title: subEl.innerHTML,
                    tagName: subEl.tagName,
                    expand: true,
                    id: subEl.getAttribute("id"),
                    children: [],
                }
                nodePath[0].children.push(node)
                nodePath.unshift(node)
            } else if(nodePath[0].tagName >= subEl.tagName){
                nodePath.shift()
                add(subEl)
            }
        }

        Array.from(article.querySelectorAll('.h1, .h2, .h3')).forEach(subEl => {
            add(subEl)
        })
        return nodeArr
    }

    export default {
        data () {
            return {
                menu: [],
                openMenu: true
            }
        },
        methods: {

            renderContent (h, { root, node, data }) {
                return h('span', {class: 'ivu-tree-title', on:{"click":($event)=>{this.click(data)}}},[data.title],2)
            },
            click(item){
                document.querySelector('#' + item.id).scrollIntoView()
                // #5900
                document.body.scrollIntoView()
            }
        },
        mounted(){
            this.menu = makeMenu(this.$el)
        },
    }
</script>
<style scoped>
    .article{
        color: #495060;
        padding: 20px;
        -webkit-tap-highlight-color : transparent ;
        font-family : "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\\5FAE软雅黑", Arial, sans-serif ;
        background-color : rgb(255, 255, 255) ;
    }
    .articleMenu{
        position: fixed;
        z-index: 800;
        padding: 10px 0;
        background-color: rgba(255, 255, 255, 0);
        right: 20px;
        top: 60px;
        border-left: 1px solid #dddee1;
        transition: .4s background-color;
    }
    .articleMenu >>> .ivu-tree{
        opacity: 0.2;
        transition: .4s opacity;
    }
    .articleMenu:hover{
        background-color: rgba(255, 255, 255, .8);
    }
    .articleMenu:hover >>> .ivu-tree{
        opacity: 1;
    }
    .articleMenu >>> .ivu-tree-arrow{
        display: none;
    }
    .articleMenu >>> .ivu-tree-title{
        color:  #2d8cf0;
        text-decoration: underline;
        cursor: pointer;
        background-color: transparent;
    }
    .articleMenu >>> .ivu-tree-title.ivu-tree-title-selected{
        background-color: transparent;
    }
    .articleMenuBtn{
        float: right;
        margin-top: -10px;
    }
</style>
