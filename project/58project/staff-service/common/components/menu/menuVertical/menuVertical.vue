<template>
    <div class="vertical-menu-box">
        <slider-vertical
        :menulist="propdatalist"
        :colorList="colorlist"
        :level="level"
        @changeHighState="changeHighLight"
        :highLight="highArr"></slider-vertical>
    </div>
</template>
<script>
import sliderVertical from './sliderVertical.vue'
export default {
    data(){
        return {
             /**
             * 分级目录颜色列表
             */
            colorlist : ['#333','#262626','#111','#000'],
            /**
             * 高亮数组
             */
            highArr: [0,0],
            //全部路由列表
            routerobject : {},
        }
    },
    props: {
        //列表数组
        datalist : {
            default : [],
            type : Array
        },
    },
    computed: {
        /**
         * 包装prop的datalist数据 
         */
        propdatalist(){
            
            //创建符合组件渲染需求的树形结构，增加一个level层级字段
            let arr = this.createTree(this.datalist, '0')
            //修改树形结构中的level字段，
            this.editTree(arr)
            return arr
        },
        level(){
            return 0
        }
    },
    methods: {
         /**
         * 生成一颗目录树
         * des 取得原始路由数据，包装成符合导航栏组件渲染结构的树形结构
         *      增加一个level字段，表示当前目录项的层级
         * @param Treelist
         * @param level
         */
        createTree(Treelist, level){
            var list = [];
            Treelist.forEach((item, index) => {
                item.level = level + '-' +index
                
                if(item.children){
                    item.children = this.createTree(item.children,level + '-' +index)
                }
                list.push(item)
            });
            return list
        },
        /**
         * 修改目录树
         * des 将树形结构的level字段改为数组形式
         * @param Treelist 树形结构
         */
        editTree(Treelist){
            if(Array.isArray(Treelist)){
                Treelist.forEach((item, index) =>{
                    item.level = item.level.split('-')
                    item.level = item.level.splice(1,item.level.length)
                    if(item.children){
                        this.editTree(item.children)
                    }
                })
            }else{
                throw new Error("expect array structure")
            }
        },
        /**
         * 遍历目录树-生成路径对象
         * @param Treelist 树形结构
         * @param valuenode 叶子结点信息
         */
        visitTree(Treelist, valuenode){
            let _this = this
            if(Array.isArray(Treelist)){
                Treelist.forEach((item, index) =>{
                    
                    //非路由节点
                    if(item.children){
                        this.visitTree(item.children, valuenode+'-'+index)
                    }else{
                        //终端页面包含子页面
                        if(item.contains){
                            //子页面数组
                            let contains_arr = item.contains
                            //子页面对应的终端页面
                            let father_router = item.router
                            //给子页面添加终端节点指针
                            contains_arr.forEach((it, index) => {
                                _this.routerobject[it.router] = father_router
                            })
                        }
                        //终端页面不含子页面
                        this.routerobject[item.router] =  valuenode+'-'+index
                    }
                })
            }else{
                throw new Error("expect array structure")
            }
        },
        /**
         * 改变高亮
         */
        changeHighLight(item){
            this.highArr = item
        },
    },
    components:{
        sliderVertical,
    },
    watch: {
        async $route(to, from ){
            this._hashchange()
        }
    },
    mounted(){
        //监听路由变化事件
        this._hashchange = (e)=>{
            //确认高亮层级
            if(this.routerobject[this.$route.path]){
                let routerLevelArr = this.routerobject[this.$route.path]
                //如果是数组，证明这是终端页面
                if(Array.isArray(routerLevelArr)){
                    this.highArr = routerLevelArr
                } 
                //若不是数组，证明是子页面，根据子页面指针，找到对应的终端页面
                else {
                    let fatherRouterLevelArr = this.routerobject[routerLevelArr]
                    if(Array.isArray(fatherRouterLevelArr)){
                        this.highArr = fatherRouterLevelArr
                    } else {
                        return;
                    }
                }
            } else {

            }
        }
        
        window.addEventListener('hashchange', this._hashchange)
        
        //遍历目录树，生成路径对象
        this.visitTree(this.propdatalist,'0');

        //改造routerobject对象的值为数组形式
        Object.keys(this.routerobject).forEach(key =>{
            if(this.routerobject[key].includes('-')){
                this.routerobject[key] = this.routerobject[key].split("-")
                this.routerobject[key] = this.routerobject[key].splice(1,this.routerobject[key].length)
            } 
            
        })
        //确认高亮层级
        if(this.routerobject[this.$route.path]){
            let routerLevelArr = this.routerobject[this.$route.path]
            //如果是数组，证明这是终端页面
            if(Array.isArray(routerLevelArr)){
                this.highArr = routerLevelArr
            } 
            //若不是数组，证明是子页面，根据子页面指针，找到对应的终端页面
            else {
                let fatherRouterLevelArr = this.routerobject[routerLevelArr]
                if(Array.isArray(fatherRouterLevelArr)){
                    this.highArr = fatherRouterLevelArr
                } else {
                    return;
                }
            }
        }
    }
}
</script>
<style scoped>
    .vertical-menu-box{
        height: 100%;
        overflow: auto;
    }
</style>


