<template>
    <div class="vertical-menu-box">
        <slider-vertical
        :menulist="propdatalist"
        :colorList="colorlist"
        :level="level"
        @changeHighState="changeHighLight"
        :highLight="highArr">
        
        </slider-vertical>
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
            // debugger
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
                    

                    if(item.children){
                        this.visitTree(item.children, valuenode+'-'+index)
                    }else{
                        if(item.contains){
                            
                            let contains_arr = item.contains
                            
                            let father_router = item.router

                            contains_arr.forEach((it, index) => {
                                _this.routerobject[it.router] = father_router
                            })
                        }
                        this.routerobject[item.router] =  valuenode+'-'+index
                    }
                })
            }else{
                throw new Error("expect array structure")
            }
        },
        /**
         * 
         */
        changeHighLight(item){
            this.highArr = item
        }
    },
    components:{
        sliderVertical,
    },
    mounted(){
        
        //监听路由变化事件
        this._hashchange = (e)=>{
            if(this.routerobject[this.$route.path]){
                let arr = this.routerobject[this.$route.path]
                //如果是数组
                if(Array.isArray(arr)){
                    // this.highArr = arr
                } 
                //若不是数组
                else {
                    let arr1 = this.routerobject[arr]
                    if(Array.isArray(arr1)){
                        this.highArr = arr1
                    }
                }
            }
        }
        
        window.addEventListener('hashchange', this._hashchange)
        
        //遍历目录树，生成路径对象
        this.visitTree(this.propdatalist,'0');

        Object.keys(this.routerobject).forEach(key =>{

            if(this.routerobject[key].includes('-')){
                this.routerobject[key] = this.routerobject[key].split("-")
                this.routerobject[key] = this.routerobject[key].splice(1,this.routerobject[key].length)
            } 
            
        })

        //找到当前目录的一级高亮
        // if(this.routerobject[this.$route.path]){
        //     this.highArr = this.routerobject[this.$route.path]
        // }
        if(this.routerobject[this.$route.path]){
                let arr = this.routerobject[this.$route.path]
                //如果是数组
                if(Array.isArray(arr)){
                    this.highArr = arr
                } 
                //若不是数组
                else {
                    // debugger
                    let arr1 = this.routerobject[arr]
                    if(Array.isArray(arr1)){
                        this.highArr = arr1
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


