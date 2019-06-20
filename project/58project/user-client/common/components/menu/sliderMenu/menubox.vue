<template>
    <div 
        :style="{width : isClose? `${(menuArr.length - 1) * 180 + 40}px` : `${(menuArr.length) * 180}px` , height : `calc(100% - 40px)`}" 
        @mouseleave="clearmenu">
        <!-- 菜单盒子 -->
        <transition-group name="list">
            <menu-slider
                ref="menubox"
                v-for="(item,index) in menuArr"
                :key="index"
                :level="index"
                :menuName="menuName"
                :datalist="item"
                :isClose="isClose"  
                :liststyle="liststyle[index]"
                :siderWidth="siderWidth"
                :selectedHighLight="selectedIndexArray"
                @changelist="changelistfn"
                @onchosenmenu="chosemenufn"></menu-slider>
        </transition-group>
    </div>
</template>
<script>
import menuSlider from './menuslider.vue'
export default {
    data(){
        return {
            /**
             * 记录前几层的索引
             * 例如，当前在目录第三级，该数组记录第一级、第二级被选中的索引
             * 若当前在目录第一级，数组为空
             */
            frontLevelSelectedIndexs : [], 
            /**
             * 分级目录颜色列表
             */
            colorlist : ['#333','#262626','#111','#000'],
            /**
             * 各级目录的字体、hover颜色列表
             */
            liststyle : [],
            /**
             * 第一级目录高亮索引
             * 若未选中任何子目录，则始终是第一级index == 0的项高亮
             * 若点击子目录之后，则切为子目录所属的第一级目录的索引高亮
             */
            selectedIndexArray : [],
            routerobject : {},
            indexArr : [0],
            level : 0,
            path : '',
        }
    },
    props : {
        //列表数组
        datalist : {
            default : [],
            type : Array
        },
        //列表宽度
        siderWidth :{
            dafault : 180,
            type : Number
        },
        //是否收起列表
        isClose : {
            default : false,
            type : Boolean
        },
    },
    watch: {
        $route: {
            handler: function(val, oldVal){
                // console.log(val.path)
                if(this.routerobject[val.path])
                    console.log(1);
                else 
                    console.log(-1);
            },
            // 深度观察监听
            deep: true
        }
    },
    computed : {
        /**
         * 包装prop的datalist数据 
         */
        propdatalist(){
            let arr = this.createTree(this.datalist, '0')
            console.log(arr)
            return arr
        },
        /**
         * 生成各个层级的目录
         * 初始值是第一级的目录数组
         * 当this.frontLevelSelectedIndexs不为空时，push进下一级目录数组
         */
        menuArr(){
            return this.frontLevelSelectedIndexs.reduce((arr,item, index)=>{
                if(item.hasNextLevel){
                    arr.push(arr[arr.length - 1][item.index].children)
                }
                return arr
            }, [this.propdatalist])
        },
        /**
         * 下一级目录的名字
         */
        menuName(){
            return this.frontLevelSelectedIndexs.reduce((arr,item, index)=>{
                arr.push({
                    name : this.menuArr[arr.length][item.index].title,
                    index : item.index
                })
                return arr
            }, [])
        },

    },
    components : {
        menuSlider : menuSlider
    },
    methods : {
        /*
            划过菜单触发
            下一级数组   当前索引   当前层级
        */
        changelistfn(arr, index, level){
            //截取前几层的样式、层级
            this.frontLevelSelectedIndexs = this.frontLevelSelectedIndexs.slice(0, level)
            this.liststyle = this.liststyle.slice(0, level)
            
            //添加层级字体、hover样式
            let styleobj = {};
            styleobj.ind = index;//层级
            styleobj.color = this.colorlist[level]//层级字体颜色
            styleobj.hovercolor = this.colorlist[level + 1]//层级hover颜色

            this.liststyle.push(styleobj)
           
            //如果下一层数组存在
            if(Array.isArray(arr) && arr.length){
                //加入当前索引，以备滑入下一级
                this.frontLevelSelectedIndexs.push({
                    index,
                    hasNextLevel : 1
                })
                //加入下一级的字体、hover样式
                this.liststyle.push({
                    ind : null,
                    color : this.colorlist[level + 1],
                    hovercolor : this.colorlist[level + 2]
                })
            }
            if(level == 0 && !this.propdatalist[index].children){
                this.frontLevelSelectedIndexs.push({
                    index,
                    hasNextLevel : 0
                })
            }
        },
        /**
         * 划出菜单，清空数组
         */
        clearmenu(){
            this.frontLevelSelectedIndexs = [];
            this.liststyle = [];
        },
        /**
         * 用户选择菜单后，菜单收起
         * 同时记录被选中的菜单所属的第一级菜单的索引
         */
        // chosemenufn(index, level, router){
        chosemenufn(router){
            //记录被选中的菜单所属的第一级菜单的索引
            this.selectedIndexArray = this.routerobject[router];
            console.log(this.selectedIndexArray)
            //清空菜单
            this.frontLevelSelectedIndexs = [];
            //清空样式
            this.liststyle = [];
        },
        /**
         * 遍历目录树
         * @param Treelist 树形结构
         * @param valuenode 叶子结点信息
         */
        visitTree(Treelist, valuenode){
            if(Array.isArray(Treelist)){
                Treelist.forEach((item, index) =>{
                    if(item.children){
                        this.visitTree(item.children, valuenode+'-'+index)
                    }else{
                        this.routerobject[item.router] =  valuenode+'-'+index
                    }
                })
            }else{
                throw new Error("expect array structure")
            }
        },
        /**
         * 生成一颗目录树
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
        }
    },
    mounted(){
        //监听路由变化事件
        this._hashchange = (e)=>{
            if(this.routerobject[this.$route.path]){
                this.selectedIndexArray = this.routerobject[this.$route.path]
            }
        }
        window.addEventListener('hashchange', this._hashchange)
        
        //遍历目录树，生成路径对象
        this.visitTree(this.propdatalist,'0');
        
        Object.keys(this.routerobject).forEach(key =>{
            this.routerobject[key] = this.routerobject[key].split("-")
        })
        //找到当前目录的一级高亮
        if(this.routerobject[this.$route.path]){
            this.selectedIndexArray = this.routerobject[this.$route.path]
        }
        
    },
    beforeDestory(){
        window.removeEventListener('hashchange', this._hashchange)
    }
}
</script>
<style scoped>
    .list-enter-active, .list-leave-active {
        transition: all 0.5s;
    }
    .list-enter, .list-leave-to {
        opacity: 0;
        transition: all 0.5s;
    }
</style>


