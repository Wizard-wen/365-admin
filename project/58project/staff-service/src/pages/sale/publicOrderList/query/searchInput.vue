<template>
    <div class="search-box" >
        <div class="search-label" @click="toggle">
            {{queryName}}
            <i class="arrow-position" :class="isShow?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
        </div>
        <div class="search-list" v-if="isShow">
            <input type="text" v-model="searchText" class="input" :placeholder="'搜索关键字'" v-on:keyup.13="addQuery">
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isShow:false, //是否展示列表
            searchText: '',//搜索字段
        }
    },
    props: {
        /**
         * 查询参数名
         */
        queryName:{
            type: String,
            default: ''
        },
        /**
         * vuex 中存储的查询参数键名
         */
        queryKey: {
            type:String,
            default:''
        },
        /**
         * 查询来自于什么组件
         * staff 运营 order 销售
         */
        queryFrom: {
            type: String,
            defeult: 'staff'
        }
    },
    watch: {
        inputText: function(val, oldVal){
            if(val == ''){
                this.searchText = ''
            }
        }
    },
    computed: {
        inputText(){
            if(this.$route.path == '/sale/saleWorkList'){
                return this.$store.state.saleModule.sellerList[this.queryKey]
            } else {
                return this.$store.state.operateModule.queryedList[this.queryKey]
            }
            
        }
    },
    methods: {
        /**
         * 切换显示隐藏
         */
        toggle(){
            this.isShow = !this.isShow
        },
        /**
         * 改变查询条件
         */
        addQuery(){
            //将查询组件数据变化存入vuex
            if(this.queryFrom == 'staff'){
                this.$store.commit('setQueryList', {
                    queryKey: this.queryKey, 
                    queryedList: this.searchText
                })
            } else {
                this.$store.commit('setSellerList', {
                    queryKey: this.queryKey, 
                    queryedList: this.searchText
                })
            }
            
            //更新表格数据
            this.$emit('updateTable')
        }
    }
}
</script>
<style lang="scss" scoped>
    .search-box{
        width:100%;
        position:relative;
        .arrow-position{
            position: absolute;
            right:10px;
            font-size:12px;
            top: 13px;
        }
        &:after{
            position:absolute;
            bottom: 0;
            left: 0;
            content: '';
            display: block;
            height:1px;
            width:100%;
            background: #eeecec;
        }
        .search-label{
            height: 39px;
            width: 100%;
            line-height: 39px;
            color: #333;
            text-indent: 25px;
            cursor: pointer;

        }
        .search-list{
            height: 40px;
            width: 100%;
            padding: 6px 0 6px 25px;
            .input{
                box-sizing: border-box;
                margin: 0 auto;
                height: 27px;
                width: 175px;
                display: block;
                outline: none;
                border: none;
                padding-left: 23px;
                border: 1px solid #d5d5d5;
                background: url(./images/mirror.svg) 6px 6px no-repeat;
                background-size: 15px 15px; 
            }
        }
    }

</style>


